
import React from "react";
import { InvoiceData, InvoiceLineItem } from "../utils/dataMocks";

interface Props {
  invoices: InvoiceData[];
  selectedId: string | null;
  setSelectedId: (id: string) => void;
  onEdit: (id: string, field: keyof InvoiceData, value: any) => void;
  onEditLineItem: (id: string, idx: number, field: keyof InvoiceLineItem, value: any) => void;
}

const InvoiceTable: React.FC<Props> = ({
  invoices,
  selectedId,
  setSelectedId,
  onEdit,
  onEditLineItem,
}) => {
  if (invoices.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-lg border bg-card p-2 shadow-md">
      <table className="min-w-full text-sm whitespace-nowrap">
        <thead>
          <tr className="bg-muted">
            <th className="px-3 py-2 text-left">#</th>
            <th className="px-3 py-2 text-left">Invoice #</th>
            <th className="px-3 py-2 text-left">Date</th>
            <th className="px-3 py-2 text-left">Client</th>
            <th className="px-3 py-2 text-left">Total</th>
            <th className="px-3 py-2 text-center">Line Items</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv, idx) => (
            <tr
              key={inv.id}
              className={
                "hover:bg-accent transition cursor-pointer" +
                (selectedId === inv.id ? " bg-accent/40" : "")
              }
              onClick={() => setSelectedId(inv.id)}
            >
              <td className="px-3 py-2">{idx + 1}</td>
              <td className="px-3 py-2">
                <input
                  className="bg-transparent border-b border-muted focus:outline-none w-24"
                  value={inv.invoiceNumber}
                  onChange={e => onEdit(inv.id, "invoiceNumber", e.target.value)}
                />
              </td>
              <td className="px-3 py-2">
                <input
                  className="bg-transparent border-b border-muted focus:outline-none w-28"
                  value={inv.date}
                  onChange={e => onEdit(inv.id, "date", e.target.value)}
                />
              </td>
              <td className="px-3 py-2">
                <input
                  className="bg-transparent border-b border-muted focus:outline-none w-32"
                  value={inv.clientName}
                  onChange={e => onEdit(inv.id, "clientName", e.target.value)}
                />
              </td>
              <td className="px-3 py-2">${inv.total.toFixed(2)}</td>
              <td className="px-3 py-2 text-center">
                <details>
                  <summary className="cursor-pointer text-primary underline decoration-dotted">
                    View/Edit
                  </summary>
                  <div className="flex flex-col gap-1 p-2">
                    {inv.lineItems.map((item, liIdx) => (
                      <div key={liIdx} className="flex gap-1">
                        <input
                          className="w-36 border-muted border-b bg-transparent"
                          value={item.description}
                          onChange={e =>
                            onEditLineItem(inv.id, liIdx, "description", e.target.value)}
                        />
                        <input
                          className="w-12 border-muted border-b bg-transparent"
                          value={item.quantity}
                          type="number"
                          onChange={e =>
                            onEditLineItem(inv.id, liIdx, "quantity", Number(e.target.value))}
                        />
                        <input
                          className="w-16 border-muted border-b bg-transparent"
                          value={item.price}
                          type="number"
                          step="0.01"
                          onChange={e =>
                            onEditLineItem(inv.id, liIdx, "price", Number(e.target.value))}
                        />
                      </div>
                    ))}
                  </div>
                </details>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
