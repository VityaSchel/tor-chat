import styles from './styles.module.scss'
import _ from 'lodash'
import { ChatInput } from '../../../features/chat/input'
import { ChatHistory } from '../../../features/chat/history'

export function Chat() {
  return (
    <div className={styles.chat}>
      <h1>Anonymous chat</h1>
      <h2>by <span className={
        _.sample([
          styles.bg1,
          styles.bg2,
          styles.bg3,
          styles.bg4,
          styles.bg5,
        ])
      }>hloth</span></h2>
      <ChatHistory />
      <ChatInput />
    </div>
  )
}