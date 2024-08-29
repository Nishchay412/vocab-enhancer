import React, { useState, useEffect } from "react";
import { ComboboxDemo } from "./components/ui/combobox";
import { Button } from "./components/ui/button";
import { Comboboxdemo2 } from "./components/ui/combobox2";
import { useNavigate } from "react-router-dom";
import { auth } from './firebase'; // Ensure your Firebase config is imported correctly
import { Header } from "./header"; // Ensure the correct import path for Header

export function Input() {
  const [language, setLanguage] = useState("");
  const [fluency, setFluency] = useState("");
  const [values, setValues] = useState(false);
  const [user, setUser] = useState(null); // State for tracking auth status

  const navigate = useNavigate();

  const handleLanguageChange = (newValue) => {
    setLanguage(newValue);
  };

  const handleFluencyChange = (newValue) => {
    setFluency(newValue);
  };

  const checkValues = () => {
    if (language !== "" && fluency !== "") {
      setValues(true);
      localStorage.setItem("language", language);
      localStorage.setItem("fluency", fluency);
      console.log(localStorage.getItem("language"));
      if (user) {
        navigate("/vocabulary");
      } else {
        navigate("/signin");
      }
    }
  };

  // Firebase auth state check
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUser(user);
        console.log(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Clean up subscription on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      {/* Render Header component */}
      <Header />

      <div className="font-bold text-2xl">
        CHOOSE LANGUAGE
      </div>
      <div className="py-2 mt-2">
        <ComboboxDemo className="py-2" onChange={handleLanguageChange} />
      </div>
      <div>
        Selected Language: {language}
      </div>

      <div className="font-bold text-2xl mt-4">
        WHAT'S YOUR LEVEL OF FLUENCY?
      </div>
      <div className="py-2 mt-2">
        <Comboboxdemo2 className="py-2" onChange={handleFluencyChange} />
      </div>
      <div>
        Selected Fluency: {fluency}
      </div>

      <div className="py-2 mt-4">
        <Button onClick={checkValues}>
          CLICK TO GET STARTED
        </Button>
      </div>
      
      {user && (
        <div className="mt-4">
          <p>Signed in as: {user.displayName}</p>
        </div>
      )}
    </div>
  );
}
