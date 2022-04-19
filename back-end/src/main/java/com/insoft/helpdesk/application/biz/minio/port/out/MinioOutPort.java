package com.insoft.helpdesk.application.biz.minio.port.out;

import io.minio.Result;
import io.minio.messages.Item;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.List;

public interface MinioOutPort {

    List<String> getObjects(Iterable<Result<Item>> items);
    File multiToFile(MultipartFile file);
    void deleteFile(File file);
    boolean uploadObject(boolean result);
    void downloadObject(File file, HttpServletResponse httpServletResponse);
    boolean deleteObject(boolean result);
}
