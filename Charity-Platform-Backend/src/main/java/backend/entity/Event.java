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
    private User organizer;

    private String category;

    private LocalDate date;

    private EventStatus status;

    @Lob
    private byte[] image;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<Application> applications;
}

