package com.sharkjob.OtherService;

import com.google.common.base.Verify;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

import static org.junit.Assert.*;

/**
 * Created by Chino on 2017/11/15.
 */
@RunWith(MockitoJUnitRunner.class)
public class MailServiceTest {

    private MailService mailService = new MailService();

    @Test
    public void sendVerifcationCode() throws Exception {
       assertNotNull(mailService.sendVerifcationCode("ece651sharkjob@gmail.com"));
    }
    @Test
    public void sendVerifcationCode_null() throws Exception {
        assertNull(mailService.sendVerifcationCode("ece651sharkjob"));
    }
}