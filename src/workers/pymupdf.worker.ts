let pymupdf: any = null;
const WASM_CDN = 'https://cdn.jsdelivr.net/npm/@bentopdf/pymupdf-wasm@0.11.16';

self.onmessage = async (e: MessageEvent) => {
  const { action, id, payload } = e.data;
  
  try {
    if (action === 'init') {
      if (!pymupdf) {
        // @ts-ignore
        const module = await import(/* @vite-ignore */ `${WASM_CDN}/dist/index.js`);
        pymupdf = new module.PyMuPDF({
          assetPath: `${WASM_CDN}/assets/`
        });
        await pymupdf.load();
      }
      self.postMessage({ id, success: true });
    } 
    else if (action === 'pdfToDocx') {
      if (!pymupdf) {
        throw new Error("PyMuPDF engine is not initialized in the worker.");
      }
      const { fileData, fileName, mimeType } = payload;
      
      // Reconstruct File object from the ArrayBuffer sent from the main thread
      const file = new File([fileData], fileName, { type: mimeType });
      
      // Execute the heavy WASM conversion
      const docxBlob = await pymupdf.pdfToDocx(file);
      const arrayBuffer = await docxBlob.arrayBuffer();
      
      // Send the ArrayBuffer back as transferable object for performance
      self.postMessage({ id, success: true, payload: { arrayBuffer } }, [arrayBuffer]);
    }
  } catch (error: any) {
    self.postMessage({ id, success: false, error: error.message || String(error) });
  }
};

// Required for TypeScript to treat this as a module
export {};
