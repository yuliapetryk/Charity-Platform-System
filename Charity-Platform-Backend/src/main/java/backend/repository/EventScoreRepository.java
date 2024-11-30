package backend.repository;

import backend.entity.EventScore;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface EventScoreRepository extends JpaRepository<EventScore, Long> {
    List<EventScore> findByEventId(Long eventId);

    boolean existsByUserIdAndEventId(Long userId, Long eventId);

}
