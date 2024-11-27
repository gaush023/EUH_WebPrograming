import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

function EditProfile() { 
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [club, setClub] = useState('');
  const { userId } = useUser(); 

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        console.error("User ID is missing.");
        return;
      }
      try {
        const profileDoc = await getDoc(doc(db, 'users', userId));
        if (profileDoc.exists()) {
          const profileData = profileDoc.data();
          setName(profileData.name || '');
          setBio(profileData.bio || '');
       }
      } catch (error) {
        console.error("プロフィールの取得エラー:", error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error("User ID is missing.");
      alert("User ID is missing. Please log in again.");
      return;
    }

    try {
      const userDoc = doc(db, 'users', userId);
      await setDoc(userDoc, {
        name: name,
        bio: bio,
        club: club,
      });
      alert('Profile updated successfully!');
      navigate(-1);
    } catch (error) {
      console.error('Error updating profile', error);
      alert('Error updating profile');
    }
  };

  if (!userId) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome to the Edit Profile Page</h1>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSave}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Bio:
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>Go Back</button>
      </form>
    </div>
  );
}

export default EditProfile;
