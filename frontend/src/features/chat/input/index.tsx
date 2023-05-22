import styles from './styles.module.scss'
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks'
import { selectUsername } from '../../../app/store/slices/user'
import { selectWebsocket } from '../../../app/store/slices/websocket'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { addMessage, selectHistory } from '../../../app/store/slices/history'

export function ChatInput() {
  const dispatch = useAppDispatch()
  const userState = useAppSelector(selectUsername)
  // const historyState = useAppSelector(selectHistory)
  const websocketState = useAppSelector(selectWebsocket)

  return (
    <Formik
      initialValues={{ message: '' }}
      validationSchema={
        Yup.object({
          message: Yup.string()
            .min(1)
            .max(1024)
            .required()
        }
        )}
      onSubmit={async (values, { resetForm }) => {
        websocketState.websocket!.send(values.message)
        dispatch(addMessage({ message: `>: ${userState.username}\n${values.message}` }))
        resetForm()
      }}
    >
      {({
        values,
        handleChange,
        handleSubmit
      }) => (
        <form onSubmit={handleSubmit} className={styles.input}>
          <input 
            type="text" 
            name='message'
            value={values.message} 
            placeholder={`Send a message as ${userState.username}`} 
            onChange={handleChange}
            maxLength={1024}
          />
          <button type="submit" className={styles.send}>Send</button>
        </form>
      )}
    </Formik>
  )
}