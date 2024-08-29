import React, { useEffect, useState } from 'react';
import { auth, signInWithGoogle, signOutUser } from './firebase'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';

export function Sign() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already stored in localStorage on component mount
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      auth.onAuthStateChanged((currentUser) => {
        if (currentUser && currentUser.uid === storedUserId) {
          setUser(currentUser);
        }
      });
    }

    // Set up the onAuthStateChanged listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);

      // Store the userId in localStorage when the user signs in
      if (user) {
        localStorage.setItem("userId", user.uid);
      } else {
        localStorage.removeItem("userId"); // Remove it when the user signs out
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  const handleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log('User signed in:', result.user);
        setUser(result.user); // Ensure the user is set after signing in
        localStorage.setItem("userId", result.user.uid); // Explicitly store userId after sign-in
        navigate("/questions"); // Navigate after successful sign-in
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  };

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log('User signed out');
        setUser(null);
        localStorage.removeItem("userId"); // Clean up localStorage on sign-out
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-black'>
      {user ? (
        <div>
          <p className="text-white">Welcome, {user.displayName}!</p>
          <button className="bg-white rounded-md py-2 px-4 text-black" onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button className="bg-white rounded-md py-4 px-4 text-xl text-black" onClick={handleSignIn}>Sign In with Google</button>
      )}
    </div>
  );
}

export default Sign;
