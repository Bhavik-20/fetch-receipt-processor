# Overview

This is a simple API built to satisfy the requirements stated here on the fetch rewards [Receipt Processor Challenge](https://github.com/fetch-rewards/receipt-processor-challenge).

This API was built using Node JS with express. 

# Launching the Application

The application is deployable via a docker container. You will need [Docker](https://docs.docker.com/) installed on your machine to launch this application.

Before you begin, **ensure that port 3000 is available on your machine**.

In order to build a docker image and run the corresponding container, run the following docker-compose command: `docker-compose -f docker-compose.yml up --build -d`. This will also trigger all unit tests to be run to prevent the edition of erroneous code.

You can view the container on port 3000 of the machine.

In order to close down your container run `docker-compose down`
