#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Colores para la consola
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkCaseSensitivity(dir, issues = []) {
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Verificar nombres de carpetas
      // Permitir: todo minúsculas, todo mayúsculas, o camelCase
      const isAllLower = item === item.toLowerCase();
      const isAllUpper = item === item.toUpperCase();
      const isCamelCase = /^[a-z][a-zA-Z]*$/.test(item);
      
      if (!isAllLower && !isAllUpper && !isCamelCase) {
        issues.push({
          type: 'directory',
          path: fullPath,
          issue: 'Nombre de carpeta debe ser todo minúsculas, todo mayúsculas, o camelCase'
        });
      }
      
      // Recursión para subdirectorios
      checkCaseSensitivity(fullPath, issues);
    } else {
      // Verificar nombres de archivos
      const ext = path.extname(item);
      const name = path.basename(item, ext);
      
      // Reglas específicas para diferentes tipos de archivos
      if (ext === '.tsx' || (ext === '.ts' && !item.endsWith('.d.ts'))) {
        // Excluir archivos en ciertos directorios como data, utils, hooks, etc.
        const parentDir = path.basename(dir);
        if (['data', 'utils', 'hooks', 'lib', 'config'].includes(parentDir)) {
          return; // Skip validation for files in these directories
        }
        
        // Solo verificar componentes React principales (no archivos de configuración)
        if (!['main', 'index', 'vite-env', 'app'].includes(name.toLowerCase())) {
          // Componentes React deben usar PascalCase
          if (name !== name.charAt(0).toUpperCase() + name.slice(1)) {
            issues.push({
              type: 'component',
              path: fullPath,
              issue: 'Componente React debe usar PascalCase'
            });
          }
        }
      } else if (ext === '.css') {
        // Solo verificar archivos CSS de componentes principales
        if (!['index', 'app'].includes(name.toLowerCase())) {
          // Archivos CSS deben usar camelCase o kebab-case
          if (name !== name.toLowerCase() && name !== name.replace(/([A-Z])/g, '-$1').toLowerCase()) {
            issues.push({
              type: 'css',
              path: fullPath,
              issue: 'Archivo CSS debe usar camelCase o kebab-case'
            });
          }
        }
      }
    }
  });
  
  return issues;
}

function checkImports(dir, issues = []) {
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      checkImports(fullPath, issues);
    } else if (path.extname(item) === '.tsx' || path.extname(item) === '.ts') {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;
        let match;
        
        while ((match = importRegex.exec(content)) !== null) {
          const importPath = match[1];
          
          // Verificar importaciones relativas
          if (importPath.startsWith('./') || importPath.startsWith('../')) {
            const resolvedPath = path.resolve(path.dirname(fullPath), importPath);
            
            // Verificar si el archivo existe
            if (!fs.existsSync(resolvedPath) && !fs.existsSync(resolvedPath + '.tsx') && !fs.existsSync(resolvedPath + '.ts')) {
              issues.push({
                type: 'import',
                path: fullPath,
                issue: `Importación no encontrada: ${importPath}`
              });
            }
          }
        }
      } catch (error) {
        issues.push({
          type: 'error',
          path: fullPath,
          issue: `Error leyendo archivo: ${error.message}`
        });
      }
    }
  });
  
  return issues;
}

// Función principal
function main() {
  log('🔍 Verificando consistencia de nombres de archivos...', 'blue');
  
  const srcDir = path.join(__dirname, '..', 'src');
  
  if (!fs.existsSync(srcDir)) {
    log('❌ No se encontró el directorio src/', 'red');
    process.exit(1);
  }
  
  // Verificar case-sensitivity
  const caseIssues = checkCaseSensitivity(srcDir);
  
  // Verificar importaciones
  const importIssues = checkImports(srcDir);
  
  // Mostrar resultados
  const totalIssues = caseIssues.length + importIssues.length;
  
  if (totalIssues === 0) {
    log('✅ No se encontraron problemas de case-sensitivity', 'green');
  } else {
    log(`❌ Se encontraron ${totalIssues} problemas:`, 'red');
    
    if (caseIssues.length > 0) {
      log('\n📁 Problemas de nombres de archivos:', 'yellow');
      caseIssues.forEach(issue => {
        log(`  - ${issue.path}: ${issue.issue}`, 'red');
      });
    }
    
    if (importIssues.length > 0) {
      log('\n📦 Problemas de importaciones:', 'yellow');
      importIssues.forEach(issue => {
        log(`  - ${issue.path}: ${issue.issue}`, 'red');
      });
    }
    
    log('\n💡 Recomendaciones:', 'blue');
    log('  1. Usa PascalCase para componentes React (.tsx)', 'blue');
    log('  2. Usa camelCase o kebab-case para archivos CSS', 'blue');
    log('  3. Verifica que todas las importaciones apunten a archivos existentes', 'blue');
    log('  4. En Linux, ejecuta: git config core.ignorecase false', 'blue');
    
    log('\n🚫 La ejecución se detiene debido a problemas encontrados', 'red');
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = { checkCaseSensitivity, checkImports }; 