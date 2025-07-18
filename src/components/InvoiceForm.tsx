import { useState } from "react";
import type { Party } from "../types/invoice";
//import { c_TKodyKrajowUE } from "../types/invoice.constants";
import { PartyForm } from "./PartiesForm";

export function InvoiceForm() {
  const [parties, setParties] = useState<{
    from: Party;
    to: Party;
  }>({
    from: {
      name: "",
      address: "",
      taxId: "",
      country: "PL",
      account: "",
    },
    to: {
      name: "",
      address: "",
      taxId: "",
      country: "PL",
    },
  });

  const handlePartyChange = (
    role: "from" | "to",
    field: keyof Party,
    value: string
  ) => {
    setParties((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">Dane sprzedawcy i nabywcy</h2>
      <PartyForm
        role="from"
        data={parties.from}
        onChange={(field, value) => handlePartyChange("from", field, value)}
      />
      <PartyForm
        role="to"
        data={parties.to}
        onChange={(field, value) => handlePartyChange("to", field, value)}
      />
    </div>
  );
}
