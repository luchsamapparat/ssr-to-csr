// @ts-check

import { Backbone } from './backbone.js';
import { getTemplate } from './template.js';
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
            const updatedTaskList = await submitForm(this.form);
            this.trigger('taskListUpdate', updatedTaskList);
            this.resetForm();
        } catch (error) {
            if (error.status === 422) {
                this.handleValidationError(error.violations);
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
     * @param {Violation[]} violations 
     */
    handleValidationError(violations) {
        this.clearValidationErrors();
        violations.forEach(
            ({ field, message }) => {
                const formControl = /** @type {HTMLElement} */ (this.form.querySelector(`#addTask-${field}`));
                formControl.classList.add('is-invalid');

                const errorMessageElement = getTemplate('error-message');
                errorMessageElement.querySelector('div').innerText = message;

                formControl.parentElement.insertBefore(
                    errorMessageElement,
                    formControl.nextSibling
                );
            }
        )
    }
});

/**
 * @typedef Problem
 * @type {object}
 * @property {string} type
 * @property {number} status
 * @property {string} title
 * @property {Violation[]} violations
 */

/**
 * @typedef Violation
 * @type {object}
 * @property {string} field
 * @property {string} message
 */