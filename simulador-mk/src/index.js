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

async function rollDice() { //async para n executar a f de imediato
  return Math.floor(Math.random() * 6) + 1;
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <=5; round++){
  console.log(`Rodada ${round}`)
  }

// inserir um codigo pra sortear bloco 

}

(async function main() {
  console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando..\n`);  

 await playRaceEngine(player1, player2);
})(); //f auto invoke ~



