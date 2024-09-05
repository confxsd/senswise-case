DOCKER_COMPOSE_DEV = docker-compose --env-file .env.development -f docker-compose.yml
DOCKER_COMPOSE_PROD = docker-compose --env-file .env.production -f docker-compose.yml -f docker-compose.override.yml

dev:
	$(DOCKER_COMPOSE_DEV) up --build

prod:
	$(DOCKER_COMPOSE_PROD) up --build -d

build:
	$(DOCKER_COMPOSE_DEV) build

postgres: ## Spin up only the PostgreSQL container for development
	$(DOCKER_COMPOSE_DEV) up -d postgres
