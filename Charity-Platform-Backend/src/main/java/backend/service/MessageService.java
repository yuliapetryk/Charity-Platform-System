package backend.service;

import backend.entity.Message;
import backend.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public Message saveMessage(Long eventId, Long userId, String content) {
        Message message = new Message();
        message.setContent(content);
        message.setUserId(userId);
        message.setEventId(eventId);
        message.setDate(LocalDateTime.now());

        return messageRepository.save(message);
    }

    public List<Message> getMessagesByUserId(Long userId) {
        return messageRepository.findAllByUserId(userId);
    }
}
