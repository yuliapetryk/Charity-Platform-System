package backend.controller;

import backend.entity.User;
import backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/role")
    public ResponseEntity<String> getUserRole(Authentication authentication) {
        String username = authentication.getName();
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

    @PutMapping("/user")
    public ResponseEntity<User> updateUserProfile(Authentication currentUser,
                                                  @RequestBody User userProfileDTO) {
        String username = currentUser.getName();
        User user = (userService.findByUsername(username));

        User updatedUser = userService.updateUserProfile(user.getId(), userProfileDTO);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

}
