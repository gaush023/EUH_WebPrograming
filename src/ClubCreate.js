import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useUser } from './UserContext';

function ClubCreate() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [activities, setActivities] = useState('');
  const [members, setMembers] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const { userId } = useUser();

  const handleCreateClub = async (e) => {
    e.preventDefault();

    try {
      const clubsCollection = collection(db, 'clubs');
      await addDoc(clubsCollection, {
        name: name,
        description: description,
        activities: activities,
        members: [userId],
        password: '',
        });
      setMessage('Club created successfully!');
      setName('');
      setDescription('');
      setActivities('');
      setPassword('');
    }
    catch (error) {
      console.error("Error adding club:", error);
      setMessage('Error creating club.');
    }
  };

  return (
    <div>
      <h1>Create a Club</h1>
      <form onSubmit={handleCreateClub}>
        <label>
          club name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Activities:
          <input type="text" value={activities} onChange={(e) => setActivities(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Create Club</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default ClubCreate;
