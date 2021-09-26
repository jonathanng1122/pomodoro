export const getStartOfDay = (year, month, date, timezoneOffset, startOfDayOffset) => {
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