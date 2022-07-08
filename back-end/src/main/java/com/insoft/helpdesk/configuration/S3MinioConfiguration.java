package com.insoft.helpdesk.configuration;

import io.minio.*;
import io.minio.errors.*;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@Data
@Configuration
public class S3MinioConfiguration {

    @Value("${amazone.s3.minio.url}")
    String url;

    @Value("${amazone.s3.minio.username}")
    String username;

    @Value("${amazone.s3.minio.password}")
    String password;

    @Value("${amazone.s3.minio.request.bucket}")
    String bucket;

    @Value("${amazone.s3.minio.request.history.bucket}")
    String bucket2;

    @Value("${amazone.s3.minio.notice.bucket}")
    String bucket3;

    @Bean
    MinioClient  s3Client(){
        MinioClient minioClient = MinioClient.builder().endpoint(url).credentials(username, password).build();
        try {
            if(!minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucket).build())) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucket).objectLock(false).build());
            }
            if(!minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucket2).build())) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucket2).objectLock(false).build());
            }
            if(!minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucket3).build())) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucket3).objectLock(false).build());
            }
        } catch (ErrorResponseException | InvalidResponseException | InsufficientDataException | InternalException | InvalidKeyException | IOException | NoSuchAlgorithmException | ServerException | XmlParserException e) {
            e.printStackTrace();
        }
        return minioClient;
    }

}
