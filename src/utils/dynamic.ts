export function ifEmptyWriteFromProvider(
  document: Document,
  selector: string,
  contentProvider: () => string,
): void {
  document.addEventListener("DOMContentLoaded", () => {
    const elem = document.querySelector(selector);
    if (elem.textContent?.trim()) {
      console.log(`${selector} already set, skipping use of provider`);
    } else elem.textContent = contentProvider();
  });
}
