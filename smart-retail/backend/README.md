# springboot-microservices

[Spring Boot](http://projects.spring.io/spring-boot/) microservice.

## Requirements

For building and running the application you need:

- [JDK 11](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [Maven 4](https://maven.apache.org)
- [Postgres](https://www.postgresql.org/download/)

## Running the application locally
Update application properties as per your system and create the database: `registration` and `product`

There are several ways to run a Spring Boot application on your local machine. One way is to execute the `main` method in the `src/main/java/com/example/SmartRetail/"MicroserviceName".java` class from your IDE.

Alternatively you can use the [Spring Boot Maven plugin](https://docs.spring.io/spring-boot/docs/current/reference/html/build-tool-plugins-maven-plugin.html) like so:

```shell
mvn spring-boot:run
```
## Microservices (Readme)

Quick access links for Microservices readme:

- [Authentication service](https://github.com/Deloitte/Hashedin-Relay/blob/digitail-relay/smart-retail/backend/smart_retail_authentication_service/README.md)
- [Product Service](https://github.com/Deloitte/Hashedin-Relay/blob/digitail-relay/smart-retail/backend/smart_retail_product_service/README.md)
- [User Management service](https://github.com/Deloitte/Hashedin-Relay/blob/digitail-relay/smart-retail/backend/smart_retail_user_management/README.md)
