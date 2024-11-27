import React, { createContext, useContext, useState } from 'react';

const ClubContext = createContext();

export const useClub = () => useContext(ClubContext);

export const ClubProvider = ({ children }) => {
  const [clubId, setClubId] = useState(null);

    return (
    <ClubContext.Provider value={{ clubId, setClubId }}>
      {children}
    </ClubContext.Provider>
  );
};

