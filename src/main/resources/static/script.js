// @ts-check

document.querySelectorAll('.completed-tasks')
    .forEach(form => {
        form.querySelectorAll('.completed-task')
            .forEach(checkbox => checkbox.addEventListener('change', onCompletedTaskCheckboxChange));

        form.querySelector('.mark-as-completed')
            .remove();
    });

document.querySelectorAll('.add-task')
    .forEach(form => {
        form.classList.remove('was-validated');
        form.addEventListener('change', onAddTaskFormChange);

        customizeValidationErrorMessage(
            form.querySelector('.description'),
            'Please enter a task.'
        );
        customizeValidationErrorMessage(
            form.querySelector('.due-date'),
            'Please pick a future date.'
        );
    });

/**
 * 
 * @param {HTMLInputElement} input 
 * @param {string} errorMessage 
 */
function customizeValidationErrorMessage(input, errorMessage) {
    input.addEventListener('input', () => input.setCustomValidity(''));
    input.addEventListener('invalid', () => input.setCustomValidity(errorMessage));
}

/**
 * 
 * @param {Event} event 
 */
function onCompletedTaskCheckboxChange(event) {
    const checkbox = /** @type {HTMLInputElement} */ (event.currentTarget);

    if (checkbox.checked) {
        checkbox.form.submit();
    }
}

/**
 * 
 * @param {Event} event 
 */
function onAddTaskFormChange(event) {
    const form = /** @type {HTMLFormElement} */ (event.currentTarget);

    form.classList.add('was-validated');
}