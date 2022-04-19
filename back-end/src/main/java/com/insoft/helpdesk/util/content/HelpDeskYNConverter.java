package com.insoft.helpdesk.util.content;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class HelpDeskYNConverter implements AttributeConverter<Boolean, String> {
    @Override
    public String convertToDatabaseColumn(Boolean attribute) {
        return (attribute!=null && attribute) ? "Y" : "N";
    }

    @Override
    public Boolean convertToEntityAttribute(String dbData) {
        return "Y".equalsIgnoreCase(dbData);
    }
}
