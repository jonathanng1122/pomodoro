/// <reference types="react-scripts" />

declare interface Task {
    name: string;
    completed: boolean;
}

//these numbers respresent time
declare interface Interval {
    start: number;
    end?: number;
}