import React from 'react'
import { useAppSelector } from '../../../app/store/hooks'
import { selectHistory } from '../../../app/store/slices/history'
import styles from './styles.module.scss'

export function ChatHistory() {
  const history = useAppSelector(selectHistory)
  const historyRef = React.useRef<HTMLDivElement>(null)
  const messagesRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (historyRef.current && messagesRef.current) {
      const lastMessage = messagesRef.current.lastChild as HTMLDivElement | null
      if (lastMessage) {
        const scrollFromBottom = historyRef.current.scrollHeight - historyRef.current.offsetHeight - historyRef.current.scrollTop
        if (scrollFromBottom < lastMessage.offsetHeight+10) {
          historyRef.current?.scrollTo(0, historyRef.current.scrollHeight)
        }
      }
    }
  }, [historyRef.current, messagesRef.current, history.messages])

  return (
    <div className={styles.history} ref={historyRef}>
      <div className={styles.messages} ref={messagesRef}>
        {history.messages.map((message, i) => (
          <div className={styles.message}>
            <span key={i}>{message}</span>
            <span className={styles.divider} />
          </div>
        ))}
      </div>
    </div>
  )
}