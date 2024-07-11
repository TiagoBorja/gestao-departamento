package com.tiagorodrigues.gestao_departamento.repository;

import com.tiagorodrigues.gestao_departamento.model.entity.Departament;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartamentRepository extends JpaRepository<Departament, Long> {
}
