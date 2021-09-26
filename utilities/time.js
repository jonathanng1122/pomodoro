const {startOfDayOffset, timezoneOffset} = require('../config');


const nextDay = (date) => {
        const end = date; // should be made into a function
        end.setDate(end.getDate()+1);
        return end;
}
//calculates the start date, returns a date
const calculateStart = (startOfDay, timezoneOffset) => {
        return new Date();
}
/**
 * Gets the next exact date 24 hours after the date inputted
 * @param {Date} date 
 */
const getNextDate = (date) => {
        return new Date(date).getTime() + 24*60*60*1000
}
/**
 * Gets the previous exact date 24 hours after the date inputted
 * @param {Date} date 
 * @returns {number} milliseconds
 */
const getPreviousDate = (date) => {
        return new Date(date).getTime() - 24*60*60*1000
}

const getStartOfDay = (year, month, date, timezoneOffset, startOfDayOffset) => {
    if (typeof year != "number" || typeof date != "number" || typeof month != "number" || typeof timezoneOffset != "number" || typeof startOfDayOffset != "number") {
        return new Date()
    } else {
        
        let sign = "-"
        if (timezoneOffset < 0) {
            timezoneOffset *= -1
            sign = "+"
        }
        return new Date(year + "-" + formatZeros(month) + "-" + formatZeros(date) + "T" + minutesToTimeString(startOfDayOffset) + sign + minutesToTimeString(timezoneOffset))
    }
}
const formatZeros = (num) => {
    if (num < 10) {
        return num = "0" + Math.floor(num)
    } else {
        return "" + num
    }
}
const minutesToTimeString = (minutes) => {
    const remainingMinutes = minutes % 60
    const hours = (minutes - remainingMinutes) / 60
    return formatZeros(hours) + ":" + formatZeros(remainingMinutes)
}

//get Date
//add timezoneoffset to Date
//save month, day, year
// create new string with month day year at midnight zulu
// add timezoneoffset to Date

module.exports = {
    nextDay,
    calculateStart,
    getNextDate,
    getPreviousDate,
    getStartOfDay
}