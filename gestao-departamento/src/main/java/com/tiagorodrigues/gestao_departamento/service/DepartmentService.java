package com.tiagorodrigues.gestao_departamento.service;

import com.tiagorodrigues.gestao_departamento.model.entity.Department;
import com.tiagorodrigues.gestao_departamento.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {

    @Autowired
    DepartmentRepository departmentRepository;

    public List<Department> getAllDepartments(Department departament) {
        return departmentRepository.findAll();
    }

    public Department getDepartmentById(Long id) {
        Optional<Department> departamentOptional = departmentRepository.findById(id);

        if (departamentOptional.isEmpty())
            throw new RuntimeException("Department not found");

        return departamentOptional.get();
    }

    public Department createDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public Department updateDepartment(Long id, Department departmentDetails) {
        Optional<Department> departamentOptional = departmentRepository.findById(id);

        if (departamentOptional.isPresent()) {
            departmentDetails.setName(departmentDetails.getName());
            return departmentRepository.save(departmentDetails);
        } else
            throw new RuntimeException("Department not found!");
    }

    public List<Department> deleteDepartment(Long id, Department department) {
        departmentRepository.deleteById(id);
        return getAllDepartments(department);
    }
}
