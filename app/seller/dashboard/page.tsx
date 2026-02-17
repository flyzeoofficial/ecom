import { sellerAuth } from "@/lib/auth-seller";

export default async function SellerDashboard() {
  const session = await sellerAuth();
  return (
    <div className="p-10">
      <h1>Seller Dashboard</h1>
      <p>Shop: {session?.user?.email}</p>
    </div>
  );
}