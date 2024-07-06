package com.tiagorodrigues.gestao_departamento.model.entity;

import jakarta.persistence.*;

@Entity
@Table(name = User.TABLE_NAME)
public class User {

    public final static String TABLE_NAME = "users";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @Column(name = "nome", length = 40, nullable = false)
    private String nome;

    @Column(name = "password", length = 40, nullable = false)
    private String password;

    @Column(name = "tipo", length = 1, nullable = false)
    private String tipo;
    ;
}
