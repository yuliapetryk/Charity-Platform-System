package backend.service;

import backend.entity.Role;
import backend.entity.User;
import backend.exception.ResourceNotFoundException;
import backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private  final UserRepository userRepository;

    public UserDetailsService userDetailsService(){
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                return userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Username not found"));

            }
        };
    }

    public User findByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Username not found"));

    }

    public Role getRole(String username) {
        return userRepository.getRole(username);

    }

    public User save (User newUser){
        if(newUser.getId() == null){
            newUser.setRegistrationDate(LocalDate.now());
        }
        return userRepository.save(newUser);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User getUserInfo(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public User updateUserProfile(Long userId, User userProfileDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setFirstName(userProfileDTO.getFirstName());
        user.setLastName(userProfileDTO.getLastName());
        user.setEmail(userProfileDTO.getEmail());

        return userRepository.save(user);
    }


}
