import React, { useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { db } from './firebase';
import { doc, getDoc, collectionGroup, getDocs } from 'firebase/firestore';
import Logout from './LogOut';
import { useClub } from './ClubContext';

function Home() {
  const { clubId } = useClub();
  const { userId } = useUser();
  const [profile, setProfile] = useState({ name: '', bio: '' });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        console.error("User ID is missing.");
        return;
      }

      try {
        const profileDoc = await getDoc(doc(db, 'users', userId));
        if (profileDoc.exists()) {
          setProfile(profileDoc.data());
        } else {
          console.error("No such profile!");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

  const fetchAllPosts = async () => {
    try {
      const postsQuery = collectionGroup(db, 'posts');
      const postsSnapshot = await getDocs(postsQuery);

      const postList = postsSnapshot.docs.map((doc) => ({
        id: doc.id,      
        clubId: doc.ref.parent.parent.id,
        ...doc.data(),   
      }));

      setPosts(postList);
    } catch (error) {
      console.error("Error fetching all posts:", error); // エラーハンドリング
    }
  };

    fetchProfile();
    fetchAllPosts();
  }, [userId, clubId]);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={Logout}>Logout</button>

      <h2>Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Bio: {profile.bio}</p>

      <h2>Navigation</h2>
      <ul>
        <li><a href="/grade">Grade</a></li>
        <li><a href="/course">Course</a></li>
        <li><a href="/editprofile">Edit Profile</a></li>
        <li><a href="/clubcreate">Create Club</a></li>
        <li><a href="/clublogin">Club Login</a></li>
        <li><a href="/clubsignup">Club Signup</a></li>
      </ul>
      <br />

      <h2>Club Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p>clubname: {post.clubname ? post.clubname : 'No club name available'}</p>
            <p><small>Posted on: {post.timestamp ? post.timestamp.toDate().toString() : 'No timestamp available'}</small></p>
          </div>
        ))
      ) : (
        <p>No posts yet.</p>
      )}
    </div>
  );
}

export default Home;
