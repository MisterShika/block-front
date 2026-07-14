import { createFileRoute } from "@tanstack/react-router";
import LoginBox from "@/components/interactables/LoginBox";

export const Route = createFileRoute("/login")({
  validateSearch: (search) => ({
    redirect:
      typeof search.redirect === "string"
        ? search.redirect
        : undefined,
  }),
  component: Login,
});

function Login() {
  return (
    <main>
      testing login
      <LoginBox />
    </main>
  );
}