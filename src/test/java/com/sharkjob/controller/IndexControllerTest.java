package com.sharkjob.controller;

import lombok.val;
import static org.junit.Assert.assertEquals;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class IndexControllerTest {
    @InjectMocks
    private IndexController indexController;
    private String index;

    @Before
    public void setUp() {
        index = "index";
    }

    @Test
    public void valid_printWelcome_successfully() {
        val expected = index;
        val actual = indexController.printWelcome();
        assertEquals(expected,actual);
    }
}
