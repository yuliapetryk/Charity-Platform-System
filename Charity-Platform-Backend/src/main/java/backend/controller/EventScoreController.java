package backend.controller;

import backend.service.EventScoreService;
import backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class EventScoreController {
    private static final Logger logger = LoggerFactory.getLogger(EventController.class);

    private final UserService userService;

    @Autowired
    private EventScoreService eventScoreService;

    @GetMapping("/{eventId}/average-score")
    public ResponseEntity<Float> getAverageScore(@PathVariable Long eventId) {
        Float averageScore = eventScoreService.getAverageScore(eventId);
        logger.info("averageScore: {}", averageScore);

        return ResponseEntity.ok(averageScore);
    }

    @PostMapping("/{eventId}/score")
    public ResponseEntity<Void> addScore(@PathVariable Long eventId, @RequestBody Float eventScore, Authentication authentication) {
        String username = authentication.getName();
        Long userId = (userService.findByUsername(username).getId());
        eventScoreService.addScore(userId, eventId, eventScore);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{eventId}/user-rating")
    public boolean getUserRating(@PathVariable Long eventId, Authentication authentication) {
        String username = authentication.getName();
        Long userId = (userService.findByUsername(username).getId());
        logger.info("rating: {} {}", eventId, userId);
        logger.info("rating result: {} ",  eventScoreService.getUserRatingForEvent(eventId, userId));

        return eventScoreService.getUserRatingForEvent(eventId, userId);
    }

}
