/// <reference types="react-scripts" />

declare interface Task {
    name: string;
    completed: boolean;
}

//these numbers respresent time
declare interface Interval {
    _id?: string;
    userId?: string;
    start: number;
    end?: number;
}