#!/usr/bin/env node

/**
 * Script de build personalizado para contornar problemas do Rollup na Vercel
 * Este script força a instalação correta das dependências antes do build
 */

import { execSync } from 'child_process';
import { existsSync, writeFileSync } from 'fs';
import { join } from 'path';

const log = (message) => console.log(`[BUILD-VERCEL] ${message}`);

try {
  log('🚀 Iniciando build personalizado para Vercel...');

  // Verificar se o Rollup está funcionando corretamente
  log('⚙️ Verificando instalação do Rollup...');
  
  try {
    execSync('npx rollup --version', { stdio: 'pipe' });
    log('✅ Rollup está funcionando corretamente');
  } catch (error) {
    log('⚠️ Problema detectado com o Rollup, reinstalando dependências...');
    
    // Limpar cache e reinstalar
    if (existsSync('node_modules')) {
      log('🧹 Removendo node_modules...');
      execSync('rmdir /s /q node_modules', { stdio: 'inherit' });
    }
    
    if (existsSync('package-lock.json')) {
      log('🧹 Removendo package-lock.json...');
      execSync('del package-lock.json', { stdio: 'inherit' });
    }
    
    log('📦 Reinstalando dependências com configurações otimizadas...');
    execSync('npm install --omit=optional --no-fund --no-audit', { 
      stdio: 'inherit'
    });
  }

  // 2. Executar TypeScript build
  log('🔨 Executando TypeScript build...');
  execSync('npx tsc -b', { stdio: 'inherit' });
  log('✅ TypeScript build concluído');

  // 3. Executar Vite build
  log('🔨 Executando Vite build...');
  execSync('npx vite build', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production'
    }
  });
  log('✅ Vite build concluído');

  log('🎉 Build personalizado concluído com sucesso!');

} catch (error) {
  log(`❌ Erro durante o build: ${error.message}`);
  process.exit(1);
}