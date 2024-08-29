import React from "react";

import { useNavigate } from "react-router-dom";
export function Header(){
    const navigate = useNavigate()

    function handlenavi(){
        navigate("/data")
    }
    return(
        <div className="w-screen flex justify-between">
            <div className="font-bold text-3xl">
                VOCAB BUILDER

            </div>
            <div className="font-bold text-2xl"> 
            <button className="text-2xl font-bold py-2"
            onClick={handlenavi}>
                CLICK FOR DATA
            </button>
            </div>
        </div>
    )
}