import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface Props {
  name: string;
  label?: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}

export default function SelectInput({ name, label, options, defaultValue }: Props) {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Select defaultValue={defaultValue}>
        <SelectTrigger name={name}>
          <SelectValue placeholder="Wybierz..." />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
