import React, { createContext, useContext, useState } from 'react';
import type { Invoice } from '../types/invoice';
import { UnitOfMeasure } from '../types/uom';

interface InvoiceContextProps {
  invoiceData: Invoice;
  setInvoiceData: React.Dispatch<React.SetStateAction<Invoice>>;
}

const InvoiceContext = createContext<InvoiceContextProps | null>(null);

export const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState<Invoice>({
    header: {
      caption: 'Faktura VAT',
      number: '1/2025',
      dates: {
        issueDate: '2025-07-24',
        saleDate: '2025-07-24',
      },
      currency: 'PLN',
      total: 0,
      invoiceForm: 'VAT',
    },
    parties: {
      partyFrom: {
        name: 'Example Seller',
        address: '123 Seller Street',
        taxId: '123-456-7890',
        country: 'PL',
      },
      partyTo: {
        name: 'Example Buyer',
        address: '456 Buyer Avenue',
        taxId: '098-765-4321',
        country: 'PL',
      },
    },
    items: [
      {
        position: 1,
        caption: 'Item 1',
        unit: 'H87', // Changed from TLadunek to UnitOfMeasure
        quantity: 2,
        pricePerUnit: 50,
        vatRate: '23',
        vatAmount: 23,
        total: 123,
      },
      {
        position: 2,
        caption: 'Item 2',
        unit: 'H87', // Piece
        quantity: 1,
        pricePerUnit: 75,
        vatRate: '8',
        vatAmount: 8,
        total: 83,
      },
    ],
    paymentTerms: {
      dueDate: '2025-07-31',
      method: 'Bank Transfer',
      notes: 'Please pay within 7 days',
    },
    additionalDetails: {
      notes: 'Thank you for your business!',
      footer: 'This is a computer-generated invoice.',
    },
  });

  return (
    <InvoiceContext.Provider value={{ invoiceData, setInvoiceData }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoice must be used within an InvoiceProvider');
  }
  return context;
};