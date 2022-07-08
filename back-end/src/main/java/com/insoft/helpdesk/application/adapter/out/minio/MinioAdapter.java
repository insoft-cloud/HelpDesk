package com.insoft.helpdesk.application.adapter.out.minio;

import com.insoft.helpdesk.application.biz.minio.port.out.MinioOutPort;
import io.minio.Result;
import io.minio.errors.*;
import io.minio.messages.Item;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
@Slf4j
public class MinioAdapter implements MinioOutPort {
    @Override
    public List<String> getObjects(Iterable<Result<Item>> items) {
        List<String> objectResponses = new ArrayList<>();
        items.forEach(r -> {
            try {
                objectResponses.add(r.get().objectName());
            } catch (ErrorResponseException | InsufficientDataException | InternalException | InvalidKeyException | InvalidResponseException | IOException | NoSuchAlgorithmException | ServerException | XmlParserException e) {
                e.printStackTrace();
            }
        });
        return objectResponses;
    }

    @Override
    public File multiToFile(MultipartFile multipartFile) {
        File file = null;
        FileOutputStream fileOutputStream = null;
        try {
            file = new File(Objects.requireNonNull(multipartFile.getOriginalFilename()));
            if(file.createNewFile()) {
                if(log.isInfoEnabled()) {
                    log.info("파일 생성 => " + file.getName());
                }
            } else {
                if(log.isInfoEnabled()) {
                    log.info("파일 생성 실패");
                }
            }
            fileOutputStream = new FileOutputStream(file);
            fileOutputStream.write(multipartFile.getBytes());
        } catch (IOException | NullPointerException e) {
            e.printStackTrace();
        } finally {
            if(fileOutputStream != null) {
                try {
                    fileOutputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return file;
    }

    @Override
    public void deleteFile(File file) {
        if(file != null && file.exists()){
            if(file.delete()) {
                if(log.isInfoEnabled()) {
                    log.info(file.getName() + " 파일 제거 성공");
                }
            } else {
                if(log.isInfoEnabled()) {
                    log.info(file.getName() + " 파일 제거 실패");
                }
            }
        }
    }

    @Override
    public boolean uploadObject(boolean result) {
        return result;
    }

    @Override
    public void downloadObject(File file, HttpServletResponse httpServletResponse) {
        OutputStream out = null;
        FileInputStream in = null;
        try {
            out = httpServletResponse.getOutputStream();
            in = new FileInputStream(file);
            IOUtils.copy(in,out);
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try {
                if(out != null) {
                    Objects.requireNonNull(out).close();
                }
                if(in != null) {
                    Objects.requireNonNull(in).close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public boolean deleteObject(boolean result) {
        return result;
    }
}
