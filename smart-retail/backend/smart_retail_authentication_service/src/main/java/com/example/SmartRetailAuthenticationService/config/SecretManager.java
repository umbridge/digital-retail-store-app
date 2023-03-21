package com.example.SmartRetailAuthenticationService.config;

import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.secretsmanager.AWSSecretsManager;
import com.amazonaws.services.secretsmanager.AWSSecretsManagerClientBuilder;
import com.amazonaws.services.secretsmanager.model.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import javax.sql.DataSource;
import java.io.IOException;
import java.nio.ByteBuffer;


@Component
public class SecretManager {


    @Autowired
    Environment env;

    @Bean
    public DataSource dataSource() {
        final JsonNode secretsJson = getSecret();
        return DataSourceBuilder
                .create().driverClassName("org.postgresql.Driver")
                .url("jdbc:postgresql" + "://" + secretsJson.get("host").textValue() + ":" + secretsJson.get("port").asInt() + "/" + secretsJson.get("dbname").textValue())
                .username(secretsJson.get("username").textValue()).password(secretsJson.get("password").textValue())
                .build();
    }

    public JsonNode getSecret() {
        String secretName = env.getProperty("spring.aws.secretsmanager.secretName");
        String endpoint = env.getProperty("spring.aws.secretsmanager.endpoint");
        String region = env.getProperty("spring.aws.secretsmanager.region");
        AwsClientBuilder.EndpointConfiguration config = new AwsClientBuilder.EndpointConfiguration(endpoint, region);
        AWSSecretsManagerClientBuilder clientBuilder = AWSSecretsManagerClientBuilder.standard();
        clientBuilder.setEndpointConfiguration(config);
        AWSSecretsManager client = clientBuilder.build();

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode secretsJson = null;
        GetSecretValueRequest getSecretValueRequest = new GetSecretValueRequest()
                .withSecretId(secretName);
        GetSecretValueResult getSecretValueResponse = null;
        try {
            getSecretValueResponse = client.getSecretValue(getSecretValueRequest);
        } catch(ResourceNotFoundException e) {
            System.out.println(e);
//            log.error("The requested secret " + secretName + " was not found");
        } catch (InvalidRequestException e) {
            System.out.println(e);
//            log.error("The request was invalid due to: " + e.getMessage());
        } catch (InvalidParameterException e) {
            System.out.println(e);
//            log.error("The request had invalid params: " + e.getMessage());
        }
        if(getSecretValueResponse == null) {
            return null;
        }
        // Decrypted secret using the associated KMS CMK
        // Depending on whether the secret was a string or binary, one of these fields will be populated
        String secret = getSecretValueResponse.getSecretString();
        if(secret == null) {
            System.out.println("The Secret String returned is null");
            return null;
        }
        try {
            secretsJson = objectMapper.readTree(secret);
        } catch (IOException e) {
            System.out.println("Exception while retreiving secret values: " + e.getMessage());
        }

        return secretsJson;
    }
}



