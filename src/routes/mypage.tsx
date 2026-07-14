import { createFileRoute } from "@tanstack/react-router";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export const Route = createFileRoute("/mypage")({
  component: MyPage,
});

function MyPage() {
  return (
    <ProtectedRoute>
      <main>Hello World My Page</main>
    </ProtectedRoute>
  );
}