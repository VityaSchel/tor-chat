import styles from './styles.module.scss'

export function ChatPageWrapper({ children }: {
  children: React.ReactNode
}) {
  return (
    <main className={styles.main}>
      {children}
    </main>
  )
}