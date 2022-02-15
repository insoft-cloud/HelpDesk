package com.insoft.helpdesk.configuration;

import io.minio.*;
import io.minio.errors.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;


@Configuration
public class S3MinioConfiguration {

    @Value("${amazone.s3.minio.url}")
    String url;

    @Value("${amazone.s3.minio.username}")
    String username;

    @Value("${amazone.s3.minio.password}")
    String password;

    @Value("${amazone.s3.minio.bucket}")
    String bucket;

    @Bean
    MinioClient  s3Client(){
        MinioClient minioClient = MinioClient.builder().endpoint(url).credentials(username, password).build();
        try {
            if(!minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucket).build())) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucket).objectLock(false).build());
            }
        } catch (ErrorResponseException e) {
            e.printStackTrace();
        } catch (InsufficientDataException e) {
            e.printStackTrace();
        } catch (InternalException e) {
            e.printStackTrace();
        } catch (InvalidKeyException e) {
            e.printStackTrace();
        } catch (InvalidResponseException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (ServerException e) {
            e.printStackTrace();
        } catch (XmlParserException e) {
            e.printStackTrace();
        }
        return minioClient;
    }

}
