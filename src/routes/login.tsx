import { createFileRoute } from '@tanstack/react-router'
import LoginBox from '@/components/interactables/LoginBox'

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  return (
    <main className="">
        testing login
        <LoginBox />
    </main>
  )
}
