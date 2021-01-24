package org.luchs.marvin.ssrtodo;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.zalando.problem.StatusType;
import org.zalando.problem.spring.web.advice.ProblemHandling;

import static org.zalando.problem.Status.UNPROCESSABLE_ENTITY;

@ControllerAdvice
class ExceptionHandling implements ProblemHandling {
    @Override
    public StatusType defaultConstraintViolationStatus() {
        return UNPROCESSABLE_ENTITY;
    }
}
