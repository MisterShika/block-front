import { createFileRoute } from '@tanstack/react-router'
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="">
      Hello World
      <br />
      <Link to="/about">About</Link>
      <br />
      <Link to="/login" search={{ redirect: undefined }}>
        Login
      </Link>
      <br />
      <Link to="/register">Register</Link>
    </main>
  )
}
