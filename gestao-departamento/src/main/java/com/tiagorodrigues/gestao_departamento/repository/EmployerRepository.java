package com.tiagorodrigues.gestao_departamento.repository;

import com.tiagorodrigues.gestao_departamento.model.entity.Employer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface EmployerRepository extends JpaRepository<Employer, Long> {
    @Query("SELECT COUNT(e) FROM Employer e where mail = :mail and id <> :id")
    long countByMailAndIdNot(@Param("mail") String mail, @Param("id") Long id);

    @Query("SELECT e FROM Employer e where mail = :mail and id <> :id")
    Employer getEmployerFfs(@Param("mail") String mail, @Param("id") Long id);






}
