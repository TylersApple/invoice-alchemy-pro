
import React from "react";
import { Button } from "@/components/ui/button";
import { InvoiceData } from "../utils/dataMocks";
import { downloadExcel, downloadAnonymizedPDF } from "../utils/exportUtils";

interface Props {
  invoices: InvoiceData[];
  selectedInvoice: InvoiceData | null;
}

const ActionBar: React.FC<Props> = ({ invoices, selectedInvoice }) => {
  return (
    <div className="flex gap-2 bg-background border-t pt-4 px-2 sticky bottom-0 justify-center z-20">
      <Button
        variant="outline"
        className="shadow"
        disabled={invoices.length === 0}
        onClick={() => downloadExcel(invoices)}
      >
        Download Excel Summary
      </Button>
      <Button
        variant="default"
        className="shadow"
        disabled={!selectedInvoice}
        onClick={() => selectedInvoice && downloadAnonymizedPDF(selectedInvoice)}
      >
        Export Anonymized PDF
      </Button>
    </div>
  );
};

export default ActionBar;
