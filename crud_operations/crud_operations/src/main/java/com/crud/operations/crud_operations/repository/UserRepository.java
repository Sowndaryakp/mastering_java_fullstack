package com.crud.operations.crud_operations.repository;

import com.crud.operations.crud_operations.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
