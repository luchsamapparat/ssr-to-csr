// @ts-check

import { TasksView } from './tasks-view.js';

const tasksView = new TasksView({
    el: document.querySelector('main')
});
tasksView.render();

document.documentElement.classList.remove('no-js');