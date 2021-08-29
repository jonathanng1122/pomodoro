import React from "react";
import {
    selectTitle,
    selectTasks,
    changeTask,

} from './questSlice';
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { AppDispatch } from "../../app/store";

export function Quest() {
    const title = useAppSelector(selectTitle);
    const tasks = useAppSelector(selectTasks);
    const dispatch = useAppDispatch();

    return (
        <div>
            <h1>{title}</h1>
            {
                (() => {
                    let tasksJSX = [];
                    for (let i = 0; i < tasks.length; i++) {
                        tasksJSX.push(
                            <div key={i}>
                                <label htmlFor="completed">{tasks[i].name}</label>
                                <input type="checkbox" name="completed" checked={tasks[i].completed} onChange={() => {
                                    let task = {
                                        name: tasks[i].name,
                                        completed: !tasks[i].completed
                                    }
                                    dispatch(changeTask({ num: i, task }))
                                }} />
                            </div>
                        )
                    }
                    return tasksJSX
                })()
            }
        </div>
    )
}
