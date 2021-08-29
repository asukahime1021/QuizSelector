package com.asukahime.quiz.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ScenarioRepository extends JpaRepository<ScenarioEntity, Integer> {

    @Query(value = "SELECT max(SCENARIO_ID) FROM SCENARIO", nativeQuery = true)
    public Integer getMaxId();
}
