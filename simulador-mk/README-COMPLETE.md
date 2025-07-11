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

### 🛣️ Tipos de Pista

| Tipo | Probabilidade | Atributo Usado | Descrição |
|------|---------------|----------------|-----------|
| **RETA** | 33% | Velocidade | Teste de velocidade pura |
| **CURVA** | 33% | Manobrabilidade | Teste de habilidade nas curvas |
| **CONFRONTO** | 34% | Poder | Batalha direta entre os personagens |

### 🎲 Sistema de Pontuação

#### Reta e Curva
- Cada jogador rola um dado de 6 lados
- Soma o resultado com o atributo correspondente
- O jogador com maior total **ganha 1 ponto**

#### Confronto
- Cada jogador rola um dado de 6 lados
- Soma o resultado com o atributo PODER
- O jogador que **perder** perde 1 ponto (mínimo 0)

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
└── README.md             # Documentação
```

## 💻 Código Principal

### Funções Principais

#### `rollDice()`
```javascript
async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}
```
Simula o lançamento de um dado de 6 lados.

#### `getRandomBlock()`
```javascript
async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
      break;
  }

  return result;
}
```
Determina aleatoriamente o tipo de bloco da pista.

#### `playRaceEngine(character1, character2)`
Função principal que executa a lógica da corrida por 5 rodadas.

#### `declareWinner(character1, character2)`
Declara o vencedor e exibe o resultado final.

## 🎮 Exemplo de Execução

```
🏁🚨 Corrida entre Mário e Browser começando..

🏁 Rodada 1
Bloco: RETA
Mário 🎲 rolou um dado de velocidade 3 + 4 = 7 
Browser 🎲 rolou um dado de velocidade 6 + 5 = 11 
Browser marcou um ponto.
--------------------------------------------------------

🏁 Rodada 2
Bloco: CONFRONTO
Browser confrontou com Mário 🥊!
Browser 🎲 rolou um dado de poder 4 + 5 = 9 
Mário 🎲 rolou um dado de poder 2 + 3 = 5 
Browser venceu o confronto! Mário perdeu 1 ponto 🐢
--------------------------------------------------------

...

Resultado final:
Mário: 2 ponto(s)
Browser: 3 ponto(s)

Browser venceu a corrida! Parabéns! 🏆
```

## 🔧 Personalização

Para alterar os personagens da corrida, modifique as variáveis no final do arquivo `src/index.js`:

```javascript
(async function main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando..\n`
  );

  await playRaceEngine(player1, player2); // Altere player1 e player2
  await declareWinner(player1, player2);
})();
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Possíveis Melhorias

- [ ] Interface gráfica web
- [ ] Mais personagens
- [ ] Diferentes tipos de pista
- [ ] Sistema de power-ups
- [ ] Multiplayer online
- [ ] Salvamento de histórico de corridas
- [ ] Sistema de ranking

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
