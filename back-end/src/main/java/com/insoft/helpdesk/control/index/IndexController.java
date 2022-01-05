package com.insoft.helpdesk.control.index;

import com.insoft.helpdesk.application.domain.jpa.entity.code.Group;
import com.insoft.helpdesk.application.domain.jpa.repo.code.GroupRepo;
import io.minio.errors.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@RestController
@Slf4j
public class IndexController {

    final
    IndexService indexService;

    final GroupRepo groupRepo;

    public IndexController(IndexService indexService, GroupRepo groupRepo) {
        this.indexService = indexService;
        this.groupRepo = groupRepo;
    }


    @GetMapping(value = "/")
    public ModelAndView mainPage() throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("Redis", indexService.redisIsConnection());
        modelAndView.addObject("Postgresql", null);
        modelAndView.addObject("Minio", indexService.getMinio());
        modelAndView.setViewName("/index");
        Group group = Group.builder().name("test").userId("test1234").build();
        groupRepo.save(group);
        return modelAndView;
    }

    @PostMapping("/")
    public ModelAndView fileUpload(@RequestParam("file") MultipartFile multipartFile) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        indexService.uploadMinio(multipartFile);
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("Redis", indexService.redisIsConnection());
        modelAndView.addObject("Postgresql", null);
        modelAndView.addObject("Minio", indexService.getMinio());
        modelAndView.setViewName("/index");
        return modelAndView;
    }

}
