import axios from "axios";
import { databaseUrl, STARTOFDAYOFFSET } from "../../config";
import { getStartOfDay } from "./utilities";
export function getAllIntervals() {
    return new Promise<{ data: { interval: Array<Interval> } }>((resolve, reject) => {
        axios.get(databaseUrl + "/api/intervals/").then(resolve).catch(reject)
    });
}

export function getInterval(id: string) {
    return new Promise<{ data: { interval: Interval } }>((resolve, reject) => {
        axios.get(databaseUrl + "/api/intervals/" + id).then(resolve).catch(reject)
    });
}

export function getIntervalsToday() {
    const d = new Date();
    const date = getStartOfDay(d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getTimezoneOffset(), STARTOFDAYOFFSET)
    return new Promise<{ data: { interval: Array<Interval> } }>((resolve, reject) => {
        axios.get(databaseUrl + "/api/intervals/day/" + date.getTime()).then(resolve).catch(reject)
    });
}


export function createNewInterval(interval: Interval) {
    return new Promise<{ data: { interval: Interval } }>((resolve, reject) => {
        axios.post(databaseUrl + "/api/intervals/new", interval).then(resolve).catch(reject)
    });
}

export function updateInterval(id: string, interval: Interval) {
    return new Promise<{ data: { interval: Interval } }>((resolve, reject) => {
        axios.post(databaseUrl + "/api/intervals/" + id, interval).then(resolve).catch(reject)
    });
}
