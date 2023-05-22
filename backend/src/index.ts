import './env.js'
import fastify from 'fastify'
import fastifyWebsocket from '@fastify/websocket'
import fastifyCookie from '@fastify/cookie'
import { getIP } from './utils.js'

const blacklistedWords = process.env.BLACKLISTED_WORDS?.split(',') ?? []
const blacklistedContents = process.env.BLACKLISTED_CONTENTS?.split(',') ?? []

const app = fastify({ logger: true })
app.register(fastifyWebsocket, { options: { maxPayload: 1024*9 } })
app.register(fastifyCookie)

const userNames = {}
app.register(async function (fastify) {
  fastify.get('/', { websocket: true }, (connection /* SocketStream */, req /* FastifyRequest */) => {
    const userName = req.cookies['X-Client-Name']
    if(typeof userName !== 'string' || userName.length > 64 || !/^[a-zA-Z0-9]+$/.test(userName)) {
      connection.socket.close(1000)
      return
    } else {
      if(userNames[userName]) {
        connection.socket.close(1000)
        return
      } else {
        userNames[userName] = true
        fastify.websocketServer.clients.forEach(function each(client) {
          if (client.readyState === 1) {
            client.send(`>+ ${userName}`)
          }
        })
      }
    }

    connection.socket.isAlive = true
    connection.socket.on('pong', () => { connection.socket.isAlive = true })
    const interval = setInterval(() => {
      if (!connection.socket.isAlive) {
        clearInterval(interval)
        connection.socket.terminate()
      }

      connection.socket.isAlive = false
      connection.socket.ping()
    }, 30000)

    connection.socket.on('message', (message, isBinary) => {
      const messageString = message.toString('utf-8')
      if(!isBinary && messageString.length > 0 && messageString.length <= 1024) {
        const messageWords = messageString.split(' ')
        if(
          !blacklistedWords.some(word => messageWords.includes(word)) &&
          !blacklistedContents.some(content => messageString.includes(content))
        ) {
          fastify.websocketServer.clients.forEach(function each(client) {
            if (client !== connection.socket && client.readyState === 1) {
              client.send(`>: ${userName}\n${messageString}`)
            }
          })
        }
      }
    })
    connection.socket.on('close', () => {
      userNames[userName] = false
      clearInterval(interval)
      fastify.websocketServer.clients.forEach(function each(client) {
        if (client !== connection.socket && client.readyState === 1) {
          client.send(`>- ${userName}`)
        }
      })
    })
  })
})

const port = Number(process.env.PORT ?? 3000)
const ip = process.env.IP_ADDRESS === 'auto' ? getIP() : (process.env.IP_ADDRESS ?? getIP())
app.listen({ port: port, host: ip }, err => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log('Running on', ip, 'port', port)
  }
})
