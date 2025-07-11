# 🏎️ Mario Kart.JS - Simulador de Corrida

<div align="center">
  <img src="./docs/header.gif" alt="Mario Kart Header" width="300">
  
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
  ![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)
</div>

## 📋 Sobre o Projeto

Este é um simulador de corridas baseado no clássico jogo Mario Kart da Nintendo, desenvolvido em JavaScript como parte do desafio do Bootcamp da DIO. O projeto simula corridas entre personagens icônicos do universo Mario, com mecânicas de jogo que incluem diferentes tipos de pista e atributos únicos para cada personagem.

## 🎮 Personagens Disponíveis

<table align="center">
  <tr>
    <th>Personagem</th>
    <th>Avatar</th>
    <th>Velocidade</th>
    <th>Manobrabilidade</th>
    <th>Poder</th>
    <th>Características</th>
  </tr>
  <tr>
    <td><strong>Mario</strong></td>
    <td><img src="./docs/mario.gif" width="50" height="50"></td>
    <td>4</td>
    <td>3</td>
    <td>3</td>
    <td>Equilibrado em todos os aspectos</td>
  </tr>
  <tr>
    <td><strong>Bowser</strong></td>
    <td><img src="./docs/bowser.gif" width="50" height="50"></td>
    <td>5</td>
    <td>2</td>
    <td>5</td>
    <td>Muito rápido e poderoso</td>
  </tr>
  <tr>
    <td><strong>Peach</strong></td>
    <td><img src="./docs/peach.gif" width="50" height="50"></td>
    <td>3</td>
    <td>4</td>
    <td>2</td>
    <td>Excelente manobrabilidade</td>
  </tr>
  <tr>
    <td><strong>Luigi</strong></td>
    <td><img src="./docs/luigi.gif" width="50" height="50"></td>
    <td>3</td>
    <td>4</td>
    <td>4</td>
    <td>Bom em curvas e confrontos</td>
  </tr>
  <tr>
    <td><strong>Yoshi</strong></td>
    <td><img src="./docs/yoshi.gif" width="50" height="50"></td>
    <td>2</td>
    <td>4</td>
    <td>3</td>
    <td>Ágil nas curvas</td>
  </tr>
  <tr>
    <td><strong>Donkey Kong</strong></td>
    <td><img src="./docs/dk.gif" width="50" height="50"></td>
    <td>2</td>
    <td>2</td>
    <td>5</td>
    <td>Extremamente poderoso</td>
  </tr>
</table>

## 🏁 Mecânicas do Jogo

### 🎯 Objetivo
Acumular o maior número de pontos ao longo de 5 rodadas de corrida.

### 🎲 Sistema de Seleção
- **Personagens Aleatórios**: A cada execução, dois personagens diferentes são selecionados automaticamente
- **Reset de Pontos**: Todos os personagens começam com 0 pontos a cada nova corrida
- **Garantia de Diversidade**: O sistema garante que nunca haverá o mesmo personagem correndo contra si mesmo

### 🛣️ Tipos de Pista

| Tipo | Probabilidade | Atributo Usado | Descrição |
|------|---------------|----------------|-----------|
| **RETA** | 33% | Velocidade | Teste de velocidade pura |
| **CURVA** | 33% | Manobrabilidade | Teste de habilidade nas curvas |
| **CONFRONTO** | 34% | Poder | Batalha direta entre os personagens |

### 🏆 Sistema de Pontuação

#### Reta e Curva
- Cada jogador rola um dado de 6 lados
- Soma o resultado com o atributo correspondente
- O jogador com maior total **ganha 1 ponto**

#### Confronto
- Cada jogador rola um dado de 6 lados
- Soma o resultado com o atributo PODER
- O jogador que **perder** perde 1 ponto (mínimo 0)

### ⏱️ Sistema de Timing
- **Delays estratégicos** entre ações para melhor experiência
- **Animações de carregamento** durante rolagem de dados
- **Pausas dramáticas** entre rodadas (2 segundos)
- **Efeitos visuais** com emojis e separadores

### 🏆 Condição de Vitória
Ao final das 5 rodadas, vence quem tiver mais pontos acumulados.

## 🚀 Como Executar

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado em seu sistema

### Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/daniolivem/dio.git
   cd dio/simulador-mk
   ```

2. **Execute o simulador:**
   ```bash
   npm start
   ```
   
   ou
   
   ```bash
   npm run dev
   ```

## 🏗️ Estrutura do Projeto

```
simulador-mk/
│
├── docs/                   # Imagens e documentação
│   ├── bowser.gif
│   ├── dk.gif
│   ├── header.gif
│   ├── luigi.gif
│   ├── mario.gif
│   ├── peach.gif
│   ├── toad.gif
│   └── yoshi.gif
│
├── src/
│   └── index.js           # Código principal do simulador
│
├── package.json           # Configurações do projeto
└── README.md              # Documentação do projeto
```

### 📋 Principais Arquivos

| Arquivo | Descrição | Linhas |
|---------|-----------|--------|
| `src/index.js` | Motor principal do jogo com todas as funções | ~250 |
| `package.json` | Configurações e scripts do Node.js | ~40 |
| `README.md` | Documentação técnica completa | ~300 |
| `docs/*.gif` | Assets visuais dos personagens | - |

## 💻 Código Principal

### Principais Funcionalidades

#### 🎲 **Sistema de Seleção Aleatória**
```javascript
async function getRandomPlayer() {
  const allPlayers = [player1, player2, player3, player4, player5, player6];
  const randomIndex = Math.floor(Math.random() * allPlayers.length);
  return allPlayers[randomIndex];
}

async function selectRandomPlayers() {
  const selectedPlayer1 = await getRandomPlayer();
  let selectedPlayer2;
  do {
    selectedPlayer2 = await getRandomPlayer();
  } while (selectedPlayer2.NOME === selectedPlayer1.NOME);
  
  return { player1: selectedPlayer1, player2: selectedPlayer2 };
}
```
Seleciona automaticamente dois personagens diferentes para cada corrida.

#### ⏱️ **Sistema de Delays e Animações**
```javascript
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Animação de carregamento durante o jogo
process.stdout.write("🎲 Rolando dados");
for(let i = 0; i < 3; i++) {
  await sleep(200);
  process.stdout.write(".");
}
```
Adiciona pausas estratégicas e animações para uma experiência mais imersiva.

#### 🎮 **Funções Principais**

- **`rollDice()`** - Simula o lançamento de um dado de 6 lados
- **`getRandomBlock()`** - Determina aleatoriamente o tipo de bloco da pista
- **`playRaceEngine(character1, character2)`** - Executa a lógica da corrida por 5 rodadas com delays
- **`declareWinner(character1, character2)`** - Declara o vencedor e exibe o resultado final
- **`resetPlayerPoints()`** - Reseta os pontos de todos os jogadores

## � Exemplo de Execução

```
🎲 Personagens selecionados aleatoriamente:
🔹 Jogador 1: Yoshi (Vel: 2, Man: 4, Poder: 3)
🔹 Jogador 2: Donkey Kong (Vel: 2, Man: 2, Poder: 5)

🏁🚨 Corrida entre Yoshi e Donkey Kong começando..

🏁 Rodada 1
🎲 Rolando dados...
Bloco: RETA
Yoshi 🎲 rolou um dado de velocidade 4 + 2 = 6 
Donkey Kong 🎲 rolou um dado de velocidade 3 + 2 = 5 
Yoshi marcou um ponto.
--------------------------------------------------------

🏁 Rodada 2
🎲 Rolando dados...
Bloco: CONFRONTO
Yoshi confrontou com Donkey Kong 🥊!
Yoshi 🎲 rolou um dado de poder 2 + 3 = 5 
Donkey Kong 🎲 rolou um dado de poder 6 + 5 = 11 
Donkey Kong venceu o confronto! Yoshi perdeu 1 ponto 🐢
--------------------------------------------------------

🏁 Rodada 3
🎲 Rolando dados...
Bloco: CURVA
Yoshi 🎲 rolou um dado de manobrabilidade 5 + 4 = 9 
Donkey Kong 🎲 rolou um dado de manobrabilidade 1 + 2 = 3 
Yoshi marcou um ponto.
--------------------------------------------------------

...

Resultado final:
Yoshi: 3 ponto(s)
Donkey Kong: 2 ponto(s)

Yoshi venceu a corrida! Parabéns! 🏆
```

## 🔧 Personalização

### **Alterar Personagens Disponíveis**
Para adicionar ou modificar personagens, edite as constantes no início do arquivo:

```javascript
const player7 = {
  NOME: "Toad",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 2,
  PONTOS: 0,
};
```

### **Ajustar Velocidade do Jogo**
Modifique os tempos de delay na função `sleep()`:

```javascript
// Delay entre rodadas (padrão: 2000ms)
await sleep(2000);

// Delay da animação de carregamento (padrão: 200ms)
await sleep(200);

// Delay após mostrar bloco (padrão: 800ms)
await sleep(800);
```

### **Modificar Probabilidades dos Blocos**
Ajuste as probabilidades na função `getRandomBlock()`:

```javascript
switch (true) {
  case random < 0.4:   // 40% para RETA
    result = "RETA";
    break;
  case random < 0.7:   // 30% para CURVA  
    result = "CURVA";
    break;
  default:             // 30% para CONFRONTO
    result = "CONFRONTO";
    break;
}
```

### **Personalizar Número de Rodadas**
Altere o loop na função `playRaceEngine()`:

```javascript
for (let round = 1; round <= 7; round++) { // 7 rodadas em vez de 5
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Possíveis Melhorias

### 🔮 Funcionalidades Planejadas
- [ ] Interface gráfica web com React/Vue
- [ ] Mais personagens (Toad, Wario, Rosalina)
- [ ] Diferentes tipos de pista (Obstáculos, Power-ups)
- [ ] Sistema de power-ups durante a corrida
- [ ] Salvamento de histórico de corridas
- [ ] Sistema de ranking e estatísticas
- [ ] Modo campeonato (eliminatórias)
- [ ] Personalização de atributos dos personagens

### 🛠️ Melhorias Técnicas
- [ ] Refatoração em TypeScript
- [ ] Testes unitários com Jest
- [ ] API REST para dados das corridas
- [ ] Containerização com Docker
- [ ] CI/CD com GitHub Actions
- [ ] Documentação da API
- [ ] Logs estruturados
- [ ] Configuração externa (JSON/YAML)

### 🎨 Melhorias Visuais
- [ ] ASCII art dos personagens
- [ ] Cores no terminal (chalk.js)
- [ ] Gráficos de progresso em tempo real
- [ ] Som effects (se executado no browser)
- [ ] Animações mais elaboradas
- [ ] Dashboard de estatísticas

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Daniely Oliveira**
- Projeto desenvolvido como parte do Bootcamp da DIO
- GitHub: [@daniolivem](https://github.com/daniolivem)

## 🎓 Créditos

- **DIO (Digital Innovation One)** - Bootcamp e desafio
- **Nintendo** - Personagens e conceito original do Mario Kart
- **Felipão** - Instrutor do desafio

---

<div align="center">
  <strong>🏎️ Que vença o melhor piloto! 🏆</strong>
</div>
