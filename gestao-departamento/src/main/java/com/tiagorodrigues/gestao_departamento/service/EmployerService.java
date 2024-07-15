package com.tiagorodrigues.gestao_departamento.service;

import com.tiagorodrigues.gestao_departamento.model.entity.Departament;
import com.tiagorodrigues.gestao_departamento.model.entity.Employer;
import com.tiagorodrigues.gestao_departamento.repository.DepartamentRepository;
import com.tiagorodrigues.gestao_departamento.repository.EmployerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployerService {

    @Autowired
    EmployerRepository employerRepository;

    @Autowired
    DepartamentRepository departamentRepository;

    public List<Employer> getAllEmployers(Employer employer) {
        return employerRepository.findAll();
    }

    public Employer getEmployerById(Long id) {
        Optional<Employer> employerOptional = employerRepository.findById(id);

        if (employerOptional.isEmpty())
            throw new RuntimeException("Employer not found!");
        return employerOptional.get();
    }

    public Employer createEmployer(Long departmentId, Employer employer) {
        Departament department = departamentRepository.findById(departmentId)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        employer.setDepartmentId(department);

        if (employerRepository.findByMail(employer.getMail()).isPresent()) {
            throw new RuntimeException("There is already an employer with this email.");
        }
        return employerRepository.save(employer);
    }

    public Employer updateEmployer(Long departamentId, Long id, Employer employerDetails) {
        Optional<Employer> employerOptional = employerRepository.findById(id);
        Departament department = departamentRepository.findById(departamentId)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        if (employerOptional.isPresent()) {
            Employer employer = employerOptional.get();
            employer.setName(employerDetails.getName());
            employer.setDateOfBirth(employerDetails.getDateOfBirth());
            employer.setMail(employerDetails.getMail());
            employer.setHousehold(employerDetails.getHousehold());
            employer.setDepartmentId(department);

            return employerRepository.save(employer);
        } else
            throw new RuntimeException("Employer not found!");
    }

    public List<Employer> deleteEmployer(Long id, Employer employer) {
        employerRepository.deleteById(id);
        return getAllEmployers(employer);
    }
}
