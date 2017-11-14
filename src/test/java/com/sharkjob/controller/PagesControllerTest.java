package com.sharkjob.controller;

import lombok.val;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.runners.MockitoJUnitRunner;

import static org.junit.Assert.assertEquals;

@RunWith(MockitoJUnitRunner.class)
public class PagesControllerTest {
    @InjectMocks
    private PagesController pagesController;
    private String index;

    @Before
    public void setUp() {
        index = "index";
    }

    @Test
    public void valid_getSignupPage_successfully() {
        val expected = index;
        val actual = pagesController.getSignupPage();
        assertEquals(expected,actual);
    }

    @Test
    public void valid_getLoginPage_successfully() {
        val expected = index;
        val actual = pagesController.getLoginPage();
        assertEquals(expected,actual);
    }

    @Test
    public void valid_getJobInfoPage_successfully() {
        val expected = index;
        val actual = pagesController.getJobInfoPage();
        assertEquals(expected,actual);
    }

    @Test
    public void valid_getUserprofile_successfully() {
        val expected = index;
        val actual = pagesController.getUserprofile();
        assertEquals(expected,actual);
    }

    @Test
    public void valid_getDetailPage_successfully() {
        val expected = index;
        val actual = pagesController.getDetailPage();
        assertEquals(expected,actual);
    }

    @Test
    public void valid_getPostJobPage_successfully() {
        val expected = index;
        val actual = pagesController.getPostPage();
        assertEquals(expected,actual);
    }

}
