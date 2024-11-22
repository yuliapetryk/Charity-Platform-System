package Charity_Platform_Backend.entity;

import jakarta.persistence.*;
import lombok.Data;


import java.time.LocalDate;
import java.util.List;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Application> applications; // User's event registrations
}
