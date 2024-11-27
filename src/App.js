import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Grade from './Grade';
import Course from './Course';
import ProtectedRoutes from './ProtectedRoutes';
import EditProfile from './EditProfile';
import { UserProvider } from './UserContext';
import Club from './Club';
import ClubCreate from './ClubCreate';
import ClubLogin from './ClubLogin';
import { ClubProvider } from './ClubContext'; // 修正: ClubProviderをインポート

function App() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clubId, setClubId] = useState(null); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user); // デバッグ用
        setUserId(user.uid);
      } else {
        console.log("No user is signed in."); // デバッグ用
        setUserId(null);
      }
      setLoading(false); // 認証状態が確定したらloadingをfalseに設定
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <UserProvider userId={userId}>
      <ClubProvider clubId={clubId}>  
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoutes isAuthenticated={!!userId} />}>
            <Route path="/" element={<Home />} />
            <Route path="/club/:clubId/home" element={<Club />} />
            <Route path="/grade" element={<Grade />} />
            <Route path="/course" element={<Course />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/clubcreate" element={<ClubCreate />} />
            <Route path="/clublogin" element={<ClubLogin />} />
          </Route>
        </Routes>
      </ClubProvider>
    </UserProvider>
  );
}

export default App;
