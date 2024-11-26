package backend.controller;

import backend.entity.User;
import backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/role")
    public ResponseEntity<String> getUserRole(Authentication authentication) {
        // Authentication object contains the user's details from the JWT
        String username = authentication.getName();

        // Fetch role from your User repository
        String role = String.valueOf(userService.findByUsername(username).getRole());

        return ResponseEntity.ok(role);
    }

    @GetMapping("/userId")
    public ResponseEntity<String> getUserId(Authentication authentication) {
        String username = authentication.getName();
        String id = String.valueOf(userService.findByUsername(username).getId());

        return ResponseEntity.ok(id);
    }

    @GetMapping("/user")
    public ResponseEntity<User> getUserInfo(Authentication authentication) {

        String username = authentication.getName();
        User user = (userService.findByUsername(username));

        return ResponseEntity.ok(user);
    }
}
