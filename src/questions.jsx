import React, { useState } from "react";
import { ComboboxDemo } from "./components/ui/combobox";
import { Button } from "./components/ui/button";
import { Comboboxdemo2 } from "./components/ui/combobox2";
export function Input() {
  const [language, setLanguage] = useState("");
  const [fluency, setFluency] = useState("");

  const handleLanguageChange = (newValue) => {
    setLanguage(newValue);
  };

  const handleFluencychange = (newValue) => {
    setFluency(newValue);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="font-bold text-2xl">
        CHOOSE LANGUAGE
      </div>
      <div>
        Selected Language: {language}
      </div>
      <div className="py-2 mt-2">
        <ComboboxDemo className="py-2" onChange={handleLanguageChange} />
      </div>

      <div className="font-bold text-2xl">
        WHAT'S YOUR LEVEL OF FLUENCY?
      </div>
      <div className="py-2 mt-2">
        <Comboboxdemo2 className="py-2" onChange={handleFluencychange} />
      </div>
      <div>
        Selected Fluency: {fluency}
      </div>
      <div className="py-2 mt-2">
        {/* Add a similar Combobox or another input for fluency if needed */}
      </div>

      <div>
        <Button>
          CLICK TO GET STARTED
        </Button>
      </div>
    </div>
  );
}
