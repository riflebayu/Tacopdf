const fs = require('fs');

let content = fs.readFileSync('src/components/Workspace.tsx', 'utf8');

// 1. Inject numberColor state right after numberSize
content = content.replace(
  "const [numberSize, setNumberSize] = useState(10);",
  "const [numberSize, setNumberSize] = useState(12);\n  const [numberColor, setNumberColor] = useState('#000000');"
);

// 2. Replace the old page-numbers UI block
const oldUiBlock = `{tool.id === 'page-numbers' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface">{t('tool.page_num.pos')}</label>
                    <select
                      value={pageNumberPosition}
                      onChange={(e) => setPageNumberPosition(e.target.value)}
                      className="w-full bg-background border border-outline-variant rounded-lg px-4 py-2 text-sm text-on-surface focus:border-primary-container focus:outline-none"
                    >
                      <option value="bottom-center">{t('tool.page_num.bottom_center') || "Bottom Center"}</option>
                      <option value="bottom-right">{t('tool.page_num.bottom_right') || "Bottom Right"}</option>
                      <option value="top-center">{t('tool.page_num.top_center') || "Top Center"}</option>
                      <option value="top-right">{t('tool.page_num.top_right') || "Top Right"}</option>
                    </select>
                  </div>
                </div>
              )}`;

const newUiBlock = `{tool.id === 'add-page-numbers' && (
                <div className="space-y-6">
                  
                  {/* Tips Section */}
                  <div className="bg-primary/5 rounded-xl p-4 border border-primary/20 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-500"></div>
                    <h4 className="text-xs font-bold text-primary mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                      <LucideIcon name="Lightbulb" size={14} className="animate-pulse" />
                      Tips
                    </h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {t('tool.add_page_numbers.tips.1')} {t('tool.add_page_numbers.tips.2')}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Position */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-on-surface flex items-center gap-1.5"><LucideIcon name="AlignJustify" size={14}/> {t('tool.page_num.pos') || 'Position'}</label>
                      <div className="relative">
                        <select
                          value={numberPosition}
                          onChange={(e) => setNumberPosition(e.target.value as any)}
                          className="w-full bg-background border border-outline-variant rounded-lg px-4 py-2.5 text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none font-medium shadow-sm cursor-pointer hover:border-primary transition-colors"
                        >
                          <option value="top-left">{t('tool.page_num.top_left')}</option>
                          <option value="top-center">{t('tool.page_num.top_center')}</option>
                          <option value="top-right">{t('tool.page_num.top_right')}</option>
                          <option value="bottom-left">{t('tool.page_num.bottom_left')}</option>
                          <option value="bottom-center">{t('tool.page_num.bottom_center')}</option>
                          <option value="bottom-right">{t('tool.page_num.bottom_right')}</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                          <LucideIcon name="ChevronDown" size={16} />
                        </div>
                      </div>
                    </div>

                    {/* Format */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-on-surface flex items-center gap-1.5"><LucideIcon name="Hash" size={14}/> {t('tool.page_num.format') || 'Format'}</label>
                      <div className="relative">
                        <select
                          value={numberFormat}
                          onChange={(e) => setNumberFormat(e.target.value)}
                          className="w-full bg-background border border-outline-variant rounded-lg px-4 py-2.5 text-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none font-medium shadow-sm cursor-pointer hover:border-primary transition-colors"
                        >
                          <option value="{n}">{t('tool.page_num.format_1')}</option>
                          <option value="Page {n}">{t('tool.page_num.format_2')}</option>
                          <option value="{n} of {total}">{t('tool.page_num.format_3')}</option>
                          <option value="Page {n} of {total}">{t('tool.page_num.format_4')}</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                          <LucideIcon name="ChevronDown" size={16} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Size Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <label className="text-xs font-bold text-on-surface flex items-center gap-1.5"><LucideIcon name="Type" size={14}/> {t('tool.page_num.size') || 'Text Size'}</label>
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">{numberSize}px</span>
                    </div>
                    <input
                      type="range"
                      min="8"
                      max="48"
                      value={numberSize}
                      onChange={(e) => setNumberSize(Number(e.target.value))}
                      className="w-full h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  {/* Color Picker */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface flex items-center gap-1.5"><LucideIcon name="Palette" size={14}/> {t('tool.page_num.color') || 'Text Color'}</label>
                    <div className="flex flex-wrap items-center gap-3">
                      {['#000000', '#6B7280', '#EF4444', '#3B82F6', '#10B981', '#F59E0B'].map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setNumberColor(color)}
                          className={\`w-8 h-8 rounded-full border transition-transform hover:scale-110 \${numberColor === color ? 'border-primary scale-110 shadow-md ring-2 ring-primary/30' : 'border-outline-variant'} \${color === '#FFFFFF' ? 'bg-white shadow-sm' : ''}\`}
                          style={{ backgroundColor: color !== '#FFFFFF' ? color : undefined }}
                          aria-label={\`Select color \${color}\`}
                        />
                      ))}
                      <div className="relative overflow-hidden rounded-lg w-10 h-10 border border-outline-variant shadow-sm hover:scale-105 transition-transform shrink-0">
                        <input
                          type="color"
                          value={numberColor}
                          onChange={(e) => setNumberColor(e.target.value)}
                          className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer"
                          title="Custom Color"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              )}`;

if (content.includes(oldUiBlock)) {
  content = content.replace(oldUiBlock, newUiBlock);
} else {
  console.error("Could not find old UI block!");
  // Let's fallback to regex
  content = content.replace(/\{tool\.id === 'page-numbers' && \([\s\S]*?\)\}/, newUiBlock);
}

// 3. Replace the execution logic
const oldExecBlock = `} else if (tool.id === 'add-page-numbers') {
        const fileBytes = await uploadedFiles[0].file.arrayBuffer();
        const srcPdf = await loadPdf(fileBytes, actualPass);
        
        setProcessingState({
          status: 'processing',
          progress: 50,
          message: t('progress.stamping_numbering'),
        });

        const font = await srcPdf.embedFont(StandardFonts.Helvetica);
        const allPages = srcPdf.getPages();
        const total = allPages.length;

        allPages.forEach((page, idx) => {
          const { width, height } = page.getSize();
          const pStr = numberFormat
            .replace('{n}', (idx + 1).toString())
            .replace('{total}', total.toString());

          let x = width / 2 - 25;
          let y = 30;

          if (numberPosition === 'bottom-right') {
            x = width - 80;
          } else if (numberPosition === 'bottom-left') {
            x = 40;
          } else if (numberPosition === 'top-center') {
            y = height - 40;
          } else if (numberPosition === 'top-right') {
            x = width - 80;
            y = height - 40;
          }

          page.drawText(pStr, {
            x,
            y,
            size: numberSize,
            font: font,
            color: rgb(0.3, 0.3, 0.3),
          });
        });

        outputBytes = await srcPdf.save();
        outName = 'numbered_taco.pdf';`;

const newExecBlock = `} else if (tool.id === 'add-page-numbers') {
        const fileBytes = await uploadedFiles[0].file.arrayBuffer();
        const srcPdf = await loadPdf(fileBytes, actualPass);
        
        setProcessingState({
          status: 'processing',
          progress: 50,
          message: t('progress.stamping_numbering') || 'Stamping page numbers...',
        });

        const font = await srcPdf.embedFont(StandardFonts.Helvetica);
        const { r, g, b } = hexToRgb(numberColor || '#000000');
        const allPages = srcPdf.getPages();
        const total = allPages.length;

        // Localized format strings based on current language
        const p1Str = t('tool.page_num.format_2').replace('1', ''); // e.g. "Page " or "Halaman "
        const pOfStr = t('tool.page_num.format_3').replace('1', '').replace('10', '').trim(); // e.g. "of" or "dari"

        allPages.forEach((page, idx) => {
          const { width, height } = page.getSize();
          
          let pStr = numberFormat
            .replace('{n}', (idx + 1).toString())
            .replace('{total}', total.toString());
            
          // If format is "Page {n}" we replace "Page " with localized string
          if (numberFormat.includes('Page ')) {
             pStr = pStr.replace('Page ', p1Str.trim() + ' ');
          }
          if (numberFormat.includes(' of ')) {
             pStr = pStr.replace(' of ', ' ' + pOfStr + ' ');
          }

          const textWidth = font.widthOfTextAtSize(pStr, numberSize);
          
          let x = 0;
          let y = 0;
          const marginX = 40;
          const marginY = 40;

          // Calculate precise positioning
          if (numberPosition.includes('left')) {
            x = marginX;
          } else if (numberPosition.includes('right')) {
            x = width - textWidth - marginX;
          } else {
            // center
            x = (width / 2) - (textWidth / 2);
          }

          if (numberPosition.includes('top')) {
            y = height - marginY;
          } else {
            y = marginY;
          }

          page.drawText(pStr, {
            x,
            y,
            size: numberSize,
            font: font,
            color: rgb(r, g, b),
          });
        });

        outputBytes = await srcPdf.save();
        outName = 'numbered_taco.pdf';`;

if (content.includes(oldExecBlock)) {
  content = content.replace(oldExecBlock, newExecBlock);
} else {
  // Let's use regex
  const regex = /\} else if \(tool\.id === 'add-page-numbers'\) \{[\s\S]*?outName = 'numbered_taco\.pdf';/;
  if (content.match(regex)) {
    content = content.replace(regex, newExecBlock);
  } else {
    console.error("Could not find execution block!");
  }
}

fs.writeFileSync('src/components/Workspace.tsx', content);
console.log('Successfully patched Workspace.tsx!');
