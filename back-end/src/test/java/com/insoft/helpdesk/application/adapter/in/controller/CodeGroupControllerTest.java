package com.insoft.helpdesk.application.adapter.in.controller;

import org.junit.jupiter.api.Test;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;



class CodeGroupControllerTest {


//    @Autowired
//    protected MockMvc mockMvc;

    @Test
    void selectCodeGroups() throws IOException {
        ClassPathResource classPathResource = new ClassPathResource("/templates/selectManager.html");
        byte[] bdata = FileCopyUtils.copyToByteArray(classPathResource.getInputStream());
        String data = new String(bdata, "UTF-8");
        System.out.println(data);
        List<String> ddd = new ArrayList<>();
        ddd.add("박철한");
        ddd.add("바뀌었습니다.");
        String formatData = MessageFormat.format(data, ddd.stream().toArray());
        System.out.println(formatData);

//        Assertions.assertThat();
    }
}