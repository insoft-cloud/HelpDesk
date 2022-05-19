package com.insoft.helpdesk.application.biz.minio.service;

import com.insoft.helpdesk.application.biz.minio.port.in.MinioInPort;
import com.insoft.helpdesk.application.biz.minio.port.out.MinioOutPort;
import io.minio.*;
import io.minio.errors.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MinioService implements MinioInPort {

    final MinioClient minioClient;

    final MinioOutPort minioOutPort;

    @Override
    public List<String> getObjects(String bucket, String prefix) {
        return minioOutPort.getObjects(minioClient.listObjects(ListObjectsArgs.builder().bucket(bucket).prefix(prefix).recursive(true).build()));
    }

    @Override
    public boolean uploadObject(MultipartFile multipartFile, String bucket, String id){
        File file = null;
        boolean result = false;
        try {
            file = minioOutPort.multiToFile(multipartFile);
            minioClient.uploadObject(
                    UploadObjectArgs
                            .builder()
                            .filename(file.getAbsolutePath())
                            .object(id + "/" + file.getName())
                            .bucket(bucket)
                            .build());
            result = true;
        } catch (ErrorResponseException | InsufficientDataException | InternalException | InvalidKeyException | InvalidResponseException | IOException | NoSuchAlgorithmException | ServerException | XmlParserException e) {
            e.printStackTrace();
        } finally {
            minioOutPort.deleteFile(file);
        }
        return minioOutPort.uploadObject(result);
    }

    @Override
    public boolean downloadObject(String bucket, String id, String fileName, HttpServletResponse httpServletResponse) {
        File file = null;
        boolean result = false;
        try {
            file = new File(fileName);
            minioClient.downloadObject(
                    DownloadObjectArgs.builder()
                            .filename(file.getAbsolutePath())
                            .bucket(bucket)
                            .object(id + "/" +fileName)
                            .build()
            );
            minioOutPort.downloadObject(file, httpServletResponse);
            result = true;
        } catch (ErrorResponseException | InsufficientDataException | InternalException | InvalidKeyException | InvalidResponseException | IOException | NoSuchAlgorithmException | ServerException | XmlParserException e) {
            e.printStackTrace();
        } finally {
            minioOutPort.deleteFile(file);
        }
        return result;
    }

    @Override
    public boolean deleteObject(String bucket, String path) {
        try {
            minioClient.removeObject(
                    RemoveObjectArgs.builder()
                            .bucket(bucket)
                            .object(path)
                            .build()
            );
            return minioOutPort.deleteObject(true);
        } catch (ErrorResponseException | InsufficientDataException | InternalException | InvalidKeyException | InvalidResponseException | IOException | NoSuchAlgorithmException | ServerException | XmlParserException e) {
            e.printStackTrace();
        }
        return minioOutPort.deleteObject(false);

    }
}
