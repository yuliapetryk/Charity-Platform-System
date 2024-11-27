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

    @Column(length = 1500)
    private String description;

    @Column(length = 250)
    private String shortDescription;


    @ManyToOne
    @JoinColumn(name = "organizer_id")
    private User organizer;

    private String category;

    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private EventStatus statusEvent;

    @Lob
    private byte[] image;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<Application> applications;
}

