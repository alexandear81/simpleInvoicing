import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const BuyerDetails = () => {
  const [buyer, setBuyer] = useState({
    name: "Client Innovations Ltd.",
    address: "456 Client Avenue, City, Country",
    country: "Country",
    nip: "9876543210",
  });

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setBuyer({ ...buyer, [field]: value });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Buyer Details</h2>
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
          <p><strong>Name:</strong> {buyer.name}</p>
          <p><strong>Address:</strong> {buyer.address}</p>
          <p><strong>NIP:</strong> {buyer.nip}</p>
        </div>
      )}

      {/* Expanded View */}
      {!isCollapsed && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          {/* Name/Company */}
          <div className="flex flex-col">
            <Label htmlFor="buyer-name" className="mb-1 text-sm">
              Name/Company
            </Label>
            <Input
              id="buyer-name"
              value={buyer.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          {/* Address */}
          <div className="flex flex-col md:col-span-2">
            <Label htmlFor="buyer-address" className="mb-1 text-sm">
              Address
            </Label>
            <textarea
              id="buyer-address"
              value={buyer.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
          </div>

          {/* Country */}
          <div className="flex flex-col">
            <Label htmlFor="buyer-country" className="mb-1 text-sm">
              Country
            </Label>
            <Input
              id="buyer-country"
              value={buyer.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
            />
          </div>

          {/* NIP (Tax ID) */}
          <div className="flex flex-col">
            <Label htmlFor="buyer-nip" className="mb-1 text-sm">
              NIP (Tax ID)
            </Label>
            <Input
              id="buyer-nip"
              value={buyer.nip}
              onChange={(e) => handleInputChange("nip", e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};