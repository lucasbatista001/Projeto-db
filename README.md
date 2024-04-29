# Instruções de desenvolvimento

## Pré-requisitos	
- [Bun](https://bun.sh/)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)

## Instalação

### Clone o repositório
```bash
git clone
```

### Instale as dependências
```bash
cd db-crud-challenge
bun install
```

### Inicie o banco de dados
1. Configure o arquivo `.env` com as variáveis de ambiente necessárias;
2. Crie um arqivo ``docker-compose.yml`` que orquestre um banco de dados PostgreSQL, na sua última versão (conforme suportado pelas imagens disponibilizadas no [DockerHub](https://hub.docker.com/_/postgres)).
3. Execute o comando `docker-compose up -d` para iniciar o banco de dados.
4. Criar as [tabelas necessárias para a aplicação](./assets/tables.png).

## Inicie o servidor de desenvolvimento
```bash
bun dev
```

**Abra http://localhost:3000/ com o navegador para testar a aplicação.**