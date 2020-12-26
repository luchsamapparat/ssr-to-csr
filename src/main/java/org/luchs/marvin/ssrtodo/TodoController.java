package org.luchs.marvin.ssrtodo;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.validation.Valid;
import java.util.List;

@Controller
public class TodoController {

    TodoList todoList = new TodoList();

    @GetMapping("/")
    public String get(TaskForm taskForm, Model model) {
        return renderTodoList(model);
    }

    @GetMapping("/tasks")
    public String getTasks() {
        return "redirect:/";
    }

    @PostMapping(value = "/tasks", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public String addTask(@Valid TaskForm taskForm, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            return renderTodoList(model);
        }

        todoList.addTask(new Task(taskForm.getDescription(), taskForm.getDueDate()));
        return "redirect:/";
    }

    @GetMapping("/tasks/completed")
    public String getCompletedTasks() {
        return "redirect:/";
    }

    @PostMapping(value = "/tasks/completed", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public String completeTasks(TodoListUpdate todoListUpdate) {
        List<String> taskIds = todoListUpdate.getCompletedTasks();

        if (taskIds != null) {
            taskIds.forEach(taskId -> todoList.completeTask(taskId));
        }

        return "redirect:/";
    }

    private String renderTodoList(Model model) {
        model.addAttribute("tasks", todoList.getTasks());
        return "todoList";
    }


}