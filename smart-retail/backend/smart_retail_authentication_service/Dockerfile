FROM maven:3.8-jdk-11 as builder
ARG CODEARTIFACT_AUTH_TOKEN
ENV CODEARTIFACT_AUTH_TOKEN=CODEARTIFACT_AUTH_TOKEN
WORKDIR /app
COPY pom.xml .
COPY settings.xml .
COPY src ./src
COPY . .
FROM openjdk:11
EXPOSE 8080
COPY --from=builder /app/target/*.jar /app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
