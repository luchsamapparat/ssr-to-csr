package org.luchs.marvin.ssrtodo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@Controller
@RequestMapping("/api")
public class TodoApiController {

    @Autowired
    private TodoListService todoListService;

    @GetMapping(value = "/tasks", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getTasksJson() {
        return ResponseEntity.ok(todoListService.getTasks());
    }

    @PostMapping(value = "/tasks", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity addTaskJson(@Valid @RequestBody AddTaskForm taskForm) {
        todoListService.addTask(taskForm.getDescription(), taskForm.getDueDate());
        return ResponseEntity
            .created(URI.create("/api/tasks"))
            .build();
    }

    @PostMapping(value = "/tasks/completed", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity completeTasksJson(@RequestBody CompletedTasksForm completedTasksForm) {
        todoListService.completeTasks(completedTasksForm.getCompletedTasks());
        return ResponseEntity
            .status(HttpStatus.SEE_OTHER)
            .location(URI.create("/api/tasks"))
            .build();
    }

}