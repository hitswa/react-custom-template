import React from "react";
import { useScheme } from "../Contexts";

const SchemeSwitcher:React.FC = () => {
    const { scheme, toggleScheme } = useScheme();
    
    return (
        <div className={`app ${scheme}`}>
            <h1>Responsive Theme Switcher</h1>
            <p>Current Theme: {scheme}</p>
            <button onClick={toggleScheme}>Toggle Theme</button>
        </div>
    )
}

export default SchemeSwitcher;