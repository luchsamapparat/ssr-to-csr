package org.luchs.marvin.ssrtodo;

import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

public class TaskForm {

    @NotNull
    @Size(min = 1, message = "Please enter a task.")
    private final String description;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @Future(message = "Please pick a future date.")
    private final LocalDate dueDate;

    public TaskForm(String description, LocalDate dueDate) {
        this.description = description;
        this.dueDate = dueDate;
    }

    public String getDescription() {
        return description;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    @Override
    public String toString() {
        return "TaskForm{" +
            "description='" + description + '\'' +
            ", dueDate=" + dueDate +
        '}';
    }
}
