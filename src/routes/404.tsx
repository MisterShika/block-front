import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/404')({
  component: NotFoundPage,
})

export default function NotFoundPage() {
  return <div>Page not found</div>
}