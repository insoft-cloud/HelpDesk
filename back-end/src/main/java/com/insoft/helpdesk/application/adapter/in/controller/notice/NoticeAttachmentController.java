package com.insoft.helpdesk.application.adapter.in.controller.notice;

import com.insoft.helpdesk.application.biz.minio.port.in.MinioInPort;
import com.insoft.helpdesk.application.biz.notice.port.in.NoticeAttachmentInPort;
import com.insoft.helpdesk.application.biz.notice.port.in.NoticeInPort;
import com.insoft.helpdesk.application.domain.jpa.entity.notice.*;
import com.insoft.helpdesk.util.annotation.HelpDeskRestController;
import com.insoft.helpdesk.util.content.HelpDeskMapperUtils;
import io.swagger.v3.oas.annotations.Operation;
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

@Tag(name = "NoticeAttachment", description = "공지사항 첨부 API")
@HelpDeskRestController
@RequiredArgsConstructor
@Slf4j
public class NoticeAttachmentController {

    final NoticeInPort noticeInPort;
    final NoticeAttachmentInPort noticeAttachmentInPort;
    final MinioInPort minioInPort;

    final static String TAGNAME = "NoticeAttachment";
    private final static String MSIE = "MSIE";
    private final static String UTF8 = "UTF-8";

    @Value("${amazone.s3.minio.notice.bucket}")
    String bucket;

    @Tag(name = TAGNAME)
    @Operation(summary = "공지사항 특정 파일 조회", description = "공지사항 특정 파일 조회")
    @GetMapping("/notice/attach/{id}")
    public NoticeAttachment getNoticeAttachment(@PathVariable String id) {
        return noticeAttachmentInPort.getNoticeAttachment(id).orElseThrow(null);
    }

    @Tag(name = TAGNAME)
    @Operation(summary = "공지사항 첨부파일 조회", description = "공지사항 첨파일 조회")
    @GetMapping("/notice/{id}/attach")
    public Page<NoticeAttachment> getNoticeAttachments(@PathVariable String id, @RequestParam(value = "key", required = false) String keyParams, @RequestParam(value = "search", required = false) String searchParams, Pageable pageable) {
        return noticeAttachmentInPort.getNoticeAttachments(id, HelpDeskMapperUtils.mapToJson(keyParams), HelpDeskMapperUtils.mapToJson(searchParams), pageable);
    }

    @Tag(name = TAGNAME)
    @Operation(summary = "공지사항 요청첨부파일 다운로드", description = "공지사항 요청첨부파일 다운로드")
    @GetMapping("/notice/{id}/attach/download")
    public void getNoticeAttachmentFile(HttpServletRequest notice, @PathVariable String id, @RequestParam("fileName") String fileName, HttpServletResponse httpServletResponse) throws Exception {
        String oriFileName = getDisposition(fileName, getBrowser(notice));
        httpServletResponse.setContentType(MediaType.parseMediaType("application/octet-stream").toString());
        httpServletResponse.setHeader("Content-disposition", "attachment; filename=" + oriFileName);
        if(!minioInPort.downloadObject(bucket, id, fileName,httpServletResponse)){
            throw new Exception("다운로드 오류");
        }
    }

    @Tag(name = TAGNAME)
    @Operation(summary = "공지사항 파일첨부 기능", description = "공지사항 파일첨부 기능")
    @PostMapping("/notice/{id}/attach")
    public Object createNoticeAttachment(@PathVariable String id, @RequestParam("files") List<MultipartFile> multipartFiles) {
        Notice notice = noticeInPort.getNotice(id).orElse(null);
        List<NoticeAttachment> list = new ArrayList<>();
        if (notice == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 리퀘스트 정보입니다.");
        }
        for (MultipartFile multipartFile : multipartFiles) {
            if (!minioInPort.uploadObject(multipartFile, bucket, id)) {
                return false;
            }
            list.add(noticeAttachmentInPort.createNoticeAttachment(
                    NoticeAttachment.builder()
                            .ntcNo(notice)
                            .filePath(id + "/" + multipartFile.getOriginalFilename())
                            .fileSize(multipartFile.getSize())
                            .fileNm(multipartFile.getOriginalFilename())
                            .fileExt(StringUtils.getFilenameExtension(multipartFile.getOriginalFilename()))
                            .build()));
        }
        return list;
    }

    @Tag(name = TAGNAME)
    @Operation(summary  = "공지사항 첨부파일 수정", description  = "공지사항 첨부파일 수정")
    @PostMapping ("/notice/attach/{id}")
    public NoticeAttachment updateNoticeAttachment(@PathVariable String id, @RequestParam("file") MultipartFile multipartFile) {
        NoticeAttachment noticeAttachment = noticeAttachmentInPort.getNoticeAttachment(id).orElseThrow(null);
        if (noticeAttachment == null) {
            return null;
        }
        if (!minioInPort.uploadObject(multipartFile, bucket, id)) {
            return null;
        }
        noticeAttachment.setFileNm(multipartFile.getOriginalFilename());
        noticeAttachment.setFilePath(noticeAttachment.getNtcNo().getId() + "/" + multipartFile.getOriginalFilename());
        noticeAttachment.setFileSize(multipartFile.getSize());
        noticeAttachment.setFileNm(multipartFile.getOriginalFilename());
        noticeAttachment.setFileExt(StringUtils.getFilenameExtension(multipartFile.getOriginalFilename()));
        noticeAttachmentInPort.updateNoticeAttachment(noticeAttachment);
        return noticeAttachment;
    }

    @Tag(name = TAGNAME)
    @Operation(summary  = "공지사항 첨부파일 삭제", description  = "공지사항 첨부파일 삭제")
    @PostMapping("/notice/attach/{id}/delete")
    public ResponseEntity deleteNoticeAttachment(@PathVariable String id) {
        NoticeAttachment noticeAttachment = noticeAttachmentInPort.getNoticeAttachment(id).orElse(null);
        minioInPort.deleteObject(bucket, noticeAttachment.getFilePath());
        noticeAttachmentInPort.deleteNoticeAttachment(noticeAttachment);
        return ResponseEntity.ok(null);
    }


    private String getDisposition(String filename, String browser) throws Exception
    {
        String encodedFilename = null;
        if (MSIE.equals(browser)) {
            encodedFilename = URLEncoder.encode(filename, UTF8).replaceAll("\\+", "%20");
        } else if ("Firefox".equals(browser) || "Opera".equals(browser)) {
            encodedFilename = "\"" + new String(filename.getBytes(UTF8), "8859_1") + "\"";
        }
//        else if (browser.equals("Opera")) {
//            encodedFilename = "\"" + new String(filename.getBytes(UTF8), "8859_1") + "\"";
//        }
        else if ("Chrome".equals(browser)) {
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

    private String getBrowser(HttpServletRequest notice) {
        String header = notice.getHeader("User-Agent");

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
