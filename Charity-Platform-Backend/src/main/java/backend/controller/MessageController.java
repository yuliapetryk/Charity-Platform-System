package backend.controller;


import backend.entity.Event;
import backend.entity.Message;
import backend.service.EventService;
import backend.service.MessageService;
import backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MessageController {

    private final MessageService messageService;

    @Autowired
    private EventService eventService;

    @Autowired
    private  UserService userService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/{eventId}/messages")
    public ResponseEntity<Message> addMessage(
            @PathVariable Long eventId,
            @RequestBody String messageRequest
    ) {
        Event event = eventService.getEventById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        Long userId = event.getOrganizer().getId();

        Message message = messageService.saveMessage(eventId, userId, messageRequest);

        return ResponseEntity.ok(message);
    }
    @GetMapping("messages/user")
    public ResponseEntity<List<Message>> getMessagesByUserId(Authentication authentication) {
        String username = authentication.getName();
        Long userId = (userService.findByUsername(username).getId());
        List<Message> messages = messageService.getMessagesByUserId(userId);
        return ResponseEntity.ok(messages);
    }

}
