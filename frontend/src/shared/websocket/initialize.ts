import { store } from '../../app/store'
import { addMessage, clearMessages } from '../../app/store/slices/history'
import { setWebsocket } from '../../app/store/slices/websocket'

export function initializeWebSocket(username: string): Promise<WebSocket> {
  return new Promise<WebSocket>(resolve => {
    document.cookie = `X-Client-Name=${username}; path=/`
    const socket = new WebSocket(`ws://${window.location.hostname}/api`)

    socket.addEventListener('message', (event) => {
      store.dispatch(addMessage({ message: event.data }))
    })

    socket.addEventListener('open', () => {
      resolve(socket)
    })

    socket.addEventListener('close', () => {
      store.dispatch(setWebsocket({ websocket: null }))
      store.dispatch(clearMessages())
    })
  })
}