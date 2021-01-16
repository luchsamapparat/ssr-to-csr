// @ts-check

import { Backbone } from './backbone.js';
import { customizeValidationErrorMessage, submitForm } from './utils.js';

export const AddTaskFormView = Backbone.View.extend({
    events: {
        'submit': 'onSubmit'
    },

    initialize() {
        this.el.classList.remove('was-validated');

        customizeValidationErrorMessage(
            this.el.querySelector('.description'),
            'Please enter a task.'
        );
        customizeValidationErrorMessage(
            this.el.querySelector('.due-date'),
            'Please pick a future date.'
        );
    },

    /**
     * @param {Event} event 
     */
    async onSubmit(event) {
        event.preventDefault();
        const form = /** @type {HTMLFormElement} */ (event.currentTarget);
        await this.addTask(form);
        form.reset();
    },
    
    /**
     * @param {HTMLFormElement} form 
     */
    async addTask(form) {
        const updatedDocument = await submitForm(form);
        this.trigger('taskListUpdate', updatedDocument);
    }
});