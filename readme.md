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
    intervals: [Interval, ...]
}

Week
{
    total: string
    days: [Day, ...]
}
Year
{
    total: string,
    weeks: [Week, ...]
}

Pomodoro
{
    intervals: [Intervals ids]
}

User
{
    email: string
    pomodoro: 
}