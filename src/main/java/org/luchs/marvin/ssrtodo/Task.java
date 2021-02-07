package org.luchs.marvin.ssrtodo;

import java.time.LocalDate;
import java.util.UUID;

public class Task {

    private final String id;
    private final String description;
    private final LocalDate dueDate;
    private boolean completed = false;

    public Task(String description, LocalDate dueDate) {
        this.id = UUID.randomUUID().toString();
        this.description = description;
        this.dueDate = dueDate;
    }

    public String getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void markAsCompleted() {
        this.completed = true;
    }
}
