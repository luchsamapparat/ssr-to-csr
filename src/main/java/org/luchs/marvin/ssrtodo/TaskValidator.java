package org.luchs.marvin.ssrtodo;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

public class TaskValidator {
    public static Map<String, String> validate(Task task) {
        Map<String, String> errors = new HashMap<>();

        if (task.getDescription() == null || task.getDescription().isBlank()) {
            errors.put("description", "Describe what needs to be done.");
        }

        if (task.getDueDate() != null && task.getDueDate().isBefore(LocalDate.now())) {
            errors.put("description", "Describe what needs to be done.");
        }

        return errors;
    }
}
