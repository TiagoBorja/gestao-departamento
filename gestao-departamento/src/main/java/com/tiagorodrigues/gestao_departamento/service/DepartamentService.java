package com.tiagorodrigues.gestao_departamento.service;

import com.tiagorodrigues.gestao_departamento.model.entity.Departament;
import com.tiagorodrigues.gestao_departamento.repository.DepartamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartamentService {

    @Autowired
    DepartamentRepository departamentRepository;

    public List<Departament> getAllDepartaments(Departament departament) {
        return departamentRepository.findAll();
    }

    public Departament getDepartamentById(Long id) {
        Optional<Departament> departamentOptional = departamentRepository.findById(id);

        if (departamentOptional.isEmpty())
            throw new RuntimeException("Departament not found");

        return departamentOptional.get();
    }

    public Departament createDepartament(Departament departament) {
        return departamentRepository.save(departament);
    }

    public Departament updateDepartament(Long id, Departament departamentDetails) {
        Optional<Departament> departamentOptional = departamentRepository.findById(id);

        if (departamentOptional.isPresent()) {
            departamentDetails.setName(departamentDetails.getName());
            return departamentRepository.save(departamentDetails);
        } else
            throw new RuntimeException("Departament not found!");
    }

    public List<Departament> deleteDepartamet(Long id, Departament departament) {
        departamentRepository.deleteById(id);
        return getAllDepartaments(departament);
    }
}
