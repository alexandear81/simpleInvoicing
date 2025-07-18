// src/components/PartyForm.tsx
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { c_TKodyKrajowUE } from "../types/invoice.constants";
import type { TKodyKrajowUE } from "../types/invoice.constants";
import type { Party } from "../types/invoice";

interface PartyFormProps {
  role: "from" | "to";
  data: Party;
  onChange: (field: keyof Party, value: string) => void;
}

export const PartyForm = ({ role, data, onChange }: PartyFormProps) => {
  const labelPrefix = role === "from" ? "Sprzedawca" : "Nabywca";

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{labelPrefix}</h3>

      <div className="space-y-2">
        <Label htmlFor={`${role}-name`}>Nazwa</Label>
        <Input
          id={`${role}-name`}
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
        />

        <Label htmlFor={`${role}-address`}>Adres</Label>
        <Input
          id={`${role}-address`}
          value={data.address}
          onChange={(e) => onChange("address", e.target.value)}
        />

        <Label htmlFor={`${role}-taxId`}>NIP</Label>
        <Input
          id={`${role}-taxId`}
          value={data.taxId}
          onChange={(e) => onChange("taxId", e.target.value)}
        />

        <Label htmlFor={`${role}-country`}>Kraj</Label>
        <Select
          value={data.country}
          onValueChange={(val: TKodyKrajowUE) => onChange("country", val)}
        >
          <SelectTrigger id={`${role}-country`}>
            <SelectValue placeholder="Wybierz kraj" />
          </SelectTrigger>
          <SelectContent>
            {c_TKodyKrajowUE.map((code) => (
              <SelectItem key={code} value={code}>
                {code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {role === "from" && (
          <>
            <Label htmlFor={`${role}-account`}>Numer konta (opcjonalnie)</Label>
            <Input
              id={`${role}-account`}
              value={data.account || ""}
              onChange={(e) => onChange("account", e.target.value)}
            />
          </>
        )}
      </div>
    </div>
  );
};
