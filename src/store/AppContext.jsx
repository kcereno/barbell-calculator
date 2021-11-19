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

  const [barWeight, setBarWeight] = useState(INITIAL_BARWEIGHT);
  const [userPlates, setUserPlates] = useState(INITIAL_USER_PLATES);
  const [loadout, setLoadout] = useState(INITIAL_LOADOUT);

  // Creates array containing objects with value and amount value
  const createLoadOut = (arr) => {
    let updatedLoadout = [...loadout];

    arr.forEach((value) => {
      let plateObj = {
        value: value,
        amount: 0,
      };

      updatedLoadout = [...updatedLoadout, plateObj];
    });
    setLoadout((prevVal) => (prevVal = updatedLoadout));
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
      updatedEntry = { ...updatedEntry, amount: updatedEntry.amount + 1 };
    } else {
      updatedEntry = { ...updatedEntry, amount: updatedEntry.amount + -1 };
    }

    updatedLoadout[matchedIndex] = updatedEntry;

    setLoadout(updatedLoadout);
  };

  // Checks if passed values exists in userPlates array
  const inUserPlateArray = (value) => {
    return userPlates.includes(+value);
  };

  // Updates userPlates and correspiding loadout format
  const updateUserPlates = (value) => {
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
  };

  return (
    <AppContext.Provider value={AppContextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
