package com.insoft.helpdesk.application.adapter.in.controller.service;


import com.insoft.helpdesk.application.biz.minio.port.in.MinioInPort;
import com.insoft.helpdesk.application.biz.service.port.in.RequestAttachmentInPort;
import com.insoft.helpdesk.application.biz.service.port.in.RequestInPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachment;
import com.insoft.helpdesk.util.annotation.HelpDeskRestController;
import com.insoft.helpdesk.util.content.HelpDeskMapperUtils;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@Tag(name = "RequestAttachment", description = "요청 첨부 API")
@HelpDeskRestController
@RequiredArgsConstructor
@Slf4j
public class RequestAttachmentController {

    final RequestInPort requestInPort;

    final RequestAttachmentInPort requestAttachmentInPort;

    final MinioInPort minioInPort;

    final static String TAGNAME = "RequestAttachment";
    private final static String MSIE = "MSIE";
    private final static String UTF8 = "UTF-8";

    @Value("${amazone.s3.minio.request.bucket}")
    String bucket;

    @Tag(name = TAGNAME)
    @Operation(summary = "요청첨부 조회", description = "요청첨부 정보 조회")
    @GetMapping("/service/request/attach/{id}")
    public RequestAttachment getRequestAttachment(@PathVariable String id) {
        return requestAttachmentInPort.getRequestAttachment(id).orElseThrow(null);
    }


    @Tag(name = TAGNAME)
    @Operation(summary = "해당 유저의 요청첨부 리스트 조회", description = "해당 유저의 요청첨부 리스트 조회",
            responses = {
                    @ApiResponse(responseCode = "200", description = "ok", content = @Content(schema = @Schema(implementation = RequestAttachment.class)))
            })
    @ApiResponses(
            @io.swagger.annotations.ApiResponse(response = RequestAttachment.class, message = "ok", code = 200)
    )
    @GetMapping("/service/request/{id}/attach")
    public Page<RequestAttachment> getRequestAttachments(@PathVariable String id, @RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "search", required = false) String searchParams, Pageable pageable) {
        return requestAttachmentInPort.getRequestAttachments(id, HelpDeskMapperUtils.mapToJson(keyParams),HelpDeskMapperUtils.mapToJson(searchParams), pageable);
    }

    @Tag(name = TAGNAME)
    @Operation(summary = "요청첨부 파일 다운로드 ", description = "요청첨부 파일 다운로드")
    @GetMapping("/service/request/{id}/attach/download")
    public void getRequestAttachmentReqIdFile(HttpServletRequest request, @PathVariable String id, @RequestParam("fileName") String fileName, HttpServletResponse httpServletResponse) throws Exception {
        String oriFileName = getDisposition(fileName, getBrowser(request));
        httpServletResponse.setContentType(MediaType.parseMediaType("application/octet-stream").toString());
        httpServletResponse.setHeader("Content-disposition", "attachment; filename=" + oriFileName);
        if(!minioInPort.downloadObject(bucket, id, fileName,httpServletResponse)){
            throw new Exception("다운로드 오류");
        }
    }

    @Tag(name = TAGNAME)
    @Operation(summary = "요청첨부 파일 이미지 다운로드", description = "요청첨부 파일 이미지 다운로드")
    @GetMapping(value = "/service/request/{id}/attach/image/download", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_GIF_VALUE})
    public void downloadImage(@PathVariable String id, @RequestParam("fileName") String fileName, HttpServletResponse httpServletResponse) throws Exception {
        if(!minioInPort.downloadObject(bucket, id, fileName,httpServletResponse)){
            throw new Exception("다운로드 오류");
        }
    }

    @Tag(name = TAGNAME)
    @Operation(summary = "요청첨부 파일 업로드", description = "요청첨부 파일 업로드")
    @PostMapping("/service/request/{id}/attach")
    public Object createRequestAttachments(@PathVariable String id, @RequestParam("files") List<MultipartFile> multipartFiles) {
        Request request = requestInPort.getRequest(id).orElse(null);

        List<RequestAttachment> list = new ArrayList<>();
        if(request == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 리퀘스트 정보입니다.");
        }
        for (MultipartFile multipartFile : multipartFiles) {
                if(!minioInPort.uploadObject(multipartFile,bucket ,id)){
                    return false;
                }
            list.add(requestAttachmentInPort.createRequestAttachment(
                RequestAttachment.builder()
                        .svcReqNo(request)
                        .filePath(id+"/"+multipartFile.getOriginalFilename())
                        .fileSize(multipartFile.getSize())
                        .fileNm(multipartFile.getOriginalFilename())
                        .fileExt(StringUtils.getFilenameExtension(multipartFile.getOriginalFilename()))
                        .build()));
        }
        return list;
    }

    @Tag(name = TAGNAME)
    @Operation(summary = "요청첨부 수정", description = "요청첨부 파일 수정")
    @PostMapping("/service/request/attach/{id}")
    public RequestAttachment updateRequestAttachment(@PathVariable String id, @RequestParam("file") MultipartFile multipartFile) {
        RequestAttachment requestAttachment = requestAttachmentInPort.getRequestAttachment(id).orElse(null);
        if(requestAttachment == null){
            return null;
        }
        if(!minioInPort.uploadObject(multipartFile,bucket ,id)){
            return null;
        }
        requestAttachment.setFileNm(multipartFile.getOriginalFilename());
        requestAttachment.setFilePath(requestAttachment.getSvcReqNo().getId()+"/"+multipartFile.getOriginalFilename());
        requestAttachment.setFileSize(multipartFile.getSize());
        requestAttachment.setFileNm(multipartFile.getOriginalFilename());
        requestAttachment.setFileExt(StringUtils.getFilenameExtension(multipartFile.getOriginalFilename()));
        requestAttachmentInPort.updateRequestAttachment(requestAttachment);
        return requestAttachment;
    }

    @Tag(name = TAGNAME)
    @Operation(summary = "요청첨부 삭제", description = "요청첨부 파일 삭제")
    @PostMapping("/service/request/attach/{id}/delete")
    public ResponseEntity deleteRequestAttachment(@PathVariable String id) {
        RequestAttachment requestAttachment = requestAttachmentInPort.getRequestAttachment(id).orElse(null);
        minioInPort.deleteObject(bucket, requestAttachment.getFilePath());
        requestAttachmentInPort.deleteRequestAttachment(requestAttachment);
        return ResponseEntity.ok(null);
    }


    private String getDisposition(String filename, String browser) throws Exception
    {
        String encodedFilename = null;
        if (MSIE.equals(browser)) {
        encodedFilename = URLEncoder.encode(filename, UTF8).replaceAll("\\+", "%20");
        } else if ("Firefox".equals(browser)) {
            encodedFilename = "\"" + new String(filename.getBytes(UTF8), "8859_1") + "\"";
        } else if ("Opera".equals(browser)) {
            encodedFilename = "\"" + new String(filename.getBytes(UTF8), "8859_1") + "\"";
        } else if ("Chrome".equals(browser)) {
            StringBuffer sb = new StringBuffer();
            char specword = '~';
            for (int i = 0; i < filename.length(); i++) {
                char c = filename.charAt(i);
                if (c > specword) { sb.append(URLEncoder.encode("" + c, UTF8));
                } else { sb.append(c);}
            } encodedFilename = sb.toString();
        } else { throw new RuntimeException("Not supported browser");
        } return encodedFilename;
    }

    private String getBrowser(HttpServletRequest request) {
        String header = request.getHeader("User-Agent");

        if (header.indexOf(MSIE) > -1) {
            return MSIE;
        } else if (header.indexOf("Chrome") > -1) {
            return "Chrome";
        } else if (header.indexOf("Opera") > -1) {
            return "Opera";
        } else if (header.indexOf("Trident/7.0") > -1){ //IE 11 이상
            //IE 버전 별 체크  >>  Trident/6.0(IE 10) , Trident/5.0(IE 9) , Trident/4.0(IE 8)
            return MSIE;
        }

        return "Firefox";
    }

}


