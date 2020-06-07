// This is a utility function for adding the set names to cards as they
// get exported from their file
export const addSetNameToCards = (cards, setName) =>
  Object.keys(cards).reduce((obj, key) => {
    obj[key] = {
      ...cards[key],
      set: setName
    };
    return obj;
  }, {});
