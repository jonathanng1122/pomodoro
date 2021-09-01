# Remain

Sounds like a game, this is a prodo app that measures the time you have left.

Trying out yarn in the client react folder

ideas
make a task structured like a tree
continue building quest idea
story tree game


model brainstrom...

Interval 
{
     title: string
     comment: string
     start: string (Time)
     end: string (Time)
}

Day
{
    total: string
    start: Time
    end: Time //This may seem redundant but it handles the case where you switch timezones
    intervals: [Interval, ...]
}

Pomodoro
{
    currentDay: Day
    startOfDay: Time
    timeZone: TimeZone
    days: [Day, ... ]
}
//startOfDay and timeZone are used to calculate the start day

{
    Day1: {

    }
}


User
{
    email: string
    pomodoro: Pomodoro.id
}