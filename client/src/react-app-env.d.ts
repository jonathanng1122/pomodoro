/// <reference types="react-scripts" />

declare interface Task {
    name: string;
    completed: boolean;
    next?: Array<Task>;
}