import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useInvoice } from "../context/InvoiceContext";

export const SellerDetails = () => {
  const { invoiceData, setInvoiceData } = useInvoice();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setInvoiceData({ ...invoiceData, parties: { ...invoiceData.parties, partyFrom: { ...invoiceData.parties.partyFrom, [field]: value } } });
  };


  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Seller Details</h2>
        <button
          className="text-blue-600 hover:underline"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "Expand" : "Collapse"}
        </button>
      </div>

      {/* Condensed View */}
      {isCollapsed && (
        <div className="mt-3 text-sm text-gray-600">
          <p>
            <strong>Name:</strong> {invoiceData.parties.partyFrom.name}
          </p>
          <p>
            <strong>Address:</strong> {invoiceData.parties.partyFrom.address}
          </p>
          <p>
            <strong>Country:</strong> {invoiceData.parties.partyFrom.country}
          </p>
          <p>
            <strong>NIP:</strong> {invoiceData.parties.partyFrom.taxId}
          </p>
          <p>
            <strong>Bank Account:</strong> {invoiceData.parties.partyFrom.account}
          </p>
        </div>
      )}

      {/* Expanded View */}
      {!isCollapsed && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          {/* Name/Company */}
          <div className="flex flex-col">
            <Label htmlFor="seller-name" className="mb-1 text-sm">
              Name/Company
            </Label>
            <Input
              id="seller-name"
              value={invoiceData.parties.partyFrom.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          {/* Address */}
          <div className="flex flex-col md:col-span-2">
            <Label htmlFor="seller-address" className="mb-1 text-sm">
              Address
            </Label>
            <textarea
              id="seller-address"
              value={invoiceData.parties.partyFrom.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
          </div>

          {/* Country */}
          <div className="flex flex-col">
            <Label htmlFor="seller-country" className="mb-1 text-sm">
              Country
            </Label>
            <Input
              id="seller-country"
              value={invoiceData.parties.partyFrom.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
            />
          </div>

          {/* NIP (Tax ID) */}
          <div className="flex flex-col">
            <Label htmlFor="seller-nip" className="mb-1 text-sm">
              NIP (Tax ID)
            </Label>
            <Input
              id="seller-nip"
              value={invoiceData.parties.partyFrom.taxId}
              onChange={(e) => handleInputChange("taxId", e.target.value)}
            />
          </div>

          {/* Bank Account */}
          <div className="flex flex-col">
            <Label htmlFor="seller-bank" className="mb-1 text-sm">
              Bank Account
            </Label>
            <Input
              id="seller-bank"
              value={invoiceData.parties.partyFrom.account}
              onChange={(e) => handleInputChange("account", e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};