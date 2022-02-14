# Examplo de Aplicação utilizando Node.js API usando Express, Vue usando Vuetify e MySQL

## Requisitos do Projeto

* Instale[Node.js](https://nodejs.org) versão 16.14.0+, dê preferência para o [Node.js LTS](https://nodejs.org/en/download/releases/).
* Instale [MySQL](https://www.mysql.com/downloads/) versão 8.0.18, dê preferência para a última versão estável.

## Configuração do ambiente de desenvolvimento

* Faça o clone do repositório no seu computador.
* Crie uma base de dados no MySQL para o seu projeto.
* Abra o diretório raíz do projeto em um terminal.
* Navegue até o diretório **client** e execute o comando:

```bash
npm install
```

* Retorne para o diretório raíz do projeto e navegue até o diretório **api** e execute o comando:

```bash
npm install
```

* Ainda dentro da pasta **api**, copie `.env.sample` para `.env` e substitua os valores de acordo com o seus dados de ambiente.
Exemplo: na linha DATABASE_URL substitua o valor `mysql://<nome-usuario>:<senha>@<url-do banco>/<nome-do-banco>:<porta></porta>?charset=utf8` por `mysql://usuario:senha@servidor:porta/banco`.

* A **api** utiliza o [Prisma](https://www.prisma.io/) como ORM. 

* Após as configurações anteriores, execute o comando:

```bash
npx prisma migrate dev --name first-migration --schema=./src/prisma/schema.prisma
```

Este comando cria os arquivos de migração que consequentemente cria as tabelas do banco de dados. Este comando é opcional não sendo obrigatório, por exemplo você pode criar as tabelas manualmente no banco de dados, mas facilita a criação das tabelas bem como possibilita o versionamento do banco de dados.

* Retorne para o diretório raíz do projeto e execute o comando abaixo para instalar o [Concurrently](https://www.npmjs.com/package/concurrently):

```bash
npm install
```

Este pacote vai nos permitir rodar vários comandos em paralelo.

* Após a instalação do pacote, execute o comando abaixo:

```bash
npm run start
```

Pronto o seu projeto está pronto para ser utilizado.

## Arquitetura do Projeto

O projeto está dividido em dois diretórios sendo eles: **api** e **client**.
Esta configuração permite um desacoplamento do projeto, ou seja, você pode utilizar o projeto como um serviço web e pode alternar entre aplicações que consomem este serviço tal como um aplicativo mobile ou uma SPA.
O projeto utiliza um padrão de arquitetura MVC para aplicações web.
