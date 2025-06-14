
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import { InvoiceData } from "./dataMocks";

export function downloadExcel(invoices: InvoiceData[]) {
  const sheet = invoices.map(inv => ({
    "Invoice #": inv.invoiceNumber,
    "Date": inv.date,
    "Client": inv.clientName,
    "Address": inv.clientAddress,
    "Subtotal": inv.subtotal,
    "Tax": inv.tax,
    "Total": inv.total,
  }));
  const worksheet = XLSX.utils.json_to_sheet(sheet);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Invoices");
  XLSX.writeFile(workbook, "invoice_summary.xlsx");
}

export function downloadAnonymizedPDF(invoice: InvoiceData) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Invoice", 14, 18);
  doc.setFontSize(12);

  doc.text(`Invoice #: ${invoice.invoiceNumber}`, 14, 28);
  doc.text(`Date: ${invoice.date}`, 14, 36);
  doc.text(`Client: ${invoice.clientName}`, 14, 44);
  doc.text(`Address: ${invoice.clientAddress}`, 14, 52);
  doc.text(" ", 14, 60);

  doc.text("Line Items:", 14, 66);
  let y = 74;
  invoice.lineItems.forEach(item => {
    doc.text(
      `${item.description} (x${item.quantity}) - $${item.price.toFixed(2)}`,
      18,
      y
    );
    y += 8;
  });

  doc.text(`Subtotal: $${invoice.subtotal.toFixed(2)}`, 14, y + 10);
  doc.text(`Tax:      $${invoice.tax.toFixed(2)}`, 14, y + 18);
  doc.text(`Total:    $${invoice.total.toFixed(2)}`, 14, y + 26);

  doc.save("anonymized_invoice.pdf");
}
