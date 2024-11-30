package backend.service;

import backend.dto.EventStatisticsDTO;
import backend.entity.Event;
import backend.entity.EventStatus;
import backend.entity.User;
import backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private FavoriteEventsService favoriteEventsService;

    @Autowired
    private EventScoreService eventScoreService;


    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }


    public List<Event> getEventsByCategory(String category) {
        return eventRepository.findByCategory(category);
    }

    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

//    public List<Event> getPopularEvents() {
//        // Logic to fetch popular events from the database
//        return eventRepository.findPopularEvents();
//    }

    public List<Event> getEventsByOrganizer(Long organizerId) {
        return eventRepository.findByOrganizerId(organizerId);
    }

    public List<Event> getEventsSortedByDate() {
        return eventRepository.findAllByOrderByDateDesc();
    }

    public Event updateEventStatus(Long id, EventStatus newStatus) {
        Optional<Event> optionalEvent = getEventById(id);

        if (optionalEvent.isPresent()) {
            Event event = optionalEvent.get();
            event.setStatusEvent(newStatus);
            return eventRepository.save(event);
        } else {
            throw new IllegalArgumentException("Event not found with id: " + id);
        }
    }

    public Long getEventViewsById(Long eventId) {
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));
        return event.getViews();
    }

    public List<Event> getEventsByPopularity() {
        List<Event> allEvents = eventRepository.findAll();

        return allEvents.stream()
                .sorted((e1, e2) -> {
                    double popularity1 = e1.getViews() * 0.3
                            + favoriteEventsService.getFavoriteEventCount(e1.getId()) * 0.5
                            + eventScoreService.getAverageScore(e1.getId()) * 0.2;
                    double popularity2 = e2.getViews() * 0.3
                            + favoriteEventsService.getFavoriteEventCount(e2.getId()) * 0.5
                            + eventScoreService.getAverageScore(e2.getId()) * 0.2;

                    return Double.compare(popularity2, popularity1); // Sort by descending popularity
                })
                .collect(Collectors.toList());
    }

    public List<EventStatisticsDTO> getUserEventStatistics(Long userId) {
        List<Event> userEvents = eventRepository.findByOrganizerId(userId);

        return userEvents.stream().map(event -> {
            Long views = event.getViews();
            Long favoriteCount = favoriteEventsService.countByEventId(event.getId());
            float averageScore = eventScoreService.getAverageScore(event.getId());

            return new EventStatisticsDTO(
                    event.getName(),
                    event.getDate(),
                    views,
                    favoriteCount,
                    averageScore
            );
        }).collect(Collectors.toList());
    }


    public void deleteEventById(Long id) {
        eventRepository.deleteById(id);
    }
}
