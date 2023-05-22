# Simple anonymous chat in Tor (onion hidden service)

## Tech stack

Backend:
- Fastify
- @fastify/websocket built upon ws@8

Frontend:
- Vite (React)
- FSD architecture

Fastify runs webserver on port 3000 sharing websocket server at /

## Capabilities

- Works as public chat for anyone
- All users must have unique usernames in context of active websocket connections
- Broadcasts join/leave messages

## API

To join the chat, connect to backend using ws protocol. You must specify your username in cookie `X-Client-Name`, like so: ``document.cookie = `X-Client-Name=${username}; path=/``

Username requrements: 1-64 characters, only a-z, A-Z and 0-9 characters are allowed.


When user joins to chat, server broadcasts to all joined users (including you) this message:
```
>+ {username}
```
For example, 
```
>+ vityaschel
```

The same is done when user leaves (connection terminated):

```
>- {username}
```

When user sends a message, server broadcasts it to everyone (excluding author) using this format:

```
>: {username}
{message}
```

For example, `> vityaschel\nfoo\nbar`

## Install

1. Clone repo
2. Run this webserver on any port as reverse-proxy
3. Run any webserver on 80 port for Tor proxy, for example Nginx; configure it so it matches specified hostname to reverse-proxy made in step 2
4. Configure Tor using .torrc to share hidden service with network using specified hostname
5. Configure .env file

You can generate hostname addresses with [mkp224o](https://github.com/cathugger/mkp224o). 

## .env file

You can adjust settings of this server using .env file. Just edit it and restart program.

| Key                  | Description                                                                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PORT                 | Port number to run backend on                                                                                                                           |
| IP_ADDRESS           | Set binded IP address manually or leave to `auto`, you can use `localhost` too                                                                          |
| BLACKLISTED_WORDS    | Blacklisted words separated by comma. You mustn't use spaces in this env var, because it won't work. Example: `cp,porn,telegram`                        |
| BLACKLISTED_CONTENTS | Blacklisted contents separated by comma. You can use spaces, but be aware that it checks inside all text, not words. Example: `children porn,free porn` |
|                      |                                                                                                                                                         |