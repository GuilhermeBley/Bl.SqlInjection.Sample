# Exemplo de caso SQL Injection
Neste repositório vai ser mostrado um caso de uma implantação vulnerável de código SQL na linguagem JavaScript.


## O que fez essa falha ocorrer
O ataque de SQL Injection (SQLi) explora falhas de programação que ocorrem quando uma aplicação web não filtra ou valida corretamente os dados fornecidos pelos usuários antes de os incluir em uma consulta SQL.

Onde neste caso foi implementado o código da maneira incorreta, como mostrado no trecho:

```js
const query = 
`SELECT id, email, name, createdat FROM users WHERE email = '` + email + `' AND password = `+ password+`';`;

const result = await client.query(query);
```

Porém, essa forma de implementação acaba indo contra até mesmo com a documentação do Banco de Dados para a linguagem JavaScript, já que o correto deveria ter sido implementado da seguinte forma:
```js
const query = `
SELECT id, email, name, createdat 
FROM users 
WHERE email = $1 AND password = $2
`;

const result = await client.query(query, [email, password]);
```