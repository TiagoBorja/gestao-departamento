package com.tiagorodrigues.gestao_departamento.service;

import com.tiagorodrigues.gestao_departamento.model.entity.User;
import com.tiagorodrigues.gestao_departamento.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
