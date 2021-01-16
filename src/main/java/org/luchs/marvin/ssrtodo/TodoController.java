package org.luchs.marvin.ssrtodo;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;
import java.util.List;

@Controller
public class TodoController {

    TodoList todoList = new TodoList();

    @GetMapping("/")
    public ModelAndView get(TaskForm taskForm) {
        return renderTodoList();
    }

    @GetMapping("/tasks")
    public ModelAndView getTasks() {
        return redirectToTasks();
    }

    @PostMapping(value = "/tasks", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ModelAndView addTask(@Valid TaskForm taskForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            ModelAndView model = new ModelAndView();
            model.setStatus(HttpStatus.UNPROCESSABLE_ENTITY);
            return renderTodoList(model);
        }

        todoList.addTask(new Task(taskForm.getDescription(), taskForm.getDueDate()));
        return redirectToTasks();
    }

    @GetMapping("/tasks/completed")
    public ModelAndView getCompletedTasks() {
        return redirectToTasks();
    }

    @PostMapping(value = "/tasks/completed", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ModelAndView completeTasks(TodoListUpdate todoListUpdate) {
        List<String> taskIds = todoListUpdate.getCompletedTasks();

        if (taskIds != null) {
            taskIds.forEach(taskId -> todoList.completeTask(taskId));
        }

        return redirectToTasks();
    }

    private ModelAndView redirectToTasks() {
        return new ModelAndView("redirect:/");
    }

    private ModelAndView renderTodoList() {
        return renderTodoList(new ModelAndView());
    }

    private ModelAndView renderTodoList(ModelAndView model) {
        model.setViewName("todoList");
        model.addObject("tasks", todoList.getTasks());
        return model;
    }


}