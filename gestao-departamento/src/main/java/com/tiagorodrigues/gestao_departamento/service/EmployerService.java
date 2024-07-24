package com.tiagorodrigues.gestao_departamento.service;

import com.tiagorodrigues.gestao_departamento.model.entity.Department;
import com.tiagorodrigues.gestao_departamento.model.entity.Employer;
import com.tiagorodrigues.gestao_departamento.repository.DepartmentRepository;
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
    DepartmentRepository departamentRepository;

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
        Department department = departamentRepository.findById(departmentId)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        employer.setDepartmentId(department);

        if (employerRepository.countByMailAndIdNot(employer.getMail(), employer.getId()) > 0) {
            throw new RuntimeException("There is already an employer with this email.");
        }
        return employerRepository.save(employer);
    }

    public Employer updateEmployer(
            Long departmentId,
            Long id,
            Employer employerDetails) {

        Optional<Employer> employerOptional = employerRepository.findById(id);
        Department department = departamentRepository.findById(departmentId)
                .orElseThrow(() -> new RuntimeException("Department not found"));


        if (employerOptional.isPresent()) {

            Employer employer = employerOptional.get();

            if (!employer.getMail().equals(employerDetails.getMail())) {
                if (employerRepository.countByMailAndIdNot(employerDetails.getMail(), employerDetails.getId()) > 0) {
                    throw new RuntimeException("E-mail already in use!");
                }
            }


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
