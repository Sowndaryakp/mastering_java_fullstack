package com.crud.operations.crud_operations.controller;

import com.crud.operations.crud_operations.entity.MessageResponse;
import com.crud.operations.crud_operations.entity.User;
import com.crud.operations.crud_operations.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/save")
    public User save(@RequestBody User user){
        return userService.saveUser(user);
    }

    @GetMapping("/findAll")
    public List<User> findALl(){
        return userService.findALL();
    }

    @GetMapping("/findById")
    public User findById(@RequestParam int id){
        return userService.findById(id);
    }

    @PutMapping("/update")
    public User update(@RequestBody User user){
        return userService.updateUser(user);
    }

    //simple message written here
//    @DeleteMapping("/deleteById")
//    public ResponseEntity<String> delete(@RequestParam int id){
//        userService.deleteUser(id);
//        return ResponseEntity.ok("User deleted successfully");
//    }

    @DeleteMapping("/deleteById")
    public ResponseEntity<MessageResponse> delete(@RequestParam int id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(new MessageResponse("User deleted successfully"));
    }
}
