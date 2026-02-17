import { adminAuth, signOut } from "@/lib/auth-backend";

export default async function BackendDashboard() {
  const session = await adminAuth();

  return (
    <div className="p-10 flex flex-col gap-4">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome: <span className="font-medium text-black">{session?.user?.email}</span></p>
        <p className="text-gray-600">Role: <span className="badge bg-blue-100 p-1 rounded text-blue-700 text-sm uppercase">{session?.user?.role}</span></p>
      </div>

      {/* Using a Server Action for Logout - No "use client" needed */}
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/backend/login" });
        }}
      >
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
          Logout from Backend
        </button>
      </form>
      {session?.user?.role === "admin" && (
  <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
    <h2 className="font-bold text-yellow-800">Admin Only Area</h2>
    <p>This section is hidden from Staff members.</p>
    <button className="mt-2 bg-yellow-600 text-white px-3 py-1 rounded">Manage Users</button>
  </div>
)}
    </div>
  );
}