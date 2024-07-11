package com.tiagorodrigues.gestao_departamento.controller;

import com.tiagorodrigues.gestao_departamento.model.entity.User;
import com.tiagorodrigues.gestao_departamento.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    @PutMapping("{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") Long id, @RequestBody User userDetails) {
        try {
            User updateBook = userService.updateUser(id, userDetails);
            return ResponseEntity.ok(updateBook);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<List<User>> deleteUser(@PathVariable("id") Long id) {
        return ResponseEntity.ok(userService.deleteUser(id));
    }
}
