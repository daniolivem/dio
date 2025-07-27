# 📚 Guia Completo sobre Modularização em Node.js (em construção)

## 🎯 Introdução

A modularização é um conceito fundamental no desenvolvimento Node.js que permite dividir o código em módulos reutilizáveis, facilitando a manutenção, testabilidade e organização do projeto.

### Por que Modularizar?

- **🔄 Reutilização**: Código pode ser usado em diferentes partes da aplicação
- **🛠️ Manutenibilidade**: Facilita atualizações e correções
- **🧪 Testabilidade**: Permite testes isolados de cada módulo
- **📁 Organização**: Estrutura clara e lógica do código
- **👥 Colaboração**: Diferentes desenvolvedores podem trabalhar em módulos distintos
- **⚡ Performance**: Carregamento sob demanda (lazy loading)

## 📖 Índice

1. [CommonJS vs ES Modules](#commonjs-vs-es-modules)
2. [Tipos de Módulos](#tipos-de-módulos)
3. [Estrutura de Projeto](#estrutura-de-projeto)
4. [Exemplos Práticos](#exemplos-práticos)
5. [Padrões de Exportação](#padrões-de-exportação)
6. [Boas Práticas](#boas-práticas)
7. [Resolução de Módulos](#resolução-de-módulos)
8. [Módulos Assíncronos](#módulos-assíncronos)

## 🔄 CommonJS vs ES Modules

### CommonJS (Padrão tradicional do Node.js)

CommonJS é o sistema de módulos original do Node.js, usando `require()` e `module.exports`.

#### Sintaxe de Exportação

```javascript
// matematica.js
function somar(a, b) {
    return a + b;
}

function subtrair(a, b) {
    return a - b;
}

const PI = 3.14159;

// Exportação nomeada
module.exports = {
    somar,
    subtrair,
    PI
};

// Ou exportação direta
module.exports.multiplicar = (a, b) => a * b;

// Exportação default
module.exports = function calculadora() {
    // lógica da calculadora
};
```

#### Sintaxe de Importação

```javascript
// main.js
const { somar, subtrair, PI } = require('./matematica');
const calculadora = require('./calculadora');

// Importando tudo
const math = require('./matematica');
console.log(math.somar(2, 3));

// Importando módulos do core
const fs = require('fs');
const path = require('path');

// Importando pacotes do npm
const express = require('express');
const lodash = require('lodash');
```

### ES Modules (Padrão moderno)

ES Modules é o padrão oficial do JavaScript, usando `import` e `export`.

#### Configuração

Para usar ES Modules no Node.js, você precisa:

1. Adicionar `"type": "module"` no `package.json`, OU
2. Usar extensão `.mjs` nos arquivos

```json
{
  "name": "meu-projeto",
  "type": "module",
  "main": "index.js"
}
```

#### Sintaxe de Exportação

```javascript
// matematica.js

// Exportação nomeada
export function somar(a, b) {
    return a + b;
}

export function subtrair(a, b) {
    return a - b;
}

export const PI = 3.14159;

// Exportação em lote
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => a / b;

export { multiplicar, dividir };

// Exportação default
export default class Calculadora {
    // implementação da classe
}

// Exportação mista
export default function calculadoraPrincipal() {}
export const versao = '1.0.0';
```

#### Sintaxe de Importação

```javascript
// main.js

// Importação nomeada
import { somar, subtrair, PI } from './matematica.js';

// Importação default
import Calculadora from './matematica.js';

// Importação mista
import calculadoraPrincipal, { versao } from './matematica.js';

// Importação com alias
import { somar as adicionar } from './matematica.js';

// Importação de tudo
import * as math from './matematica.js';

// Importação dinâmica (assíncrona)
const math = await import('./matematica.js');

// Importação condicional
if (condicao) {
    const { funcao } = await import('./modulo-especial.js');
}
```

### Comparação

| Característica | CommonJS | ES Modules |
|---|---|---|
| **Sintaxe** | `require()` / `module.exports` | `import` / `export` |
| **Carregamento** | Síncrono | Assíncrono |
| **Análise estática** | Não | Sim |
| **Tree shaking** | Limitado | Completo |
| **Compatibilidade** | Node.js nativo | Requer configuração |
| **Hoisting** | Não | Sim |
| **Importação condicional** | Dinâmica | Estática (com import()) |

## 📋 Tipos de Módulos

### 1. 🏗️ Módulos Principais (Core Modules)

Módulos nativos do Node.js, disponíveis sem instalação.

```javascript
// CommonJS
const fs = require('fs');
const path = require('path');
const http = require('http');
const crypto = require('crypto');

// ES Modules
import fs from 'fs';
import path from 'path';
import http from 'http';
import crypto from 'crypto';

// Exemplos de uso
const arquivo = fs.readFileSync('dados.txt', 'utf8');
const caminho = path.join(__dirname, 'arquivos', 'dados.txt');
```

### 2. 📁 Módulos Locais

Módulos criados dentro do seu projeto.

```javascript
// utils/helpers.js - Módulo utilitário
export function formatarData(data) {
    return data.toLocaleDateString('pt-BR');
}

export function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// models/Usuario.js - Modelo de dados
export class Usuario {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
        this.criadoEm = new Date();
    }
    
    obterInfo() {
        return {
            nome: this.nome,
            email: this.email,
            criadoEm: this.criadoEm
        };
    }
}

// services/usuarioService.js - Serviço
import { Usuario } from '../models/Usuario.js';

class UsuarioService {
    constructor() {
        this.usuarios = [];
    }
    
    criarUsuario(nome, email) {
        const usuario = new Usuario(nome, email);
        this.usuarios.push(usuario);
        return usuario;
    }
    
    listarUsuarios() {
        return this.usuarios;
    }
}

export default new UsuarioService();
```

### 3. 📦 Módulos de Terceiros

Instalados via npm/yarn e armazenados em `node_modules`.

```javascript
// Instalação: npm install express lodash axios moment

// CommonJS
const express = require('express');
const _ = require('lodash');
const axios = require('axios');
const moment = require('moment');

// ES Modules
import express from 'express';
import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';

// Uso
const app = express();
const dados = _.uniq([1, 2, 2, 3, 4, 4]);
const resposta = await axios.get('https://api.exemplo.com');
const agora = moment().format('DD/MM/YYYY');
```

## 🏗️ Estrutura de Projeto

### Estrutura Básica

```
meu-projeto/
├── src/
│   ├── controllers/          # Controladores (lógica de rotas)
│   │   ├── usuarioController.js
│   │   └── produtoController.js
│   ├── models/              # Modelos de dados
│   │   ├── Usuario.js
│   │   ├── Produto.js
│   │   └── index.js         # Ponto de entrada dos modelos
│   ├── services/            # Serviços de negócio
│   │   ├── usuarioService.js
│   │   ├── produtoService.js
│   │   └── index.js
│   ├── utils/               # Utilitários
│   │   ├── helpers.js
│   │   ├── validators.js
│   │   └── constants.js
│   ├── config/              # Configurações
│   │   ├── database.js
│   │   ├── server.js
│   │   └── environment.js
│   ├── middleware/          # Middlewares
│   │   ├── auth.js
│   │   └── validation.js
│   └── index.js             # Ponto de entrada principal
├── tests/                   # Testes
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── docs/                    # Documentação
├── package.json
├── README.md
└── .gitignore
```

### Estrutura Avançada

```
projeto-avancado/
├── src/
│   ├── modules/             # Módulos por funcionalidade
│   │   ├── auth/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   └── index.js
│   │   ├── users/
│   │   └── products/
│   ├── shared/              # Código compartilhado
│   │   ├── database/
│   │   ├── utils/
│   │   ├── types/
│   │   └── constants/
│   ├── core/                # Funcionalidades centrais
│   │   ├── server.js
│   │   ├── routes.js
│   │   └── app.js
│   └── index.js
├── scripts/                 # Scripts de automação
├── migrations/              # Migrações de banco
├── seeds/                   # Dados iniciais
└── docker/                  # Configurações Docker
```

## 💡 Exemplos Práticos

### Exemplo 1: Módulo de Utilitários

```javascript
// utils/stringUtils.js
export function capitalizar(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function toCamelCase(str) {
    return str
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

export function truncar(str, tamanho, sufixo = '...') {
    if (str.length <= tamanho) return str;
    return str.slice(0, tamanho - sufixo.length) + sufixo;
}

// Exportação default
export default function validarTexto(str, minLength = 1) {
    return typeof str === 'string' && str.length >= minLength;
}

// utils/index.js - Ponto de entrada
export * from './stringUtils.js';
export { default as validarTexto } from './stringUtils.js';
```

### Exemplo 2: Modelo com Validação

```javascript
// models/Produto.js
export class Produto {
    #id;
    #nome;
    #preco;
    #categoria;

    constructor(nome, preco, categoria) {
        this.#id = this.gerarId();
        this.#nome = nome;
        this.#preco = preco;
        this.#categoria = categoria;
        this.validar();
    }

    // Getters
    get id() { return this.#id; }
    get nome() { return this.#nome; }
    get preco() { return this.#preco; }
    get categoria() { return this.#categoria; }

    // Métodos
    aplicarDesconto(percentual) {
        if (percentual < 0 || percentual > 100) {
            throw new Error('Percentual inválido');
        }
        this.#preco *= (1 - percentual / 100);
    }

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            preco: this.#preco,
            categoria: this.#categoria
        };
    }

    // Método privado
    validar() {
        if (!this.#nome || this.#nome.length < 2) {
            throw new Error('Nome inválido');
        }
        if (this.#preco <= 0) {
            throw new Error('Preço deve ser positivo');
        }
    }

    gerarId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

export const CATEGORIAS = {
    ELETRÔNICOS: 'eletrônicos',
    ROUPAS: 'roupas',
    LIVROS: 'livros'
};
```

### Exemplo 3: Serviço com Singleton

```javascript
// services/produtoService.js
import { Produto, CATEGORIAS } from '../models/Produto.js';

class ProdutoService {
    constructor() {
        this.produtos = new Map();
    }

    criar(dados) {
        const produto = new Produto(dados.nome, dados.preco, dados.categoria);
        this.produtos.set(produto.id, produto);
        return produto;
    }

    buscarPorId(id) {
        return this.produtos.get(id) || null;
    }

    listar() {
        return Array.from(this.produtos.values());
    }

    buscarPorCategoria(categoria) {
        return this.listar().filter(produto => produto.categoria === categoria);
    }

    remover(id) {
        return this.produtos.delete(id);
    }

    aplicarDescontoCategoria(categoria, percentual) {
        const produtos = this.buscarPorCategoria(categoria);
        produtos.forEach(produto => produto.aplicarDesconto(percentual));
        return produtos.length;
    }
}

// Singleton - uma única instância
export default new ProdutoService();
```

### Exemplo 4: Configuração Modular

```javascript
// config/database.js
export const databaseConfig = {
    development: {
        host: 'localhost',
        port: 5432,
        database: 'app_dev',
        username: 'dev_user',
        password: 'dev_pass'
    },
    production: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS
    }
};

// config/server.js
export const serverConfig = {
    port: process.env.PORT || 3000,
    cors: {
        origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
        credentials: true
    },
    rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutos
        max: 100 // máximo 100 requests por janela
    }
};

// config/index.js
import { databaseConfig } from './database.js';
import { serverConfig } from './server.js';

const environment = process.env.NODE_ENV || 'development';

export default {
    env: environment,
    database: databaseConfig[environment],
    server: serverConfig,
    jwt: {
        secret: process.env.JWT_SECRET || 'dev-secret',
        expiresIn: '24h'
    }
};
```

## 📤 Padrões de Exportação

### 1. Exportação Nomeada

```javascript
// Múltiplas exportações nomeadas
export const VERSION = '1.0.0';
export function helper1() {}
export function helper2() {}

// Exportação em lote
const helper3 = () => {};
const helper4 = () => {};
export { helper3, helper4 };

// Com renomeação
export { helper3 as utilitario3, helper4 as utilitario4 };
```

### 2. Exportação Default

```javascript
// Classe como default
export default class MinhaClasse {}

// Função como default
export default function minhaFuncao() {}

// Objeto como default
export default {
    versao: '1.0.0',
    metodos: {
        init() {},
        destroy() {}
    }
};
```

### 3. Exportação Mista

```javascript
// Combinando default e nomeadas
export default class Principal {}
export const CONSTANTE = 'valor';
export function auxiliar() {}

// Uso
import Principal, { CONSTANTE, auxiliar } from './modulo.js';
```

### 4. Re-exportação

```javascript
// utils/index.js - Barrel exports
export * from './stringUtils.js';
export * from './dateUtils.js';
export * from './numberUtils.js';

// Com renomeação
export { default as StringUtils } from './stringUtils.js';
export { validar as validarString } from './stringUtils.js';

// Seletiva
export { capitalizar, truncar } from './stringUtils.js';
```

## ✅ Boas Práticas

### 1. 📝 Nomenclatura

```javascript
// ✅ Bom: nomes descritivos
export function calcularImpostoRenda(salario) {}
export class GerenciadorUsuarios {}

// ❌ Ruim: nomes genéricos
export function calc(x) {}
export class Manager {}
```

### 2. 📏 Tamanho dos Módulos

```javascript
// ✅ Bom: módulo focado e pequeno
// userValidator.js
export function validarEmail(email) {}
export function validarSenha(senha) {}
export function validarIdade(idade) {}

// ❌ Ruim: módulo muito grande com muitas responsabilidades
// utils.js (com 50+ funções diferentes)
```

### 3. 🔄 Evitar Dependências Circulares

```javascript
// ❌ Ruim: dependência circular
// a.js
import { funcaoB } from './b.js';
export function funcaoA() { funcaoB(); }

// b.js
import { funcaoA } from './a.js';
export function funcaoB() { funcaoA(); }

// ✅ Bom: extrair para módulo comum
// shared.js
export function funcaoCompartilhada() {}

// a.js
import { funcaoCompartilhada } from './shared.js';
export function funcaoA() { funcaoCompartilhada(); }

// b.js
import { funcaoCompartilhada } from './shared.js';
export function funcaoB() { funcaoCompartilhada(); }
```

### 4. 📚 Documentação

```javascript
/**
 * Calcula o valor final com desconto aplicado
 * @param {number} valorOriginal - Valor original do produto
 * @param {number} percentualDesconto - Percentual de desconto (0-100)
 * @returns {number} Valor com desconto aplicado
 * @throws {Error} Se os parâmetros forem inválidos
 * @example
 * const valorFinal = calcularDesconto(100, 10); // 90
 */
export function calcularDesconto(valorOriginal, percentualDesconto) {
    if (valorOriginal < 0) {
        throw new Error('Valor original não pode ser negativo');
    }
    
    if (percentualDesconto < 0 || percentualDesconto > 100) {
        throw new Error('Percentual deve estar entre 0 e 100');
    }
    
    return valorOriginal * (1 - percentualDesconto / 100);
}
```

### 5. 🔒 Encapsulamento

```javascript
// ✅ Bom: usar campos privados e getters/setters
export class ContaBancaria {
    #saldo = 0;
    #numero;

    constructor(numero) {
        this.#numero = numero;
    }

    get saldo() { return this.#saldo; }
    get numero() { return this.#numero; }

    depositar(valor) {
        if (valor <= 0) throw new Error('Valor deve ser positivo');
        this.#saldo += valor;
    }

    // Método privado
    #validarSaque(valor) {
        return valor > 0 && valor <= this.#saldo;
    }
}
```

### 6. 🎯 Separação de Responsabilidades

```javascript
// ✅ Bom: cada módulo tem uma responsabilidade
// models/Usuario.js - apenas estrutura de dados
export class Usuario {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }
}

// services/usuarioService.js - lógica de negócio
export class UsuarioService {
    criar(dados) {}
    buscar(id) {}
    atualizar(id, dados) {}
}

// repositories/usuarioRepository.js - acesso a dados
export class UsuarioRepository {
    salvar(usuario) {}
    buscarPorId(id) {}
}
```

## 🔍 Resolução de Módulos

### Node.js Module Resolution

O Node.js resolve módulos na seguinte ordem:

1. **Core modules** (fs, path, http, etc.)
2. **Caminhos relativos** (`./`, `../`)
3. **node_modules** (subindo na árvore de diretórios)

### Exemplos de Resolução

```javascript
// 1. Core module
import fs from 'fs';

// 2. Caminho relativo
import { helper } from './utils/helper.js';
import { config } from '../config/app.js';

// 3. Caminho absoluto (do projeto)
import { User } from '/src/models/User.js';

// 4. Package do node_modules
import express from 'express';
import { cloneDeep } from 'lodash';

// 5. Subpath do package
import { format } from 'date-fns/format';
```

### Configuração de Caminhos

```json
// package.json
{
  "imports": {
    "#src/*": "./src/*",
    "#utils/*": "./src/utils/*",
    "#models/*": "./src/models/*"
  }
}
```

```javascript
// Uso dos imports configurados
import { User } from '#models/User.js';
import { helper } from '#utils/helper.js';
```

## ⚡ Módulos Assíncronos

### Dynamic Imports

```javascript
// Importação dinâmica básica
async function carregarModulo() {
    const modulo = await import('./meuModulo.js');
    return modulo.default;
}

// Importação condicional
async function inicializar() {
    if (process.env.NODE_ENV === 'development') {
        const { setupDevTools } = await import('./devTools.js');
        setupDevTools();
    }
}

// Lazy loading
const modulosCarregados = new Map();

async function obterModulo(nome) {
    if (!modulosCarregados.has(nome)) {
        const modulo = await import(`./modules/${nome}.js`);
        modulosCarregados.set(nome, modulo);
    }
    return modulosCarregados.get(nome);
}

// Carregamento paralelo
async function carregarMultiplosModulos() {
    const [modulo1, modulo2, modulo3] = await Promise.all([
        import('./modulo1.js'),
        import('./modulo2.js'),
        import('./modulo3.js')
    ]);
    
    return { modulo1, modulo2, modulo3 };
}
```

### Top-level await

```javascript
// Disponível em ES2022+ com "type": "module"
const config = await import('./config.js');
const dados = await fetch('/api/dados').then(r => r.json());

console.log('Aplicação inicializada com:', config.default);
```

## 🔧 Ferramentas e Configuração

### Package.json

```json
{
  "name": "meu-projeto-modular",
  "version": "1.0.0",
  "type": "module",
  "main": "src/index.js",
  "exports": {
    ".": "./src/index.js",
    "./utils": "./src/utils/index.js",
    "./models": "./src/models/index.js"
  },
  "imports": {
    "#src/*": "./src/*",
    "#utils/*": "./src/utils/*"
  },
  "scripts": {
    "start": "node src/index.js",
    "dev": "node --watch src/index.js",
    "test": "node --test tests/"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### Configuração TypeScript

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
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"],
      "@utils/*": ["utils/*"],
      "@models/*": ["models/*"]
    }
  }
}
```

## 📊 Resumo das Diferenças

| Aspecto | CommonJS | ES Modules |
|---------|----------|------------|
| **Sintaxe Import** | `require()` | `import` |
| **Sintaxe Export** | `module.exports` | `export` |
| **Carregamento** | Síncrono | Assíncrono |
| **Hoisting** | Não | Sim |
| **Análise Estática** | Limitada | Completa |
| **Tree Shaking** | Não | Sim |
| **Import Dinâmico** | `require()` | `import()` |
| **Top-level await** | Não | Sim |
| **Compatibilidade** | Node.js nativo | Requer config |

## 🎯 Próximos Passos

1. **Pratique** criando módulos pequenos e focados
2. **Experimente** tanto CommonJS quanto ES Modules
3. **Organize** seu projeto com estrutura clara
4. **Documente** suas exportações
5. **Teste** seus módulos independentemente
6. **Otimize** com tree shaking e lazy loading

## 📚 Recursos Adicionais

- [Node.js Modules Documentation](https://nodejs.org/api/modules.html)
- [ECMAScript Modules](https://nodejs.org/api/esm.html)
- [Module Resolution](https://nodejs.org/api/modules.html#modules_module_resolution_algorithm)
- [Package.json Exports](https://nodejs.org/api/packages.html#exports)

---

**Desenvolvido como parte dos estudos na DIO** 🚀

*Este guia fornece uma base sólida para entender e implementar modularização eficiente em projetos Node.js.*
