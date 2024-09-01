package com.example.todolist.repo;

import com.example.todolist.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepo extends JpaRepository<Todo, Long> {

    List<Todo> findByCompletedFalseOrderByDateDesc();
    List<Todo> findByCompletedTrueOrderByDateDesc();


}
