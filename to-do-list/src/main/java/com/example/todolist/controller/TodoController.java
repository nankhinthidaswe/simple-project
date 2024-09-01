package com.example.todolist.controller;

import com.example.todolist.entity.Todo;
import com.example.todolist.repo.TodoRepo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping({"/todos"})
public class TodoController {
    public final TodoRepo todoRepo;

    public TodoController(TodoRepo todoRepo) {
        this.todoRepo = todoRepo;
    }
    @GetMapping
    public String listTodos(Model model) {
        model.addAttribute("pendingTodos", todoRepo.findByCompletedFalseOrderByDateDesc());
        model.addAttribute("completedTodos", todoRepo.findByCompletedTrueOrderByDateDesc());
        return "todos/list";
    }
    @GetMapping("/new")
    public String newTodoForm(Model model) {
        model.addAttribute("todo", new Todo());
        return "todos/new";
    }
    @PostMapping
    public String addTodo(@ModelAttribute Todo todo) {
        if (todo.getDate() != null && todo.getDescription() != null && !todo.getDescription().isEmpty()) {
            todo.setCompleted(false);
            todoRepo.save(todo);
        }
        return "redirect:/todos";
    }
    @PostMapping("/{id}/complete")
    public String completeTodo(@PathVariable Long id) {
        Todo todo = todoRepo.findById(id).orElseThrow();
        todo.setCompleted(true);
        todoRepo.save(todo);
        return "redirect:/todos";
    }
    @PostMapping("/{id}/delete")
    public String deleteTodo(@PathVariable Long id) {
        Todo todo = todoRepo.findById(id).orElseThrow();
        if (todo.isCompleted()) {
            todoRepo.delete(todo);
        }
        return "redirect:/todos";
    }

}
