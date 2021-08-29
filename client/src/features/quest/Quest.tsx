import React, { useState } from "react";
import { changeTitle, selectTitle, selectTask, selectTasks } from './questSlice';
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { JsonObjectExpression } from "typescript";
import styles from './Quest.module.css'
export function Quest() {
    const title = useAppSelector(selectTitle);
    const tasks = useAppSelector(selectTasks);
    const dispatch = useAppDispatch();

    return (
        <div>
            <h1>{title}</h1>
            {/* <input type="text" value={title} onChange={e => dispatch(changeTitle(e.currentTarget.value))} />

            <form onSubmit={e => { e.preventDefault(); dispatch(changeTitle("Done!")); }}>
                <input type="submit" />
            </form> */}
            {tasksToJSX(tasks)}
        </div>
    )
}

//recursively displays the tasks
function tasksToJSX(tasks: Array<Task>): Array<JSX.Element> {
    const tasksJSX = new Array();
    for (let i = 0; i < tasks.length; i++) {
        let current = tasks[i];
        let sub = null;
        if (current.next && current.next.length !== 0) {
            sub = tasksToJSX(current.next);
        }
        tasksJSX.push(<div key={i} className={styles.container}>
            <p>- {current.name}</p>
            <div>{sub}</div>

        </div>);
    }
    return tasksJSX;
}