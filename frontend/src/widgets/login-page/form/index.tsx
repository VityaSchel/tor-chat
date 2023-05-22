import styles from './styles.module.scss'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch } from '../../../app/store/hooks'
import { setUsername } from '../../../app/store/slices/user'
import { setWebsocket } from '../../../app/store/slices/websocket'
import { initializeWebSocket } from '../../../shared/websocket/initialize'

export function LoginPageForm() {
  const dispatch = useAppDispatch()

  return (
    <Formik
      initialValues={{ nickname: '' }}
      validationSchema={
        Yup.object({
          nickname: Yup.string()
            .min(1, 'Fill this field')
            .max(64, 'Maximum 64 chars')
            .matches(/^[a-zA-Z0-9]+$/, 'Nickname can only consist of a‑z, A‑Z and 0‑9')
            .required('Fill this field')
        })
      }
      onSubmit={async (values) => {
        dispatch(setUsername({ username: values.nickname }))
        dispatch(setWebsocket({ websocket: await initializeWebSocket(values.nickname) }))
      }}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.input}>
            <input
              name='nickname'
              placeholder='Your nickname (only a-Z, 0-9)'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.nickname}
            />
            {errors.nickname && touched.nickname && <span className={styles.error}>{errors.nickname}</span>}
          </div>
          <button type="submit" disabled={isSubmitting}>
            Join
          </button>
        </form>
      )}
    </Formik>
  )
}