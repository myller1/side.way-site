#!/usr/bin/env node

/**
 * Script de build personalizado para contornar problemas do Rollup na Vercel
 * Este script força a instalação correta das dependências antes do build
 */

import { execSync } from 'child_process';
import { existsSync, rmSync } from 'fs';
import { join } from 'path';

const log = (message) => console.log(`[BUILD-VERCEL] ${message}`);

try {
  log('🚀 Iniciando build personalizado para Vercel...');

  // 1. Verificar se existe problema com dependências do Rollup
  const nodeModulesPath = join(process.cwd(), 'node_modules');
  const rollupPath = join(nodeModulesPath, 'rollup');
  
  if (existsSync(rollupPath)) {
    log('✅ Rollup encontrado, verificando dependências...');
    
    try {
      // Tentar importar o Rollup para verificar se está funcionando
      await import('rollup');
      log('✅ Rollup está funcionando corretamente');
    } catch (error) {
      if (error.message.includes('@rollup/rollup-linux-x64-gnu')) {
        log('⚠️  Problema detectado com dependências do Rollup, aplicando correção...');
        
        // Remover node_modules e package-lock.json
        if (existsSync(nodeModulesPath)) {
          log('🧹 Removendo node_modules...');
          rmSync(nodeModulesPath, { recursive: true, force: true });
        }
        
        const lockFile = join(process.cwd(), 'package-lock.json');
        if (existsSync(lockFile)) {
          log('🧹 Removendo package-lock.json...');
          rmSync(lockFile, { force: true });
        }
        
        // Reinstalar dependências com configurações específicas
        log('📦 Reinstalando dependências com configurações otimizadas...');
        execSync('npm install --no-optional --ignore-scripts --prefer-offline=false', {
          stdio: 'inherit',
          env: {
            ...process.env,
            NPM_CONFIG_OPTIONAL: 'false',
            NPM_CONFIG_IGNORE_OPTIONAL: 'true',
            NPM_CONFIG_TARGET_PLATFORM: 'linux',
            NPM_CONFIG_TARGET_ARCH: 'x64'
          }
        });
        
        log('✅ Dependências reinstaladas com sucesso');
      } else {
        throw error;
      }
    }
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