import { Soup } from "lucide-react";
import "./Spinner.css"

export function Spinner(){
    return (
        <>
        <div className="spinner-wrapper">
            <Soup size={40} className="spinner-icon"/>
            <p className="spinner-text">Finding something delicious...</p>
        </div>
        </>
    )
}