<<<<<<< HEAD
package com.pawsense.pawsensebackend.repositories;

import com.pawsense.pawsensebackend.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

//    @Query("SELECT e FROM Event e WHERE user_id = :userId")
//    List<Event> findAllByUserId(String userId);

//    @Query("SELECT e FROM Event e WHERE e.pet.id = :petId")
//    List<Event> findAllByPetId(@Param("petId") Long petId);
//
//    void deleteById(Long eventId);
//
//    @Modifying
//    @Query("DELETE FROM Event e WHERE e.pet.id = :petId")
//    void deleteAllByPetId(@Param("petId") Long petId);

//    @Modifying
//    @Query("DELETE FROM Event e WHERE user_id = :userId")
//    void deleteAllByUserId(@Param("userId") String userId);
=======
package com.pawsense.pawsensebackend.repositories;public class EventRepository {
>>>>>>> cd4994410045b91ab88b90744ee7aae9bde1022d
}
