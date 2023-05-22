import { LoginPageWrapper } from '../widgets/login-page/wrapper'
import { LoginPageForm } from '../widgets/login-page/form'

export function LoginPage() {
  return (
    <LoginPageWrapper>
      <h1>Join anonymous chat</h1>
      <LoginPageForm />
    </LoginPageWrapper>
  )
}