import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { ChatPage } from '../pages/chat-page.tsx'
import '../shared/styles/index.scss'
import { useAppSelector } from './store/hooks.ts'
import { store } from './store/index.ts'
import { LoginPage } from '../pages/login-page.tsx'
import { selectWebsocket } from './store/slices/websocket.ts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </React.StrictMode>,
)

function App() {
  const websocketState = useAppSelector(selectWebsocket)

  return (
    <>
      {
        websocketState.websocket === null
          ? <LoginPage />
          : <ChatPage />
      }
    </>
  )
}