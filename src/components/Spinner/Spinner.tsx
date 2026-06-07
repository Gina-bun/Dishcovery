import { Soup } from "lucide-react";
import "./Spinner.css"

export function Spinner(){
    return (
        <>
        <div className="spinner-wrapper flex flex-col items-center justify-center h-screen">
            <Soup size={80} className="spinner-icon"/>
            <p className="spinner-text">Finding something delicious...</p>
        </div>
        </>
    )
}