package com.sharkjob.OtherService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;

/**
 * Created by Chino on 2017/11/14.
 */
public class EmailUtil {
    private static final Logger log = LoggerFactory.getLogger(EmailUtil.class);

    /**
     * Utility method to send simple HTML email
     * @param session
     * @param toEmail
     * @param subject
     * @param code
     */
    public static String sendEmail(Session session, String toEmail, String subject, String code){
        try
        {
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
        }
        catch (Exception e) {
            log.error("Failed to send msg to " + toEmail,e);
            return null;
        }
    }
}
