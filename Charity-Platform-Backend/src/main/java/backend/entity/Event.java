package backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @ManyToOne
    @JoinColumn(name = "organizer_id")
    private User organizer; // Event organizer

    private String category; // e.g., Health, Education, Environment
    private String location;
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private EventStatus status; // Enum: CONFIRMED, CANCELED, HELD

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<Application> applications; // Event participants
}

