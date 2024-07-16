package com.tiagorodrigues.gestao_departamento.repository;

import com.tiagorodrigues.gestao_departamento.model.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}
