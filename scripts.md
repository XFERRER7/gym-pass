#docker
 - docker run --name api-gym-pass -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e    POSTGRESQL_DATABASE=gym_pass -p 5432:5432  bitnami/postgresql


stack:
  - docker
  - prisma
  - fastify
  - postgresql
  - typescript

arquitetura e design patterns
 - camadas
 - solid
 - clean code
 - repository pattern
 - service pattern