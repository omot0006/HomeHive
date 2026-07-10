import { Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { EmptyState } from "../components/ui";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-hive-canvas p-5">
      <div className="w-full max-w-lg">
        <EmptyState
          icon={Home}
          title="This room doesn’t exist yet."
          description="The page may have moved, or the link may be out of date."
          actionLabel="Go to dashboard"
          onAction={() => navigate("/dashboard")}
        />
        <Link to="/" className="mt-5 block text-center text-sm font-bold text-hive-terracotta hover:text-hive-terracotta-strong">Back to HomeHive</Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
