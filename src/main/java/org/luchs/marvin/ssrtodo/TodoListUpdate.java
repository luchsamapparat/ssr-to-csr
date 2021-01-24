package org.luchs.marvin.ssrtodo;

import java.util.List;

public class TodoListUpdate {
    private final List<String> completedTasks;

    public TodoListUpdate(List<String> completedTasks) {
        this.completedTasks = completedTasks;
    }

    public List<String> getCompletedTasks() {
        return completedTasks;
    }
}
