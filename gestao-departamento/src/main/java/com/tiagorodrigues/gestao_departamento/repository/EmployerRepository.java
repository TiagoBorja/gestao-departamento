package com.tiagorodrigues.gestao_departamento.repository;

import com.tiagorodrigues.gestao_departamento.model.entity.Employer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployerRepository extends JpaRepository<Employer, Long> {

    Optional<Employer> findByMail(String mail);
}
