# Exemplo de caso SQL Injection
Neste repositório vai ser mostrado um caso de uma implantação vulnerável de código SQL na linguagem JavaScript.

## Como explorar a falha
Para explorar a falha de segurança desse web-site, será necessário fazer as seguintes tarefas:

- Entre no link [INTRODUÇÃO À CIBERSEGURANÇA]([http://example.com](https://green-cliff-05e9d7c10.3.azurestaticapps.net))
- Digite no e-mail `validemail@email.com' or true --` (por questões de segurança somente esse injeção funciona)
- Entre com uma senha de mais de 8 caracteres, Ex. `senha12345`

É esperado o seguinte comportamento:

![sqlinjfail](https://github.com/user-attachments/assets/db27212f-f208-411d-93e0-39ea12d06822)

Sendo exibido a seguinte mensagem

<img width="1335" height="640" alt="successphoto" src="https://github.com/user-attachments/assets/b0edec22-6bd0-42db-ac72-8707ee083259" />

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

Essa falha ocorre por conta de que é executado no Banco de Dados a consulta `SELECT id, email, name, createdat FROM users WHERE email = 'validemail@email.com' or true --' AND password = 'senha12345';`,
sendo possível analisar que independente do e-mail digitado, a consulta sempre retorna o primeiro usuário, já que é adicionado um `or true` com ` --` que comenda o restante do código para não ser executado.
