import {
  get_existing_rule_round,
  get_new_rule_round,
  define_rule,
} from "./engine.js";
import { get_random_int_in_range } from "./utils.js";

const ROUND_TYPES = {
  NEW_RULE: "new_rule",
  EXISTING_RULE: "existing_rule",
};

// The rounds the game will play through
const ROUNDS = [
  {
    roundType: ROUND_TYPES.NEW_RULE,
    ruleType: "shape",
    ruleConstraints: {},
    numAnswers: 3,
  },
  {
    roundType: ROUND_TYPES.EXISTING_RULE,
    // ruleType: "shape",
    // ruleConstraints: {},
    numAnswers: 3,
  },
  {
    roundType: ROUND_TYPES.EXISTING_RULE,
    // ruleType: "shape",
    // ruleConstraints: {},
    numAnswers: 3,
  },
  {
    roundType: ROUND_TYPES.NEW_RULE,
    ruleType: "shape",
    ruleConstraints: {},
    numAnswers: 3,
  },
  {
    roundType: ROUND_TYPES.EXISTING_RULE,
    // ruleType: "shape",
    // ruleConstraints: {},
    numAnswers: 4,
  },
  {
    roundType: ROUND_TYPES.EXISTING_RULE,
    ruleType: "shape",
    ruleConstraints: {},
    numAnswers: 4,
  },
];

// Hacky global that we use to store the generated round data that is persistent
// for the duration of the round
let currentRoundData = {};

export function get_round_data(roundNum) {
  const round = ROUNDS[roundNum] || generateRandomRound(roundNum);

  if (round.roundType === ROUND_TYPES.NEW_RULE) {
    currentRoundData = get_new_rule_round(
      round.ruleConstraints,
      round.ruleType,
      round.numAnswers
    );
    console.log({ currentRoundData });
    return currentRoundData;
  } else {
    currentRoundData = get_existing_rule_round(round.numAnswers);
    console.log({ currentRoundData });
    return currentRoundData;
  }
}

export function validate_round(roundNum, answerIndex) {
  const round = ROUNDS[roundNum];
  if (round.roundType === ROUND_TYPES.NEW_RULE) {
    const answer = currentRoundData.answers[answerIndex];
    define_rule(round.ruleType, currentRoundData.word, answer.shape);
    return true;
  } else {
    // Existing round
    return (
      currentRoundData.correct_answer.shape ===
      currentRoundData.answers[answerIndex].shape
    );
  }
}

function generateRandomRound(roundNumber) {
  // Super shitty

  let round = null;

  if (Math.random() > 0.6) {
    round = {
      roundType: ROUND_TYPES.NEW_RULE,
      ruleType: "shape",
      ruleConstraints: {},
      numAnswers: get_random_int_in_range(4, 9),
    };
  } else {
    round = {
      roundType: ROUND_TYPES.EXISTING_RULE,
      // ruleType: "shape",
      // ruleConstraints: {},
      numAnswers: get_random_int_in_range(4, 9),
    };
  }

  ROUNDS.push(round);
  return round;
}