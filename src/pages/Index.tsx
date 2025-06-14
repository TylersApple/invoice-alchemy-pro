
// PDF Invoice Processing Automation App

import React, { useState } from "react";
import InvoiceUploader from "../components/InvoiceUploader";
import InvoiceTable from "../components/InvoiceTable";
import AnonymizedInvoicePreview from "../components/AnonymizedInvoicePreview";
import ActionBar from "../components/ActionBar";
import { InvoiceData, mockExtractInvoices } from "../utils/dataMocks";

const Index = () => {
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Upload handler simulates batch extraction from PDF
  const handleUpload = (files: File[]) => {
    const extracted = mockExtractInvoices(files);
    setInvoices(curr => [...curr, ...extracted]);
    if (!selectedId && extracted.length > 0) setSelectedId(extracted[0].id);
  };

  // Edit handlers for invoice & line items (fully editable)
  const handleInvoiceEdit = (id: string, field: keyof InvoiceData, value: any) => {
    setInvoices(curr =>
      curr.map(inv => inv.id === id ? { ...inv, [field]: value } : inv)
    );
  };
  const handleLineItemEdit = (
    id: string,
    idx: number,
    field: keyof InvoiceData["lineItems"][0],
    value: any
  ) => {
    setInvoices(curr => 
      curr.map(inv => {
        if (inv.id !== id) return inv;
        const lineItems = [...inv.lineItems];
        lineItems[idx] = { ...lineItems[idx], [field]: value };
        // auto-recalc subtotal/tax/total
        const subtotal = lineItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
        const tax = Number((subtotal * 0.08).toFixed(2));
        const total = Number((subtotal + tax).toFixed(2));
        return { ...inv, lineItems, subtotal, tax, total };
      })
    );
  };

  const selectedInvoice = invoices.find(inv => inv.id === selectedId) || null;

  return (
    <div className="min-h-screen bg-muted flex flex-col p-0">
      <header className="bg-background border-b px-8 py-5 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">
          PDF Invoice Automation
        </h1>
        <div className="text-muted-foreground font-medium">
          Extract, Anonymize, and Export Invoices Effortlessly
        </div>
      </header>
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 p-8">
        <section className="col-span-1 flex flex-col gap-4">
          <div>
            <InvoiceUploader onUpload={handleUpload} />
          </div>
          <div>
            <div className="font-semibold mb-2 text-lg">Invoices Uploaded</div>
            <InvoiceTable
              invoices={invoices}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              onEdit={handleInvoiceEdit}
              onEditLineItem={handleLineItemEdit}
            />
          </div>
        </section>
        <section className="col-span-2 flex flex-col gap-4">
          <AnonymizedInvoicePreview invoice={selectedInvoice} />
        </section>
      </main>
      <ActionBar invoices={invoices} selectedInvoice={selectedInvoice} />
      <footer className="text-xs text-center text-muted-foreground py-4 bg-background border-t">
        Secure PDF processing • No data leaves your browser in this demo • OCR and backend support coming soon
      </footer>
    </div>
  );
};

export default Index;
