const fs = require('fs');

let content = fs.readFileSync('src/components/Workspace.tsx', 'utf8');

// 1. Add state pdfPageCount
content = content.replace(
  "const [numberColor, setNumberColor] = useState('#000000');",
  "const [numberColor, setNumberColor] = useState('#000000');\n  const [pdfPageCount, setPdfPageCount] = useState(1);"
);

// 2. Add 'add-page-numbers' to tool lists
content = content.replace(
  /\[\'delete-pages\', \'rotate\', \'reorder\', \'redact\', \'split\', \'sign\', \'extract-pages\', \'merge\', \'image-to-pdf\', \'add-watermark\'\]\.includes\(tool\.id\)/g,
  "['delete-pages', 'rotate', 'reorder', 'redact', 'split', 'sign', 'extract-pages', 'merge', 'image-to-pdf', 'add-watermark', 'add-page-numbers'].includes(tool.id)"
);

content = content.replace(
  /const previewScale = \(tool\.id === \'sign\' \|\| tool\.id === \'redact\' \|\| tool\.id === \'add-watermark\'\) \? 1\.5 : 0\.5;/g,
  "const previewScale = (tool.id === 'sign' || tool.id === 'redact' || tool.id === 'add-watermark' || tool.id === 'add-page-numbers') ? 1.5 : 0.5;"
);

content = content.replace(
  /const targetNumPages = tool\.id === \'add-watermark\' \? 1 : numPages;/g,
  "const targetNumPages = (tool.id === 'add-watermark' || tool.id === 'add-page-numbers') ? 1 : numPages;"
);

content = content.replace(
  "const numPages = pdf.numPages;",
  "const numPages = pdf.numPages;\n            setPdfPageCount(numPages);"
);

// 3. Update Format Dropdown Options
const oldFormatOptions = `<option value="{n}">{t('tool.page_num.format_1')}</option>
                          <option value="Page {n}">{t('tool.page_num.format_2')}</option>
                          <option value="{n} of {total}">{t('tool.page_num.format_3')}</option>
                          <option value="Page {n} of {total}">{t('tool.page_num.format_4')}</option>`;

const newFormatOptions = `<option value="{n}">{t('tool.page_num.format_1')}</option>
                          <option value="Page {n}">{t('tool.page_num.format_2')}</option>
                          <option value="{n} of {total}">{(t('tool.page_num.format_3') || '').replace('10', pdfPageCount.toString())}</option>
                          <option value="Page {n} of {total}">{(t('tool.page_num.format_4') || '').replace('10', pdfPageCount.toString())}</option>`;

content = content.replace(oldFormatOptions, newFormatOptions);

// 4. Update the live preview overlay logic
// First we locate the entire watermark preview block.
const overlayRegex = /\{tool\.id === \'add-watermark\' && uploadedFiles\.length > 0 \? \([\s\S]*?\) : \(/;

const newOverlayStr = `{(tool.id === 'add-watermark' || tool.id === 'add-page-numbers') && uploadedFiles.length > 0 ? (
                <div className="bg-surface-container border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col mb-6">
                  <div className="flex justify-between items-center px-4 py-3 bg-surface-container-high border-b border-outline-variant shrink-0">
                    <span className="text-sm font-bold text-on-surface flex items-center gap-2">
                      <LucideIcon name="Eye" size={16} className="text-primary" /> 
                      {t('workspace.preview.live') || 'Live Preview'}
                    </span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeFile(uploadedFiles[0].id); }}
                      className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-2"
                    >
                      <LucideIcon name="Trash2" size={14} /> {t('workspace.file.remove') || 'Remove PDF'}
                    </button>
                  </div>
                  <div className="p-4 md:p-8 bg-surface-container-lowest flex justify-center items-center min-h-[400px] relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(var(--tw-colors-outline-variant) 1px, transparent 0)', backgroundSize: '20px 20px' }}>
                    {isGeneratingThumbnails ? (
                      <div className="flex flex-col items-center text-on-surface-variant">
                        <LucideIcon name="Loader" className="animate-spin mb-2" size={24} />
                        <span className="text-xs font-medium">Generating Preview...</span>
                      </div>
                    ) : visualThumbnails.length > 0 ? (
                      <div className="relative inline-block max-w-full shadow-lg border border-outline-variant/30 bg-white" style={{ maxHeight: '600px' }}>
                        <img 
                          src={visualThumbnails[0]} 
                          alt="PDF Preview" 
                          className="max-w-full max-h-[600px] object-contain block"
                        />
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          {tool.id === 'add-watermark' && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div 
                                className="whitespace-nowrap font-bold"
                                style={{
                                  color: watermarkColor,
                                  opacity: watermarkOpacity,
                                  fontSize: \`\${watermarkSize}px\`,
                                  transform: \`rotate(-\${watermarkRotation}deg)\`,
                                  textShadow: '0px 0px 2px rgba(255,255,255,0.5)'
                                }}
                              >
                                {watermarkText || ' '}
                              </div>
                            </div>
                          )}
                          {tool.id === 'add-page-numbers' && (
                            <div 
                              className="whitespace-nowrap font-bold absolute"
                              style={{
                                color: numberColor,
                                fontSize: \`\${numberSize}px\`,
                                ...(() => {
                                  let posStyle = {};
                                  if (numberPosition.includes('left')) posStyle.left = '40px';
                                  else if (numberPosition.includes('right')) posStyle.right = '40px';
                                  else { posStyle.left = '50%'; posStyle.transform = 'translateX(-50%)'; }
                                  
                                  if (numberPosition.includes('top')) posStyle.top = '40px';
                                  else posStyle.bottom = '40px';
                                  
                                  return posStyle;
                                })(),
                              }}
                            >
                              {(() => {
                                const p1Str = (t('tool.page_num.format_2') || 'Page 1').replace('1', '');
                                const pOfStr = (t('tool.page_num.format_3') || '1 of 10').replace('1', '').replace('10', '').trim();
                                let pStr = numberFormat.replace('{n}', '1').replace('{total}', pdfPageCount.toString());
                                if (numberFormat.includes('Page ')) pStr = pStr.replace('Page ', p1Str.trim() + ' ');
                                if (numberFormat.includes(' of ')) pStr = pStr.replace(' of ', ' ' + pOfStr + ' ');
                                return pStr;
                              })()}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-red-500 font-medium">Preview generation failed.</span>
                    )}
                  </div>
                </div>
              ) : (`;

content = content.replace(overlayRegex, newOverlayStr);

// 5. Update bottom grid condition to exclude page-numbers
content = content.replace(
  /\{tool\.id === \'add-watermark\' && uploadedFiles\.length > 0 \? \(/g,
  "{(tool.id === 'add-watermark' || tool.id === 'add-page-numbers') && uploadedFiles.length > 0 ? ("
);

// We should also replace the condition before the visualGrid so that page numbers doesn't render it there.
// VisualGrid already requires tool to be in ['delete-pages', 'rotate', 'reorder', 'split', 'extract-pages', 'pdf-to-image']
// So add-page-numbers is not there, it's fine!

fs.writeFileSync('src/components/Workspace.tsx', content);
console.log('Successfully patched Workspace.tsx for Live Preview!');
