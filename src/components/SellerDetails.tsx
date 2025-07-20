import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const SellerDetails = () => {
  const [seller, setSeller] = useState({
    name: "Example Company",
    address: "123 Example Street, City, Country",
    country: "Country",
    nip: "1234567890",
    bank: "PL00 0000 0000 0000 0000 0000 0000",
  });

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setSeller({ ...seller, [field]: value });
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
            <strong>Name:</strong> {seller.name}
          </p>
          <p>
            <strong>Address:</strong> {seller.address}
          </p>
          <p>
            <strong>NIP:</strong> {seller.nip}
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
              value={seller.name}
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
              value={seller.address}
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
              value={seller.country}
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
              value={seller.nip}
              onChange={(e) => handleInputChange("nip", e.target.value)}
            />
          </div>

          {/* Bank Account */}
          <div className="flex flex-col">
            <Label htmlFor="seller-bank" className="mb-1 text-sm">
              Bank Account
            </Label>
            <Input
              id="seller-bank"
              value={seller.bank}
              onChange={(e) => handleInputChange("bank", e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};