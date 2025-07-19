import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const BuyerDetails = () => {
  const [buyer, setBuyer] = useState({
    name: "",
    address: "",
    country: "",
    nip: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setBuyer({ ...buyer, [field]: value });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Buyer Details</h2>
      <Label htmlFor="buyer-name">Name/Company</Label>
      <Input
        id="buyer-name"
        value={buyer.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
      />
      <Label htmlFor="buyer-address">Address</Label>
      <Input
        id="buyer-address"
        value={buyer.address}
        onChange={(e) => handleInputChange("address", e.target.value)}
      />
      <Label htmlFor="buyer-country">Country</Label>
      <Input
        id="buyer-country"
        value={buyer.country}
        onChange={(e) => handleInputChange("country", e.target.value)}
      />
      <Label htmlFor="buyer-nip">NIP (Tax ID)</Label>
      <Input
        id="buyer-nip"
        value={buyer.nip}
        onChange={(e) => handleInputChange("nip", e.target.value)}
      />
    </div>
  );
};