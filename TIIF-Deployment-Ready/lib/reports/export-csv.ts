/**
 * Converts an array of flat objects into a CSV string and triggers a
 * browser download. No external dependency — works in any modern browser.
 */
export function exportToCSV(filename: string, rows: Record<string, unknown>[]) {
  if (rows.length === 0) return;

  const headers = Object.keys(rows[0]);

  const escape = (value: unknown) => {
    const str = String(value ?? "");
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const csv = [
    headers.join(","),
    ...rows.map((row) => headers.map((h) => escape(row[h])).join(",")),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Opens the browser's print dialog against the current page — the
 * dependency-free way to let users "Save as PDF" a printable report.
 * Pair with a print-only stylesheet (see .print-only / .no-print classes
 * in globals.css) so only the report content appears in the output.
 */
export function exportToPDF() {
  window.print();
}
