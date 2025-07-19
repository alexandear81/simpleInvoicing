import { useState } from "react";
import { Input } from "./ui/input";
//import { Label } from "./ui/label";

type InvoiceItem = {
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
  total: number;
};

export const InvoiceItems = () => {
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: "", quantity: 1, unitPrice: 0, vatRate: 23, total: 0 },
  ]);
  const [decimalPlaces, setDecimalPlaces] = useState<number>(2);

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const updatedItems = [...items];

    // Handle parsing only for numeric fields
    const parsedValue =
      field === "quantity" || field === "unitPrice" || field === "vatRate"
        ? parseFloat(value as string)
        : value;

    // Ensure parsedValue is valid for numeric fields
    if (field === "description" || !isNaN(parsedValue as number)) {
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: parsedValue,
        total: updatedItems[index].quantity * updatedItems[index].unitPrice,
      };
      setItems(updatedItems);
    }
  };

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, unitPrice: 0, vatRate: 23, total: 0 }]);
  };

  const deleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const validateQuantity = (value: number): boolean => {
    const regex = new RegExp(`^-?\\d*(\\.\\d{0,${decimalPlaces}})?$`);
    return regex.test(value.toString());
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">Invoice Items</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border-b">Description</th>
              <th className="p-2 border-b">Quantity</th>
              <th className="p-2 border-b">Unit Price</th>
              <th className="p-2 border-b">VAT Rate (%)</th>
              <th className="p-2 border-b">Total</th>
              <th className="p-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">
                  <Input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, "description", e.target.value)}
                    placeholder="Item description"
                  />
                </td>
                <td className="p-2">
                  <Input
                    type="number"
                    value={item.quantity.toFixed(decimalPlaces)} // Ensure this is a string
                    step={Math.pow(10, -decimalPlaces)} // Dynamically set step based on decimal places
                    onChange={(e) => handleItemChange(index, "quantity", parseFloat(e.target.value))} // Parse back to number
                    onBlur={(e) => handleItemChange(index, "quantity", parseFloat(e.target.value).toFixed(decimalPlaces))} // Format on blur
                  />
                </td>
                <td className="p-2">
                  <Input
                    type="number"
                    step={0.01} // Fixed step for monetary values
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, "unitPrice", Number(e.target.value))}
                  />
                </td>
                <td className="p-2">
                  <Input
                    type="number"
                    step={0.01} // Fixed step for VAT rates
                    value={item.vatRate}
                    onChange={(e) => handleItemChange(index, "vatRate", Number(e.target.value))}
                  />
                </td>
                <td className="p-2">
                  {(item.quantity * item.unitPrice).toFixed(2)} {/* Always display total price with 2 decimal places */}
                </td>
                <td className="p-2">
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => deleteItem(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={addItem}
      >
        Add Item
      </button>
      <label>
        Decimal Places:
        <select
          value={decimalPlaces}
          onChange={(e) => setDecimalPlaces(Number(e.target.value))}
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </label>
    </div>
  );
};