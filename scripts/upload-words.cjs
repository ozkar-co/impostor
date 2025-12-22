#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Colores para la consola
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function uploadWords() {
  log('\n📚 Script para subir palabras a la Base de Datos\n', 'cyan');

  try {
    // Solicitar credenciales
    const username = await question('Ingresa tu usuario: ');
    const password = await question('Ingresa tu contraseña: ');

    if (!username.trim() || !password.trim()) {
      log('❌ Usuario y contraseña son requeridos', 'red');
      process.exit(1);
    }

    log('\n🔐 Autenticando...', 'blue');

    // Autenticar
    const loginResponse = await fetch('https://forja-api.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.trim(),
        password: password.trim(),
        site: 'impostor'
      })
    });

    if (!loginResponse.ok) {
      const error = await loginResponse.json().catch(() => ({ message: 'Error de autenticación' }));
      log(`❌ Error: ${error.message || 'No se pudo autenticar'}`, 'red');
      process.exit(1);
    }

    const { token } = await loginResponse.json();
    log('✅ Autenticación exitosa\n', 'green');

    // Cargar palabras desde el archivo
    const wordsPath = path.join(__dirname, '..', 'src', 'data', 'words.ts');
    const wordsContent = fs.readFileSync(wordsPath, 'utf8');

    // Extraer el array de palabras usando regex
    const arrayMatch = wordsContent.match(/export const words: string\[\] = \[([\s\S]*)\];/);
    if (!arrayMatch) {
      log('❌ No se pudo parsear el archivo de palabras', 'red');
      process.exit(1);
    }

    // Procesar las palabras
    const words = arrayMatch[1]
      .split(',')
      .map(word => word.trim())
      .filter(word => word.length > 0)
      .map(word => word.replace(/^["']|["']$/g, ''))
      .filter(word => word.length > 0);

    log(`📖 Se encontraron ${colors.cyan}${words.length}${colors.reset} palabras para subir\n`, 'yellow');

    // Crear lotes de palabras (máximo 50 por solicitud)
    const batchSize = 50;
    const batches = [];
    for (let i = 0; i < words.length; i += batchSize) {
      batches.push(words.slice(i, i + batchSize));
    }

    log(`📦 Se crearán ${colors.cyan}${batches.length}${colors.reset} solicitud(es) de carga\n`, 'blue');

    let uploadedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    // Subir en lotes
    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];
      const palabrasData = batch.map(palabra => ({
        palabra: palabra.trim(),
        categoria: 'pop-culture'
      }));

      try {
        log(`\n📤 Cargando lote ${batchIndex + 1}/${batches.length} (${batch.length} palabras)...`, 'blue');

        const uploadResponse = await fetch('https://forja-api.onrender.com/impostor/palabras', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ palabras: palabrasData })
        });

        if (!uploadResponse.ok) {
          const error = await uploadResponse.json().catch(() => ({ message: 'Error desconocido' }));
          log(`⚠️  Error en lote ${batchIndex + 1}: ${error.message}`, 'yellow');
          errorCount += batch.length;
          continue;
        }

        const result = await uploadResponse.json();
        
        if (result.palabras) {
          // Contar palabras subidas vs duplicadas
          const uploaded = result.palabras.filter(p => p).length;
          const skipped = batch.length - uploaded;
          
          uploadedCount += uploaded;
          skippedCount += skipped;

          if (uploaded > 0) {
            log(`✅ Lote ${batchIndex + 1}: ${uploaded} palabra(s) subida(s)`, 'green');
          }
          if (skipped > 0) {
            log(`⏭️  Lote ${batchIndex + 1}: ${skipped} palabra(s) ya existía(n)`, 'yellow');
          }
        }

        // Pequeña pausa entre solicitudes para no sobrecargar el servidor
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        log(`❌ Error al subir lote ${batchIndex + 1}: ${error.message}`, 'red');
        errorCount += batch.length;
      }
    }

    // Resumen final
    log('\n' + '='.repeat(50), 'cyan');
    log('📊 RESUMEN DE CARGA', 'cyan');
    log('='.repeat(50), 'cyan');
    log(`✅ Palabras subidas: ${colors.green}${uploadedCount}${colors.reset}`);
    log(`⏭️  Palabras duplicadas: ${colors.yellow}${skippedCount}${colors.reset}`);
    if (errorCount > 0) {
      log(`❌ Errores: ${colors.red}${errorCount}${colors.reset}`);
    }
    log(`📚 Total procesado: ${colors.cyan}${uploadedCount + skippedCount + errorCount}${colors.reset} de ${colors.cyan}${words.length}${colors.reset}`);
    log('='.repeat(50), 'cyan');

    if (uploadedCount > 0) {
      log(`\n🎉 ¡Éxito! Se subieron ${uploadedCount} nueva(s) palabra(s) a la base de datos`, 'green');
    }

    if (uploadedCount === 0 && skippedCount > 0) {
      log('\n⚠️  Todas las palabras ya existen en la base de datos', 'yellow');
    }

  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  uploadWords();
}

module.exports = { uploadWords };
