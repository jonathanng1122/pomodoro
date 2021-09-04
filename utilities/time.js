module.exports = {
    nextDay: (date) => {
        const end = date; // should be made into a function
        end.setDate(end.getDate()+1);
        return end;
    },
    //calculates the start date, returns a date
    calculateStart: (startOfDay, timezoneOffset) => {
        return new Date();
    }
}