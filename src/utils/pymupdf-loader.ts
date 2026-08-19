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
      
      // Use a Function to completely bypass Vite/Webpack static analysis
      // This forces the browser to natively fetch the ES module from the CDN
      const nativeImport = new Function('url', 'return import(url)');
      const module = await nativeImport(wrapperUrl);

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
