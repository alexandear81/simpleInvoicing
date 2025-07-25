//import React from "react";
import { InvoiceHTML } from "./InvoiceHTML";

export const InvoicePreviewModal = ({ isOpen, onClose, invoiceData }: { isOpen: boolean; onClose: () => void; invoiceData: any }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <InvoiceHTML invoiceData={invoiceData} />
        <button
          className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};