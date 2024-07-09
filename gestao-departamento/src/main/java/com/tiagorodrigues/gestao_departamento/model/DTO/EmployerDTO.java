package com.tiagorodrigues.gestao_departamento.model.DTO;

import com.tiagorodrigues.gestao_departamento.model.entity.Departament;

import java.util.Date;

public class EmployerDTO {

    private Long id;
    private String name;
    private String mail;
    private String household;
    private Date dateOfBirth;
    private Departament departamentId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getHousehold() {
        return household;
    }

    public void setHousehold(String household) {
        this.household = household;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Departament getDepartamentId() {
        return departamentId;
    }

    public void setDepartamentId(Departament departamentId) {
        this.departamentId = departamentId;
    }
}
