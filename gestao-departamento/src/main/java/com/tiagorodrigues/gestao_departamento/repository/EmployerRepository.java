package com.tiagorodrigues.gestao_departamento.repository;

import com.tiagorodrigues.gestao_departamento.model.entity.Employer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployerRepository extends JpaRepository<Employer, Long> {
}
