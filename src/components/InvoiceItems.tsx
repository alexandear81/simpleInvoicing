import { useInvoice } from "../context/InvoiceContext";
//import type { TStawkaPodatku } from "../types/invoice.constants";
import { c_TStawkaPodatku } from "../types/invoice.constants";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRef } from "react";
import type { Item } from "../types/invoice";
import { UnitOfMeasure } from "../types/uom";

export const InvoiceItems = () => {
  const { invoiceData, setInvoiceData } = useInvoice();
  const positionCounter = useRef(invoiceData.items.length + 1);

  const updateItems = (newItems: Item[]) => {
    setInvoiceData({
      ...invoiceData,
      items: newItems.map((item) => ({
        ...item,
        total: parseFloat((item.quantity * item.pricePerUnit).toFixed(2)),
        vatAmount: parseFloat(((item.quantity * item.pricePerUnit * item.vatRateNum) / 100).toFixed(2)),
      })),
    });
  };

  const handleChange = (
    index: number,
    field: keyof Item,
    value: string | number
  ) => {
    const updated = [...invoiceData.items];
    updated[index] = {
      ...updated[index],
      [field]: typeof value === "string" && (field === "quantity" || field === "pricePerUnit" || field === "vatRate")
        ? parseFloat(value)
        : value,
    };
    updateItems(updated);
  };

  const addItem = () => {
    const newItem: Item = {
      position: positionCounter.current++,
      caption: "",
      unit: "H87",
      quantity: 1,
      pricePerUnit: 100,
      vatRate: "23",
      vatRateNum: 23,
      vatAmount: 23,
      total: 123,
    };
    updateItems([...invoiceData.items, newItem]);
  };

  const deleteItem = (index: number) => {
    const filtered = invoiceData.items.filter((_, i) => i !== index);
    updateItems(filtered);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">Invoice Items</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border-b">Description</th>
              <th className="p-2 border-b">Unit</th>
              <th className="p-2 border-b">Quantity</th>
              <th className="p-2 border-b">Unit Price</th>
              <th className="p-2 border-b">VAT Rate (%)</th>
              <th className="p-2 border-b">Tax Amount</th>
              <th className="p-2 border-b">Total</th>
              <th className="p-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">
                  <Input
                    value={item.caption}
                    onChange={(e) => handleChange(index, "caption", e.target.value)}
                  />
                </td>
                <td className="p-2">
                  <select
                    value={item.unit}
                    onChange={(e) => handleChange(index, "unit", e.target.value)}
                  >
                    {UnitOfMeasure.map((uom) => (
                      <option key={uom} value={uom}>{uom}</option>
                    ))}
                  </select>
                </td>
                <td className="p-2">
                  <Input
                    type="number"
                    value={item.quantity}
                    step="0.0001"
                    onChange={(e) => handleChange(index, "quantity", parseFloat(e.target.value))}
                  />
                </td>
                <td className="p-2">
                  <Input
                    type="number"
                    value={item.pricePerUnit}
                    step="0.01"
                    onChange={(e) => handleChange(index, "pricePerUnit", parseFloat(e.target.value))}
                  />
                </td>
                <td className="p-2">
                  <select
                    value={item.vatRate}
                    onChange={(e) => {
                      const rateStr = e.target.value;
                      const rateNum = parseFloat(rateStr.replace("%", "")) || 0;
                      handleChange(index, "vatRate", rateStr);
                      handleChange(index, "vatRateNum", rateNum);
                    }}
                  >
                    {c_TStawkaPodatku.map((rate) => (
                      <option key={rate} value={rate}>{rate}</option>
                    ))}
                  </select>
                </td>
                <td className="p-2">{item.vatAmount.toFixed(2)}</td>
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
      <Button onClick={addItem}>Add Item</Button>
    </div>
  );
};
