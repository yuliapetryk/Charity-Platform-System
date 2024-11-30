package backend.dto;

import java.time.LocalDate;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class EventStatisticsDTO {
    private String name;
    private LocalDate date;
    private Long views;
    private Long favorites;
    private float score;

    public EventStatisticsDTO(String name, LocalDate date, Long views, Long favorites, float score) {
        this.name = name;
        this.date = date;
        this.views = views;
        this.favorites = favorites;
        this.score= score;
    }

}
