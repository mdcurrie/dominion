import bureaucratSagas from "./bureaucrat";
import copperSagas from "./copper";
import councilRoomSagas from "./councilRoom";
import festivalSagas from "./festival";
import goldSagas from "./gold";
import laboratorySagas from "./laboratory";
import marketSagas from "./market";
import merchantSagas from "./merchant";
import moatSagas from "./moat";
import moneylenderSagas from "./moneylender";
import silverSagas from "./silver";
import smithySagas from "./smithy";
import villageSagas from "./village";
import witchSagas from "./witch";
import workshopSagas from "./workshop";

export default [
  ...bureaucratSagas,
  ...copperSagas,
  ...councilRoomSagas,
  ...festivalSagas,
  ...goldSagas,
  ...laboratorySagas,
  ...marketSagas,
  ...merchantSagas,
  ...moatSagas,
  ...moneylenderSagas,
  ...silverSagas,
  ...smithySagas,
  ...villageSagas,
  ...witchSagas,
  ...workshopSagas
];
