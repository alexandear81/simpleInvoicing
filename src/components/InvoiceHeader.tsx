import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const InvoiceHeader = () => {
  const [invoiceDetails, setInvoiceDetails] = useState({
    number: "FV/2025/07/001",
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7))
      .toISOString()
      .split("T")[0],
  });

  const handleInputChange = (field: string, value: string) => {
    setInvoiceDetails({ ...invoiceDetails, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <Label htmlFor="invoice-number">Invoice Number</Label>
        <Input
          id="invoice-number"
          value={invoiceDetails.number}
          onChange={(e) => handleInputChange("number", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="issue-date">Issue Date</Label>
        <Input
          id="issue-date"
          type="date"
          value={invoiceDetails.issueDate}
          onChange={(e) => handleInputChange("issueDate", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="due-date">Due Date</Label>
        <Input
          id="due-date"
          type="date"
          value={invoiceDetails.dueDate}
          onChange={(e) => handleInputChange("dueDate", e.target.value)}
        />
      </div>
    </div>
  );
};