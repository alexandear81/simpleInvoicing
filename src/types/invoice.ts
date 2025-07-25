// src/types/invoice.ts
import type { TRodzajFaktury, TKodWaluty, TStawkaPodatku, TKodyKrajowUE, TLadunek } from "./invoice.constants"
import type { UnitOfMeasure } from "./uom";
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
    unit: UnitOfMeasure; // Changed from TLadunek to UnitOfMeasure
    quantity: number;
    pricePerUnit: number;
    vatRate: TStawkaPodatku;
    vatRateNum: number; // e.g. 23
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
        issueDate: string;
        saleDate: string;
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

