# 🌟 Guia Completo: ES Modules - Sistema de Módulos Moderno do JavaScript

## 🎯 Introdução aos ES Modules

ES Modules (ECMAScript Modules) é o sistema de módulos oficial do JavaScript, introduzido no ES2015 (ES6). Representa o futuro da modularização em JavaScript, oferecendo análise estática, tree shaking e carregamento assíncrono.

### 🚀 Características dos ES Modules

- **Análise estática**: Importações/exportações são analisadas em tempo de compilação
- **Tree shaking**: Eliminação automática de código não utilizado
- **Carregamento assíncrono**: Módulos são carregados de forma não-bloqueante
- **Hoisting**: Importações são "içadas" para o topo do módulo
- **Strict mode**: Executam automaticamente em modo estrito
- **Top-level await**: Suporte nativo para await no nível superior

## 📚 Índice

1. [Configuração Inicial](#configuração-inicial)
2. [Sintaxe de Exportação](#sintaxe-de-exportação)
3. [Sintaxe de Importação](#sintaxe-de-importação)
4. [Padrões Avançados](#padrões-avançados)
5. [Dynamic Imports](#dynamic-imports)
6. [Top-level Await](#top-level-await)
7. [Interoperabilidade](#interoperabilidade)
8. [Exemplos Práticos](#exemplos-práticos)
9. [Ferramentas e Build](#ferramentas-e-build)
10. [Boas Práticas](#boas-práticas)

## ⚙️ Configuração Inicial

### Habilitando ES Modules no Node.js

#### Opção 1: package.json

```json
{
  "name": "meu-projeto-esm",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
```

#### Opção 2: Extensão .mjs

```javascript
// arquivo.mjs - automaticamente tratado como ES Module
import { readFile } from 'fs/promises';

const data = await readFile('config.json', 'utf8');
console.log(JSON.parse(data));
```

#### Opção 3: Flags do Node.js

```bash
# Usando flag experimental (versões antigas)
node --experimental-modules arquivo.js

# Node.js 14+ com package.json configurado
node index.js
```

## 📤 Sintaxe de Exportação

### 1. Exportações Nomeadas

```javascript
// math.js - Exportações nomeadas individuais
export const PI = 3.14159265359;
export const E = 2.71828182846;

export function somar(a, b) {
    return a + b;
}

export function subtrair(a, b) {
    return a - b;
}

export class Calculadora {
    constructor() {
        this.historico = [];
    }

    calcular(operacao, a, b) {
        const resultado = operacao(a, b);
        this.historico.push({ operacao: operacao.name, a, b, resultado });
        return resultado;
    }
}
```

### 2. Exportações em Lote

```javascript
// utils.js - Exportações em lote
function capitalizar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function toCamelCase(str) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

function toKebabCase(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

const TIPOS_FORMATO = {
    CAMEL: 'camelCase',
    KEBAB: 'kebab-case',
    SNAKE: 'snake_case'
};

// Exportar tudo de uma vez
export {
    capitalizar,
    toCamelCase,
    toKebabCase,
    TIPOS_FORMATO
};
```

### 3. Exportações com Renomeação

```javascript
// api.js - Exportações com alias
function buscarUsuario(id) {
    return fetch(`/api/users/${id}`);
}

function criarUsuario(dados) {
    return fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(dados)
    });
}

function atualizarUsuario(id, dados) {
    return fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dados)
    });
}

// Exportar com nomes mais claros
export {
    buscarUsuario as getUser,
    criarUsuario as createUser,
    atualizarUsuario as updateUser
};
```

### 4. Exportação Default

```javascript
// logger.js - Exportação default + nomeadas
class Logger {
    constructor(level = 'info') {
        this.level = level;
        this.levels = ['error', 'warn', 'info', 'debug'];
    }

    log(level, message, ...args) {
        if (this.shouldLog(level)) {
            console.log(`[${new Date().toISOString()}] ${level.toUpperCase()}:`, message, ...args);
        }
    }

    shouldLog(level) {
        return this.levels.indexOf(level) <= this.levels.indexOf(this.level);
    }

    error(message, ...args) {
        this.log('error', message, ...args);
    }

    warn(message, ...args) {
        this.log('warn', message, ...args);
    }

    info(message, ...args) {
        this.log('info', message, ...args);
    }

    debug(message, ...args) {
        this.log('debug', message, ...args);
    }
}

// Exportação default
export default Logger;

// Exportações nomeadas adicionais
export const LOG_LEVELS = ['error', 'warn', 'info', 'debug'];
export const createLogger = (level) => new Logger(level);
```

### 5. Re-exportações

```javascript
// index.js - Barrel exports
export * from './math.js';
export * from './utils.js';
export { default as Logger } from './logger.js';
export { getUser, createUser } from './api.js';

// Re-exportação com renomeação
export { default as Calculator } from './calculator.js';
export { PI as MATH_PI } from './constants.js';
```

## 📥 Sintaxe de Importação

### 1. Importações Nomeadas

```javascript
// main.js - Importações nomeadas
import { somar, subtrair, PI, Calculadora } from './math.js';
import { capitalizar, toCamelCase, TIPOS_FORMATO } from './utils.js';

console.log(somar(10, 5)); // 15
console.log(PI); // 3.14159265359

const calc = new Calculadora();
const resultado = calc.calcular(somar, 20, 10);
```

### 2. Importação Default

```javascript
// app.js - Importação default
import Logger from './logger.js';
import express from 'express';
import fs from 'fs/promises';

const logger = new Logger('debug');
const app = express();

logger.info('Aplicação iniciando...');
```

### 3. Importação Mista

```javascript
// service.js - Importação default + nomeadas
import Logger, { LOG_LEVELS, createLogger } from './logger.js';
import Calculator, { PI, E } from './math.js';

const logger = createLogger('info');
const calc = new Calculator();

logger.info('Serviço inicializado');
console.log('Constantes matemáticas:', { PI, E });
```

### 4. Importação com Alias

```javascript
// components.js - Importação com renomeação
import { 
    somar as adicionar,
    subtrair as diminuir,
    Calculadora as Calc
} from './math.js';

import { 
    capitalizar as capitalize,
    toCamelCase as camelCase
} from './utils.js';

const resultado = adicionar(10, 5);
const texto = capitalize('hello world');
```

### 5. Importação Namespace

```javascript
// app.js - Importar tudo como namespace
import * as Math from './math.js';
import * as Utils from './utils.js';
import * as API from './api.js';

console.log(Math.PI);
console.log(Math.somar(5, 3));

const calc = new Math.Calculadora();
const textoFormatado = Utils.capitalizar('teste');

const user = await API.getUser(123);
```

### 6. Importação de Módulos do Core

```javascript
// server.js - Módulos do Node.js core
import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { EventEmitter } from 'events';

// Equivalente ao __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = await readFile(join(__dirname, 'config.json'), 'utf8');
```

## 🔄 Padrões Avançados

### 1. Conditional Exports (package.json)

```json
{
  "name": "minha-lib",
  "type": "module",
  "exports": {
    ".": {
      "import": "./lib/index.js",
      "require": "./lib/index.cjs"
    },
    "./utils": {
      "import": "./lib/utils.js",
      "require": "./lib/utils.cjs"
    },
    "./package.json": "./package.json"
  }
}
```

### 2. Subpath Imports

```json
{
  "imports": {
    "#src/*": "./src/*",
    "#utils/*": "./src/utils/*",
    "#models/*": "./src/models/*",
    "#config": "./src/config/index.js"
  }
}
```

```javascript
// Usando subpath imports
import { User } from '#models/User.js';
import { logger } from '#utils/logger.js';
import config from '#config';
```

### 3. Feature Detection

```javascript
// feature-detection.js
export async function hasFeature(feature) {
    try {
        switch (feature) {
            case 'crypto':
                await import('crypto');
                return true;
            case 'fs':
                await import('fs/promises');
                return true;
            default:
                return false;
        }
    } catch {
        return false;
    }
}

// Uso
const hasCrypto = await hasFeature('crypto');
if (hasCrypto) {
    const { randomBytes } = await import('crypto');
    console.log(randomBytes(16).toString('hex'));
}
```

## ⚡ Dynamic Imports

### 1. Importação Condicional

```javascript
// dynamic-loading.js
async function loadModule(condition) {
    if (condition === 'development') {
        const devTools = await import('./dev-tools.js');
        devTools.setupDevEnvironment();
    } else if (condition === 'production') {
        const prodTools = await import('./prod-tools.js');
        prodTools.setupProdEnvironment();
    }
}

// Carregar plugins baseado na configuração
async function loadPlugins(pluginNames) {
    const plugins = await Promise.all(
        pluginNames.map(name => import(`./plugins/${name}.js`))
    );
    
    return plugins.map(plugin => plugin.default);
}

// Lazy loading de componentes
const componentsCache = new Map();

async function getComponent(name) {
    if (!componentsCache.has(name)) {
        const component = await import(`./components/${name}.js`);
        componentsCache.set(name, component.default);
    }
    return componentsCache.get(name);
}
```

### 2. Error Handling com Dynamic Imports

```javascript
// safe-import.js
export async function safeImport(modulePath, fallback = null) {
    try {
        const module = await import(modulePath);
        return module;
    } catch (error) {
        console.warn(`Falha ao carregar módulo ${modulePath}:`, error.message);
        
        if (typeof fallback === 'function') {
            return { default: fallback };
        }
        
        return fallback;
    }
}

// Uso
const math = await safeImport('./advanced-math.js', () => ({
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b
}));

console.log(math.default.multiply(5, 3));
```

### 3. Module Federation Pattern

```javascript
// module-registry.js
class ModuleRegistry {
    constructor() {
        this.modules = new Map();
        this.loading = new Map();
    }

    async register(name, importFn) {
        if (this.loading.has(name)) {
            return this.loading.get(name);
        }

        if (this.modules.has(name)) {
            return this.modules.get(name);
        }

        const loadingPromise = this.loadModule(name, importFn);
        this.loading.set(name, loadingPromise);

        try {
            const module = await loadingPromise;
            this.modules.set(name, module);
            this.loading.delete(name);
            return module;
        } catch (error) {
            this.loading.delete(name);
            throw error;
        }
    }

    async loadModule(name, importFn) {
        console.log(`Carregando módulo: ${name}`);
        const module = await importFn();
        console.log(`Módulo carregado: ${name}`);
        return module;
    }

    get(name) {
        return this.modules.get(name);
    }

    has(name) {
        return this.modules.has(name);
    }

    clear() {
        this.modules.clear();
        this.loading.clear();
    }
}

export const registry = new ModuleRegistry();

// Uso
await registry.register('utils', () => import('./utils.js'));
await registry.register('api', () => import('./api.js'));

const utils = registry.get('utils');
```

## 🔝 Top-level Await

### 1. Configuração Assíncrona

```javascript
// config.js - Carregamento assíncrono de configuração
import { readFile } from 'fs/promises';
import { join } from 'path';

// Top-level await - sem necessidade de função async
const configData = await readFile(join(process.cwd(), 'config.json'), 'utf8');
const config = JSON.parse(configData);

// Configuração de banco de dados assíncrona
const dbConfig = await fetch('http://config-server/db-config').then(r => r.json());

export default {
    ...config,
    database: dbConfig
};
```

### 2. Inicialização de Recursos

```javascript
// database.js - Inicialização assíncrona
import { MongoClient } from 'mongodb';
import config from './config.js';

// Conectar ao banco no carregamento do módulo
const client = new MongoClient(config.database.url);
await client.connect();

console.log('Conectado ao banco de dados');

export const db = client.db(config.database.name);
export const users = db.collection('users');
export const products = db.collection('products');

// Cleanup no processo
process.on('SIGINT', async () => {
    await client.close();
    process.exit(0);
});
```

### 3. Pre-loading de Dados

```javascript
// data-loader.js - Pré-carregamento de dados
import { readFile } from 'fs/promises';

// Carregar dados estáticos no momento da importação
const countries = JSON.parse(await readFile('./data/countries.json', 'utf8'));
const currencies = JSON.parse(await readFile('./data/currencies.json', 'utf8'));

// Dados calculados
const countryMap = new Map(countries.map(c => [c.code, c]));
const currencyMap = new Map(currencies.map(c => [c.code, c]));

export {
    countries,
    currencies,
    countryMap,
    currencyMap
};

export function getCountry(code) {
    return countryMap.get(code);
}

export function getCurrency(code) {
    return currencyMap.get(code);
}
```

## 🔗 Interoperabilidade

### 1. ES Modules + CommonJS

```javascript
// wrapper.js - Wrapping CommonJS para ES Modules
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Importar módulos CommonJS
const lodash = require('lodash');
const moment = require('moment');

// Wrapper para exportar como ES Module
export const _ = lodash;
export const formatDate = (date) => moment(date).format('YYYY-MM-DD');

// Função para carregar CommonJS dinamicamente
export async function loadCommonJS(moduleName) {
    const require = createRequire(import.meta.url);
    return require(moduleName);
}
```

### 2. Detecção de Tipo de Módulo

```javascript
// module-utils.js
export function isESModule(obj) {
    return obj && typeof obj === 'object' && '__esModule' in obj;
}

export async function importModule(path) {
    try {
        // Tentar como ES Module primeiro
        const module = await import(path);
        return module;
    } catch (esError) {
        try {
            // Fallback para CommonJS
            const require = createRequire(import.meta.url);
            const module = require(path);
            return { default: module };
        } catch (cjsError) {
            throw new Error(`Não foi possível carregar módulo: ${path}`);
        }
    }
}
```

### 3. Polyfill para __dirname e __filename

```javascript
// path-utils.js
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

// Utility functions
export function resolvePath(...paths) {
    return join(__dirname, ...paths);
}

export function getProjectRoot() {
    let currentDir = __dirname;
    
    while (currentDir !== dirname(currentDir)) {
        try {
            const packagePath = join(currentDir, 'package.json');
            await import(packagePath, { assert: { type: 'json' } });
            return currentDir;
        } catch {
            currentDir = dirname(currentDir);
        }
    }
    
    return __dirname;
}
```

## 💡 Exemplos Práticos

### Exemplo 1: Sistema de Plugins Modular

```javascript
// plugin-system.js
class PluginSystem {
    constructor() {
        this.plugins = new Map();
        this.hooks = new Map();
    }

    async loadPlugin(name, path) {
        try {
            const pluginModule = await import(path);
            const plugin = pluginModule.default;

            if (typeof plugin.init === 'function') {
                await plugin.init(this);
            }

            this.plugins.set(name, plugin);
            
            // Registrar hooks
            if (plugin.hooks) {
                for (const [hookName, handler] of Object.entries(plugin.hooks)) {
                    this.addHook(hookName, handler);
                }
            }

            console.log(`Plugin ${name} carregado com sucesso`);
            return plugin;
        } catch (error) {
            console.error(`Erro ao carregar plugin ${name}:`, error);
            throw error;
        }
    }

    addHook(name, handler) {
        if (!this.hooks.has(name)) {
            this.hooks.set(name, []);
        }
        this.hooks.get(name).push(handler);
    }

    async executeHook(name, data) {
        const handlers = this.hooks.get(name) || [];
        
        for (const handler of handlers) {
            try {
                data = await handler(data) || data;
            } catch (error) {
                console.error(`Erro no hook ${name}:`, error);
            }
        }
        
        return data;
    }

    getPlugin(name) {
        return this.plugins.get(name);
    }
}

export default PluginSystem;

// example-plugin.js
export default {
    name: 'ExamplePlugin',
    version: '1.0.0',
    
    async init(system) {
        console.log('Example Plugin inicializado');
    },
    
    hooks: {
        beforeProcess: async (data) => {
            console.log('Processando dados:', data);
            return { ...data, processed: true };
        },
        
        afterProcess: async (result) => {
            console.log('Resultado processado:', result);
            return result;
        }
    }
};
```

### Exemplo 2: Sistema de Roteamento Dinâmico

```javascript
// router.js
class Router {
    constructor() {
        this.routes = new Map();
        this.middleware = [];
    }

    async loadRoutes(routesDir) {
        const { readdir } = await import('fs/promises');
        const { join } = await import('path');
        
        try {
            const files = await readdir(routesDir);
            
            for (const file of files) {
                if (file.endsWith('.js')) {
                    const routePath = join(routesDir, file);
                    const routeModule = await import(routePath);
                    
                    if (routeModule.default) {
                        this.registerRoute(routeModule.default);
                    }
                }
            }
        } catch (error) {
            console.error('Erro ao carregar rotas:', error);
        }
    }

    registerRoute(route) {
        this.routes.set(route.path, route);
        console.log(`Rota registrada: ${route.method} ${route.path}`);
    }

    use(middleware) {
        this.middleware.push(middleware);
    }

    async handle(method, path, data) {
        const route = this.routes.get(path);
        
        if (!route || route.method !== method) {
            throw new Error(`Rota não encontrada: ${method} ${path}`);
        }

        // Executar middleware
        let processedData = data;
        for (const mw of this.middleware) {
            processedData = await mw(processedData) || processedData;
        }

        // Executar handler da rota
        return await route.handler(processedData);
    }
}

export default Router;

// routes/users.js
export default {
    path: '/users',
    method: 'GET',
    async handler(data) {
        return {
            users: [
                { id: 1, name: 'João' },
                { id: 2, name: 'Maria' }
            ]
        };
    }
};

// routes/products.js
export default {
    path: '/products',
    method: 'GET',
    async handler(data) {
        const { default: ProductService } = await import('../services/ProductService.js');
        return await ProductService.getAll();
    }
};
```

### Exemplo 3: Cache Inteligente com Dynamic Imports

```javascript
// smart-cache.js
class SmartCache {
    constructor() {
        this.cache = new Map();
        this.strategies = new Map();
        this.defaultTTL = 5 * 60 * 1000; // 5 minutos
    }

    async loadStrategy(name) {
        if (this.strategies.has(name)) {
            return this.strategies.get(name);
        }

        try {
            const strategyModule = await import(`./cache-strategies/${name}.js`);
            const strategy = new strategyModule.default();
            this.strategies.set(name, strategy);
            return strategy;
        } catch (error) {
            console.warn(`Estratégia de cache ${name} não encontrada, usando padrão`);
            return this.getDefaultStrategy();
        }
    }

    getDefaultStrategy() {
        return {
            shouldCache: () => true,
            getTTL: () => this.defaultTTL,
            serialize: (data) => JSON.stringify(data),
            deserialize: (data) => JSON.parse(data)
        };
    }

    async set(key, value, strategyName = 'default') {
        const strategy = await this.loadStrategy(strategyName);
        
        if (strategy.shouldCache(key, value)) {
            const ttl = strategy.getTTL(key, value);
            const serialized = strategy.serialize(value);
            
            this.cache.set(key, {
                data: serialized,
                timestamp: Date.now(),
                ttl
            });
        }
    }

    async get(key, strategyName = 'default') {
        const entry = this.cache.get(key);
        
        if (!entry) {
            return null;
        }

        // Verificar TTL
        if (Date.now() - entry.timestamp > entry.ttl) {
            this.cache.delete(key);
            return null;
        }

        const strategy = await this.loadStrategy(strategyName);
        return strategy.deserialize(entry.data);
    }

    clear() {
        this.cache.clear();
    }

    size() {
        return this.cache.size;
    }
}

export default SmartCache;

// cache-strategies/memory.js
export default class MemoryStrategy {
    shouldCache(key, value) {
        return typeof value !== 'function';
    }

    getTTL(key, value) {
        return 10 * 60 * 1000; // 10 minutos
    }

    serialize(data) {
        return data;
    }

    deserialize(data) {
        return data;
    }
}

// cache-strategies/persistent.js
export default class PersistentStrategy {
    shouldCache(key, value) {
        return key.startsWith('config:') || key.startsWith('user:');
    }

    getTTL(key, value) {
        if (key.startsWith('config:')) {
            return 60 * 60 * 1000; // 1 hora
        }
        return 30 * 60 * 1000; // 30 minutos
    }

    serialize(data) {
        return JSON.stringify(data);
    }

    deserialize(data) {
        return JSON.parse(data);
    }
}
```

## 🛠️ Ferramentas e Build

### 1. Configuração com Vite

```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.js',
            formats: ['es', 'cjs'],
            fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
            external: ['fs', 'path', 'url'],
            output: {
                globals: {
                    fs: 'fs',
                    path: 'path',
                    url: 'url'
                }
            }
        }
    }
});
```

### 2. Configuração com Rollup

```javascript
// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/bundle.esm.js',
            format: 'es'
        },
        {
            file: 'dist/bundle.cjs.js',
            format: 'cjs'
        }
    ],
    plugins: [
        nodeResolve(),
        terser()
    ],
    external: ['fs', 'path', 'url']
};
```

### 3. TypeScript com ES Modules

```json
// tsconfig.json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "ESNext",
        "moduleResolution": "Node",
        "allowSyntheticDefaultImports": true,
        "esModuleInterop": true,
        "strict": true,
        "declaration": true,
        "outDir": "./dist",
        "rootDir": "./src",
        "baseUrl": "./",
        "paths": {
            "#src/*": ["./src/*"],
            "#utils/*": ["./src/utils/*"]
        }
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist"]
}
```

## ✅ Boas Práticas

### 1. Estrutura de Arquivos

```
projeto/
├── src/
│   ├── components/
│   │   ├── Button.js
│   │   ├── Modal.js
│   │   └── index.js          # Barrel export
│   ├── services/
│   │   ├── ApiService.js
│   │   ├── AuthService.js
│   │   └── index.js
│   ├── utils/
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   └── index.js
│   └── index.js              # Entry point principal
├── tests/
├── package.json
└── README.md
```

### 2. Barrel Exports Otimizados

```javascript
// src/components/index.js
// ✅ Bom: Re-exportações específicas
export { Button } from './Button.js';
export { Modal } from './Modal.js';
export { Form } from './Form.js';

// ❌ Evitar: Re-exportação de tudo pode afetar tree-shaking
// export * from './Button.js';
// export * from './Modal.js';
```

### 3. Lazy Loading Inteligente

```javascript
// ✅ Bom: Lazy loading baseado em uso
const componentsCache = new Map();

export async function getComponent(name) {
    if (!componentsCache.has(name)) {
        try {
            const component = await import(`./components/${name}.js`);
            componentsCache.set(name, component.default);
        } catch (error) {
            console.error(`Componente ${name} não encontrado`);
            return null;
        }
    }
    
    return componentsCache.get(name);
}

// ❌ Evitar: Importar tudo antecipadamente
// import Button from './Button.js';
// import Modal from './Modal.js';
// import Form from './Form.js';
```

### 4. Error Boundaries para Imports

```javascript
// import-utils.js
export class ImportError extends Error {
    constructor(module, originalError) {
        super(`Failed to import module: ${module}`);
        this.module = module;
        this.originalError = originalError;
    }
}

export async function safeImport(modulePath, options = {}) {
    const { retry = 0, fallback = null, timeout = 5000 } = options;
    
    for (let attempt = 0; attempt <= retry; attempt++) {
        try {
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Import timeout')), timeout);
            });
            
            const importPromise = import(modulePath);
            const module = await Promise.race([importPromise, timeoutPromise]);
            
            return module;
        } catch (error) {
            if (attempt === retry) {
                if (fallback) {
                    console.warn(`Using fallback for ${modulePath}`);
                    return fallback;
                }
                throw new ImportError(modulePath, error);
            }
            
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        }
    }
}
```

### 5. Performance Monitoring

```javascript
// performance-monitor.js
class ImportMonitor {
    constructor() {
        this.imports = new Map();
        this.startTime = Date.now();
    }

    async monitorImport(modulePath, importFn) {
        const start = performance.now();
        
        try {
            const module = await importFn();
            const end = performance.now();
            const duration = end - start;
            
            this.imports.set(modulePath, {
                duration,
                success: true,
                timestamp: Date.now()
            });
            
            if (duration > 1000) {
                console.warn(`Slow import detected: ${modulePath} (${duration.toFixed(2)}ms)`);
            }
            
            return module;
        } catch (error) {
            const end = performance.now();
            const duration = end - start;
            
            this.imports.set(modulePath, {
                duration,
                success: false,
                error: error.message,
                timestamp: Date.now()
            });
            
            throw error;
        }
    }

    getStats() {
        const stats = {
            totalImports: this.imports.size,
            successfulImports: 0,
            failedImports: 0,
            totalDuration: 0,
            slowImports: []
        };

        for (const [path, data] of this.imports) {
            if (data.success) {
                stats.successfulImports++;
            } else {
                stats.failedImports++;
            }
            
            stats.totalDuration += data.duration;
            
            if (data.duration > 1000) {
                stats.slowImports.push({ path, duration: data.duration });
            }
        }

        stats.averageDuration = stats.totalDuration / stats.totalImports;
        
        return stats;
    }
}

export const importMonitor = new ImportMonitor();

// Uso
const module = await importMonitor.monitorImport(
    './heavy-module.js',
    () => import('./heavy-module.js')
);
```

## 🔍 Debugging e Troubleshooting

### 1. Module Resolution Debugging

```javascript
// debug-imports.js
export function debugImport(modulePath) {
    console.log(`Attempting to import: ${modulePath}`);
    console.log(`Current working directory: ${process.cwd()}`);
    console.log(`Import meta URL: ${import.meta.url}`);
    
    return import(modulePath)
        .then(module => {
            console.log(`✅ Successfully imported: ${modulePath}`);
            console.log(`Exported keys:`, Object.keys(module));
            return module;
        })
        .catch(error => {
            console.error(`❌ Failed to import: ${modulePath}`);
            console.error(`Error:`, error.message);
            throw error;
        });
}

// Uso
const module = await debugImport('./utils/helpers.js');
```

### 2. Circular Dependency Detection

```javascript
// circular-detector.js
const importStack = [];

export function trackImport(modulePath) {
    if (importStack.includes(modulePath)) {
        const cycle = [...importStack, modulePath];
        console.error('🔄 Circular dependency detected:');
        console.error(cycle.join(' -> '));
        throw new Error(`Circular dependency: ${cycle.join(' -> ')}`);
    }
    
    importStack.push(modulePath);
    
    return {
        finish() {
            const index = importStack.indexOf(modulePath);
            if (index !== -1) {
                importStack.splice(index, 1);
            }
        }
    };
}

// Uso em módulos
const tracker = trackImport(import.meta.url);
try {
    // Fazer imports...
    const module = await import('./other-module.js');
} finally {
    tracker.finish();
}
```

## 📊 Comparação: ES Modules vs CommonJS

| Aspecto | ES Modules | CommonJS |
|---------|------------|----------|
| **Sintaxe** | `import`/`export` | `require()`/`module.exports` |
| **Carregamento** | Assíncrono | Síncrono |
| **Análise Estática** | ✅ Completa | ❌ Limitada |
| **Tree Shaking** | ✅ Nativo | ❌ Limitado |
| **Top-level await** | ✅ Suportado | ❌ Não suportado |
| **Hoisting** | ✅ Sim | ❌ Não |
| **Dynamic Imports** | ✅ `import()` | ✅ `require()` |
| **Circular Dependencies** | ⚠️ Melhor handling | ⚠️ Problemático |
| **Bundle Size** | ✅ Menor | ❌ Maior |
| **Browser Support** | ✅ Nativo | ❌ Requer bundling |
| **Node.js Support** | ✅ 14+ | ✅ Nativo |

## 🎯 Quando Usar ES Modules

### ✅ Recomendado para:
- **Novos projetos**: Melhor para projetos iniciados do zero
- **Aplicações modernas**: Com bundlers modernos (Vite, Rollup, Webpack 5+)
- **Libraries**: Para melhor tree-shaking e performance
- **Projetos TypeScript**: Melhor integração
- **Aplicações web**: Suporte nativo no browser

### ⚠️ Considerar alternativas quando:
- **Legacy codebase**: Com muitas dependências CommonJS
- **Node.js antigo**: Versões anteriores ao 14
- **Dependências problemáticas**: Que não funcionam bem com ESM

## 📚 Recursos e Referências

### Documentação Oficial
- [ECMAScript Modules](https://nodejs.org/api/esm.html)
- [MDN - JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [TC39 Module Specification](https://tc39.es/ecma262/#sec-modules)

### Ferramentas Recomendadas
- **Vite**: Build tool moderno com ESM first
- **Rollup**: Bundler otimizado para libraries
- **esbuild**: Build tool ultra-rápido
- **Snowpack**: Dev server com ESM nativo

### Package.json para ES Modules

```json
{
  "name": "projeto-esm",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./src/index.js",
  "exports": {
    ".": {
      "import": "./src/index.js",
      "types": "./types/index.d.ts"
    },
    "./utils": {
      "import": "./src/utils/index.js",
      "types": "./types/utils/index.d.ts"
    }
  },
  "imports": {
    "#src/*": "./src/*",
    "#utils/*": "./src/utils/*"
  },
  "scripts": {
    "start": "node src/index.js",
    "dev": "node --watch src/index.js",
    "build": "rollup -c",
    "test": "node --test tests/"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}
```

---

**🚀 Futuro dos Módulos**: ES Modules representam o futuro da modularização JavaScript, oferecendo melhor performance, análise estática e funcionalidades modernas como top-level await.

**Desenvolvido como parte dos estudos na DIO** 🌟
