package com.tiagorodrigues.gestao_departamento.model.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = Employer.TABLE_NAME)
public class Employer {

    public static final String TABLE_NAME = "employers";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @Column(name = "name", length = 140, nullable = false)
    private String name;

    @Column(name = "mail", length = 100, nullable = false, unique = true)
    private String mail;

    @Column(name = "household", nullable = false, columnDefinition = "TEXT")
    private String household;

    @Temporal(TemporalType.DATE)
    @Column(name = "date_of_birth", nullable = false)
    private Date dateOfBirth;

    @ManyToOne
    @JoinColumn(name = "id_departament", nullable = false)
    private Departament department;

    // Getters and Setters

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

    public Departament getDepartment() {
        return department;
    }

    public void setDepartment(Departament department) {
        this.department = department;
    }
}
