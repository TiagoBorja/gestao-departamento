package com.tiagorodrigues.gestao_departamento.controller;

import com.tiagorodrigues.gestao_departamento.model.entity.Employer;
import com.tiagorodrigues.gestao_departamento.service.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employers")
public class EmployerController {

    @Autowired
    EmployerService employerService;

    @GetMapping
    public ResponseEntity<List<Employer>> getAllEmployers(Employer employer) {
        return ResponseEntity.ok(employerService.getAllEmployers(employer));
    }

    @GetMapping("{id}")
    public ResponseEntity<Employer> getEmployerById(@PathVariable Long id) {
        return ResponseEntity.ok(employerService.getEmployerById(id));
    }

    @PostMapping("department/{departmentId}")
    public ResponseEntity<Employer> createEmployer(@PathVariable Long departmentId, @RequestBody Employer employer) {
        return ResponseEntity.ok(employerService.createEmployer(departmentId,employer));
    }

    @PutMapping("{id}/department/{departmentId}")
    public ResponseEntity<Employer> updateEmployer(@PathVariable Long departmentId,@PathVariable Long id, @RequestBody Employer employer){
        return ResponseEntity.ok(employerService.updateEmployer(departmentId,id,employer));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<List<Employer>> deleteEmployer(Long id, Employer employer){
        return ResponseEntity.ok(employerService.deleteEmployer(id,employer));
    }
}
