import copperSagas from "./copper";
import festivalSagas from "./festival";
import goldSagas from "./gold";
import laboratorySagas from "./laboratory";
import marketSagas from "./market";
import moatSagas from "./moat";
import silverSagas from "./silver";
import smithySagas from "./smithy";
import villageSagas from "./village";

export default [
  ...copperSagas,
  ...festivalSagas,
  ...goldSagas,
  ...laboratorySagas,
  ...marketSagas,
  ...moatSagas,
  ...silverSagas,
  ...smithySagas,
  ...villageSagas
];
