import { AddTaskFormView } from './add-task-form-view.js';
import { Backbone } from './backbone.js';
import { submitForm } from './utils.js';

export const TasksView = Backbone.View.extend({
    events: {
        'change .task-list .completed-task': 'onCheckboxChange'
    },

    initialize() {
        this.addTaskFormView = new AddTaskFormView({
            el: '.add-task-form'
        });
        this.listenTo(this.addTaskFormView, 'taskListUpdate', this.updateTaskList.bind(this))
        this.addTaskFormView.render();
    },

    /**
     * @param {Event} event 
     */
    async onCheckboxChange(event) {
        const checkbox = /** @type {HTMLInputElement} */ (event.target);
        
        if (checkbox.checked) {
            await this.markAsCompleted(checkbox.form);
        }
    },

    /**
     * @param {HTMLDocument} updatedDocument 
     */
    updateTaskList(updatedDocument) {
        const taskListSelector = '.empty-task-list, .task-list';
        const updatedTaskList =  updatedDocument.querySelector(taskListSelector);
        this.el.querySelector(taskListSelector).replaceWith(updatedTaskList);
    },

    /**
     * @param {HTMLFormElement} form 
     */
    async markAsCompleted(form) {
        const updatedDocument = await submitForm(form);
        this.updateTaskList(updatedDocument);
    }
});