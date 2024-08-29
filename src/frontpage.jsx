import React from "react";
import { Button } from "./components/ui/button";
import { useNavigate } from 'react-router-dom'
export function Front(){
    const navigate = useNavigate()
    return(
        <div className="flex flex-col items-center justify-center h-screen bg-black">
            <div className="font-bold  text-4xl text-white">
                VOCABULARY ENHANCER
            </div>
            <Button className="mt-6" onClick={() => navigate("/questions")}>
      CLICK TO GET STARTED
    </Button>

        </div>
    )
}