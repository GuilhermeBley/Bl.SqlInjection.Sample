const { app } = require('@azure/functions');
const { Client } = require('pg');

app.http('LoginFunction', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
         // Parse request body
        let requestBody;
        try {
            requestBody = await request.json();
        } catch (error) {
            return {
                status: 400,
                body: JSON.stringify({
                    error: 'Invalid JSON in request body'
                })
            };
        }

        const { email, password } = requestBody;

        // Validate required fields
        if (!email || !password) {
            return {
                status: 400,
                body: JSON.stringify({
                    error: 'Email and password are required'
                })
            };
        }

        const connectionString = process.env.pgConnectionString;

        const client = new Client({
            connectionString: connectionString,
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
        });

        try {
            await client.connect();

            // Query to check if user exists with matching email and password
            const query = 
            `SELECT id, email, name, createdat FROM users WHERE email = '` + email + `' AND password = '`+ password+`';`;
            
            const result = await client.query(query);

            await client.end();

            if (result.rows.length > 0) {
                const user = result.rows[0];
                return {
                    status: 200,
                    body: JSON.stringify({
                        message: 'Login successful',
                        user: {
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            createdAt: user.createdat
                        }
                    })
                };
            } else {
                return {
                    status: 401,
                    body: JSON.stringify({
                        error: 'Invalid email or password'
                    })
                };
            }

        } catch (error) {
            context.error('Database error:', error);
            
            // Make sure to close connection even if there's an error
            try {
                await client.end();
            } catch (endError) {
                context.error('Error closing connection:', endError);
            }

            return {
                status: 500,
                body: JSON.stringify({
                    error: 'Internal server error'
                })
            };
        }
    }
});
