SHELL = /bin/bash
WORKDIR := $(PWD)
IMAGE_URI = ilonamenkui/super-enigma-service
SERVICE_NAME = super-enigma-service
DB_PORT = 27017
DB_NAME = mongodb
IMAGE_VERSION = develop
SERVICE_PORT = 3000

build-image:
	@ echo "---> Building service Docker image ..."
	@ docker build -t $(IMAGE_URI):$(IMAGE_VERSION) $(WORKDIR)
.PHONY: build-image

run-mongo:
	@ echo "---> Running Docker container with MongoDB ..."
	@ docker run --name $(DB_NAME) --rm -p $(DB_PORT):$(DB_PORT) -d mongo
.PHONY: run-mongo

stop-mongo:
	@ echo "---> Stopping Docker container with MongoDB ..."
	@ docker stop $(DB_NAME)
.PHONY: stop-mongo

run-service:
	@ echo "---> Running service Docker container ..."
	@ docker run -p $(SERVICE_PORT):$(SERVICE_PORT) -d --rm --name $(SERVICE_NAME) --link $(DB_NAME):db $(IMAGE_URI):$(IMAGE_VERSION)
.PHONY: run-service

stop-service:
	@ echo "---> Stopping service Docker container ..."
	@ docker stop $(SERVICE_NAME)
.PHONY: stop-service
