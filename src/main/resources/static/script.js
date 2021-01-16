// @ts-check

import { TasksView } from './task-list-view.js';

const tasksView = new TasksView({
    el: document.body
});
tasksView.render();

document.documentElement.classList.remove('no-js');