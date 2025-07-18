import { Input } from "../ui/input";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
}

export default function TextInput({ name, label, placeholder }: Props) {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Input name={name} placeholder={placeholder} />
    </div>
  );
}
