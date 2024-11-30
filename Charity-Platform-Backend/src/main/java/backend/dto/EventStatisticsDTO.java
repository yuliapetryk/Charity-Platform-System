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

    public EventStatisticsDTO(String name, LocalDate date, Long views, Long favorites) {
        this.name = name;
        this.date = date;
        this.views = views;
        this.favorites = favorites;
    }

}
