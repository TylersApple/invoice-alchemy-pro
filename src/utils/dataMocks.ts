
export type InvoiceLineItem = {
  description: string;
  quantity: number;
  price: number;
};

export type InvoiceData = {
  id: string;
  invoiceNumber: string;
  date: string;
  clientName: string;
  clientAddress: string;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  total: number;
};

const SAMPLE_CLIENTS = [
  { name: "Acme Corp", address: "123 Market St." },
  { name: "Globex LLC", address: "456 Main Ave." },
  { name: "Wayne Enterprises", address: "1007 Mountain Dr." },
  { name: "Stark Industries", address: "1 Stark Tower" }
];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateLineItems(): InvoiceLineItem[] {
  const items = [
    "Consulting Services", "Design Work", "Development", "Subscription Fee",
    "Maintenance", "Hosting", "Analytics", "Marketing Campaign"
  ];
  const numItems = randomInt(1, 4);
  return Array.from({ length: numItems }, (_, i) => {
    const qty = randomInt(1, 10);
    const price = randomInt(100, 1500) / 10;
    return {
      description: items[(i + randomInt(0, 7)) % items.length],
      quantity: qty,
      price: Number(price.toFixed(2)),
    };
  });
}

export function mockExtractInvoices(files: File[]): InvoiceData[] {
  return files.map((file, idx) => {
    const client = SAMPLE_CLIENTS[idx % SAMPLE_CLIENTS.length];
    const lineItems = generateLineItems();
    const subtotal = lineItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const tax = Number((subtotal * 0.08).toFixed(2));
    const total = Number((subtotal + tax).toFixed(2));
    return {
      id: `${Date.now()}-${idx}`,
      invoiceNumber: `INV-${randomInt(1000, 9999)}`,
      date: new Date(Date.now() - randomInt(0,2_000_000_000)).toISOString().slice(0,10),
      clientName: client.name,
      clientAddress: client.address,
      lineItems,
      subtotal: Number(subtotal.toFixed(2)),
      tax,
      total,
    };
  });
}

export function anonymizeInvoice(inv: InvoiceData): InvoiceData {
  return {
    ...inv,
    clientName: "Client Name",
    clientAddress: "Address",
    invoiceNumber: "INV-XXXX",
  };
}
