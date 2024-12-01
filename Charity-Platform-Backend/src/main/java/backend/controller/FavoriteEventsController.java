package backend.controller;

import backend.service.FavoriteEventsService;
import backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/favorite")
public class FavoriteEventsController {

    @Autowired
    private FavoriteEventsService service;

    @Autowired
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

    @GetMapping()
    public ResponseEntity<List<Long>> getEventIdsByUserId(Authentication authentication) {
        String username = authentication.getName();
        Long userId = (userService.findByUsername(username).getId());

        return ResponseEntity.ok(service.getEventIdsByUserId(userId));
    }

    @GetMapping("/count/{eventId}")
    public long getFavoriteEventCount(@PathVariable Long eventId) {
        return service.getFavoriteEventCount(eventId);
    }

    @GetMapping("/total-count")
    public ResponseEntity<Long> getTotalFavorites() {
        Long totalFavorites = service.getTotalFavorites();
        return ResponseEntity.ok(totalFavorites);
    }

    @GetMapping("/count-by-user/{userId}")
    public ResponseEntity<Long> getCountByUserId(@PathVariable Long userId) {
        Long count = service.countByUserId(userId);
        return ResponseEntity.ok(count);
    }
}
