module.exports = {
    nextDay: (date) => {
        const end = date; // should be made into a function
        end.setDate(end.getDate()+1);
        return end;
    },
    //calculates the start date, returns a date
    calculateStart: (startOfDay, timezoneOffset) => {
        return new Date();
    },
    /**
     * Gets the next exact date 24 hours after the date inputted
     * @param {Date} date 
     */
    getNextDate: (date) => {
        return new Date(date).getTime() + 24*60*60*1000
    }
}