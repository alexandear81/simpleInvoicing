import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';

type InvoiceItem = {
  description: string;
  quantity: number;
  price: number;
  vat: number;
};

type FieldName = keyof InvoiceItem;

export default function InvoiceForm() {
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: "", quantity: 1, price: 0, vat: 0 },
  ]);

  const handleItemChange = (
    index: number,
    field: FieldName,
    value: string | number
  ) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]: typeof value === "string" && (field === "quantity" || field === "price" || field === "vat")
        ? parseFloat(value)
        : value,
    };
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0, vat: 0 }]);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <Card key={index}>
          <CardContent className="grid grid-cols-4 gap-2 p-4">
            <Input
              placeholder="Description"
              value={item.description}
              onChange={(e) =>
                handleItemChange(index, "description", e.target.value)
              }
            />
            <Input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
            />
            <Input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleItemChange(index, "price", e.target.value)}
            />
            <Input
              type="number"
              placeholder="VAT %"
              value={item.vat}
              onChange={(e) => handleItemChange(index, "vat", e.target.value)}
            />
          </CardContent>
        </Card>
      ))}
      <Button onClick={addItem}>Add Item</Button>
    </div>
  );
}