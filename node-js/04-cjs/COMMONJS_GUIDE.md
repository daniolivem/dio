# 📦 Guia Completo: CommonJS - Sistema de Módulos do Node.js

## 🎯 Introdução ao CommonJS

CommonJS é o sistema de módulos original e padrão do Node.js, desenvolvido para permitir a modularização de aplicações JavaScript no servidor. Utiliza `require()` para importar e `module.exports` para exportar módulos.

### 🏗️ Características do CommonJS

- **Carregamento síncrono**: Módulos são carregados de forma bloqueante
- **Dinâmico**: Importações podem ser condicionais
- **Compatibilidade**: Funciona nativamente no Node.js
- **Simplicidade**: Sintaxe direta e intuitiva
- **Caching**: Módulos são armazenados em cache após a primeira importação

## 📚 Índice

1. [Sintaxe Básica](#sintaxe-básica)
2. [Padrões de Exportação](#padrões-de-exportação)
3. [Padrões de Importação](#padrões-de-importação)
4. [Exemplos Práticos](#exemplos-práticos)
5. [Sistema de Cache](#sistema-de-cache)
6. [Resolução de Módulos](#resolução-de-módulos)
7. [Boas Práticas](#boas-práticas)
8. [Patterns Avançados](#patterns-avançados)

## 🔧 Sintaxe Básica

### Exportação (`module.exports`)

```javascript
// Exportação de objeto
module.exports = {
    nome: 'João',
    idade: 30,
    saudar: function() {
        return `Olá, eu sou ${this.nome}`;
    }
};

// Exportação de função única
module.exports = function calcular(a, b) {
    return a + b;
};

// Exportação de classe
module.exports = class Usuario {
    constructor(nome) {
        this.nome = nome;
    }
};

// Exportação usando exports (atalho)
exports.PI = 3.14159;
exports.dobrar = (x) => x * 2;
```

### Importação (`require()`)

```javascript
// Importação completa
const usuario = require('./usuario');
const calcular = require('./calculadora');

// Desestruturação
const { PI, dobrar } = require('./matematica');
const { nome, idade, saudar } = require('./pessoa');

// Importação com renomeação
const { calcular: somar } = require('./operacoes');

// Importação de módulos do core
const fs = require('fs');
const path = require('path');
const http = require('http');
```

## 📤 Padrões de Exportação

### 1. Exportação de Objeto

```javascript
// utils/helpers.js
function formatarData(data) {
    return data.toLocaleDateString('pt-BR');
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const CONSTANTES = {
    MAX_TENTATIVAS: 3,
    TIMEOUT: 5000
};

module.exports = {
    formatarData,
    validarEmail,
    CONSTANTES
};
```

### 2. Exportação de Função Principal

```javascript
// services/logger.js
function log(nivel, mensagem) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${nivel.toUpperCase()}: ${mensagem}`);
}

// Função principal
module.exports = log;

// Métodos adicionais
module.exports.info = (msg) => log('info', msg);
module.exports.error = (msg) => log('error', msg);
module.exports.warn = (msg) => log('warn', msg);
```

### 3. Exportação de Classe

```javascript
// models/Produto.js
class Produto {
    constructor(nome, preco, categoria) {
        this.id = this.gerarId();
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
        this.criadoEm = new Date();
    }

    gerarId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    aplicarDesconto(percentual) {
        this.preco *= (1 - percentual / 100);
        return this;
    }

    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            preco: this.preco,
            categoria: this.categoria,
            criadoEm: this.criadoEm
        };
    }
}

// Constantes relacionadas
const CATEGORIAS = {
    ELETRÔNICOS: 'eletrônicos',
    ROUPAS: 'roupas',
    LIVROS: 'livros'
};

module.exports = Produto;
module.exports.CATEGORIAS = CATEGORIAS;
```

### 4. Exportação Progressiva

```javascript
// config/server.js
const config = {};

// Configurações básicas
config.port = process.env.PORT || 3000;
config.host = process.env.HOST || 'localhost';

// Configurações de banco
config.database = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'app_dev'
};

// Configurações de segurança
config.jwt = {
    secret: process.env.JWT_SECRET || 'dev-secret',
    expiresIn: '24h'
};

module.exports = config;
```

## 📥 Padrões de Importação

### 1. Importação Básica

```javascript
// Módulo completo
const express = require('express');
const lodash = require('lodash');

// Módulos locais
const Usuario = require('./models/Usuario');
const { formatarData, validarEmail } = require('./utils/helpers');
```

### 2. Importação Condicional

```javascript
// Carregamento baseado em ambiente
let config;
if (process.env.NODE_ENV === 'production') {
    config = require('./config/production');
} else {
    config = require('./config/development');
}

// Plugin opcional
let plugin = null;
try {
    plugin = require('plugin-opcional');
} catch (error) {
    console.log('Plugin opcional não encontrado');
}
```

### 3. Importação Dinâmica

```javascript
// Carregamento dinâmico de módulos
function carregarModulo(nome) {
    try {
        return require(`./plugins/${nome}`);
    } catch (error) {
        console.error(`Erro ao carregar módulo ${nome}:`, error.message);
        return null;
    }
}

// Cache de módulos carregados
const modulosCarregados = {};

function obterModulo(nome) {
    if (!modulosCarregados[nome]) {
        modulosCarregados[nome] = require(`./modules/${nome}`);
    }
    return modulosCarregados[nome];
}
```

## 💡 Exemplos Práticos

### Exemplo 1: Sistema de Log

```javascript
// utils/logger.js
const fs = require('fs');
const path = require('path');

class Logger {
    constructor(logDir = 'logs') {
        this.logDir = logDir;
        this.ensureLogDir();
    }

    ensureLogDir() {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    log(level, message, data = null) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level: level.toUpperCase(),
            message,
            data
        };

        // Console output
        console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`);

        // File output
        const logFile = path.join(this.logDir, `${level}.log`);
        fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
    }

    info(message, data) {
        this.log('info', message, data);
    }

    error(message, data) {
        this.log('error', message, data);
    }

    warn(message, data) {
        this.log('warn', message, data);
    }

    debug(message, data) {
        if (process.env.NODE_ENV === 'development') {
            this.log('debug', message, data);
        }
    }
}

// Singleton instance
const logger = new Logger();

module.exports = logger;
module.exports.Logger = Logger;
```

### Exemplo 2: Gerenciador de Configuração

```javascript
// config/index.js
const path = require('path');
const fs = require('fs');

class ConfigManager {
    constructor() {
        this.config = {};
        this.loadConfig();
    }

    loadConfig() {
        const env = process.env.NODE_ENV || 'development';
        
        // Configuração base
        const baseConfig = this.loadFile('base.json');
        
        // Configuração específica do ambiente
        const envConfig = this.loadFile(`${env}.json`);
        
        // Configuração local (ignorada pelo git)
        const localConfig = this.loadFile('local.json');

        // Merge das configurações
        this.config = {
            ...baseConfig,
            ...envConfig,
            ...localConfig,
            env
        };
    }

    loadFile(filename) {
        const configPath = path.join(__dirname, filename);
        
        try {
            if (fs.existsSync(configPath)) {
                const content = fs.readFileSync(configPath, 'utf8');
                return JSON.parse(content);
            }
        } catch (error) {
            console.warn(`Erro ao carregar configuração ${filename}:`, error.message);
        }
        
        return {};
    }

    get(key, defaultValue = null) {
        return this.config[key] || defaultValue;
    }

    set(key, value) {
        this.config[key] = value;
    }

    getAll() {
        return { ...this.config };
    }
}

module.exports = new ConfigManager();
```

### Exemplo 3: Factory Pattern

```javascript
// factories/DatabaseFactory.js
const mysql = require('mysql2');
const { Pool } = require('pg');
const { MongoClient } = require('mongodb');

class DatabaseFactory {
    static createConnection(type, config) {
        switch (type.toLowerCase()) {
            case 'mysql':
                return DatabaseFactory.createMySQL(config);
            case 'postgresql':
            case 'postgres':
                return DatabaseFactory.createPostgreSQL(config);
            case 'mongodb':
            case 'mongo':
                return DatabaseFactory.createMongoDB(config);
            default:
                throw new Error(`Tipo de banco não suportado: ${type}`);
        }
    }

    static createMySQL(config) {
        return mysql.createConnection({
            host: config.host,
            user: config.username,
            password: config.password,
            database: config.database,
            port: config.port || 3306
        });
    }

    static createPostgreSQL(config) {
        return new Pool({
            host: config.host,
            user: config.username,
            password: config.password,
            database: config.database,
            port: config.port || 5432
        });
    }

    static async createMongoDB(config) {
        const url = `mongodb://${config.host}:${config.port || 27017}/${config.database}`;
        const client = new MongoClient(url);
        await client.connect();
        return client.db(config.database);
    }
}

module.exports = DatabaseFactory;
```

## 🗂️ Sistema de Cache

### Como Funciona o Cache

```javascript
// Demonstração do sistema de cache do Node.js
console.log('Cache inicial:', Object.keys(require.cache));

// Primeira importação - módulo é executado
const modulo1 = require('./meuModulo');
console.log('Após primeira importação:', Object.keys(require.cache));

// Segunda importação - retorna do cache
const modulo2 = require('./meuModulo');
console.log('modulo1 === modulo2:', modulo1 === modulo2); // true
```

### Manipulando o Cache

```javascript
// utils/cacheManager.js
function limparCache(modulePath) {
    const fullPath = require.resolve(modulePath);
    delete require.cache[fullPath];
}

function recarregarModulo(modulePath) {
    limparCache(modulePath);
    return require(modulePath);
}

function listarModulosCache() {
    return Object.keys(require.cache);
}

function limparTodoCache() {
    Object.keys(require.cache).forEach(key => {
        delete require.cache[key];
    });
}

module.exports = {
    limparCache,
    recarregarModulo,
    listarModulosCache,
    limparTodoCache
};
```

## 🔍 Resolução de Módulos

### Algoritmo de Resolução

O Node.js segue esta ordem para resolver módulos:

1. **Core Modules**: `fs`, `path`, `http`, etc.
2. **Caminhos Relativos**: `./`, `../`
3. **node_modules**: Sobe a árvore de diretórios

### Exemplos de Resolução

```javascript
// 1. Core module (prioridade máxima)
const fs = require('fs');

// 2. Caminho relativo
const utils = require('./utils/helpers');
const config = require('../config/app');

// 3. node_modules (busca na árvore de diretórios)
const express = require('express');
const lodash = require('lodash');

// 4. Caminho absoluto
const model = require('/home/user/app/models/User');
```

### Customizando a Resolução

```javascript
// Adicionando diretórios ao path de busca
module.paths.unshift('/meu/diretorio/customizado');

// Verificando onde um módulo seria resolvido
console.log(require.resolve('express'));
console.log(require.resolve('./utils/helpers'));

// Hook personalizado para resolução
const originalResolveFilename = require.extensions['.js'];
require.extensions['.js'] = function(module, filename) {
    console.log('Carregando:', filename);
    return originalResolveFilename(module, filename);
};
```

## ✅ Boas Práticas

### 1. Estrutura de Exportação Clara

```javascript
// ✅ Bom: estrutura clara e documentada
/**
 * Utilitários para manipulação de strings
 * @module StringUtils
 */

/**
 * Capitaliza a primeira letra de uma string
 * @param {string} str - String para capitalizar
 * @returns {string} String capitalizada
 */
function capitalizar(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Remove espaços extras de uma string
 * @param {string} str - String para limpar
 * @returns {string} String sem espaços extras
 */
function limparEspacos(str) {
    return str.replace(/\s+/g, ' ').trim();
}

module.exports = {
    capitalizar,
    limparEspacos
};
```

### 2. Validação de Dependências

```javascript
// ✅ Bom: verificar dependências opcionais
let redis = null;
try {
    redis = require('redis');
} catch (error) {
    console.warn('Redis não disponível, usando cache em memória');
}

function createCache() {
    if (redis) {
        return redis.createClient();
    } else {
        // Fallback para cache em memória
        return new Map();
    }
}

module.exports = { createCache };
```

### 3. Separação de Responsabilidades

```javascript
// ✅ Bom: cada módulo tem uma responsabilidade específica

// models/Usuario.js - Apenas estrutura de dados
class Usuario {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
        this.criadoEm = new Date();
    }
}

module.exports = Usuario;

// services/UsuarioService.js - Lógica de negócio
const Usuario = require('../models/Usuario');

class UsuarioService {
    constructor() {
        this.usuarios = [];
    }

    criar(dados) {
        const usuario = new Usuario(dados.nome, dados.email);
        this.usuarios.push(usuario);
        return usuario;
    }

    buscarPorEmail(email) {
        return this.usuarios.find(u => u.email === email);
    }
}

module.exports = UsuarioService;

// repositories/UsuarioRepository.js - Acesso a dados
class UsuarioRepository {
    constructor(database) {
        this.db = database;
    }

    async salvar(usuario) {
        const query = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';
        return await this.db.execute(query, [usuario.nome, usuario.email]);
    }

    async buscarPorId(id) {
        const query = 'SELECT * FROM usuarios WHERE id = ?';
        const [rows] = await this.db.execute(query, [id]);
        return rows[0];
    }
}

module.exports = UsuarioRepository;
```

## 🚀 Patterns Avançados

### 1. Module Pattern com Estado Privado

```javascript
// services/ContadorService.js
const ContadorService = (function() {
    let contadores = new Map();
    let proximoId = 1;

    return {
        criar(nome) {
            const id = proximoId++;
            contadores.set(id, { nome, valor: 0 });
            return id;
        },

        incrementar(id) {
            const contador = contadores.get(id);
            if (contador) {
                contador.valor++;
                return contador.valor;
            }
            throw new Error('Contador não encontrado');
        },

        obterValor(id) {
            const contador = contadores.get(id);
            return contador ? contador.valor : null;
        },

        listar() {
            return Array.from(contadores.entries()).map(([id, data]) => ({
                id,
                ...data
            }));
        },

        // Método para testes
        _limpar() {
            contadores.clear();
            proximoId = 1;
        }
    };
})();

module.exports = ContadorService;
```

### 2. Plugin System

```javascript
// core/PluginManager.js
class PluginManager {
    constructor() {
        this.plugins = new Map();
        this.hooks = new Map();
    }

    register(name, plugin) {
        if (typeof plugin.init === 'function') {
            plugin.init(this);
        }
        
        this.plugins.set(name, plugin);
        
        // Registrar hooks do plugin
        if (plugin.hooks) {
            Object.entries(plugin.hooks).forEach(([hookName, callback]) => {
                this.addHook(hookName, callback);
            });
        }
    }

    addHook(name, callback) {
        if (!this.hooks.has(name)) {
            this.hooks.set(name, []);
        }
        this.hooks.get(name).push(callback);
    }

    async executeHook(name, data) {
        const callbacks = this.hooks.get(name) || [];
        
        for (const callback of callbacks) {
            try {
                data = await callback(data) || data;
            } catch (error) {
                console.error(`Erro no hook ${name}:`, error);
            }
        }
        
        return data;
    }

    getPlugin(name) {
        return this.plugins.get(name);
    }

    listPlugins() {
        return Array.from(this.plugins.keys());
    }
}

module.exports = PluginManager;
```

### 3. Dependency Injection

```javascript
// core/Container.js
class Container {
    constructor() {
        this.services = new Map();
        this.singletons = new Map();
    }

    register(name, factory, options = {}) {
        this.services.set(name, {
            factory,
            singleton: options.singleton || false,
            dependencies: options.dependencies || []
        });
    }

    get(name) {
        const service = this.services.get(name);
        
        if (!service) {
            throw new Error(`Serviço '${name}' não encontrado`);
        }

        // Retornar singleton se já existe
        if (service.singleton && this.singletons.has(name)) {
            return this.singletons.get(name);
        }

        // Resolver dependências
        const dependencies = service.dependencies.map(dep => this.get(dep));
        
        // Criar instância
        const instance = service.factory(...dependencies);

        // Armazenar singleton
        if (service.singleton) {
            this.singletons.set(name, instance);
        }

        return instance;
    }

    has(name) {
        return this.services.has(name);
    }
}

module.exports = Container;

// Uso do container
const container = new Container();

// Registrar serviços
container.register('logger', () => require('./utils/logger'), { singleton: true });
container.register('database', () => require('./database'), { singleton: true });
container.register('userService', (logger, db) => {
    const UserService = require('./services/UserService');
    return new UserService(logger, db);
}, { dependencies: ['logger', 'database'] });

// Usar serviços
const userService = container.get('userService');
```

## 🔧 Debugging e Troubleshooting

### Debugging de Módulos

```javascript
// Debug da resolução de módulos
process.env.NODE_DEBUG = 'module';

// Interceptar carregamento de módulos
const originalRequire = require;
require = function(id) {
    console.log(`Carregando módulo: ${id}`);
    return originalRequire.apply(this, arguments);
};

// Listar módulos carregados
function listarModulosCarregados() {
    console.log('Módulos em cache:');
    Object.keys(require.cache).forEach((module, index) => {
        console.log(`${index + 1}. ${module}`);
    });
}
```

### Tratamento de Erros

```javascript
// utils/moduleLoader.js
function carregarModuloSeguro(modulePath, fallback = null) {
    try {
        return require(modulePath);
    } catch (error) {
        console.error(`Erro ao carregar módulo ${modulePath}:`, error.message);
        
        if (fallback && typeof fallback === 'function') {
            return fallback();
        }
        
        return fallback;
    }
}

function validarModulo(modulo, requisitos = []) {
    for (const requisito of requisitos) {
        if (!(requisito in modulo)) {
            throw new Error(`Módulo não possui propriedade: ${requisito}`);
        }
    }
    return true;
}

module.exports = {
    carregarModuloSeguro,
    validarModulo
};
```

## 📚 Recursos e Referências

### Documentação Oficial
- [Node.js Modules](https://nodejs.org/api/modules.html)
- [CommonJS Specification](http://www.commonjs.org/specs/modules/1.0/)

### Ferramentas Úteis
- **nodemon**: Reinicia automaticamente a aplicação
- **require-dir**: Carrega todos os módulos de um diretório
- **proxyquire**: Mock de módulos para testes

### Exemplo de package.json para CommonJS

```json
{
  "name": "projeto-commonjs",
  "version": "1.0.0",
  "description": "Projeto usando CommonJS",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "engines": {
    "node": ">=14.0.0"
  },
  "keywords": ["nodejs", "commonjs", "modules"],
  "author": "Seu Nome",
  "license": "MIT"
}
```

---

**💡 Dica Final**: CommonJS é excelente para projetos Node.js tradicionais, oferece simplicidade e compatibilidade total. É ideal quando você não precisa das funcionalidades avançadas dos ES Modules.

**Desenvolvido como parte dos estudos na DIO** 🚀
