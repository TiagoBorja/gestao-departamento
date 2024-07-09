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
}
