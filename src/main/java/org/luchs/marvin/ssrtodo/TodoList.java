package org.luchs.marvin.ssrtodo;

import java.util.ArrayList;
import java.util.List;

public class TodoList {

    private List<Task> tasks = new ArrayList<>();

    List<Task> getTasks() {
        return List.copyOf(tasks);
    }

    void addTask(Task task) {
        tasks.add(task);
    }

    void completeTask(String taskId) {
        tasks.removeIf(task -> task.getId().equals(taskId));
    }

}
