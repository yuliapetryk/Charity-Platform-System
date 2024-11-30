package backend.repository;

import backend.entity.FavoriteEvents;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteEventsRepository extends JpaRepository<FavoriteEvents, Long> {
    List<FavoriteEvents> findByUserId(Long userId);
    boolean existsByUserIdAndEventId(Long userId, Long eventId);
    FavoriteEvents findByUserIdAndEventId(Long userId, Long eventId);
}

