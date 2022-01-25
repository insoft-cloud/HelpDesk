package com.insoft.helpdesk.application.domain.common;

import com.insoft.helpdesk.HelpDeskApplication;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachment;
import com.insoft.helpdesk.application.domain.jpa.repo.service.RequestAttachmentRepo;
import com.insoft.helpdesk.application.domain.jpa.repo.service.RequestRepo;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.transaction.Transactional;
import java.security.Key;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = HelpDeskApplication.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class CoverageTest {

    @Autowired
    RequestRepo requestRepo;

    @Autowired
    RequestAttachmentRepo requestAttachmentRepo;


    @Test
    void 리퀘스트생성_테스트() {
        requestRepo.save(Request.builder().cnts("test").delYn("Y").reqId("test").priortCd("test").sysCd("test").ttl("test").tyCd("test").build());
    }

    @Test
    void 리퀘스트어태치먼트생성_테스트(){
        requestAttachmentRepo.save(RequestAttachment
                .builder()
                        .fileExt("test")
                        .fileNm("test")
                        .fileSize(10L)
                        .svcReqNo(Request.builder().cnts("test").delYn("Y").reqId("test").priortCd("test").sysCd("test").ttl("test").tyCd("test").build())
                        .filePath("test")
                .build());
    }

    @Test
    void 리퀘스트어태치먼트_GET_리퀘스트_ID_테스트(){
        List<RequestAttachment> requestAttachments = requestAttachmentRepo.findAllByReqId("test");
        System.out.println("실행");
        requestAttachments.stream().forEach(System.out::println);
    }

    @Test
    void 리퀘스트어태치먼트_GET_리퀘스트_ID_COUNT_테스트(){
        long count = requestAttachmentRepo.countReqId("test");
        System.out.println(count);
    }



}