package com.insoft.helpdesk.application.adapter.in.controller.service;


import com.insoft.helpdesk.application.biz.minio.port.in.MinioInPort;
import com.insoft.helpdesk.application.biz.service.port.in.RequestAttachmentHistoryInPort;
import com.insoft.helpdesk.application.biz.service.port.in.RequestHistoryInPort;
import com.insoft.helpdesk.application.domain.jpa.entity.service.*;
import com.insoft.helpdesk.util.annotation.HelpDeskRestController;
import com.insoft.helpdesk.util.content.HelpDeskMapper;
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

    @Value("${amazone.s3.minio.request.history.bucket}")
    String bucket;

    @GetMapping("/service/request/charge/history/attach/{id}")
    public RequestAttachmentHistory getRequestAttachmentHistory(@PathVariable String id) {
        return requestAttachmentHistoryInPort.getRequestAttachmentHistory(id).orElse(null);
    }


    @GetMapping("/service/request/charge/history/{id}/attaches")
    public Page<RequestAttachmentHistory> getRequestAttachmentHistories(@PathVariable String id, @RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "search", required = false) String searchParams, Pageable pageable) {
        return requestAttachmentHistoryInPort.getRequestAttachmentHistories(id, HelpDeskMapper.mapToJson(keyParams), HelpDeskMapper.mapToJson(searchParams), pageable);
    }


    @GetMapping("/service/request/charge/history/attaches")
    public Page<RequestAttachmentHistory> getRequestAttachmentHistories(@RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "search", required = false) String searchParams, Pageable pageable) {
        return requestAttachmentHistoryInPort.getRequestAttachmentHistories(HelpDeskMapper.mapToJson(keyParams), HelpDeskMapper.mapToJson(searchParams), pageable);
    }

    @GetMapping("/service/request/charge/history/{id}/attache/download")
    public void getRequestAttachmentReqIdFile(HttpServletRequest requestHistory, @PathVariable String id, @RequestParam(value = "fileName") String fileName, HttpServletResponse httpServletResponse) throws Exception {
        String ori_fileName = getDisposition(fileName, getBrowser(requestHistory));
        httpServletResponse.setContentType(MediaType.parseMediaType("application/octet-stream").toString());
        httpServletResponse.setHeader("Content-disposition", "attachment; filename=" + ori_fileName);
        if (!minioInPort.downloadObject(bucket, id, fileName, httpServletResponse)) {
            throw new Exception("다운로드 오류");
        }
    }

    @Tag(name = "RequestAttachment")
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

    @PostMapping("/service/request/charge/history/attache")
    public RequestAttachmentHistory createRequestAttachmentHistory(@RequestBody RequestAttachmentHistory requestAttachmentHistory) {
        return requestAttachmentHistoryInPort.createRequestAttachmentHistory(requestAttachmentHistory);
    }

    @PostMapping("/service/request/charge/history/attache/{id}")
    @Operation(summary  = "댓글 첨부파일 수정", description  = "댓글 첨부파일 수정")
    public RequestAttachmentHistory updateRequestAttachmentHistory(@PathVariable String id, @RequestParam("file") MultipartFile multipartFile) {
        RequestAttachmentHistory _requestAttachmentHistory = requestAttachmentHistoryInPort.getRequestAttachmentHistory(id).orElseThrow(null);
        if (_requestAttachmentHistory == null) {
            return null;
        }
        if (!minioInPort.uploadObject(multipartFile, bucket, id)) {
            return null;
        }
        _requestAttachmentHistory.setFileNm(multipartFile.getOriginalFilename());
        _requestAttachmentHistory.setFilePath(_requestAttachmentHistory.getSvcReqHistNo().getId() + "/" + multipartFile.getOriginalFilename());
        _requestAttachmentHistory.setFileSize(multipartFile.getSize());
        _requestAttachmentHistory.setFileNm(multipartFile.getOriginalFilename());
        _requestAttachmentHistory.setFileExt(StringUtils.getFilenameExtension(multipartFile.getOriginalFilename()));
        return requestAttachmentHistoryInPort.updateRequestAttachmentHistory(_requestAttachmentHistory);
    }

    @PostMapping("/service/request/charge/history/attache/{id}/del")
    @Operation(summary  = "댓글 첨부파일 삭제", description  = "댓글 첨부파일 삭제")
    public RequestAttachmentHistory deleteRequestAttachmentHistory(@PathVariable String id) {
        RequestAttachmentHistory _requestAttachmentHistory = requestAttachmentHistoryInPort.getRequestAttachmentHistory(id).orElseThrow(null);
        if (_requestAttachmentHistory == null) {
            return null;
        }
        minioInPort.deleteObject(bucket, _requestAttachmentHistory.getFilePath());
        return requestAttachmentHistoryInPort.deleteRequestAttachmentHistory(_requestAttachmentHistory);
    }


    private String getDisposition(String filename, String browser) throws Exception
    {
        String encodedFilename = null;
        if (browser.equals("MSIE")) {
            encodedFilename = URLEncoder.encode(filename, "UTF-8").replaceAll("\\+", "%20");
        } else if (browser.equals("Firefox")) {
            encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
        } else if (browser.equals("Opera")) {
            encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
        } else if (browser.equals("Chrome")) {
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < filename.length(); i++) {
                char c = filename.charAt(i); if (c > '~') { sb.append(URLEncoder.encode("" + c, "UTF-8"));
                } else { sb.append(c);
                }
            } encodedFilename = sb.toString();
        } else { throw new RuntimeException("Not supported browser");
        } return encodedFilename;
    }

    private String getBrowser(HttpServletRequest requestHistory) {
        String header = requestHistory.getHeader("User-Agent");

        if (header.indexOf("MSIE") > -1) {
            return "MSIE";
        } else if (header.indexOf("Chrome") > -1) {
            return "Chrome";
        } else if (header.indexOf("Opera") > -1) {
            return "Opera";
        } else if (header.indexOf("Trident/7.0") > -1){ //IE 11 이상
            //IE 버전 별 체크  >>  Trident/6.0(IE 10) , Trident/5.0(IE 9) , Trident/4.0(IE 8)
            return "MSIE";
        }

        return "Firefox";
    }
}
