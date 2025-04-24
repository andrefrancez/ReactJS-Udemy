import { Employee } from "./Employee";

export type Task = {
    id: number;
    title: string;
    description: string;
    due_date: string;
    created_at: string;
    status: string;
}

export type TaskDetail = Task & {
    employee: Employee;
}

export type ApiGetTasks = {
    tasks: TaskDetail[];
}

export type ApiGetTask = {
    task: TaskDetail;
}