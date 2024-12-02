package backend.controller;

import backend.dto.EventStatisticsDTO;
import backend.entity.Event;
import backend.entity.EventStatus;
import backend.entity.User;
import backend.exception.ResourceNotFoundException;
import backend.service.EventService;
import backend.service.JwtService;
import backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/events")
public class EventController {
    private static final Logger logger = LoggerFactory.getLogger(EventController.class);

    @Autowired
    private EventService eventService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Optional<Event> optionalEvent = eventService.getEventById(id);

        if (optionalEvent.isPresent()) {
            Event event = optionalEvent.get();
            event.setViews(event.getViews() + 1);
            eventService.saveEvent(event);

            return ResponseEntity.ok(event);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/views")
    public ResponseEntity<Event> getEventViewsById(@PathVariable Long id) {
        Optional<Event> optionalEvent = eventService.getEventById(id);

        if (optionalEvent.isPresent()) {
            Event event = optionalEvent.get();

            eventService.saveEvent(event);

            return ResponseEntity.ok(event);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all/user")
    public List<Event> getEventsByOrganizer(Authentication authentication) {
        String username = authentication.getName();
        Long userId = (userService.findByUsername(username).getId());
        return eventService.getEventsByOrganizer(userId);
    }

    @GetMapping("/category/{category}")
    public List<Event> getEventsByCategory(@PathVariable String category) {
        String realCategory = switch (category) {
            case "health" -> "Здоров'я";
            case "social" -> "Соціальна допомога";
            case "ecology" -> "Екологія та тварини";
            case "education" -> "Освіта та наука";
            case "sport" -> "Культура і спорт";
            default -> "Соціальна допомога";
        };

        logger.info("Resolved category: {}", realCategory);

        return eventService.getEventsByCategory(realCategory);
    }

    @PostMapping
    public ResponseEntity<String> createEvent(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("shortDescription") String shortDescription,
            @RequestParam("category") String category,
            @RequestParam("link") String link,
            @RequestParam("image") MultipartFile image) {

        String token = authorizationHeader.startsWith("Bearer ") ?
                authorizationHeader.substring(7) : authorizationHeader;
        String email = jwtService.extractUserName(token);
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
        event.setLink(link);
        event.setStatusEvent(EventStatus.NEW);
        event.setDate(LocalDate.now());
        event.setViews(0L);

        eventService.saveEvent(event);

        return ResponseEntity.ok("Event created successfully!");
    }

    @GetMapping("/all")
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/sorted-by-date")
    public ResponseEntity<List<Event>> getEventsSortedByDate() {
        List<Event> events = eventService.getEventsSortedByDate();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/sorted-by-popularity")
    public List<Event> getEventsByPopularity() {
        return eventService.getEventsByPopularity();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateEventStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> requestBody) {

        String newStatus = requestBody.get("status");
        try {
            EventStatus eventStatus = EventStatus.valueOf(newStatus.toUpperCase());
            Event updatedEvent = eventService.updateEventStatus(id, eventStatus);
            return ResponseEntity.ok(updatedEvent);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid status: " + newStatus);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @RequestBody Event request, Authentication authentication) {

        Event event = (eventService.getEventById(id)).orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        String username = authentication.getName();
        User user = (userService.findByUsername(username));

        if (!event.getOrganizer().getId().equals(user.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to edit this event");
        }

        event.setName(request.getName());
        event.setCategory(request.getCategory());
        event.setDescription(request.getDescription());
        event.setLink(request.getLink());
        event.setStatusEvent(EventStatus.NEW);
        eventService.saveEvent(event);

        return ResponseEntity.ok("Event updated successfully");
    }

    @GetMapping("/user/statistics")
    public ResponseEntity<List<EventStatisticsDTO>> getUserEventStatistics(Authentication authentication) {
        String username = authentication.getName();
        Long userId = userService.findByUsername(username).getId();
        List<EventStatisticsDTO> statistics = eventService.getUserEventStatistics(userId);
        return ResponseEntity.ok(statistics);
    }

    @GetMapping("/total-views")
    public ResponseEntity<Long> getTotalEventViews() {
        Long totalViews = eventService.getTotalEventViews();
        return ResponseEntity.ok(totalViews);
    }

    @GetMapping("/count-by-category/{category}")
    public ResponseEntity<Long> getEventCountByCategory(@PathVariable String category) {
        String realCategory = switch (category) {
            case "health" -> "Здоров'я";
            case "social" -> "Соціальна допомога";
            case "ecology" -> "Екологія та тварини";
            case "education" -> "Освіта та наука";
            case "sport" -> "Культура і спорт";
            default -> "Соціальна допомога";
        };
        Long eventCount = eventService.getEventCountByCategory(realCategory);
        return ResponseEntity.ok(eventCount);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEventById(id);
        return ResponseEntity.noContent().build();
    }
}

