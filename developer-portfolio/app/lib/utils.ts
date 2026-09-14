export function downloadFile(
  filePath: string,
  fileName?: string
): void {
  const link = document.createElement("a");

  link.href = filePath;
  link.download = fileName || filePath.split("/").pop() || "download";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}