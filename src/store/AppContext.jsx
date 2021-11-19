import React, { useState } from "react";

const AppContext = React.createContext({
  barWeight: "",
  loadoutWeight: "",
});

export const AppContextProvider = (props) => {
  const INITIAL_BARWEIGHT = 45;
  const INITIAL_USER_PLATES = [55, 45, 35, 25, 15, 10, 5, 2.5];
  const INITIAL_LOADOUT = [
    { value: 55, amount: 0 },
    { value: 45, amount: 0 },
    { value: 35, amount: 0 },
    { value: 25, amount: 0 },
    { value: 15, amount: 0 },
    { value: 10, amount: 0 },
    { value: 5, amount: 0 },
    { value: 2.5, amount: 0 },
  ];
  const INITIAL_TOTAL_PLATE_WEIGHT = 0;

  const [barWeight, setBarWeight] = useState(INITIAL_BARWEIGHT);
  const [userPlates, setUserPlates] = useState(INITIAL_USER_PLATES);
  const [loadout, setLoadout] = useState(INITIAL_LOADOUT);
  const [targetWeight, setTargetWeight] = useState('');
  const [totalWeight, setTotalWeight] = useState(barWeight);
  const [totalPlateWeight, setTotalPlateWeight] = useState(
    INITIAL_TOTAL_PLATE_WEIGHT
  );

  //   LOADOUT FUNCTIONS
  // Creates a new loadout array based on passed in plate array
  const createNewLoadoutArr = (platesArr) => {
    let newLoadout = [];

    platesArr.forEach((value) => {
      let plateObj = {
        value: value,
        amount: 0,
      };
      newLoadout = [...newLoadout, plateObj];
    });
    setLoadout((prevVal) => (prevVal = newLoadout));
  };

  // Updates loadout
  const updateLoadout = (valueToUpdate, action) => {
    let updatedLoadout = [...loadout];

    let matchedIndex = loadout.findIndex((entry) => {
      const { value } = entry;
      return value === valueToUpdate;
    });

    let updatedEntry = loadout[matchedIndex];

    if (action === "add") {
      updatedEntry = { ...updatedEntry, amount: updatedEntry.amount + 2 };
    } else {
      if (updatedEntry.amount === 0) {
        return;
      } else {
        updatedEntry = { ...updatedEntry, amount: updatedEntry.amount - 2 };
      }
    }

    updatedLoadout[matchedIndex] = updatedEntry;

    setLoadout(updatedLoadout);
  };

  //   Calculates loadout based on passed in weight
  const calculateLoadout = () => {
    let remainingWeight = targetWeight - barWeight;
    let newLoadout = [...loadout];

    newLoadout.forEach((entry) => {
      if (remainingWeight >= entry.value) {
        let quantity = Math.floor(remainingWeight / entry.value);
        remainingWeight = remainingWeight % entry.value;
        entry.amount = quantity;
      } else {
        return;
      }
      setLoadout(newLoadout);
    });
  };

  //   TARGET WEIGHT FUNCTION
    const updateTargetWeight = (newVal) => {
    setTargetWeight(newVal);
  };

  //   USERPLATE FUNCTIONS
  // Updates userPlates array
  const updateUserPlates = (value) => {
    createNewLoadoutArr([]);
    let updatedUserPlates;

    if (inUserPlateArray(value)) {
      updatedUserPlates = userPlates.filter((plate) => +plate !== +value);
    } else {
      updatedUserPlates = [...userPlates, +value].sort((a, b) => b - a);
    }
    setUserPlates(updatedUserPlates);
    createNewLoadoutArr(updatedUserPlates);
  };

  //   CALCULATING FUNCTIONS

  const calculateTotalWeight = () => {
    const newTotalWeight = barWeight + totalPlateWeight;
    setTotalWeight(newTotalWeight);
  };

  const calculatePlateTotal = () => {
    let result = 0;

    loadout.forEach((entry) => {
      const { value, amount } = entry;
      let total = value * amount;
      result = result + total;
    });
    setTotalPlateWeight(result);
  };

  //   HELPER FUNCTIONS

  // Checks if passed values exists in userPlates array
  const inUserPlateArray = (value) => {
    return userPlates.includes(+value);
  };

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
    setTargetWeight
  };

  return (
    <AppContext.Provider value={AppContextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
