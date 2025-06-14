
import React from "react";
import { InvoiceData, anonymizeInvoice } from "../utils/dataMocks";

interface Props {
  invoice: InvoiceData | null;
}

const AnonymizedInvoicePreview: React.FC<Props> = ({ invoice }) => {
  if (!invoice) return (
    <div className="p-6 bg-muted rounded-lg h-full flex items-center justify-center text-muted-foreground">
      Select an invoice to preview.
    </div>
  );

  const anon = anonymizeInvoice(invoice);

  return (
    <div className="bg-card rounded-lg p-6 shadow-md h-full w-full">
      <h2 className="text-xl font-bold mb-2 text-primary">Anonymized Invoice Preview</h2>
      <div className="border-b pb-2 mb-3">
        <div className="flex justify-between">
          <div className="font-medium">Invoice #: <span className="font-mono">{anon.invoiceNumber}</span></div>
          <div>Date: {anon.date}</div>
        </div>
        <div className="mt-1">Client: <span className="italic">{anon.clientName}</span></div>
        <div className="text-muted-foreground">{anon.clientAddress}</div>
      </div>
      <div>
        <div className="font-semibold mb-1">Line Items:</div>
        <ul className="mb-2">
          {anon.lineItems.map((li, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{li.description} (x{li.quantity})</span>
              <span>${li.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex flex-col gap-1">
          <div>Subtotal: <span className="font-mono">${anon.subtotal.toFixed(2)}</span></div>
          <div>Tax: <span className="font-mono">${anon.tax.toFixed(2)}</span></div>
          <div className="font-bold">Total: <span className="font-mono">${anon.total.toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  );
};

export default AnonymizedInvoicePreview;
