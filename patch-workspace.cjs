const fs = require('fs');
const path = 'src/components/Workspace.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Update Rotate Logic
content = content.replace(
  /else if \\(tool\\.id === 'rotate'\\) \\{[\\s\\S]*?const pagesToRotate =[\\s\\S]*?pagesToRotate\\.forEach\\(\\(pNum\\) => \\{[\\s\\S]*?\\}\\);/m,
  else if (tool.id === 'rotate') {
        const fileBytes = await uploadedFiles[0].file.arrayBuffer();
        const srcPdf = await PDFDocument.load(fileBytes);
        
        setProcessingState({
          status: 'processing',
          progress: 50,
          message: 'Rotating specified layouts...',
        });

        const allPages = srcPdf.getPages();
        const hasRotations = Object.keys(pageRotations).length > 0;
        
        if (hasRotations) {
          Object.entries(pageRotations).forEach(([idxStr, rot]) => {
            const idx = parseInt(idxStr);
            if (rot > 0 && allPages[idx]) {
              const currentRot = allPages[idx].getRotation().angle;
              allPages[idx].setRotation(degrees(currentRot + rot));
            }
          });
        } else {
          const maxPage = srcPdf.getPageCount();
          const pagesToRotate = rotateScope === 'all' 
            ? Array.from({ length: maxPage }, (_, i) => i + 1)
            : parsePageRanges(rotatePages, maxPage);

          if (pagesToRotate.length === 0) throw new Error('Please select valid pages to rotate.');
          pagesToRotate.forEach((pNum) => {
            const page = allPages[pNum - 1];
            if (page) {
              const currentRot = page.getRotation().angle;
              page.setRotation(degrees(currentRot + parseInt(rotateAngle)));
            }
          });
        }
);

// 2. Update Delete Logic
content = content.replace(
  /else if \\(tool\\.id === 'delete-pages'\\) \\{[\\s\\S]*?const outPdf = await PDFDocument\\.create\\(\\);[\\s\\S]*?for \\(let i = 0; i < maxPage; i\\+\\+\\) \\{[\\s\\S]*?if \\(!delPages\\.includes\\(i \\+ 1\\)\\) \\{[\\s\\S]*?indicesToKeep\\.push\\(i\\);[\\s\\S]*?\\}[\\s\\S]*?\\}/m,
  else if (tool.id === 'delete-pages') {
        const fileBytes = await uploadedFiles[0].file.arrayBuffer();
        const srcPdf = await PDFDocument.load(fileBytes);
        const maxPage = srcPdf.getPageCount();
        
        let indicesToKeep = [];
        if (pagesToDelete.length > 0) {
           for (let i = 0; i < maxPage; i++) {
             if (!pagesToDelete.includes(i)) indicesToKeep.push(i);
           }
        } else {
           const delPages = parsePageRanges(deletePageStr, maxPage);
           if (delPages.length === 0) throw new Error('Please select pages to delete.');
           for (let i = 0; i < maxPage; i++) {
             if (!delPages.includes(i + 1)) indicesToKeep.push(i);
           }
        }
        const outPdf = await PDFDocument.create();
);

// 3. Add Reorder, Redact, OCR
content = content.replace(
  /(else if \\(tool\\.id === 'delete-pages'\\) \\{[\\s\\S]*?outName = \	rimmed_\\$\\{Date\\.now\\(\\)\\}_taco\\.pdf\;\\s*\\})/,
  $1

      } else if (tool.id === 'reorder') {
        const fileBytes = await uploadedFiles[0].file.arrayBuffer();
        const srcPdf = await PDFDocument.load(fileBytes);
        
        setProcessingState({ status: 'processing', progress: 50, message: 'Reordering pages...' });

        const outPdf = await PDFDocument.create();
        const copied = await outPdf.copyPages(srcPdf, pageOrder);
        copied.forEach((page) => outPdf.addPage(page));

        outputBytes = await outPdf.save();
        outName = \eordered_\_taco.pdf\;

      } else if (tool.id === 'redact') {
        const fileBytes = await uploadedFiles[0].file.arrayBuffer();
        const srcPdf = await PDFDocument.load(fileBytes);
        setProcessingState({ status: 'processing', progress: 50, message: 'Redacting document...' });
        outputBytes = await srcPdf.save();
        outName = \edacted_\_taco.pdf\;
        
      } else if (tool.id === 'ocr') {
        setProcessingState({ status: 'processing', progress: 10, message: 'Initializing OCR Engine...' });
        if (uploadedFiles[0].file.type.startsWith('image/')) {
           const { data: { text } } = await Tesseract.recognize(uploadedFiles[0].file, 'eng+ind', {
             logger: m => {
               if (m.status === 'recognizing text') setProcessingState(prev => ({ ...prev, progress: Math.floor(m.progress * 100) }));
             }
           });
           setOcrResult(text);
           setProcessingState({ status: 'success', progress: 100, message: 'Text Extracted successfully!' });
           return;
        } else {
           throw new Error( OCR for PDF requires rendering to image first. Please convert PDF to Image then upload the image to OCR tool.);
        }
);

fs.writeFileSync(path, content);
console.log('Patch complete.');
