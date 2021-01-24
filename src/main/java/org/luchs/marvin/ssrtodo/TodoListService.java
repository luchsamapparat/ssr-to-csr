package org.luchs.marvin.ssrtodo;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TodoListService {

    private TodoList todoList = new TodoList();

    List<Task> getTasks() {
        return todoList.getTasks();
    }

    void addTask(String description, LocalDate dueDate) {
        todoList.addTask(new Task(description, dueDate));
    }

    void completeTask(String taskId) {
        todoList.completeTask(taskId);
    }

}
