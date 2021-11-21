# Pomodoro

Pomodoro is a time studying tool. This has some cool advance features integrated into it like live updates across multiple devices.

 - realtime (syncs across multiple devices)
 - live updates
 - user authentication
 - mobile friendly
 - PWA


# Technologies
Using React, Redux, Typescript, Node, Express, MongoDB and Pusher.


# Setting up this project
## Installing dependencies
 1. `npm install`
 2. `cd client && yarn install && cd ../`
## Starting the project
 3. `npm start`
 4. `cd client && yarn start`

Note: If you need to change the pusher credentials, change 2 spots: './client/.env' and './config.js' (in fact you need these config files to run this app)

## for config.js
```
    pusherCredentials: {
        appId: "asdf",
        key: "asdf",
        secret: "asdf",
        cluster: "asdf",
        useTLS: true
    }

```

## for .env
PUSHER_KEY=pusherkeyhere


# Random Notes

set pomodoro timer, save it in the user model and other settings
pusher with other users
auth
deploy
^====MVP====^
charts and data
