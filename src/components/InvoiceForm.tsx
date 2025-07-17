import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export default function Invoice() {
  const [items, setItems] = useState([
    { description: '', quantity: 1, price: 0.0, vat: 0 }
  ]);

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = field === 'description' ? value : parseFloat(value);
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0.0, vat: 0 }]);
  };

  const total = items.reduce(
    (acc, item) => {
      const net = item.quantity * item.price;
      const vatValue = net * (item.vat / 100);
      return {
        net: acc.net + net,
        vat: acc.vat + vatValue,
        gross: acc.gross + net + vatValue
      };
    },
    { net: 0, vat: 0, gross: 0 }
  );

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Invoice Generator</h1>

      <div className="space-y-4">
        {items.map((item, index) => (
          <Card key={index}>
            <CardContent className="grid grid-cols-6 gap-2 items-end">
              <Input
                placeholder="Description"
                value={item.description}
                onChange={(e) => updateItem(index, 'description', e.target.value)}
                className="col-span-2"
              />
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                className="col-span-1"
              />
              <Input
                type="number"
                value={item.price}
                onChange={(e) => updateItem(index, 'price', e.target.value)}
                className="col-span-1"
              />
              <Input
                type="number"
                value={item.vat}
                onChange={(e) => updateItem(index, 'vat', e.target.value)}
                className="col-span-1"
              />
              <div className="text-sm text-right col-span-1">
                <div>Net: {(item.quantity * item.price).toFixed(2)}</div>
                <div>VAT: {(item.quantity * item.price * (item.vat / 100)).toFixed(2)}</div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button onClick={addItem} className="w-full">
          Add Item
        </Button>

        <div className="text-right space-y-1 text-gray-800">
          <div>Total Net: {total.net.toFixed(2)} PLN</div>
          <div>Total VAT: {total.vat.toFixed(2)} PLN</div>
          <div className="font-bold text-lg">Total Gross: {total.gross.toFixed(2)} PLN</div>
        </div>
      </div>
    </div>
  );
}
