import { useRef, useState } from "react";
import { InvoiceHeader } from "./InvoiceHeader";
import { SellerDetails } from "./SellerDetails";
import { BuyerDetails } from "./BuyerDetails";
import { InvoiceItems } from "./InvoiceItems";
import { InvoiceTerms } from "./InvoiceTerms";
import { InvoicePreviewModal } from "./InvoicePreviewModal";
import { InvoiceHTML } from "./InvoiceHTML";
import { useInvoice } from "../context/InvoiceContext";
import html2pdf from "html2pdf.js";

export const InvoiceForm = () => {
  const { invoiceData } = useInvoice();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const invoiceRef = useRef(null);

  /*const invoiceData1 = {
    seller: {
      name: "Example Seller",
      address: "123 Seller Street",
    },
    buyer: {
      name: "Example Buyer",
      address: "456 Buyer Avenue",
    },
    items: [
      { description: "Item 1", quantity: 2, unitPrice: 50, total: 100 },
      { description: "Item 2", quantity: 1, unitPrice: 75, total: 75 },
    ],
  };*/

  const handleGeneratePreview = () => {
    setIsPreviewOpen(true);
  };

  const handleDownloadPDF = () => {
    const options = {
      margin: [10, 10, 10, 10], // Margins in mm
      filename: "invoice.pdf", // File name
      html2canvas: { scale: 2 }, // High resolution
      jsPDF: {
        unit: "mm", // Millimeters
        format: "a4", // A4 page size
        orientation: "portrait", // Portrait layout
      },
    };

    html2pdf().set(options).from(invoiceRef.current).save();
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
      <div className="flex space-x-4">
        <button
          className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out text-lg font-semibold shadow-md"
          onClick={handleGeneratePreview}
        >
          Generate Invoice Preview
        </button>
        <button
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out text-lg font-semibold shadow-md"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>
      </div>
      <InvoicePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        invoiceData={invoiceData}
      />
      {/* Hidden container for PDF generation */}
      <div className="hidden">
        <div ref={invoiceRef}>
          {/* <InvoiceHTML invoiceData={invoiceData} /> */}
        </div>
      </div>
    </div>
  );
};