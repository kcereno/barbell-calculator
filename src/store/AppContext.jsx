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
  const [totalPlateWeight, setTotalPlateWeight] = useState(
    INITIAL_TOTAL_PLATE_WEIGHT
  );

  // Creates a new loadout arr based on passed in plates arr
  const createLoadOut = (platesArr) => {
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

    // Finds index of arr entry that matches valueToUpdate
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

  // Checks if passed values exists in userPlates array
  const inUserPlateArray = (value) => {
    return userPlates.includes(+value);
  };

  // Updates userPlates and corresponding loadout format
  const updateUserPlates = (value) => {
    createLoadOut([]);
    let updatedUserPlates;

    if (inUserPlateArray(value)) {
      updatedUserPlates = userPlates.filter((plate) => +plate !== +value);
    } else {
      updatedUserPlates = [...userPlates, +value].sort((a, b) => b - a);
    }
    setUserPlates(updatedUserPlates);
    createLoadOut(updatedUserPlates);
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
    setTotalPlateWeight
  };

  return (
    <AppContext.Provider value={AppContextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
