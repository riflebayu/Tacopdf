let worker: Worker | null = null;
let messageIdCounter = 0;
const callbacks = new Map<number, { resolve: (val: any) => void, reject: (err: any) => void }>();

function getWorker(): Worker {
  if (!worker) {
    // In Astro/Vite, we can import workers like this:
    worker = new Worker(new URL('../workers/pymupdf.worker.ts', import.meta.url), { type: 'module' });
    
    worker.onmessage = (e) => {
      const { id, success, payload, error } = e.data;
      const callback = callbacks.get(id);
      if (callback) {
        if (success) {
          callback.resolve(payload);
        } else {
          callback.reject(new Error(error));
        }
        callbacks.delete(id);
      }
    };
    
    worker.onerror = (e) => {
      console.error("PyMuPDF Worker Error:", e);
    };
  }
  return worker;
}

function sendToWorker(action: string, payload?: any, transferables?: Transferable[]): Promise<any> {
  return new Promise((resolve, reject) => {
    const id = ++messageIdCounter;
    callbacks.set(id, { resolve, reject });
    const w = getWorker();
    w.postMessage({ id, action, payload }, transferables || []);
  });
}

export async function initPyMuPDF(): Promise<void> {
  await sendToWorker('init');
}

export async function convertPdfToDocx(file: File): Promise<Blob> {
  const fileData = await file.arrayBuffer();
  const result = await sendToWorker(
    'pdfToDocx', 
    { fileData, fileName: file.name, mimeType: file.type }, 
    [fileData] // Transfer the ArrayBuffer to avoid copying
  );
  
  return new Blob([result.arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
}
