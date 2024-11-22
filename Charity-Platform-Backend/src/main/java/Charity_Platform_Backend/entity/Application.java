package Charity_Platform_Backend.entity;


import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    private LocalDate registrationDate;

    @Enumerated(EnumType.STRING)
    private ParticipationStatus status; // Enum: REGISTERED, CONFIRMED, CANCELED
}
