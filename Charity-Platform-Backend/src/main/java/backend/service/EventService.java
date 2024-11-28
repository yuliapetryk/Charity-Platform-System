package backend.service;

import backend.entity.Event;
import backend.entity.User;
import backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

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

    public void deleteEventById(Long id) {
        eventRepository.deleteById(id);
    }
}
