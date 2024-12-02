package backend.service;

import backend.entity.FavoriteEvents;
import backend.exception.ResourceNotFoundException;
import backend.repository.EventRepository;
import backend.repository.FavoriteEventsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import backend.entity.Event;
import java.util.LinkedHashMap;


@Service
public class FavoriteEventsService {

    @Autowired
    private FavoriteEventsRepository repository;

    @Autowired
    private EventRepository eventRepository;


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

    public List<Long> getEventIdsByUserId(Long userId) {
        return repository.findByUserId(userId)
                .stream()
                .map(FavoriteEvents::getEventId)
                .collect(Collectors.toList());
    }

    public Map<String, Long> getFavoriteCategoriesByUser(Long userId) {
        List<FavoriteEvents> favoriteEvents = repository.findByUserId(userId);

        Map<String, Long> categoryCounts = favoriteEvents.stream()
                .map(fav -> eventRepository.findById(fav.getEventId())
                        .orElseThrow(() -> new ResourceNotFoundException("Event not found")))
                .collect(Collectors.groupingBy(Event::getCategory, Collectors.counting()));

        return categoryCounts.entrySet().stream()
                .sorted((entry1, entry2) -> entry2.getValue().compareTo(entry1.getValue()))
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (e1, e2) -> e1,
                        LinkedHashMap::new
                ));
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
