package com.tiagorodrigues.gestao_departamento.service;

import com.tiagorodrigues.gestao_departamento.model.entity.User;
import com.tiagorodrigues.gestao_departamento.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isEmpty())
            throw new RuntimeException("User not found");


        return userOptional.get();
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long id, User userDetails) {
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setName(userDetails.getName());
            user.setUserType(userDetails.getUserType());
            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found!");
        }
    }

    public List<User> deleteUser(Long id) {
        userRepository.deleteById(id);
        return getAllUsers();
    }
}
