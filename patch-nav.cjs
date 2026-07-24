const fs = require('fs');

let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// 1. Add import
if (!content.includes("import { Link } from 'react-router-dom';")) {
  content = content.replace(
    "import React, { useState, useEffect } from 'react';",
    "import React, { useState, useEffect } from 'react';\nimport { Link } from 'react-router-dom';"
  );
}

// 2. Replace Logo link
content = content.replace(
  /<a href="#" onClick=\{\(e\) => \{ e\.preventDefault\(\); onGoHome\(\); \}\} className="([^"]+)">([\s\S]*?)<\/a>/m,
  '<Link to="/" className="$1" onClick={() => onGoHome()}>$2</Link>'
);

// 3. Replace FAQ link
content = content.replace(
  /<a \s*href="#faq"\s*onClick=\{handleGoFAQ\}\s*className="([^"]+)"\s*>([\s\S]*?)<\/a>/m,
  '<Link to="/faq" className="$1" onClick={handleGoFAQ}>$2</Link>'
);

// 4. Also replace FAQ link in mobile nav if it exists
content = content.replace(
  /<a \s*href="#faq"\s*onClick=\{handleGoFAQ\}\s*className="([^"]+)"\s*>([\s\S]*?)<\/a>/m,
  '<Link to="/faq" className="$1" onClick={handleGoFAQ}>$2</Link>'
);

fs.writeFileSync('src/components/Navbar.tsx', content);
console.log("Navbar.tsx patched successfully.");
