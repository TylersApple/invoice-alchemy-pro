
import React, { useCallback } from "react";

interface Props {
  onUpload: (files: File[]) => void;
}

const InvoiceUploader: React.FC<Props> = ({ onUpload }) => {
  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files || []).filter(
      file => file.type === "application/pdf",
    );
    if (files.length) {
      onUpload(files);
    }
  }, [onUpload]);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(
      file => file.type === "application/pdf"
    );
    if (files.length) {
      onUpload(files);
      e.target.value = "";
    }
  };

  return (
    <div
      className="border-2 border-dashed border-primary/50 rounded-lg flex flex-col items-center justify-center min-h-[160px] px-4 py-8 cursor-pointer hover:bg-muted transition"
      onDrop={onDrop}
      onDragOver={e => e.preventDefault()}
    >
      <div className="mb-3 text-muted-foreground">Drag & drop PDF invoices here</div>
      <label className="bg-primary/90 text-white px-4 py-2 rounded shadow hover:bg-primary cursor-pointer transition mb-2" htmlFor="invoice-upload">
        Select PDF files
      </label>
      <input
        id="invoice-upload"
        type="file"
        accept="application/pdf"
        multiple
        className="hidden"
        onChange={onInput}
      />
      <div className="text-xs mt-2 text-muted-foreground">Batch upload supported. PDF only.</div>
    </div>
  );
};

export default InvoiceUploader;
