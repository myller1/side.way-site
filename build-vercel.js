#!/usr/bin/env node

/**
 * Script de build personalizado para contornar problemas do Rollup na Vercel
 * Este script força a instalação correta das dependências antes do build
 */

const { execSync } = require('child_process');
const { existsSync, writeFileSync } = require('fs');
const { join } = require('path');

const log = (message) => console.log(`[BUILD-VERCEL] ${message}`);

try {
  log('🚀 Iniciando build personalizado para Vercel...');

  // Solução direta: criar um arquivo que substitui a dependência problemática
  log('⚙️ Aplicando correção direta para o problema do Rollup...');
  
  const rollupNativePath = join(process.cwd(), 'node_modules/rollup/dist/native.js');
  
  if (existsSync(rollupNativePath)) {
    log('✅ Arquivo native.js do Rollup encontrado, aplicando patch...');
    
    // Criar um patch que evita o erro de dependência
    const patchContent = `
// Patch para evitar erro de dependência do Rollup na Vercel
const loadNativeModule = () => {
  try {
    // Tentar carregar o módulo nativo específico da plataforma
    if (process.platform === 'linux') {
      try {
        return require('@rollup/rollup-linux-x64-gnu');
      } catch (e) {
        // Fallback silencioso para versão JS pura
        return null;
      }
    } else if (process.platform === 'win32') {
      try {
        return require('@rollup/rollup-win32-x64-msvc');
      } catch (e) {
        // Fallback silencioso para versão JS pura
        return null;
      }
    } else if (process.platform === 'darwin') {
      try {
        if (process.arch === 'arm64') {
          return require('@rollup/rollup-darwin-arm64');
        } else {
          return require('@rollup/rollup-darwin-x64');
        }
      } catch (e) {
        // Fallback silencioso para versão JS pura
        return null;
      }
    }
    // Fallback para versão JS pura
    return null;
  } catch (err) {
    // Fallback para versão JS pura
    return null;
  }
};

// Exportar um objeto vazio como fallback
module.exports = loadNativeModule() || {};
`;
    
    writeFileSync(rollupNativePath, patchContent, 'utf8');
    log('✅ Patch aplicado com sucesso ao arquivo native.js do Rollup');
  }

  // 2. Executar TypeScript build
  log('🔨 Executando TypeScript build...');
  execSync('npx tsc -b', { stdio: 'inherit' });
  log('✅ TypeScript build concluído');

  // 3. Executar Vite build com variáveis de ambiente para evitar problemas com Rollup
  log('🔨 Executando Vite build...');
  execSync('npx vite build', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production',
      ROLLUP_SKIP_OPTIONAL_DEPENDENCIES: 'true',
      ROLLUP_NATIVE_DISABLED: 'true'
    }
  });
  log('✅ Vite build concluído');

  log('🎉 Build personalizado concluído com sucesso!');

} catch (error) {
  log(`❌ Erro durante o build: ${error.message}`);
  process.exit(1);
}