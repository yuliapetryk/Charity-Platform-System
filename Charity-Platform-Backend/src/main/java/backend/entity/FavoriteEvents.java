package backend.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class FavoriteEvents {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long eventId;
}
