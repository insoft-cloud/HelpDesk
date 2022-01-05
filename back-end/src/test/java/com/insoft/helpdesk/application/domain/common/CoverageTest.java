package com.insoft.helpdesk.application.domain.common;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CoverageTest {

    @Test
    void getName() {
        Coverage coverage = new  Coverage("name", 10);
        assertEquals(coverage.getName(), "name");
        assertEquals(coverage.getAge(), 10);

    }
}