package backend.controller;

import backend.entity.FavoriteEvents;
import backend.entity.User;
import backend.service.EventService;
import backend.service.FavoriteEventsService;
import backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/favorite")
public class FavoriteEventsController {

    @Autowired
    private FavoriteEventsService service;
    private final UserService userService;


    @PostMapping("/{eventId}/add")
    public ResponseEntity<String> addFavoriteEvent(@PathVariable Long eventId, Authentication authentication) {
        String username = authentication.getName();
        Long userId = (userService.findByUsername(username).getId());

        boolean added = service.addFavoriteEvent(userId, eventId);

        if (added) {
            return ResponseEntity.ok("Favorite event added successfully.");
        } else {
            return ResponseEntity.status(409).body("Favorite event already exists.");
        }
    }

    @DeleteMapping("/{eventId}/delete")
    public ResponseEntity<String> deleteFavoriteEvent(@PathVariable Long eventId, Authentication authentication) {
        String username = authentication.getName();
        Long userId = (userService.findByUsername(username).getId());

        boolean deleted = service.deleteFavoriteEvent(userId, eventId);

        if (deleted) {
            return ResponseEntity.ok("Favorite event deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("Favorite event not found.");
        }
    }

    // Get all event IDs by user ID
    @GetMapping()
    public ResponseEntity<List<Long>> getEventIdsByUserId(Authentication authentication) {

        String username = authentication.getName();

        Long userId = (userService.findByUsername(username).getId());

        return ResponseEntity.ok(service.getEventIdsByUserId(userId));
    }
}
