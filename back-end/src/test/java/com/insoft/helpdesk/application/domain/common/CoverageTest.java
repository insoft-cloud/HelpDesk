package com.insoft.helpdesk.application.domain.common;

import com.insoft.helpdesk.HelpDeskApplication;
import com.insoft.helpdesk.application.domain.jpa.entity.service.Request;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestAttachment;
import com.insoft.helpdesk.application.domain.jpa.entity.service.RequestCharge;
import com.insoft.helpdesk.application.domain.jpa.repo.code.DetailRepo;
import com.insoft.helpdesk.application.domain.jpa.repo.service.RequestAttachmentRepo;
import com.insoft.helpdesk.application.domain.jpa.repo.service.RequestChargeRepo;
import com.insoft.helpdesk.application.domain.jpa.repo.service.RequestRepo;
import com.insoft.helpdesk.util.content.HelpDeskSearchExecutor;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.minio.DeleteObjectTagsArgs;
import io.minio.MinioClient;
import io.minio.RemoveObjectArgs;
import io.minio.RemoveObjectsArgs;
import io.minio.errors.*;
import io.minio.messages.DeleteObject;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.persistence.Transient;
import javax.transaction.Transactional;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = HelpDeskApplication.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Slf4j
class CoverageTest {

    @Autowired
    RequestRepo requestRepo;

    @Autowired
    RequestAttachmentRepo requestAttachmentRepo;

    @Autowired
    DetailRepo detailRepo;

    @Autowired
    RequestChargeRepo requestChargeRepo;

    @Autowired
    HelpDeskSearchExecutor helpDeskSearchExecutor;

    @Autowired
    MinioClient minioClient;

    @Test
    void ??????????????????_?????????() {
        requestRepo.save(Request.builder().cnts("test").delYn(true).reqId("test").priortCd("test").sysCd("test").ttl("test").tyCd("test").build());
    }

    @Test
    void ?????????????????????????????????_?????????(){
        requestAttachmentRepo.save(RequestAttachment
                .builder()
                        .fileExt("test")
                        .fileNm("test")
                        .fileSize(10L)
                        .svcReqNo(Request.builder().cnts("test").delYn(true).reqId("test").priortCd("test").sysCd("test").ttl("test").tyCd("test").build())
                        .filePath("test")
                .build());
    }

    @Test
    void ????????????_?????????() throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        minioClient.removeObject(
                RemoveObjectArgs.builder()
                        .bucket("request-bucket")
                        .object("1c101206-1568-416f-b82c-b81255378639/2344579.png")
                        .bypassGovernanceMode(true)
                        .build());
    }

//    @Test
//    void ???????????????????????????_GET_????????????_ID_?????????(){
//        Page<Request> requests = requestRepo.findAllByReqIdAndDelYnIsFalse("test", PageRequest.of(0, 10));
//        System.out.println("??????");
//        requests.stream().forEach(System.out::println);
//    }

//    @Test
//    void ???????????????????????????_GET_????????????_ID_COUNT_?????????(){
//        long count = requestAttachmentRepo.countAllBySvcReqNo("test");
//        System.out.println(count);
//    }

    @Test
    void ???????????????_?????????(){
        System.out.println(detailRepo.findAll().toString());
    }

//    @Test
//    void ????????????_?????????_?????????(){
//        System.out.println(
//        requestRepo.countAllByReqIdAndRegistDtBetweenAndPrcsSttsCpAndDelYnIsFalse("test", LocalDateTime.now().minusYears(10), LocalDateTime.now(),"test"));
//    }

    @Test
    void ????????????_????????????_?????????(){

        System.out.println(
                requestChargeRepo.findAll());
    }



}