import { Input } from "../ui/input";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  step?: number;
}

export default function NumberInput({ name, label, placeholder, step = 0.01 }: Props) {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Input
        name={name}
        placeholder={placeholder}
        type="number"
        step={step}
      />
    </div>
  );
}
