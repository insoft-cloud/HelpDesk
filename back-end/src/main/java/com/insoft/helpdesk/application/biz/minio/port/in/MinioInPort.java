package com.insoft.helpdesk.application.biz.minio.port.in;

import io.minio.ObjectWriteResponse;
import io.minio.Result;
import io.minio.messages.Item;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface MinioInPort {

    List<String> getObjects(String bucket, String prefix);
    boolean uploadObject(MultipartFile file, String bucket, String id);
    boolean downloadObject(String bucket, String id, String fileName, HttpServletResponse httpServletResponse);
    boolean deleteObject(String bucket, String path);
}
