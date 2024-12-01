package backend.service;

import backend.entity.FavoriteEvents;
import backend.repository.FavoriteEventsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoriteEventsService {

    @Autowired
    private FavoriteEventsRepository repository;

    public boolean addFavoriteEvent(Long userId, Long eventId) {
        boolean exists = repository.existsByUserIdAndEventId(userId, eventId);
        if (exists) {
            return false;
        }

        FavoriteEvents favoriteEvent = new FavoriteEvents();
        favoriteEvent.setUserId(userId);
        favoriteEvent.setEventId(eventId);
        repository.save(favoriteEvent);

        return true;
    }

    public boolean deleteFavoriteEvent(Long userId, Long eventId) {

        boolean exists = repository.existsByUserIdAndEventId(userId, eventId);
        if (!exists) {
            return false;
        }

        FavoriteEvents favoriteEvent = repository.findByUserIdAndEventId(userId, eventId);
        repository.delete(favoriteEvent);
        return true;
    }


    // Get all event IDs by user ID
    public List<Long> getEventIdsByUserId(Long userId) {
        return repository.findByUserId(userId)
                .stream()
                .map(FavoriteEvents::getEventId)
                .collect(Collectors.toList());
    }

    public long getFavoriteEventCount(Long eventId) {
        return repository.countByEventId(eventId);
    }

    public long countByEventId(Long eventId){
        return repository.countByEventId(eventId);

    }

    public Long getTotalFavorites() {
        return repository.countAllFavorites();
    }

    public Long countByUserId(Long userId) {
        return repository.countByUserId(userId);
    }
}
