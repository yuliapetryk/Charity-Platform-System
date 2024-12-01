package backend.repository;

import backend.entity.Role;
import backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);
    @Query("SELECT u.role FROM User u WHERE u.email = :email")
    Role getRole(String email);

}
