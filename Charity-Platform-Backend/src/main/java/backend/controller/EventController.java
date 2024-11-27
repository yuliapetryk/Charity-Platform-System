package backend.controller;

import backend.entity.Event;
import backend.entity.EventStatus;
import backend.entity.User;
import backend.service.EventService;
import backend.service.JwtService;
import backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/events")
public class EventController {
    private static final Logger logger = LoggerFactory.getLogger(EventController.class);

    @Autowired
    private EventService eventService;

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Optional<Event> event = eventService.getEventById(id);
        return event.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public List<Event> getEventsByCategory(@PathVariable String category) {
        return eventService.getEventsByCategory(category);
    }

    @Autowired
    private UserService userService;  // Service to fetch User from the database

    @Autowired
    private JwtService jwtService;

    @PostMapping
    public ResponseEntity<String> createEvent(
            @RequestHeader("Authorization") String authorizationHeader,  // Get token from headers
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("shortDescription") String shortDescription,
            @RequestParam("category") String category,
            @RequestParam("image") MultipartFile image) {

        // Extract the token from the Authorization header
        String token = authorizationHeader.startsWith("Bearer ") ?
                authorizationHeader.substring(7) : authorizationHeader;

        // Extract email from the token
        String email = jwtService.extractUserName(token);

        // Retrieve the organizer (user) from the database using the extracted email
        User organizer = userService.getUserByEmail(email).orElseThrow(null);

        if (organizer == null) {
            return ResponseEntity.status(404).body("Organizer not found.");
        }

        byte[] imageBytes = null;
        try {
            imageBytes = image.getBytes();
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Failed to process image.");
        }

        Event event = new Event();
        event.setName(name);
        event.setDescription(description);
        event.setShortDescription(shortDescription);
        event.setCategory(category);
        event.setOrganizer(organizer);
        event.setImage(imageBytes);
        event.setStatusEvent(EventStatus.NEW);
        event.setDate(LocalDate.now());
        eventService.saveEvent(event);

        return ResponseEntity.ok("Event created successfully!");
    }

//    @GetMapping("/popular")
//    public List<Event> getPopularEvents() {
//        return eventService.getPopularEvents();
//    }

    @GetMapping("/all")
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEventById(id);
        return ResponseEntity.noContent().build();
    }
}

