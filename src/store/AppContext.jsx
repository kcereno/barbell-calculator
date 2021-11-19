import React, { useState } from "react";

const AppContext = React.createContext({
  barWeight: "",
  loadoutWeight: "",
});

export const AppContextProvider = (props) => {
  const INITIAL_BARWEIGHT = 45;
  const INITIAL_USER_PLATES = [55, 45, 35, 25, 15, 10, 5, 2.5];

  const [barWeight, setBarWeight] = useState(INITIAL_BARWEIGHT);
  const [userPlates, setUserPlates] = useState(INITIAL_USER_PLATES);

  const inUserPlateArray = (value) => {
    return userPlates.includes(+value);
  };

  const updateUserPlates = (value) => {
    let updatedUserPlates;

    if (inUserPlateArray(value)) {
      updatedUserPlates = userPlates.filter((plate) => +plate !== +value);
    } else {
      updatedUserPlates = [...userPlates, +value].sort((a, b) => b - a);
    }

    setUserPlates(updatedUserPlates);
    console.log(userPlates);
  };

  const AppContextValue = {
    barWeight,
    setBarWeight,
    userPlates,
    setUserPlates,
    updateUserPlates,
    inUserPlateArray,
  };

  return (
    <AppContext.Provider value={AppContextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
