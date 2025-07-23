//import React from "react";

export const InvoiceHTML = ({ invoiceData }: { invoiceData: any }) => {
  return (
    <div className="invoice-html bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Invoice</h2>
      <div>
        <h3 className="font-semibold">Seller Details</h3>
        <p>{invoiceData.seller.name}</p>
        <p>{invoiceData.seller.address}</p>
      </div>
      <div>
        <h3 className="font-semibold">Buyer Details</h3>
        <p>{invoiceData.buyer.name}</p>
        <p>{invoiceData.buyer.address}</p>
      </div>
      <div>
        <h3 className="font-semibold">Invoice Items</h3>
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="border p-2">Description</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Unit Price</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item: any, index: number) => (
              <tr key={index}>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">{item.unitPrice}</td>
                <td className="border p-2">{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};