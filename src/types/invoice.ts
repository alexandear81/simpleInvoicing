// src/types/invoice.ts
import type { TRodzajFaktury, TKodWaluty, TStawkaPodatku, TKodyKrajowUE, TLadunek } from "./invoice.constants"
export interface Party {
    name: string;
    address: string;
    taxId: string;
    country: TKodyKrajowUE;
    account?: string;
}

export interface Item {
    position: number;
    caption: string;
    unit: TLadunek;
    quantity: number;
    pricePerUnit: number;
    vatRate: TStawkaPodatku;
    vatAmount: number;
    total: number;
}

export interface PaymentTerms {
    dueDate: string;
    method: string;
    notes?: string;
}

export interface AdditionalDetails {
    notes?: string;
    footer?: string;
}

export interface Invoice {
    header: {
        caption: string;
        number: string;
        dates: {
            issueDate: string;
            saleDate: string;
        };
        currency: TKodWaluty;
        total: number;
        invoiceForm: TRodzajFaktury;
    }
    parties: {
        partyFrom: Party;
        partyTo: Party;
    };
    items: Item[];
    paymentTerms: PaymentTerms;
    additionalDetails?: AdditionalDetails;
}

