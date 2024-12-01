package backend.service;

import backend.entity.EventScore;
import backend.repository.EventScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventScoreService {

    @Autowired
    private EventScoreRepository eventScoreRepository;

    public Float getAverageScore(Long eventId) {
        List<EventScore> scores = eventScoreRepository.findByEventId(eventId);

        if (scores.isEmpty()) {
            return 0f;
        }

        float totalScore = 0;
        for (EventScore score : scores) {
            totalScore += score.getScore();
        }
        return totalScore / scores.size();
    }


    public void addScore(Long userId, Long eventId, Float score) {
      EventScore eventScore = new EventScore();
      eventScore.setEventId(eventId);
      eventScore.setUserId(userId);
      eventScore.setScore(score);
      eventScoreRepository.save(eventScore);
    }

    public boolean getUserRatingForEvent(Long eventId, Long userId) {

        return eventScoreRepository.existsByUserIdAndEventId(userId, eventId);
    }

}
