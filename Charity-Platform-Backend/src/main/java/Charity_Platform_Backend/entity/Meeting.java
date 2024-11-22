package Charity_Platform_Backend.entity;

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
    private User organizer; // Organizer of the meeting

    private Double totalAmountRequired;
    private Double amountCollected;

    @Enumerated(EnumType.STRING)
    private CollectionStatus status; // Enum: ACTIVE, COMPLETED

    private LocalDate creationDate;

    private String paymentDetails; // e.g., PayPal, Bank details
}
