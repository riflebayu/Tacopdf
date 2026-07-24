const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add imports
content = content.replace(
  "import { motion, AnimatePresence } from 'motion/react';",
  "import { motion, AnimatePresence } from 'motion/react';\nimport { useLocation, useNavigate } from 'react-router-dom';"
);

// 2. Replace state with useLocation
const stateRegex = /const \[activeToolId, setActiveToolId\] = useState<string \| null>\([\s\S]*?const \[activePage, setActivePage\] = useState<string \| null>\([\s\S]*?return null;\n  \}\);\n/m;

const newStateCode = `  const location = useLocation();
  const navigate = useNavigate();
  
  const path = location.pathname;
  let activeToolId: string | null = null;
  let activePage: string | null = null;
  
  if (path.startsWith('/tools/')) {
    activeToolId = path.replace('/tools/', '');
  } else if (path !== '/') {
    activePage = path.replace('/', '');
  }
`;
content = content.replace(stateRegex, newStateCode);

// 3. Remove useEffect for hashchange
const useEffectRegex = /  useEffect\(\(\) => \{\n    const handleHashChange = \(\) => \{[\s\S]*?  \}, \[activePage\]\);\n/m;
content = content.replace(useEffectRegex, "");

// 4. Update handleSelectTool, handleGoHome, handleSelectPage
content = content.replace(
  "window.location.hash = `#tool-${id}`;",
  "navigate(`/tools/${id}`);"
);
content = content.replace(
  "window.location.hash = '';",
  "navigate('/');"
);
content = content.replace(
  "window.location.hash = `#${pageId}`;",
  "navigate(`/${pageId}`);"
);

fs.writeFileSync('src/App.tsx', content);
console.log("App.tsx patched successfully.");
