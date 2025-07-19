//import React from "react";
import { InvoiceHeader } from "./InvoiceHeader";
import { SellerDetails } from "./SellerDetails";
import { BuyerDetails } from "./BuyerDetails";
import { InvoiceItems } from "./InvoiceItems";
import { InvoiceTerms } from "./InvoiceTerms";

export const InvoiceForm = () => {
  const handleGeneratePreview = () => {
    console.log("Generate Invoice Preview");
  };

  return (
    <div className="space-y-8 p-6 bg-white shadow-md rounded-lg">
      <InvoiceHeader />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <SellerDetails />
        </div>
        <div>
          <BuyerDetails />
        </div>
      </div>
      <InvoiceItems />
      <InvoiceTerms />
      <button
        className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out text-lg font-semibold shadow-md"
        onClick={handleGeneratePreview}
      >
        Generate Invoice Preview
      </button>
    </div>
  );
};