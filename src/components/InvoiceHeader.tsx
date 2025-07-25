//import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useInvoice } from "../context/InvoiceContext";

export const InvoiceHeader = () => {
  const { invoiceData, setInvoiceData } = useInvoice();

  const handleInputChange = (field: string, value: string) => {
    setInvoiceData({ ...invoiceData, header: { ...invoiceData.header, [field]: value } });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <Label htmlFor="invoice-number">Invoice Number</Label>
        <Input
          id="invoice-number"
          value={invoiceData.header.number}
          onChange={(e) => handleInputChange("number", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="issue-date">Issue Date</Label>
        <Input
          id="issue-date"
          type="date"
          value={invoiceData.header.issueDate}
          onChange={(e) => handleInputChange("issueDate", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="due-date">Due Date</Label>
        <Input
          id="due-date"
          type="date"
          value={invoiceData.header.saleDate}
          onChange={(e) => handleInputChange("saleDate", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="currency">Currency</Label>
        <Input
          id="currency"
          type="text"
          value={invoiceData.header.currency}
          onChange={(e) => handleInputChange("currency", e.target.value)}
        />
      </div>
    </div>
  );
};