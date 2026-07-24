const fs = require('fs');

let content = fs.readFileSync('src/components/Workspace.tsx', 'utf8');

if (!content.includes('useLanguage')) {
  content = content.replace("import LucideIcon from './LucideIcon';", "import LucideIcon from './LucideIcon';\nimport { useLanguage } from '../context/LanguageContext';");
}

if (!content.includes('const { t } = useLanguage();')) {
  content = content.replace("export default function Workspace({ tool, onBack }: WorkspaceProps) {", "export default function Workspace({ tool, onBack }: WorkspaceProps) {\n  const { t } = useLanguage();");
}

const replacements = [
  ['Tool Configurations', "{t('workspace.tool_config')}"],
  ['Type or paste HTML / Rich Text:', "{t('workspace.html.title')}"],
  ['>Blank Doc Template<', ">{t('workspace.html.blank')}<"],
  ['>Simple Invoice Template<', ">{t('workspace.html.invoice')}<"],
  ['>Official Memo Letter<', ">{t('workspace.html.letter')}<"],
  ['"Enter rich text..."', "t('workspace.html.placeholder')"],
  ['Drag and drop files here, or <span className="text-primary hover:underline">browse</span>', "{t('workspace.drop.title')} <span className=\"text-primary hover:underline\">{t('workspace.drop.browse')}</span>"],
  ['Supports PNG, JPG, WebP images.', "{t('workspace.drop.support_img')}"],
  ['Supports PDF files.', "{t('workspace.drop.support_pdf')}"],
  ['Local WebAssembly client-side execution. Maximum security.', "{t('workspace.drop.security')}"],
  ['Files in Queue', "{t('workspace.queue.title')}"],
  ['>Clear All<', ">{t('workspace.queue.clear')}<"],
  ['Compile PDF Document', "{t('workspace.btn.compile')}"],
  ['>Run ${tool.name}<', ">{t('workspace.btn.run')} {tool.name}<"],
  ['Processing local Wasm...', "{t('workspace.progress.processing')}"],
  ['>Error:<', ">{t('workspace.progress.error')}<"],
  ['>Completed:<', ">{t('workspace.progress.completed')}<"],
  ['Rename Processed Output:', "{t('workspace.rename.title')}"],
  ['placeholder="Rename output file"', "placeholder={t('workspace.rename.placeholder')}"],
  ['> Extracted Page Photos', "> {t('workspace.extract.title')}"],
  ['Click the download buttons below to save each page directly as a high-quality photo file (.png) on your device.', "{t('workspace.extract.desc')}"],
  ['>Save<', ">{t('workspace.btn.save')}<"],
  ['>Download PDF<', ">{t('workspace.btn.download')}<"],
  ['>Preview PDF<', ">{t('workspace.btn.preview')}<"],
  ['← Process Another Document', "{t('workspace.btn.another')}"],
  ['>Custom Output Name (Optional)<', ">{t('workspace.custom_name')}<"],
  ['Customize the file name before processing. Or change it later after completion.', "{t('workspace.custom_name_desc')}"],
  ['How to Use & Tips - {tool.name}', "{t('workspace.how_to_use')} - {tool.name}"],
  ['How to Use {tool.name}', "{t('workspace.how_to_title')} {tool.name}"],
  ['Professional & Security Tips', "{t('workspace.tips_title')}"],
  ['Live client-side PDF preview', "{t('workspace.preview.live')}"],
  ['> Download<', "> {t('workspace.preview.download')}<"],
  ['✨ No settings needed!', "✨ {t('tool.merge.no_settings')}"],
  ['Simply drop your PDF files on the left. Use the <strong>Up (↑)</strong> and <strong>Down (↓)</strong> arrow buttons to arrange them in the exact order you want them merged, then click the action button below!', "{t('tool.merge.desc')}"],
  ['Which pages do you want to keep?', "{t('tool.split.keep')}"],
  ['placeholder="e.g. 1-3, 5 (keeps pages 1, 2, 3 and 5)"', "placeholder={t('tool.split.placeholder')}"],
  ['>💡 Easy Guide:<', ">💡 {t('tool.split.guide')}<"],
  ['Use a dash (<strong>1-3</strong>) to select pages in a row.', "{t('tool.split.guide1')}"],
  ['Use a comma (<strong>1, 4</strong>) to separate different pages.', "{t('tool.split.guide2')}"],
  ['Leave this field empty to keep all pages.', "{t('tool.split.guide3')}"],
  ['Which direction should we turn your pages?', "{t('tool.rotate.direction')}"],
  ['>90° (Turn Right / Sideways)<', ">{t('tool.rotate.90')}<"],
  ['>180° (Turn Upside Down)<', ">{t('tool.rotate.180')}<"],
  ['>270° (Turn Left / Sideways)<', ">{t('tool.rotate.270')}<"],
  ['Apply rotation to:', "{t('tool.rotate.apply')}"],
  ['Every single page', "{t('tool.rotate.all')}"],
  ['Only specific pages', "{t('tool.rotate.specific')}"],
  ['Which specific page numbers?', "{t('tool.rotate.which')}"],
  ['placeholder="e.g. 1, 3, 5 (separate with commas)"', "placeholder={t('tool.rotate.placeholder')}"],
  ['Choose a Password to Lock your PDF:', "{t('tool.protect.choose')}"],
  ['placeholder="e.g. secret1234 (Keep it simple!)"', "placeholder={t('tool.protect.placeholder')}"],
  ['🔒 <strong>100% Safe & Offline:</strong> everything happens privately inside your browser.', "{t('tool.protect.safe')}"],
  ['⚠️ <strong>Important:</strong> We cannot recover forgotten passwords. Please write your password down!', "{t('tool.protect.important')}"],
  ['Type current password to Unlock:', "{t('tool.unlock.type')}"],
  ['placeholder="Type password here"', "placeholder={t('tool.unlock.placeholder')}"],
  ['💡 <strong>Note:</strong> Once successfully unlocked, you can open and print your PDF easily without entering a password ever again.', "{t('tool.unlock.note')}"],
  ['Select Paper Size:', "{t('tool.image.size')}"],
  ['>A4 Size (Most common printer paper)<', ">{t('tool.image.a4')}<"],
  ['>Letter Size (Standard office paper)<', ">{t('tool.image.letter')}<"],
  ['>Auto Fit (Match picture dimensions)<', ">{t('tool.image.fit')}<"],
  ['Blank Space around edges (Margins):', "{t('tool.image.margin')}"],
  ['💡 Set this to <strong>0</strong> if you want your pictures to fill the entire page with no white borders.', "{t('tool.image.margin_note')}"],
  ['📸 Extract Page Images', "📸 {t('tool.pdf2img.title')}"],
  ['No extra settings needed! This tool will instantly convert every page of your PDF into an easy-to-share image (photo) file.', "{t('tool.pdf2img.desc')}"],
  ['Which page numbers do you want to delete (remove)?', "{t('tool.delete.which')}"],
  ['placeholder="e.g. 2, 4 (deletes page 2 and page 4)"', "placeholder={t('tool.delete.placeholder')}"],
  ['💡 <strong>Example:</strong> Type <strong>2, 4</strong> to wipe out pages 2 and 4. The remaining pages will automatically slide into place without leaving empty gaps!', "{t('tool.delete.example')}"],
  ['Which pages do you want to keep as a new file?', "{t('tool.extract.which')}"],
  ['placeholder="e.g. 1, 3, 5 (only keeps pages 1, 3, 5)"', "placeholder={t('tool.extract.placeholder')}"],
  ['💡 <strong>How it works:</strong> Type the pages you want to keep. This creates a brand new, lightweight PDF containing only these pages.', "{t('tool.extract.how')}"],
  ['Type your Watermark Text:', "{t('tool.watermark.type')}"],
  ['placeholder="e.g. DRAFT, COPY, CONFIDENTIAL"', "placeholder={t('tool.watermark.placeholder')}"],
  ['Text Size:', "{t('tool.watermark.size')}"],
  ['See-through level (Opacity):', "{t('tool.watermark.opacity')}"],
  ['Choose Text Color:', "{t('tool.watermark.color')}"],
  ['Tilt Angle (Rotation):', "{t('tool.watermark.rotation')}"],
  ['💡 Opacity of <strong>0.2</strong> is very light and faded. <strong>1.0</strong> is solid.', "{t('tool.watermark.note')}"],
  ['How should page numbers look?', "{t('tool.page_num.how')}"],
  ['placeholder="e.g. Page {n} of {total}"', "placeholder={t('tool.page_num.placeholder')}"],
  ['💡 <strong>Hint:</strong> <code>{`{n}`}</code> changes to the page number (1, 2, 3), and <code>{`{total}`}</code> shows total pages (e.g., Page 1 of 5).', "{t('tool.page_num.hint')}"],
  ['Placement Alignment:', "{t('tool.page_num.placement')}"],
  ['>Bottom Middle (Most Popular)<', ">{t('tool.page_num.bottom_center')}<"],
  ['>Bottom Right Corner<', ">{t('tool.page_num.bottom_right')}<"],
  ['>Bottom Left Corner<', ">{t('tool.page_num.bottom_left')}<"],
  ['>Top Middle<', ">{t('tool.page_num.top_center')}<"],
  ['>Top Right Corner<', ">{t('tool.page_num.top_right')}<"]
];

for (const [find, rep] of replacements) {
  content = content.replace(find, rep);
}

fs.writeFileSync('src/components/Workspace.tsx', content);
console.log("Updated Workspace.tsx successfully");
