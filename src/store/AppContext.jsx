import React, { useState } from "react";

const AppContext = React.createContext({
  barWeight: "",
  loadoutWeight: "",
});

export const AppContextProvider = (props) => {
  const INITIAL_BARWEIGHT = 45;
  const INITIAL_USER_PLATES = [55, 45, 35, 25, 15, 10, 5, 2.5];
  const INITIAL_LOADOUT = [
    { value: 55, amountPerSide: 0 },
    { value: 45, amountPerSide: 0 },
    { value: 35, amountPerSide: 0 },
    { value: 25, amountPerSide: 0 },
    { value: 15, amountPerSide: 0 },
    { value: 10, amountPerSide: 0 },
    { value: 5, amountPerSide: 0 },
    { value: 2.5, amountPerSide: 0 },
  ];
  const INITIAL_TOTAL_PLATE_WEIGHT = 0;

  const [barWeight, setBarWeight] = useState(INITIAL_BARWEIGHT);
  const [userPlates, setUserPlates] = useState(INITIAL_USER_PLATES);
  const [loadout, setLoadout] = useState(INITIAL_LOADOUT);
  const [targetWeight, setTargetWeight] = useState("");
  const [totalWeight, setTotalWeight] = useState(barWeight);
  const [totalPlateWeight, setTotalPlateWeight] = useState(
    INITIAL_TOTAL_PLATE_WEIGHT
  );

  //   LOADOUT FUNCTIONS

  function createNewLoadoutArr(platesArr) {
    let newLoadoutArr = [];

    platesArr.forEach((value) => {
      let plateObj = {
        value: value,
        amountPerSide: 0,
      };
      newLoadoutArr = [...newLoadoutArr, plateObj];
    });
    setLoadout(newLoadoutArr);
    return newLoadoutArr;
  }

  function calculateLoadout() {
    let newLoadout = createNewLoadoutArr(userPlates);
    let remainingWeight = (targetWeight - barWeight) / 2;

    newLoadout.forEach((entry) => {
      if (remainingWeight >= entry.value) {
        let quantity = Math.floor(remainingWeight / entry.value);
        remainingWeight = remainingWeight % entry.value;
        entry.amountPerSide = quantity;
      } else {
        return;
      }
      setLoadout(newLoadout);
    });
  }

  function updateLoadout(valueToUpdate, action) {
    let updatedLoadout = [...loadout];

    let matchedIndex = getMatchingIndex(loadout, valueToUpdate);
    let updatedEntry = updatedLoadout[matchedIndex];

    updatedEntry = updateAmountPerSide(updatedEntry, action);
    updatedLoadout[matchedIndex] = updatedEntry;

    setLoadout(updatedLoadout);
  }

  //   TARGET WEIGHT FUNCTIONS

  function updateTargetWeight(newVal) {
    setTargetWeight(newVal);
  }

  //   USERPLATE FUNCTIONS

  function updateUserPlates(plateValue) {
    let updatedUserPlates = [...userPlates];

    if (existsInUserPlateArr(plateValue)) {
      updatedUserPlates = removeFromUserPlatesArr(plateValue);
    } else {
      updatedUserPlates = addToUserPlatesArr(plateValue);
    }

    setUserPlates(updatedUserPlates);
    createNewLoadoutArr(updatedUserPlates);
  }

  //   CALCULATING FUNCTIONS

  function calculateTotalWeight() {
    const newTotalWeight = barWeight + totalPlateWeight;
    setTotalWeight(newTotalWeight);
  }

  function calculatePlateTotal() {
    let result = 0;

    loadout.forEach((entry) => {
      const { value, amountPerSide } = entry;
      let total = value * (amountPerSide * 2);
      result = result + total;
    });
    setTotalPlateWeight(+result);
  }

  //   HELPER FUNCTIONS

  function updateAmountPerSide(value, action) {
    let updatedValue;

    if (action === "add") {
      updatedValue = {
        ...value,
        amountPerSide: value.amountPerSide + 1,
      };
    } else if (action === "subtract") {
      updatedValue = {
        ...value,
        amountPerSide: value.amountPerSide - 1,
      };
    }
    return updatedValue;
  }

  function existsInUserPlateArr(value) {
    return userPlates.includes(+value);
  }

  function getMatchingIndex(array, valueToMatch) {
    let result = array.findIndex((item) => {
      const { value } = item;
      return value === valueToMatch;
    });
    return result;
  }

  function addToUserPlatesArr(plateValue) {
    return [...userPlates, +plateValue].sort((a, b) => b - a);
  }

  function removeFromUserPlatesArr(plateValue) {
    return userPlates.filter((plate) => +plate !== +plateValue);
  }

  const AppContextValue = {
    barWeight,
    setBarWeight,
    userPlates,
    setUserPlates,
    updateUserPlates,
    existsInUserPlateArr,
    loadout,
    updateLoadout,
    totalPlateWeight,
    setTotalPlateWeight,
    calculateLoadout,
    totalWeight,
    calculatePlateTotal,
    calculateTotalWeight,
    targetWeight,
    updateTargetWeight,
    setTargetWeight,
  };

  return (
    <AppContext.Provider value={AppContextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
