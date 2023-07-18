import { countries, weights } from "../data/data";
import { fighters } from "../data/data";
import cloneDeep from 'lodash/cloneDeep';

/*export const getFighter = (id) => {
  return fighters.find(fighter => fighter.id === id);
}*/
//Deep copy
export const getFighter = (id) => {
  const fighter = fighters.find(fighter => fighter.id === id);
  if (fighter) {
    return cloneDeep(fighter);
  }
  return null;
};

export const getAllFighters = (array_ids) => {
  // Filter the fighters based on the provided array of ids
  const filteredFighters = [...fighters].filter((fighter) => array_ids.includes(fighter.id));

  return filteredFighters;
}

//Get .png flag image
export const getCountryFlagImage = (id) => {
  const flag = countries.find(country => country.id === id);
  const imageUrl = !flag ? 'https://flagicons.lipis.dev/flags/4x3/xx.svg' : flag.image;

  return imageUrl;
}

/* Get card_price/s [175, 2000] from fighter object
Recibe como parámetro un array de objetos o un solo objeto
Este objeto tiene: fighter.rarity (30) y
Busca el card_price en weights*/
export const getRarityPrice = (fighter) => {
  if (Array.isArray(fighter)) {
    return fighter.map((obj) => {
      const rarityValue = obj?.rarity;
      const rarityKey = Object.keys(weights).find((key) => weights[key].value === rarityValue);
      const rarityPrice = weights[rarityKey]?.card_price || null;
      return rarityPrice;
    });
  } else {
    // If the input is a single fighter
    const rarityValue = fighter.rarity;
    const rarityKey = Object.keys(weights).find((key) => weights[key].value === rarityValue);
    const rarityPrice = weights[rarityKey]?.card_price || null;
    return rarityPrice;
  }
}

/*Get opponent weight division 
Una pelea puede pasar con rivales de max 1 peso abajo o arriba*/
export const getOpponentByDivision = (myDivision) => {

}

//Sort by one property
export const orderFighterByProperty = (array, property) => {
  const sortedArray = [...array].sort((a, b) => {
    if (property.includes('.')) {
      // Handle nested property
      const parts = property.split('.');
      const aValue = getNestedPropertyValue(a, parts);
      const bValue = getNestedPropertyValue(b, parts);
      return bValue - aValue; // Sort in descending order
    } else {
      // Handle non-nested property
      return b[property] - a[property]; // Sort in descending order
    }
  });

  return sortedArray;
};
//Sort by property and rarity
export const orderFighterByPropertyAndRarity = (array, property1) => {
  const copiedArray = array.map((item) => ({ ...item })); // Create a deep copy of the array
  const sortedArray = copiedArray.sort((a, b) => {
    if (property1.includes('.')) {
      // Handle nested property
      const parts1 = property1.split('.');
      const aValue1 = getNestedPropertyValue(a, parts1);
      const bValue1 = getNestedPropertyValue(b, parts1);
      if (bValue1 !== aValue1) {
        return bValue1 - aValue1; // Sort in descending order
      }
    } else {
      // Handle non-nested property
      if (b[property1] !== a[property1]) {
        return b[property1] - a[property1]; // Sort in descending order
      }
    }

    const rarityA = a.rarity || 0; // Default to 0 if rarity property is missing
    const rarityB = b.rarity || 0; // Default to 0 if rarity property is missing
    return rarityA - rarityB; // Sort in ascending order
  });

  return sortedArray;
};
// Helper function to get the value of a nested property
export const getNestedPropertyValue = (object, parts) => {
  let value = object;

  for (let part of parts) {
    value = value[part];

    if (value === undefined) {
      break; // Stop if any nested property is undefined
    }
  }

  return value;
};

/* g e n e r a l   u t i l s */
export const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
}

export const getSumArray = (array) => {
  return array.reduce((acc, currentValue) => acc + currentValue, 0)
}
