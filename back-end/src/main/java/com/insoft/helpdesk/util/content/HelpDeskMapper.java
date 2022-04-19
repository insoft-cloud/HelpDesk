package com.insoft.helpdesk.util.content;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

public class HelpDeskMapper {
    static ObjectMapper mapper = new ObjectMapper();

    public static Map mapToJson(String json){
        try {
            if(json != null){
                return mapper.readValue(json, Map.class);
            }
            return null;
        } catch (JsonProcessingException e) {
            return null;
        }

    }
}
