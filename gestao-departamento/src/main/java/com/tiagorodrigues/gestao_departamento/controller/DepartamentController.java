package com.tiagorodrigues.gestao_departamento.controller;

import com.tiagorodrigues.gestao_departamento.model.entity.Departament;
import com.tiagorodrigues.gestao_departamento.model.entity.User;
import com.tiagorodrigues.gestao_departamento.service.DepartamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/departaments")
public class DepartamentController {

    @Autowired
    DepartamentService departamentService;

    @GetMapping
    public ResponseEntity<List<Departament>> getAllDepartaments(Departament departament) {
        return ResponseEntity.ok(departamentService.getAllDepartaments(departament));
    }

    @GetMapping("{id}")
    public ResponseEntity<Departament> getDepartamentById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(departamentService.getDepartamentById(id));
    }

    @PostMapping
    public ResponseEntity<Departament> createDepartament(@RequestBody Departament departament) {
        return ResponseEntity.ok(departamentService.createDepartament(departament));
    }

    @PutMapping("{id}")
    public ResponseEntity<Departament> updateDepartament(@PathVariable("id") Long id, @RequestBody Departament departamentDetails) {
        return ResponseEntity.ok(departamentService.updateDepartament(id, departamentDetails));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<List<Departament>> deleteDepartament(@PathVariable("id") Long id, Departament departament) {
        return ResponseEntity.ok(departamentService.deleteDepartamet(id, departament));
    }
}
