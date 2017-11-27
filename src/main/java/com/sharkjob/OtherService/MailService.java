package com.sharkjob.OtherService;

import lombok.NoArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.Properties;

/**
 * Created by Chino on 2017/11/14.
 */

@NoArgsConstructor
public class MailService {
    private static final Logger log = LoggerFactory.getLogger(MailService.class);
    private final static String fromEmail = "ece651sharkjob@gmail.com";
    private final static String password = "ece651123456";
    private final static Properties props = new Properties();
    private final static Authenticator auth = new Authenticator() {
        //override the getPasswordAuthentication method
        protected PasswordAuthentication getPasswordAuthentication() {
            return new PasswordAuthentication(fromEmail, password);
        }
    };

    public String sendVerifcationCode(String toEmail) {
        props.put("mail.smtp.host", "smtp.gmail.com"); //SMTP Host
        props.put("mail.smtp.port", "587"); //TLS Port
        props.put("mail.smtp.auth", "true"); //enable authentication
        props.put("mail.smtp.starttls.enable", "true"); //enable STARTTLS
        //create Authenticator object to pass in Session.getInstance argument
        Session session = Session.getInstance(props, auth);
        return sendEmail(session, toEmail, "Shark Job Sign up Verification Code", generateRandomVerifcationCode());
    }

    private String generateRandomVerifcationCode() {
        return RandomStringUtils.randomAlphanumeric(6);
    }

    private String sendEmail(Session session, String toEmail, String subject, String code) {
        try {
            MimeMessage msg = new MimeMessage(session);
            //set message headers
            msg.addHeader("Content-type", "text/HTML; charset=UTF-8");
            msg.addHeader("format", "flowed");
            msg.addHeader("Content-Transfer-Encoding", "8bit");

            msg.setFrom(new InternetAddress("no_reply@sharkJob.com", "NoReply-SharkJob"));

            msg.setReplyTo(InternetAddress.parse("no_reply@sharkJob.com", false));

            msg.setSubject(subject, "UTF-8");
            String body = "Verification Code:\n" + code + "\n\n" + "If you receive this email in error, please ignore it.\n";
            msg.setText(body, "UTF-8");

            msg.setSentDate(new Date());

            msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail, false));
            Transport.send(msg);
            return code;
        } catch (Exception e) {
            log.error("Failed to send msg to " + toEmail, e);
            return null;
        }
    }
}
