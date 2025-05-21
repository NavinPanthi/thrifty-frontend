import React from "react";

import Footer from "@/features/landing/footer";
import Navbar from "@/features/landing/navbar";

type PaymentMethod = {
  id: number;
  name: string;
  type: "eSewa" | "Khalti" | "Bank Transfer";
  accountName: string;
  accountNumber: string;
  link?: string; // Optional direct payment link
};

const paymentMethods: PaymentMethod[] = [
  {
    id: 1,
    name: "eSewa",
    type: "eSewa",
    accountName: "Café Roma Pvt. Ltd.",
    accountNumber: "9860123456",
    link: "https://esewa.com.np/#/qpay?sc=9860123456",
  },
  {
    id: 2,
    name: "Khalti",
    type: "Khalti",
    accountName: "Cafe Roma",
    accountNumber: "9801234567",
    link: "https://khalti.com/pay?mobile=9801234567",
  },
  {
    id: 3,
    name: "Bank Transfer",
    type: "Bank Transfer",
    accountName: "Cafe Roma Pvt. Ltd.",
    accountNumber: "0010101010101 - Nabil Bank",
  },
];

const PaymentPage = () => {
  return (
    <>
      <Navbar />
      <div className="mx-auto my-10 max-w-2xl px-4">
        <h1 className="mb-6 text-2xl font-bold">Payment Methods</h1>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between rounded-lg border p-4 shadow-sm"
            >
              <div>
                <p className="text-lg font-semibold">{method.name}</p>
                <p className="text-sm text-gray-600">
                  Account Name: {method.accountName}
                </p>
                <p className="text-sm text-gray-600">
                  Account Number: {method.accountNumber}
                </p>
              </div>
              {method.link ? (
                <a
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                >
                  Pay Now
                </a>
              ) : (
                <span className="text-sm italic text-gray-500">
                  Manual Transfer
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
