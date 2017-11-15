package com.sharkjob.OtherService;

import lombok.NoArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import java.util.Properties;

/**
 * Created by Chino on 2017/11/14.
 */

@NoArgsConstructor
public class MailService {
    private final static String fromEmail = "ece651sharkjob@gmail.com";
    private final static String password = "ece651123456";

    public String sendVerifcationCode(String toEmail) {

        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com"); //SMTP Host
        props.put("mail.smtp.port", "587"); //TLS Port
        props.put("mail.smtp.auth", "true"); //enable authentication
        props.put("mail.smtp.starttls.enable", "true"); //enable STARTTLS
        //create Authenticator object to pass in Session.getInstance argument
        Authenticator auth = new Authenticator() {
            //override the getPasswordAuthentication method
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(fromEmail, password);
            }
        };
        Session session = Session.getInstance(props, auth);
        return EmailUtil.sendEmail(session, toEmail,"Shark Job Sign up Verification Code", generateRandomVerifcationCode());
    }
    private String generateRandomVerifcationCode(){
        return RandomStringUtils.randomAlphanumeric(6);
    }
}
