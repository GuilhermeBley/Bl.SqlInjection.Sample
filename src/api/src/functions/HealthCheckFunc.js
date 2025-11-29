const { app } = require('@azure/functions');
const { Client } = require('pg');

app.http('HealthCheckFunction', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const healthCheck = {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            service: 'Azure Function API',
            version: '1.0.0'
        };

        // Check database connectivity
        const connectionString = process.env.pgConnectionString;
        
        if (connectionString) {
            try {
                
                const client = new Client({
                    connectionString: connectionString,
                    ssl: false
                });

                await client.connect();
                await client.query('SELECT 1 as health_check');
                await client.end();
                
                healthCheck.database = 'connected';
            } catch (error) {
                context.error('Database health check failed:', error);
                healthCheck.database = 'disconnected';
                healthCheck.status = 'degraded';
                healthCheck.database_error = error.message;
            }
        } else {
            healthCheck.database = 'connection_string_not_configured';
            healthCheck.status = 'degraded';
        }

        // Determine HTTP status code based on overall health
        const statusCode = healthCheck.status === 'healthy' ? 200 : 
                          healthCheck.status === 'degraded' ? 200 : 503;

        return {
            status: statusCode,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(healthCheck, null, 2)
        };
    }
});