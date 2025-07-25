import { useState } from "react";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { useInvoice } from "../context/InvoiceContext";
import { Label } from "./ui/label";

export const InvoiceTerms = () => {
  const { invoiceData, setInvoiceData } = useInvoice();
  const [terms, setTerms] = useState({
    paymentType: "bank_transfer",
    currency: "PLN",
    notes: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setInvoiceData({ ...invoiceData, paymentTerms: { ...invoiceData.paymentTerms, [field]: value } });
    setTerms({ ...terms, [field]: value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">Invoice Terms</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="payment-type">Payment Type</Label>
          <Select
            value={invoiceData.paymentTerms.method}
            onValueChange={(value: string) => handleInputChange("method", value)}
          >
            <option value="bank_transfer">Bank Transfer</option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="notes">Additional Notes</Label>
          <Input
            id="notes"
            value={invoiceData.paymentTerms.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            placeholder="Optional notes for the invoice"
          />
        </div>
      </div>
    </div>
  );
};