package com.insoft.helpdesk.control.index;


import io.minio.*;
import io.minio.errors.*;
import io.minio.messages.Item;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.util.List;

@Service
@Slf4j
public class IndexService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    MinioClient s3Client;

    @Value("${amazone.s3.minio.bucket}")
    String bucket;

    public String redisIsConnection(){
        try{
            ValueOperations<String, Object> test = redisTemplate.opsForValue();
            test.set("test", LocalDate.now());
            return "연결됨 >>> 현재시각 : " + test.get("test").toString();
        }catch (Exception e){
            return "연결안됨 :  " + e.getMessage();
        }
    }

    public Iterable<Result<Item>> getMinio() throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
       return s3Client.listObjects(ListObjectsArgs.builder().bucket(bucket).build());
    }

    public void uploadMinio(MultipartFile multipartFile) throws IOException, ServerException, InsufficientDataException, ErrorResponseException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        File file = new File(multipartFile.getOriginalFilename());
        file.createNewFile();
        FileOutputStream fileOutputStream = new FileOutputStream(file);
        fileOutputStream.write(multipartFile.getBytes());
        fileOutputStream.close();
        log.info(file.getName());
        s3Client.uploadObject(UploadObjectArgs.builder().filename(file.getAbsolutePath()).object(file.getName()).bucket(bucket).build());
        file.delete();
    }
}
