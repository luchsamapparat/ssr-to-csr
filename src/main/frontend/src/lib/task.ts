export interface Task {
    id: string;
    description: string;
    dueDate: string | null;
    completedDate: string | null;
}

export interface NewTask {
    description: Task['description'];
    dueDate: Task['dueDate'];
}