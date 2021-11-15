package org.luchs.marvin.ssrtodo;

import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

public class AddTaskForm {

    @NotNull
    @Size(min = 1, message = "Please enter a task.")
    private final String description;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @Future(message = "Please pick a future date.")
    private final LocalDate dueDate;

    public AddTaskForm(String description, LocalDate dueDate) {
        this.description = description;
        this.dueDate = dueDate;
    }

    public String getDescription() {
        return description;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

}
