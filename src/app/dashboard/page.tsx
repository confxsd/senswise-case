import { getTokenFromCookies } from "@/lib/auth";

export default async function DashboardPage() {
  const user = getTokenFromCookies();

  if (!user) {
    return (
      <div>
        <h1>You are not logged in</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {JSON.stringify(user)}</h1>
    </div>
  );
}
