let cachedPyMuPDF: any = null;
let loadPromise: Promise<any> | null = null;

// Hardcoded CDN URLs for the WASM modules
const PYMUPDF_URL = 'https://cdn.jsdelivr.net/npm/@bentopdf/pymupdf-wasm@0.11.16/';
const GS_URL = 'https://cdn.jsdelivr.net/npm/@bentopdf/gs-wasm@0.1.1/assets/';

export async function loadPyMuPDF(): Promise<any> {
  if (cachedPyMuPDF) {
    return cachedPyMuPDF;
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = (async () => {
    try {
      const wrapperUrl = `${PYMUPDF_URL}dist/index.js`;
      // Fetch the file manually to bypass any Vite interception or module loader issues
      const response = await fetch(wrapperUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const text = await response.text();
      // Create a blob from the text
      const blob = new Blob([text], { type: 'application/javascript' });
      const blobUrl = URL.createObjectURL(blob);
      
      // Import from the local blob URL
      const nativeImport = new Function('url', 'return import(url)');
      const module = await nativeImport(blobUrl);
      
      // Cleanup the blob URL
      URL.revokeObjectURL(blobUrl);

      if (typeof module.PyMuPDF !== 'function') {
        throw new Error('PyMuPDF module did not export expected PyMuPDF class.');
      }

      cachedPyMuPDF = new module.PyMuPDF({
        assetPath: `${PYMUPDF_URL}assets/`,
        ghostscriptUrl: GS_URL,
      });

      await cachedPyMuPDF.load();

      console.log('[PyMuPDF Loader] Successfully loaded from CDN');
      return cachedPyMuPDF;
    } catch (error: any) {
      loadPromise = null;
      throw new Error(`Failed to load PyMuPDF from CDN: ${error.message}`);
    }
  })();

  return loadPromise;
}

export function isPyMuPDFAvailable(): boolean {
  return true; // We always assume available since we fetch from CDN
}
