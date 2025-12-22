#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { execSync } from 'child_process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function runCommand(command) {
  try {
    return execSync(command, { encoding: 'utf8', stdio: 'pipe' });
  } catch (error) {
    throw new Error(`Comando falló: ${command}\n${error.message}`);
  }
}

async function checkFirebaseAuth() {
  try {
    console.log('🔐 Verificando autenticación de Firebase...');
    const result = runCommand('firebase projects:list');
    return true;
  } catch (error) {
    console.error('❌ No estás autenticado en Firebase');
    console.log('💡 Ejecuta: firebase login');
    return false;
  }
}

async function checkProjectExists(projectId) {
  try {
    console.log(`🔍 Verificando que el proyecto "${projectId}" existe...`);
    const result = runCommand(`firebase projects:list`);
    
    if (result.includes(projectId)) {
      console.log(`✅ Proyecto "${projectId}" encontrado`);
      return true;
    } else {
      console.error(`❌ Proyecto "${projectId}" no encontrado`);
      console.log('💡 Verifica que el proyecto exista en Firebase Console');
      return false;
    }
  } catch (error) {
    console.error('❌ Error al verificar el proyecto:', error.message);
    return false;
  }
}

function updateIndexHtml(projectName) {
  try {
    console.log('📝 Actualizando index.html...');
    const indexPath = path.join(process.cwd(), 'index.html');
    let htmlContent = fs.readFileSync(indexPath, 'utf8');
    
    // Actualizar el título
    htmlContent = htmlContent.replace(
      /<title>.*?<\/title>/,
      `<title>${projectName}</title>`
    );
    
    fs.writeFileSync(indexPath, htmlContent);
    console.log('✅ index.html actualizado');
  } catch (error) {
    console.error('❌ Error al actualizar index.html:', error.message);
  }
}

function updateMainTsx(projectName) {
  try {
    console.log('📝 Actualizando Main.tsx...');
    const mainPath = path.join(process.cwd(), 'src/components/Main.tsx');
    let tsxContent = fs.readFileSync(mainPath, 'utf8');
    
    // Actualizar el h1 con el nombre en mayúsculas
    const upperProjectName = projectName.toUpperCase();
    tsxContent = tsxContent.replace(
      /<h1 className="title">.*?<\/h1>/,
      `<h1 className="title">${upperProjectName}</h1>`
    );
    
    fs.writeFileSync(mainPath, tsxContent);
    console.log('✅ Main.tsx actualizado');
  } catch (error) {
    console.error('❌ Error al actualizar Main.tsx:', error.message);
  }
}

async function setupFirebase() {
  console.log('🚀 Configuración de Firebase para nuevo proyecto\n');
  
  try {
    // Verificar autenticación
    const isAuthenticated = await checkFirebaseAuth();
    if (!isAuthenticated) {
      process.exit(1);
    }
    
    // Solicitar nombre del proyecto (para mostrar en la UI)
    const projectDisplayName = await question('Ingresa el nombre de tu proyecto (para mostrar en la UI): ');
    
    if (!projectDisplayName.trim()) {
      console.error('❌ El nombre del proyecto no puede estar vacío');
      process.exit(1);
    }
    
    // Solicitar ID del proyecto Firebase
    const projectId = await question('Ingresa el ID de tu proyecto Firebase: ');
    
    if (!projectId.trim()) {
      console.error('❌ El ID del proyecto no puede estar vacío');
      process.exit(1);
    }
    
    // Verificar que el proyecto existe
    const projectExists = await checkProjectExists(projectId);
    if (!projectExists) {
      process.exit(1);
    }
    
    // Usar el ID del proyecto tal como está
    const siteId = projectId;
    
    // Configuración para firebase.json
    const firebaseConfig = {
      hosting: {
        public: "dist",
        site: siteId,
        ignore: [
          "firebase.json",
          "**/.*",
          "**/node_modules/**"
        ],
        rewrites: [
          {
            source: "**",
            destination: "/index.html"
          }
        ],
        headers: [
          {
            source: "**/*.@(js|css)",
            headers: [
              {
                key: "Cache-Control",
                value: "max-age=31536000"
              }
            ]
          }
        ]
      }
    };
    
    // Configuración para .firebaserc
    const firebasercConfig = {
      projects: {
        default: projectId
      }
    };
    
    // Actualizar archivos del proyecto
    updateIndexHtml(projectDisplayName);
    updateMainTsx(projectDisplayName);
    
    // Escribir firebase.json
    fs.writeFileSync(
      path.join(process.cwd(), 'firebase.json'),
      JSON.stringify(firebaseConfig, null, 2)
    );
    
    // Escribir .firebaserc
    fs.writeFileSync(
      path.join(process.cwd(), '.firebaserc'),
      JSON.stringify(firebasercConfig, null, 2)
    );
    
    console.log('\n✅ Configuración completada exitosamente!');
    console.log(`📁 Nombre del proyecto: ${projectDisplayName}`);
    console.log(`🔧 ID del proyecto Firebase: ${projectId}`);
    console.log(`🌐 ID del sitio: ${siteId}`);
    console.log('\n📝 Archivos actualizados:');
    console.log('   - firebase.json');
    console.log('   - .firebaserc');
    console.log('   - index.html');
    console.log('   - src/components/Main.tsx');
    console.log('\n🚀 Próximos pasos:');
    console.log('   1. Ejecuta: npm start (para desarrollo)');
    console.log('   2. Ejecuta: npm run deploy (para desplegar)');
    
  } catch (error) {
    console.error('❌ Error durante la configuración:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Ejecutar el script
setupFirebase(); 