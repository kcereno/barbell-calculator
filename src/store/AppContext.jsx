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
  // Creates a new loadout object array based on passed in plate array
  function createNewLoadoutArr(platesArr) {
    let newLoadout = [];

    platesArr.forEach((value) => {
      let plateObj = {
        value: value,
        amountPerSide: 0,
      };
      newLoadout = [...newLoadout, plateObj];
    });
    setLoadout(newLoadout);
  }

  // Updates loadout
  function updateLoadout(valueToUpdate, action) {
    let updatedLoadout = [...loadout];
    let matchedIndex = getMatchingIndex(loadout, valueToUpdate);
    let updatedEntry = updatedLoadout[matchedIndex];

    function updateAmountPerSide(value, action) {
      console.log(value.amountPerSide === 0);

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

    updatedEntry = updateAmountPerSide(updatedEntry, action);

    updatedLoadout[matchedIndex] = updatedEntry;

    setLoadout(updatedLoadout);
  }

  //   Calculates loadout based on passed in weight
  function calculateLoadout() {
    let remainingWeight = (targetWeight - barWeight) / 2;
    let newLoadout = [...loadout];

    newLoadout.forEach((entry) => {
      if (remainingWeight >= entry.value) {
        let quantity = Math.floor(remainingWeight / entry.value);
        remainingWeight = remainingWeight % entry.value;
        entry.amountPerSide = quantity;
      } else {
        return;
      }
      console.log(newLoadout);
      setLoadout(newLoadout);
    });
  }

  //   TARGET WEIGHT FUNCTION
  function updateTargetWeight(newVal) {
    setTargetWeight(newVal);
  }

  //   USERPLATE FUNCTIONS
  // Add or removes passed value to userPlates array
  function updateUserPlates(value) {
    createNewLoadoutArr([]);
    let updatedUserPlates;

    if (inUserPlateArray(value)) {
      updatedUserPlates = userPlates.filter((plate) => +plate !== +value);
    } else {
      updatedUserPlates = [...userPlates, +value].sort((a, b) => b - a);
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

  // Checks if passed values exists in userPlates array
  function inUserPlateArray(value) {
    return userPlates.includes(+value);
  }

  function getMatchingIndex(array, valueToMatch) {
    let result = array.findIndex((item) => {
      const { value } = item;
      return value === valueToMatch;
    });
    return result;
  }

  const AppContextValue = {
    barWeight,
    setBarWeight,
    userPlates,
    setUserPlates,
    updateUserPlates,
    inUserPlateArray,
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
