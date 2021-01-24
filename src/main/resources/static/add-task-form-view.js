// @ts-check

import { Backbone } from './backbone.js';
import { customizeValidationErrorMessage, submitForm } from './utils.js';

export const AddTaskFormView = Backbone.View.extend({
    events: {
        'submit': 'onSubmit',
        'change': 'onAddTaskFormChange'
    },

    initialize() {
        this.form = this.el;

        this.resetForm();

        customizeValidationErrorMessage(
            this.form.querySelector('.description'),
            'Please enter a task.'
        );
        customizeValidationErrorMessage(
            this.form.querySelector('.due-date'),
            'Please pick a future date.'
        );
    },

    resetForm() {
        this.form.reset();
        this.clearValidationErrors();
    },

    /**
     * @param {Event} event 
     */
    async onSubmit(event) {
        event.preventDefault();
        await this.addTask();
    },

    onAddTaskFormChange() {
        this.form.classList.add('was-validated');
    },

    async addTask() {
        try {
            const updatedDocument = await submitForm(this.form);
            this.trigger('taskListUpdate', updatedDocument);
            this.resetForm();
        } catch (errorDocument) {
            if (errorDocument instanceof HTMLDocument) {
                this.handleValidationErrors(errorDocument);
            }
        }
    },

    clearValidationErrors() {
        this.form.classList.remove('was-validated');
        this.form.querySelectorAll('.is-invalid, .is-valid').forEach(
            element => element.classList.remove('is-invalid', 'is-valid')
        );
        this.form.querySelectorAll('.invalid-feedback').forEach(
            element => element.remove()
        );
    },

    /**
     * @param {HTMLDocument} errorDocument 
     */
    handleValidationErrors(errorDocument) {
        this.clearValidationErrors();
        errorDocument.querySelectorAll('.invalid-feedback').forEach(
            errorMessageElement => {
                const formControlId = errorMessageElement.previousElementSibling.id;
                /** @type {HTMLElement} */
                const formControl = this.form.querySelector(`#${formControlId}`);
                formControl.classList.add('is-invalid');
                formControl.parentElement.insertBefore(
                    errorMessageElement,
                    formControl.nextSibling
                );
            }
        )
    }
});