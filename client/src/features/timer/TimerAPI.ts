import axios from "axios";
import { databaseUrl } from "../../config";

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
