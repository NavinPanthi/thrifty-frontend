import React from "react";

type Seller = {
  id: number;
  name: string;
  phone: string; // Should be in international format without `+`, e.g., "9779812345678"
};

const sellers: Seller[] = [
  {
    id: 1,
    name: "Ram Shrestha",
    phone: "9779812345678",
  },
];

const AdminChatPage = () => {
  return (
    <div className="mx-auto mt-10 max-w-2xl px-4">
      <h1 className="mb-6 text-2xl font-bold">Seller WhatsApp Contacts</h1>
      <div className="space-y-4">
        {sellers.map((seller) => (
          <div
            key={seller.id}
            className="flex items-center justify-between rounded-lg border p-4 shadow-sm"
          >
            <div>
              <p className="text-lg font-semibold">{seller.name}</p>
              <p className="text-sm text-gray-600">+{seller.phone}</p>
            </div>
            <a
              href={`https://wa.me/${seller.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
            >
              Chat on WhatsApp
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminChatPage;
