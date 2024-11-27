import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import ClubPostForm from './ClubPostForm';
import { useNavigate } from 'react-router-dom';

function ClubHome() {
  const navigate = useNavigate();
  const { clubId } = useParams();
  const [club, setClub] = useState(null);
  const [posts, setPosts] = useState([]); // 投稿リストの状態

  useEffect(() => {
    const fetchClub = async () => {
      const clubDoc = await getDoc(doc(db, 'clubs', clubId));
      if (clubDoc.exists()) {
        setClub(clubDoc.data());
      } else {
        console.error("Club not found.");
      }
    };

    const fetchPosts = async () => {
      const postsCollection = collection(db, 'clubs', clubId, 'posts');
      const postsSnapshot = await getDocs(postsCollection);
      const postsList = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsList);
    };

    fetchClub();
    fetchPosts();
  }, [clubId]);

  if (!club) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{club.name} Club</h1>
      <p>{club.description}</p>
      <h2>Activities</h2>
      <p>{club.activities}</p>

      <div>
        <h2>Posts</h2>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <p>{new Date(post.timestamp?.seconds * 1000).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No posts yet.</p>
        )}
      </div>
      <ClubPostForm /> 
      <button type="button" onClick={() => navigate("/")}>Home</button>
    </div>

  );
}

export default ClubHome;
