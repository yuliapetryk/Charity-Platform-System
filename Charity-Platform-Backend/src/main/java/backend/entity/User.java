package backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Entity
@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table (name = "user")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @Column(unique = true)
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private UserType type; // Enum: ORGANIZATION, INDIVIDUAL

    private LocalDate registrationDate;
    private String phoneNumber;
    private String address;
    private String profilePhoto;

    @Enumerated(EnumType.STRING)
    private UserStatus status; // Enum: ACTIVE, BLOCKED, LIMITED_ACCESS

    @Enumerated(EnumType.STRING)
    Role role;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Application> applications; // User's event registrations

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }
}
