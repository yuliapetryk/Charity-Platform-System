package backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String category;

    @ManyToOne
    @JoinColumn(name = "organizer_id")
    private User organizer;

    private Double totalAmountRequired;
    private Double amountCollected;

    @Enumerated(EnumType.STRING)
    private CollectionStatus status; // Enum: ACTIVE, COMPLETED

    private LocalDate creationDate;

    private String paymentDetails;
}
