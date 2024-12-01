package backend.repository;


import backend.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    @Transactional(readOnly = true)
    List<Event> findByCategory(String category);

    @Transactional(readOnly = true)
    @Query("SELECT e FROM Event e WHERE e.organizer.id = :organizerId")
    List<Event> findByOrganizerId(@Param("organizerId") Long organizerId);

    @Transactional(readOnly = true)
    List<Event> findAllByOrderByDateDesc();

    @Transactional(readOnly = true)
    Optional<Event> findById(Long id);

    @Query("SELECT COALESCE(SUM(e.views), 0) FROM Event e")
    Long getTotalViews();

    Long countByCategory(String category);

}
