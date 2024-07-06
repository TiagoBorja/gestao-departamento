package com.tiagorodrigues.gestao_departamento.model.entity;

import jakarta.persistence.*;

@Entity
@Table(name = Departament.TABLE_NAME)
public class Departament {

    public static final String TABLE_NAME = "departaments";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;
}
