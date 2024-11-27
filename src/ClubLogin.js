import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';
import { useClub } from './ClubContext';

function ClubLogin() {
  const [clubName, setClubName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setClubId } = useClub(); // コンテキストからsetClubIdを取得

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const clubsCollection = collection(db, 'clubs');
      const q = query(clubsCollection, where('name', '==', clubName));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const clubDoc = querySnapshot.docs[0];
        const clubData = clubDoc.data();

        if (clubData.password === password) {
          setClubId(clubDoc.id);
          navigate(`/club/${clubDoc.id}/home`); 
        } else {
          setError("Incorrect club password.");
        }
      } else {
        setError("Club not found.");
      }
    } catch (error) {
      setError("Login failed: " + error.message);
    }
  };

  return (
    <div>
      <h1>Login to Club</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <label>
          Club Name:
          <input
            type="text"
            placeholder="Enter club name"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Club Password:
          <input
            type="password"
            placeholder="Enter club password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default ClubLogin;
