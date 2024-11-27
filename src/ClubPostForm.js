import React, { useState } from 'react';
import { db } from './firebase';
import { useParams } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function ClubPostForm() {
  const { clubId } = useParams(); // 現在のクラブIDを取得
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postsCollection = collection(db, 'clubs', clubId, 'posts');
      await addDoc(postsCollection, {
        title: title,
        description: description,
        timestamp: serverTimestamp(), // Firestoreのサーバータイムスタンプ
      });
      setMessage('Event posted successfully!');
      setTitle('');
      setDescription('');
    } catch (error) {
      setMessage('Error posting event: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Post a New Event</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Post Event</button>
      </form>
    </div>
  );
}

export default ClubPostForm;
