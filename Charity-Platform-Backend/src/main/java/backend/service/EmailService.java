package backend.service;

import backend.entity.Email;
import backend.repository.EmailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private EmailRepository emailRepository;

    public Email createEmail(Email email) {
        return emailRepository.save(email);
    }
}
