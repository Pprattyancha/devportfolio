export function downloadFile(
  filePath: string,
  fileName?: string
): void {
  const link = document.createElement("a");

  link.href = filePath;
  link.download =
    fileName || filePath.split("/").pop() || "download";

  link.target = "_blank";
  link.rel = "noopener noreferrer";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}