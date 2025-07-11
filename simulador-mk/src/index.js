// sleep simples
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const player1 = {
  NOME: "Mário",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};
const player2 = {
  NOME: "Browser",
  VELOCIDADE: 5,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0,
};

const player3 = {
  NOME: "Peach",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 2,
  PONTOS: 0,
};
const player4 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};
const player5 = {
  NOME: "Yoshi",
  VELOCIDADE: 2,
  MANOBRABILIDADE: 4,
  PODER: 3,
  PONTOS: 0,
};
const player6 = {
  NOME: "Donkey Kong",
  VELOCIDADE: 2,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0,
};

async function getRandomPlayer() {
  const allPlayers = [player1, player2, player3, player4, player5, player6];
  const randomIndex = Math.floor(Math.random() * allPlayers.length);
  return allPlayers[randomIndex];
}

async function selectRandomPlayers() {
  // seleciona aleatoriamente o player1
  const selectedPlayer1 = await getRandomPlayer();

  // seleciona um jogador aleatório diferente do primeiro
  let selectedPlayer2;
  do {
    selectedPlayer2 = await getRandomPlayer();
  } while (selectedPlayer2.NOME === selectedPlayer1.NOME);

  return { player1: selectedPlayer1, player2: selectedPlayer2 };
}

async function resetPlayerPoints() {
  // reseta os pontos de todos os jogadores para 0
  const allPlayers = [player1, player2, player3, player4, player5, player6];
  allPlayers.forEach(player =>{
    player.PONTOS = 0;
  }); 
}

async function rollDice() {
  //async para n executar a f de imediato
  return Math.floor(Math.random() * 6) + 1;
}

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

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    } `
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);
    await sleep(1000);

    // carregamento
    process.stdout.write("🎲 Rolando dados");
    for(let i = 0; i < 3; i++) {
      await sleep(200);
      process.stdout.write(".");
    }
    console.log("");

    // sort block
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    // delay
    await sleep(800);

    // roll dice
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    // skill test
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(
        character1.NOME,
        "velocidade",
        diceResult1,
        character1.VELOCIDADE
      );
      await logRollResult(
        character2.NOME,
        "velocidade",
        diceResult2,
        character2.VELOCIDADE
      );
    }
    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(
        character1.NOME,
        "manobrabilidade",
        diceResult1,
        character1.MANOBRABILIDADE
      );

      await logRollResult(
        character2.NOME,
        "manobrabilidade",
        diceResult2,
        character2.MANOBRABILIDADE
      );
    }
    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;

      console.log(`${character1.NOME} confrontou com ${character2.NOME} 🥊!`);
      await logRollResult(
        character1.NOME,
        "poder",
        diceResult1,
        character1.PODER
      );

      await logRollResult(
        character2.NOME,
        "poder",
        diceResult2,
        character2.PODER
      );
      //if combinado - quem perde o confronto perde 1 ponto
      if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
        console.log(
          `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`
        );
        character2.PONTOS--; // Corrigido: o perdedor perde o ponto
      }
      if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
        console.log(
          `${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`
        );
        character1.PONTOS--; // Corrigido: o perdedor perde o ponto
      }

      console.log(
        powerResult1 === powerResult2
          ? "Confronto empatado, nenhum ponto foi perdido"
          : ""
      );
    }

    // check winner
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.NOME} marcou um ponto.`);
      character1.PONTOS++;
    } else if (totalTestSkill1 < totalTestSkill2) {
      console.log(`${character2.NOME} marcou um ponto.`);
      character2.PONTOS++;
    }
    console.log(`--------------------------------------------------------`);

    // delay entre rodadas
    if (round < 5) {
      await sleep(2000);
    }
  }
}

async function declareWinner(character1, character2) {
  console.log(`Resultado final:`);
  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS)
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
  else if (character1.PONTOS < character2.PONTOS) {
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
  } else console.log(`A corrida terminou em empate`);
}

(async function main() {
  // reseta os pontos de todos os players
  await resetPlayerPoints();

  // seleciona dois players aleatórios
  const selectedPlayers = await selectRandomPlayers();
  const randomPlayer1 = selectedPlayers.player1
  const randomPlayer2 = selectedPlayers.player2;

  // exibe os personagens selecionados
  console.log(`🎲 Personagens selecionados aleatoriamente:`);
  console.log(`🔹 Jogador 1: ${randomPlayer1.NOME} (Vel: ${randomPlayer1.VELOCIDADE}, Man: ${randomPlayer1.MANOBRABILIDADE}, Poder: ${randomPlayer1.PODER})`);
  console.log(`🔹 Jogador 2: ${randomPlayer2.NOME} (Vel: ${randomPlayer2.VELOCIDADE}, Man: ${randomPlayer2.MANOBRABILIDADE}, Poder: ${randomPlayer2.PODER})`);
  console.log(`\n🏁🚨 Corrida entre ${randomPlayer1.NOME} e ${randomPlayer2.NOME} começando..\n`);

  
    // Executa a corrida com os personagens selecionados
  await playRaceEngine(randomPlayer1, randomPlayer2);
  await declareWinner(randomPlayer1, randomPlayer2);
})();
