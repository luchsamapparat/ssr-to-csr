package org.luchs.marvin.ssrtodo;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class TodoList {

    private Map<String, Task> tasks = new HashMap();

    List<Task> getTasks() {
        return tasks.values()
            .stream()
            .filter(task -> !task.isCompleted())
            .sorted(Comparator.comparing(Task::getDescription))
            .collect(Collectors.toList());
    }

    List<Task> getCompletedTasks() {
        return tasks.values()
            .stream()
            .filter(task -> task.isCompleted())
            .sorted(Comparator.comparing(Task::getDescription))
            .collect(Collectors.toList());
    }

    void addTask(Task task) {
        tasks.put(task.getId(), task);
    }

    void completeTask(String taskId) {
        tasks.get(taskId).markAsCompleted();
    }

}
