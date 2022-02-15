package com.insoft.helpdesk.application.adapter.in.controller.service;


import com.insoft.helpdesk.application.biz.service.port.in.RequestAttachmentInPort;
import com.insoft.helpdesk.application.biz.service.port.in.RequestInPort;
import com.insoft.helpdesk.application.domain.entity.service.AttachmentItem;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachment;
import com.insoft.helpdesk.util.annotation.HelpdeskRestController;
import io.minio.*;
import io.minio.errors.*;
import io.minio.messages.Item;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

@Tag(name = "RequestAttachment", description = "요청 첨부 API")
@HelpdeskRestController
@RequiredArgsConstructor
@Slf4j
public class RequestAttachmentController {

    final RequestInPort requestInPort;

    final RequestAttachmentInPort requestAttachmentInPort;

    final MinioClient minioClient;

    @Value("${amazone.s3.minio.bucket}")
    String bucket;

    @Tag(name = "RequestAttachment")
    @Operation(summary = "요청첨부 조회", description = "요청첨부 정보 조회")
    @GetMapping("/service/req-attach/{id}")
    public ResponseEntity getRequestAttachment(@PathVariable String id) {
        return ResponseEntity.ok(requestAttachmentInPort.getRequestAttachmentId(id).orElseThrow(null));
    }


    @Tag(name = "RequestAttachment")
    @Operation(summary = "해당 유저의 요청첨부 리스트 조회", description = "해당 유저의 요청첨부 리스트 조회",
            responses = {
                    @ApiResponse(responseCode = "200", description = "ok", content = @Content(schema = @Schema(implementation = RequestAttachment.class)))
            })
    @ApiResponses(
            @io.swagger.annotations.ApiResponse(response = RequestAttachment.class, message = "ok", code = 200)
    )
    @GetMapping("/service/req-attaches/{reqId}")
    public ResponseEntity getRequestAttachmentReqId(@PathVariable String reqId, Pageable pageable) {
        return ResponseEntity.ok(requestAttachmentInPort.getRequestAttachmentsSvcReqNo(reqId, pageable));
    }


    @GetMapping("/service/req-attaches/{reqId}/files")
    public ResponseEntity getRequestAttachmentReqId(@PathVariable String reqId) {
        Request request = requestInPort.getRequest(reqId).orElse(null);
        if(request == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 리퀘스트 정보입니다.");
        }
        Iterable<Result<Item>> listObjects = minioClient.listObjects(ListObjectsArgs.builder().bucket(bucket).prefix(reqId).recursive(true).build());
        List<String> objectResponses = new ArrayList<>();
        listObjects.forEach(r -> {
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
        return ResponseEntity.ok(objectResponses);
    }



    @Tag(name = "RequestAttachment")
    @PostMapping("/service/req-attache/{reqId}")
    public ResponseEntity createRequestAttachments(@PathVariable String reqId, @RequestParam("files") List<MultipartFile> multipartFiles) {
        File file = null;
        Request request = requestInPort.getRequest(reqId).orElse(null);
        if(request == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 리퀘스트 정보입니다.");
        }
        try {
            for (MultipartFile multipartFile : multipartFiles) {
                file = new File(multipartFile.getOriginalFilename());
                file.createNewFile();
                FileOutputStream fileOutputStream = new FileOutputStream(file);
                fileOutputStream.write(multipartFile.getBytes());
                fileOutputStream.close();
                minioClient.uploadObject(
                        UploadObjectArgs
                                .builder()
                                .filename(file.getAbsolutePath())
                                .object(reqId + "/" + file.getName())
                                .bucket(bucket)
                                .build());
                requestAttachmentInPort.createRequestAttachment(
                RequestAttachment.builder()
                        .svcReqNo(request)
                        .filePath("test")
                        .fileSize(multipartFile.getSize())
                        .fileNm(file.getName())
                        .fileExt(StringUtils.getFilenameExtension(multipartFile.getOriginalFilename()))
                        .build());
                if(file.exists()){
                    file.delete();
                }
            }
        } catch (ServerException e) {
            e.printStackTrace();
        } catch (InsufficientDataException e) {
            e.printStackTrace();
        } catch (ErrorResponseException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (InvalidKeyException e) {
            e.printStackTrace();
        } catch (InvalidResponseException e) {
            e.printStackTrace();
        } catch (XmlParserException e) {
            e.printStackTrace();
        } catch (InternalException e) {
            e.printStackTrace();
        }finally {
            if(file.exists())
                file.delete();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }

    @GetMapping("/service/req-attaches/download")
    public void getRequestAttachmentReqIdFile(@RequestBody AttachmentItem attachmentItem, HttpServletResponse httpServletResponse) {
        File file = null;
        try {
            file = new File(attachmentItem.getFileName());
            minioClient.downloadObject(DownloadObjectArgs.builder().filename(file.getAbsolutePath()).bucket(bucket).object(attachmentItem.getReqId() + "/" +attachmentItem.getFileName()).build());
            httpServletResponse.setContentType(MediaType.parseMediaType("application/octet-stream").toString());
            httpServletResponse.setHeader("Content-disposition", "attachment; filename=" + file.getName());
            OutputStream out = httpServletResponse.getOutputStream();
            FileInputStream in = new FileInputStream(file);

            // copy from in to out
            IOUtils.copy(in,out);

            out.close();
            in.close();
            file.delete();
        } catch (ErrorResponseException e) {
            log.error(e.toString());
        } catch (InsufficientDataException e) {
            log.error(e.toString());
        } catch (InternalException e) {
            log.error(e.toString());
        } catch (InvalidKeyException e) {
            log.error(e.toString());
        } catch (InvalidResponseException e) {
            log.error(e.toString());
        } catch (IOException e) {
            log.error(e.toString());
        } catch (NoSuchAlgorithmException e) {
            log.error(e.toString());
        } catch (ServerException e) {
            log.error(e.toString());
        } catch (XmlParserException e) {
            log.error(e.toString());
        } finally {
            if(file.exists()){
                file.delete();
            }
        }
    }





    @Tag(name = "RequestAttachment")
    @PatchMapping("/service/req-attache/{id}")
    public ResponseEntity createRequestAttachments(@PathVariable String id, @RequestBody RequestAttachment requestAttachment) {
        requestAttachmentInPort.updateRequestAttachment(requestAttachmentInPort.getRequestAttachmentId(id).orElseThrow(null).getRequestAttachment(requestAttachment));
        return ResponseEntity.ok(null);
    }

    @Tag(name = "RequestAttachment")
    @DeleteMapping("/service/req-attache/{id}")
    public ResponseEntity createRequestAttachments(@PathVariable String id) {
        requestAttachmentInPort.deleteRequestAttachment(requestAttachmentInPort.getRequestAttachmentId(id).orElseThrow(null));
        return ResponseEntity.ok(null);
    }
}
