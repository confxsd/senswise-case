ENV ?= dev

ifeq ($(ENV), dev)
  DOCKER_COMPOSE = docker-compose --env-file .env.development -f docker-compose.yml
else ifeq ($(ENV), prod)
  DOCKER_COMPOSE = docker-compose --env-file .env.production -f docker-compose.yml -f docker-compose.override.yml
else
  $(error Unknown environment "$(ENV)")
endif

up:
	$(DOCKER_COMPOSE) up --build

build:
	$(DOCKER_COMPOSE) build

postgres:
	$(DOCKER_COMPOSE) up -d postgres

down:
	$(DOCKER_COMPOSE) down
