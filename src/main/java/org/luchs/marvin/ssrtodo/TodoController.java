package org.luchs.marvin.ssrtodo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;
import java.util.List;
import java.util.Locale;

@Controller
public class TodoController {

    @Autowired
    private TodoListService todoListService;

    @GetMapping("/")
    public ModelAndView get(AddTaskForm addTaskForm, Locale locale) {
        return renderTodoList(locale);
    }

    @GetMapping("/tasks")
    public ModelAndView getTasks() {
        return redirectToTasks();
    }

    @PostMapping(value = "/tasks", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ModelAndView processTaskForm(@Valid AddTaskForm addTaskForm, BindingResult bindingResult, Locale locale) {
        if (bindingResult.hasErrors()) {
            ModelAndView model = new ModelAndView();
            model.setStatus(HttpStatus.UNPROCESSABLE_ENTITY);
            return renderTodoList(model, locale);
        }

        todoListService.addTask(addTaskForm.getDescription(), addTaskForm.getDueDate());
        return redirectToTasks();
    }

    @GetMapping("/tasks/completed")
    public ModelAndView getCompletedTasks(ModelAndView model, Locale locale) {
        model.setViewName("completedTasks");
        model.addObject("currentPage", "completedTasks");
        model.addObject("completedTasks", todoListService.getCompletedTasks());
        return render(model, locale);
    }

    @PostMapping(value = "/tasks/completed", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ModelAndView processCompleteTasksForm(@RequestParam("completedTasks[]") List<String> taskIds) {
        todoListService.completeTasks(taskIds);
        return redirectToTasks();
    }

    private ModelAndView redirectToTasks() {
        return new ModelAndView("redirect:/");
    }

    private ModelAndView renderTodoList(Locale locale) {
        return renderTodoList(new ModelAndView(), locale);
    }

    private ModelAndView renderTodoList(ModelAndView model, Locale locale) {
        model.setViewName("todoList");
        model.addObject("currentPage", "tasks");
        model.addObject("tasks", todoListService.getTasks());
        return render(model, locale);
    }

    private ModelAndView render(ModelAndView model, Locale locale) {
        model.addObject("DateUtils", DateUtils.class);
        model.addObject("locale", locale);
        return model;
    }

}