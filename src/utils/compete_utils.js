import { getSumArray } from "./utils";
/* Functions for COMPETE and FIGHT Sections */

/* *************** Get Rounds array
Output ['overall', 'bjj' , 'stamina'] */
export const getRounds = (n) => {
  const round_stats = ['striking', 'defense', 'wrestling', 'bjj', 'stamina', 'health'];
  const rounds = ["overall"];

  const getRandomStat = (stats) => {
    const randomIndex = Math.floor(Math.random() * stats.length);
    return stats[randomIndex];
  };

  const addUniqueRound = (rounds, stat) => {
    if (!rounds.includes(stat)) {
      rounds.push(stat);
    }
  };

  while (rounds.length < n) {
    const randomStat = getRandomStat(round_stats);
    addUniqueRound(rounds, randomStat);
  }

  return rounds;
};

// *************** Find opponent by division • A fighter can fight 1 above/below
export const findOpponentByDivision = (myFighterDivision, fighters) => {
  const divisionsOrder = [
    'Flyweight', 'Bantamweight', 'Featherweight', 'Lightweight',
    'Welterweight', 'Middleweight', 'Light Heavyweight', 'Heavyweight'
  ];

  const myFighterDivisionIndex = divisionsOrder.indexOf(myFighterDivision);
  const validDivisions = [];

  // Include the current division
  validDivisions.push(divisionsOrder[myFighterDivisionIndex]);

  // Include the division above if it exists
  if (myFighterDivisionIndex > 0) {
    validDivisions.push(divisionsOrder[myFighterDivisionIndex - 1]);
  }

  // Include the division below if it exists
  if (myFighterDivisionIndex < divisionsOrder.length - 1) {
    validDivisions.push(divisionsOrder[myFighterDivisionIndex + 1]);
  }

  const validOpponents = fighters.filter(fighter => validDivisions.includes(fighter.division.long_name));

  const randomIndex = Math.floor(Math.random() * validOpponents.length);
  const myRandomOpponent = validOpponents[randomIndex];

  return myRandomOpponent;
};


/* 1. Calculate Win percentage between fighters */
export const calculateWinPercentages = (myFighter, myOpponent, stat) => {
  const ratingDifference = Math.abs(myFighter.stats[stat] - myOpponent.stats[stat]);
  let myFighterWinPercentage, myOpponentWinPercentage;

  if (myFighter.stats[stat] >= myOpponent.stats[stat]) {
    myFighterWinPercentage = 50 + ratingDifference * 3.5;
    myOpponentWinPercentage = 100 - myFighterWinPercentage;
  } else {
    myOpponentWinPercentage = 50 + ratingDifference * 3.5;
    myFighterWinPercentage = 100 - myOpponentWinPercentage;
  }

  console.log('My Fighter Win Percentage:', myFighterWinPercentage);
  console.log('My Opponent Win Percentage:', myOpponentWinPercentage);
  return { myFighterWinPercentage, myOpponentWinPercentage }; //Output: 57, 43
};

/* 2. Pick a winner based on the win percentages */
export const pickWinner = (myFighterWinPercentage) => {
  const randomNum = Math.random() * 100; // Generate a random number between 0 and 100
  console.log('randomNum:', randomNum)
  return randomNum <= myFighterWinPercentage ? 'myFighter' : 'myOpponent';
};

/* Función para ejecutar todas las acciones,
por n cantidad de rounds
y validar si hay una finalización
*/
export const simulateARound = (myFighter, myOpponent, stat) => {
  const { myFighterWinPercentage, myOpponentWinPercentage } = calculateWinPercentages(myFighter, myOpponent, stat);
  const winner = pickWinner(myFighterWinPercentage)
  console.log('winner', winner);

  //Pick win method
  const winMethod = pickWinRoundMethod(winner, myFighter, myOpponent, stat)
  console.log('winMethod', winMethod)

  return {winner, myFighterWinPercentage, winMethod}
}

/* r o u n d   w i n   m e t h o d */
// Pick a win method after a winner get picked
export const pickWinRoundMethod = (winner, myFighter, myOpponent, statName) => {
  let statDifference = Math.abs(myFighter.stats[statName] - myOpponent.stats[statName]);
  let winMethod;

  //Asignar el ganador a fighter {}
  const fighter = winner === 'myFighter' ? myFighter : myOpponent;
  console.log('fighter winner', fighter);

  //Definir su stat más alta (STR o BJJ)
  const highestStat = Math.max(fighter.stats.striking, fighter.stats.bjj)
  const lowestStat = Math.min(fighter.stats.striking, fighter.stats.bjj)
  console.log('highestStat', highestStat)
  console.log('lowestStat', lowestStat)

  //Si el peleador con menor stats ganó, setear statDifference en 0.
  if (winner === 'myFighter' && myFighter.stats[statName] < myOpponent.stats[statName]) {
    statDifference = 0;
  } else if (winner === 'myOpponent' && myFighter.stats[statName] > myOpponent.stats[statName]) {
    statDifference = 0;
  }

  const decisionProbability = statDifference === 0 ? 75 : 75 - statDifference * 3; //deben sumar 3 las stats de abajo
  const highestStatProbability = statDifference === 0 ? 15 : 15 + statDifference * 1.5;
  const lowestStatProbability = statDifference === 0 ? 5 : 5 + statDifference * 1;
  const decision8Probability = statDifference === 0 ? 5 : 5 + statDifference * 0.5;

  const randomValue = Math.random() * 100; // Generate a random value between 0 and 100
  console.log('random n winRoundMethod', randomValue);
  console.log('decisionProbability', decisionProbability);
  console.log('highestStatProbability', highestStatProbability);
  console.log('lowestStatProbability', lowestStatProbability);

  if (randomValue < decisionProbability) {
    winMethod = '10-9'; // Win by 10-9 decision
  } else if (randomValue < decisionProbability + highestStatProbability) {
    winMethod = highestStat === fighter.stats.striking ? 'TKO' : 'SUB'; // Win by highestStat method (TKO or SUB)
  } else if (randomValue < decisionProbability + highestStatProbability + lowestStatProbability) {
    winMethod = lowestStat === fighter.stats.bjj ? 'SUB' : 'TKO'; // Win by lowestStat method (SUB or TKO)
  } else {
    winMethod = '10-8'; // Win by 10-8 decision
  }

  return winMethod;
};


/* f i g h t   w i n   m e t h o d */
/*Determinar quién ganó en base al scorecard
considerando que puede haber un string y no solo números*/
export const getWinnerByScorecard = (myFighterScorecard, myOpponentScorecard) => {
  const hasTKO = myFighterScorecard.includes('KO/TKO') || myOpponentScorecard.includes('KO/TKO');
  const hasSUB = myFighterScorecard.includes('SUB') || myOpponentScorecard.includes('SUB');

  if (hasTKO && !hasSUB) {
    return myFighterScorecard.includes('KO/TKO') ? 'myFighter' : 'myOpponent';
  } else if (!hasTKO && hasSUB) {
    return myFighterScorecard.includes('SUB') ? 'myFighter' : 'myOpponent';
  }

  const totalScorecardMyF = getSumArray(myFighterScorecard);
  const totalScorecardMyOpp = getSumArray(myOpponentScorecard);

  if (totalScorecardMyF === totalScorecardMyOpp) return 'Draw';
  return totalScorecardMyF > totalScorecardMyOpp ? 'myFighter' : 'myOpponent';
};

//Fight win method
export const getWinMethodByScorecard = (myFighterScorecard, myOpponentScorecard) => {
  const hasTKO = myFighterScorecard.includes('KO/TKO') || myOpponentScorecard.includes('KO/TKO');
  const hasSUB = myFighterScorecard.includes('SUB') || myOpponentScorecard.includes('SUB');

  if (hasTKO) return 'KO/TKO'
  if (hasSUB) return 'SUB'

  const totalScorecardMyF = getSumArray(myFighterScorecard);
  const totalScorecardMyOpp = getSumArray(myOpponentScorecard);

  return `${totalScorecardMyF}/${totalScorecardMyOpp}`
};

/* r e w a r d s */
export const getRewardPoints = (myFighterScorecard, myOpponentScorecard) => {
  const hasTKO = myFighterScorecard.includes('KO/TKO') || myOpponentScorecard.includes('KO/TKO');
  const hasSUB = myFighterScorecard.includes('SUB') || myOpponentScorecard.includes('SUB');

  if (hasTKO && !hasSUB) {
    return myFighterScorecard.includes('KO/TKO') ? 700 : 50;
  } else if (!hasTKO && hasSUB) {
    return myFighterScorecard.includes('SUB') ? 700 : 50;
  }

  const totalScorecardMyF = getSumArray(myFighterScorecard);
  const totalScorecardMyOpp = getSumArray(myOpponentScorecard);

  if (totalScorecardMyF === totalScorecardMyOpp) return 250;
  return totalScorecardMyF > totalScorecardMyOpp ? 500 : 150;
}

export const tradePointsForRewards = (points) => {
  let packs
  let coins

  if (points >= 0 && points <= 1350) { //2w-2l-1l,ko 1350
    packs = [4, 4]
    coins = 350
  } else if (points >= 1351 && points <= 1800) { //3w-2l 1800
    packs = [4, 5]
    coins = 750
  } else if (points >= 1801 && points <= 2550) { // 2w,ko-2w-1l 2550
    packs = [4, 4, 5]
    coins = 1500
  } else if (points > 2550) {
    packs = [4, 4, 5, 5]
    coins = 2100
  }

  return {packs, coins}
}

