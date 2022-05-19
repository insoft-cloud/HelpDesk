package com.insoft.helpdesk.application.adapter.in.controller.service;


import com.insoft.helpdesk.application.biz.minio.port.in.MinioInPort;
import com.insoft.helpdesk.application.biz.service.port.in.RequestAttachmentHistoryInPort;
import com.insoft.helpdesk.application.biz.service.port.in.RequestHistoryInPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.*;
import com.insoft.helpdesk.util.annotation.HelpDeskRestController;
import com.insoft.helpdesk.util.content.HelpDeskMapperUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@HelpDeskRestController
@RequiredArgsConstructor
public class RequestAttachmentHistoryController {

    final RequestAttachmentHistoryInPort requestAttachmentHistoryInPort;

    final RequestHistoryInPort requestHistoryInPort;

    final MinioInPort minioInPort;

    final static String TAGNAME = "RequestAttachment";
    private final static String MSIE = "MSIE";
    private final static String UTF8 = "UTF-8";

    @Value("${amazone.s3.minio.request.history.bucket}")
    String bucket;

    @Tag(name = TAGNAME)
    @Operation(summary  = "댓글 특정 첨부파일 조회", description  = "댓글 특정 첨부파일 조회")
    @GetMapping("/service/request/charge/history/attach/{id}")
    public RequestAttachmentHistory getRequestAttachmentHistory(@PathVariable String id) {
        return requestAttachmentHistoryInPort.getRequestAttachmentHistory(id).orElse(null);
    }

    @Tag(name = TAGNAME)
    @Operation(summary  = "댓글 첨부파일 조회", description  = "댓글 첨부파일 조회")
    @GetMapping("/service/request/charge/history/{id}/attaches")
    public Page<RequestAttachmentHistory> getRequestAttachmentHistories(@PathVariable String id, @RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "search", required = false) String searchParams, Pageable pageable) {
        return requestAttachmentHistoryInPort.getRequestAttachmentHistories(id, HelpDeskMapperUtils.mapToJson(keyParams), HelpDeskMapperUtils.mapToJson(searchParams), pageable);
    }

    @Tag(name = TAGNAME)
    @Operation(summary  = "댓글 첨부파일 다운로드", description  = "댓글 첨부파일 다운로드")
    @GetMapping("/service/request/charge/history/{id}/attache/download")
    public void getRequestAttachmentReqIdFile(HttpServletRequest requestHistory, @PathVariable String id, @RequestParam("fileName") String fileName, HttpServletResponse httpServletResponse) throws Exception {
        String oriFileName = getDisposition(fileName, getBrowser(requestHistory));
        httpServletResponse.setContentType(MediaType.parseMediaType("application/octet-stream").toString());
        httpServletResponse.setHeader("Content-disposition", "attachment; filename=" + oriFileName);
        if (!minioInPort.downloadObject(bucket, id, fileName, httpServletResponse)) {
            throw new Exception("다운로드 오류");
        }
    }

    @Tag(name = TAGNAME)
    @Operation(summary  = "댓글 첨부파일 업로드", description  = "댓글 첨부파일 업로드")
    @PostMapping("/service/request/charge/history/{id}/attach")
    public Object createRequestAttachments(@PathVariable String id, @RequestParam("file") MultipartFile multipartFile) {
        RequestHistory requestHistory = requestHistoryInPort.getRequestHistory(id).orElse(null);
        List<RequestAttachmentHistory> list = new ArrayList<>();
        if (requestHistory == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 리퀘스트 정보입니다.");
        }
        if (!minioInPort.uploadObject(multipartFile, bucket, id)) {
            return false;
        }
        list.add(requestAttachmentHistoryInPort.createRequestAttachmentHistory(
                RequestAttachmentHistory.builder()
                        .svcReqHistNo(requestHistory)
                        .filePath(id + "/" + multipartFile.getOriginalFilename())
                        .fileSize(multipartFile.getSize())
                        .fileNm(multipartFile.getOriginalFilename())
                        .fileExt(StringUtils.getFilenameExtension(multipartFile.getOriginalFilename()))
                        .build()));
        return list;
    }

    @Tag(name = TAGNAME)
    @Operation(summary  = "댓글 첨부파일 수정", description  = "댓글 첨부파일 수정")
    @PostMapping("/service/request/charge/history/attache/{id}")
    public RequestAttachmentHistory updateRequestAttachmentHistory(@PathVariable String id, @RequestParam("file") MultipartFile multipartFile) {
        RequestAttachmentHistory requestAttachmentHistory = requestAttachmentHistoryInPort.getRequestAttachmentHistory(id).orElseThrow(null);
        if (requestAttachmentHistory == null) {
            return null;
        }
        if (!minioInPort.uploadObject(multipartFile, bucket, id)) {
            return null;
        }
        requestAttachmentHistory.setFileNm(multipartFile.getOriginalFilename());
        requestAttachmentHistory.setFilePath(requestAttachmentHistory.getSvcReqHistNo().getId() + "/" + multipartFile.getOriginalFilename());
        requestAttachmentHistory.setFileSize(multipartFile.getSize());
        requestAttachmentHistory.setFileNm(multipartFile.getOriginalFilename());
        requestAttachmentHistory.setFileExt(StringUtils.getFilenameExtension(multipartFile.getOriginalFilename()));
        return requestAttachmentHistoryInPort.updateRequestAttachmentHistory(requestAttachmentHistory);
    }

    @Tag(name = TAGNAME)
    @Operation(summary  = "댓글 첨부파일 삭제", description  = "댓글 첨부파일 삭제")
    @PostMapping("/service/request/charge/history/attache/{id}/del")
    public RequestAttachmentHistory deleteRequestAttachmentHistory(@PathVariable String id) {
        RequestAttachmentHistory requestAttachmentHistory = requestAttachmentHistoryInPort.getRequestAttachmentHistory(id).orElseThrow(null);
        if (requestAttachmentHistory == null) {
            return null;
        }
        minioInPort.deleteObject(bucket, requestAttachmentHistory.getFilePath());
        return requestAttachmentHistoryInPort.deleteRequestAttachmentHistory(requestAttachmentHistory);
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
                char c = filename.charAt(i); if (c > specword) { sb.append(URLEncoder.encode("" + c, UTF8));
                } else { sb.append(c);
                }
            } encodedFilename = sb.toString();
        } else { throw new RuntimeException("Not supported browser");
        } return encodedFilename;
    }

    private String getBrowser(HttpServletRequest requestHistory) {
        String header = requestHistory.getHeader("User-Agent");

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
