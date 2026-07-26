const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const aliases = `
const TOOL_ALIASES: Record<string, string> = {
  'merge-pdf': 'merge',
  'split-pdf': 'split',
  'rotate-pdf': 'rotate',
  'delete-pages': 'delete-pages',
  'extract-pages': 'extract-pages',
  'protect-pdf': 'protect',
  'unlock-pdf': 'unlock',
  'sign': 'sign',
  'sign-pdf': 'sign',
  'redact': 'redact',
  'redact-pdf': 'redact',
  'image-to-pdf': 'image-to-pdf',
  'pdf-to-image': 'pdf-to-image',
  'html-to-pdf': 'html-to-pdf',
  'add-watermark': 'add-watermark',
  'add-page-numbers': 'add-page-numbers'
};

export default function App() {`;

content = content.replace('export default function App() {', aliases);

const routerLogic = `
  const rawPath = path.replace('/', '');

  if (TOOL_ALIASES[rawPath]) {
    activeToolId = TOOL_ALIASES[rawPath];
  } else if (path.startsWith('/tools/')) {
    activeToolId = path.replace('/tools/', '');
  } else if (path.startsWith('/blog/') && path !== '/blog') {
    activePage = 'article';
    activeSlug = path.replace('/blog/', '');
  } else if (path !== '/') {
    activePage = rawPath;
  }`;

content = content.replace(`  if (path.startsWith('/tools/')) {
    activeToolId = path.replace('/tools/', '');
  } else if (path.startsWith('/blog/') && path !== '/blog') {
    activePage = 'article';
    activeSlug = path.replace('/blog/', '');
  } else if (path !== '/') {
    activePage = path.replace('/', '');
  }`, routerLogic);

const handleSelect = `
  const getToolSeoPath = (id: string) => {
    const entry = Object.entries(TOOL_ALIASES).find(([alias, toolId]) => toolId === id);
    return entry ? \`/\${entry[0]}\` : \`/tools/\${id}\`;
  };

  const handleSelectTool = (id: string, withFiles?: File[]) => {
    navigate(getPrefixedPath(getToolSeoPath(id)));
    setWorkspaceFiles(withFiles || []);
    import('./services/analyticsService').then(({ trackToolUsage }) => trackToolUsage(id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };`;

content = content.replace(`  const handleSelectTool = (id: string, withFiles?: File[]) => {
    navigate(getPrefixedPath(\`/tools/\${id}\`));
    setWorkspaceFiles(withFiles || []);
    import('./services/analyticsService').then(({ trackToolUsage }) => trackToolUsage(id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };`, handleSelect);

content = content.replace('<LocalizedLink to={`/tools/${tool.id}`}', '<LocalizedLink to={getToolSeoPath(tool.id)}');

fs.writeFileSync('src/App.tsx', content);
