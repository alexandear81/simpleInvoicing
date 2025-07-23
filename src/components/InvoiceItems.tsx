import { useState } from "react";
import { Input } from "./ui/input";

export const InvoiceItems = () => {
  const [items, setItems] = useState([
    { description: "Item 1", quantity: 1.2345, unitPrice: 10.5678, vatRate: 23, total: 0, taxAmount: 0 },
  ]);
  const [decimalPlaces, setDecimalPlaces] = useState(2);

  const handleItemChange = (index: number, field: keyof typeof items[0], value: number | string) => {
    const updatedItems = [...items];
    const updatedItem = { ...updatedItems[index] };

    // Update the specific field
  (updatedItem[field] as typeof value) = field === "quantity" || field === "unitPrice" || field === "vatRate" ? Number(value) : value;

    // Recalculate the total and tax amount
    updatedItem.total = parseFloat((updatedItem.quantity * updatedItem.unitPrice).toFixed(2)); // Total always has 2 decimal places
    updatedItem.taxAmount = parseFloat(((updatedItem.total * updatedItem.vatRate) / 100).toFixed(2)); // Tax Amount always has 2 decimal places

    // Update the item in the array
    updatedItems[index] = updatedItem;
    setItems(updatedItems);
  };

  const handleDecimalPlacesChange = (newDecimalPlaces: number) => {
    setDecimalPlaces(newDecimalPlaces);

    // Round quantity to the new decimal places and recalculate total and tax amount
    const roundedItems = items.map((item) => ({
      ...item,
      quantity: parseFloat(item.quantity.toFixed(newDecimalPlaces)),
      total: parseFloat((item.quantity * item.unitPrice).toFixed(2)), // Total always has 2 decimal places
      taxAmount: parseFloat(((item.total * item.vatRate) / 100).toFixed(2)), // Tax Amount always has 2 decimal places
    }));
    setItems(roundedItems);
  };

  const addItem = () => {
    setItems([...items, { description: "", quantity: 0, unitPrice: 0, vatRate: 23, total: 0, taxAmount: 0 }]);
  };

  const deleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">Invoice Items</h2>
      <div className="overflow-x-auto">
        <table
          className="min-w-full bg-white border border-gray-200 rounded-lg"
          style={{ tableLayout: "auto" }} // Allows dynamic column widths
        >
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border-b" style={{ width: "30%", minWidth: "150px" }}>Description</th>
              <th className="p-2 border-b" style={{ width: "10%" }}>Quantity</th>
              <th className="p-2 border-b" style={{ width: "10%" }}>Unit Price</th>
              <th className="p-2 border-b" style={{ width: "5%" }}>VAT Rate (%)</th>
              <th className="p-2 border-b" style={{ width: "10%" }}>Tax Amount</th>
              <th className="p-2 border-b" style={{ width: "20%" }}>Total</th>
              <th className="p-2 border-b" style={{ width: "15%" }}>Actions</th>
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
                    className="w-full"
                  />
                </td>
                <td className="p-2">
                  <Input
                    type="number"
                    value={item.quantity.toFixed(decimalPlaces)}
                    step={Math.pow(10, -decimalPlaces)}
                    onChange={(e) => handleItemChange(index, "quantity", parseFloat(e.target.value))}
                  />
                </td>
                <td className="p-2">
                  <Input
                    type="number"
                    value={item.unitPrice.toFixed(2)}
                    step={0.01}
                    onChange={(e) => handleItemChange(index, "unitPrice", parseFloat(e.target.value))}
                  />
                </td>
                <td className="p-2">
                  <Input
                    type="number"
                    value={item.vatRate}
                    step={1}
                    onChange={(e) => handleItemChange(index, "vatRate", parseFloat(e.target.value))}
                  />
                </td>
                <td className="p-2">{item.taxAmount.toFixed(2)}</td>
                <td className="p-2">{item.total.toFixed(2)}</td>
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
      <label className="block mt-4">
        Decimal Places for Quantity:
        <select
          value={decimalPlaces}
          onChange={(e) => handleDecimalPlacesChange(Number(e.target.value))}
          className="ml-2 border border-gray-300 rounded-md p-1"
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