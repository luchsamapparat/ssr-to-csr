// @ts-check

import { AddTaskFormView } from './add-task-form-view.js';
import { Backbone } from './backbone.js';
import { submitForm } from './utils.js';

export const TasksView = Backbone.View.extend({
    events: {
        'change .task-list .completed-task': 'onCheckboxChange'
    },

    /**
     * @type Task[] | null
     */
    tasks: null,

    initialize() {
        this.addTaskFormView = new AddTaskFormView({
            el: '.add-task-form'
        });
        this.listenTo(this.addTaskFormView, 'taskListUpdate', this.updateTaskList.bind(this))
        this.addTaskFormView.render();
    },

    render() {
        if (!Array.isArray(this.tasks)) {
            return;
        }

        if (this.tasks.length === 0) {
            this.renderEmptyTaskList();
        } else {
            this.renderTaskList();
        }
    },

    renderTaskList() {
        this.el.querySelector('.empty-task-list')?.remove();

        let taskList = this.el.querySelector('.task-list');

        if (taskList === null) {
            this.el.prepend(getTemplate('task-list'));
            taskList = this.el.querySelector('.task-list');
        }

        const taskListItemElements = this.tasks
            .map(task => this.createTaskListItem(task));

        taskList.querySelector('ul')
            .replaceChildren(...taskListItemElements);
    },

    createTaskListItem(task) {
        const taskListItemElement = getTemplate('task');
        const checkboxId = `completedTasks-${task.id}`;
        
        const checkbox = taskListItemElement.querySelector('input[type="checkbox"]');
        checkbox.id = checkboxId;
        checkbox.value = task.id;
        
        const label = taskListItemElement.querySelector('label');
        label.htmlFor = checkboxId;

        const description = label.querySelector('span:first-child');
        description.innerText = task.description;

        const dueDate = label.querySelector('span:last-child');
        if (task.dueDate === null) {
            dueDate.remove();
        } else {
            dueDate.innerText = formatDate(task.dueDate);
        }

        return taskListItemElement;
    },

    renderEmptyTaskList() {
        this.el.querySelector('.task-list')?.remove();

        if (this.el.querySelector('.empty-task-list') !== null) {
            return;
        }

        this.el.prepend(getTemplate('empty-task-list'));
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
     * @param {Task[]} updatedTaskList 
     */
    updateTaskList(updatedTaskList) {
        this.tasks = updatedTaskList;
        this.render();
    },

    /**
     * @param {HTMLFormElement} form 
     */
    async markAsCompleted(form) {
        const updatedTaskList = await submitForm(form);
        this.updateTaskList(updatedTaskList);
    }
});

/**
 * @param {string} date 
 */
const formatDate = date => new Intl.DateTimeFormat(
    undefined,
    { year: 'numeric', month: '2-digit', day: '2-digit' }
)
    .format(new Date(date));

/**
 * @typedef Task
 * @type {object}
 * @property {string} id
 * @property {string} description
 * @property {string} dueDate
 */
