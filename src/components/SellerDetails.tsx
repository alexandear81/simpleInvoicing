import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const SellerDetails = () => {
  const [seller, setSeller] = useState({
    name: "",
    address: "",
    country: "",
    nip: "",
    bank: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setSeller({ ...seller, [field]: value });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Seller Details</h2>
      <div>
      <Label htmlFor="seller-name">Name/Company</Label>
      <Input
        id="seller-name"
        value={seller.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
      />
      </div>
      <div>
      <Label htmlFor="seller-address">Address</Label>
      <Input
        id="seller-address"
        value={seller.address}
        onChange={(e) => handleInputChange("address", e.target.value)}
      />
        </div>
      <div>
      <Label htmlFor="seller-country">Country</Label>
      <Input
        id="seller-country"
        value={seller.country}
        onChange={(e) => handleInputChange("country", e.target.value)}
      />
        </div>
      <div>
      <Label htmlFor="seller-nip">NIP (Tax ID)</Label>
      <Input
        id="seller-nip"
        value={seller.nip}
        onChange={(e) => handleInputChange("nip", e.target.value)}
      />
        </div>
      <div>
      <Label htmlFor="seller-bank">Bank Account</Label>
      <Input
        id="seller-bank"
        value={seller.bank}
        onChange={(e) => handleInputChange("bank", e.target.value)}
      />
      </div>
    </div>
  );
};