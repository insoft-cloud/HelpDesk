package com.insoft.helpdesk.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.minio.MinioClient;


@Configuration
public class S3MinioConfiguration {

    @Value("${amazone.s3.minio.url}")
    String url;

    @Value("${amazone.s3.minio.username}")
    String username;

    @Value("${amazone.s3.minio.password}")
    String password;

    @Bean
    MinioClient  s3Client(){
        return MinioClient.builder().endpoint(url).credentials(username, password).build();
    }

}
