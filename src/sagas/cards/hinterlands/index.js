import oasisSagas from "./oasis";
import margraveSagas from "./margrave";
import spiceMerchantSagas from "./spiceMerchant";

export default [
  ...oasisSagas,
  ...margraveSagas,
  ...spiceMerchantSagas,
];
