import React, { useState } from "react";
import { changeTitle, selectTitle } from './questSlice';
import { useAppSelector, useAppDispatch } from "../../app/hooks";

export function Quest() {
    const title = useAppSelector(selectTitle);
    const dispatch = useAppDispatch();
    return (
        <div>
            <h1>{title}</h1>
            <input type="text" value={title} onChange={e => dispatch(changeTitle(e.currentTarget.value))} />
        </div>
    )
}