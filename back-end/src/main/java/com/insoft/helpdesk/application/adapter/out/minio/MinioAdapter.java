package com.insoft.helpdesk.application.adapter.out.minio;

import com.insoft.helpdesk.application.biz.minio.port.out.MinioOutPort;
import io.minio.Result;
import io.minio.errors.*;
import io.minio.messages.Item;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MinioAdapter implements MinioOutPort {

    @Override
    public List<String> getObjects(Iterable<Result<Item>> items) {
        List<String> objectResponses = new ArrayList<>();
        items.forEach(r -> {
            try {
                objectResponses.add(r.get().objectName());
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
        });
        return objectResponses;
    }

    @Override
    public File multiToFile(MultipartFile multipartFile) {
        try {
            File file = new File(multipartFile.getOriginalFilename());
            file.createNewFile();
            FileOutputStream fileOutputStream = new FileOutputStream(file);
            fileOutputStream.write(multipartFile.getBytes());
            fileOutputStream.close();
            return file;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void deleteFile(File file) {
        if(file != null && file.exists()){
            file.delete();
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
                out.close();
                in.close();
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
