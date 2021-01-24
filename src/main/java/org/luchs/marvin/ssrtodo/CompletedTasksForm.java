package org.luchs.marvin.ssrtodo;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class CompletedTasksForm {
    private final List<String> completedTasks;

    @JsonCreator
    public CompletedTasksForm(
        @JsonProperty("completedTasks") List<String> completedTasks
    ) {
        this.completedTasks = completedTasks;
    }

    public List<String> getCompletedTasks() {
        return completedTasks;
    }
}
