package backend.controller;

import backend.entity.Email;
import backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/emails")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<Email> createEmail(@RequestBody Email email) {
        Email savedEmail = emailService.createEmail(email);
        return new ResponseEntity<>(savedEmail, HttpStatus.CREATED);
    }
}
