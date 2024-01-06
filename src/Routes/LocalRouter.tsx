import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { AppRouter } from ".";
import { useLanguage } from "../Contexts";
import * as availableTranslationLanguage from "../Local/languages"

const LocalRouter = () => {

    let { language } = useLanguage();
    
    const navigate = useNavigate();
    const location = useLocation();

    // check and append language component to the route
    useEffect(()=>{
        let availableLanguage = Object.keys(availableTranslationLanguage);
        let path = location?.pathname;          // get the path
        let arrUrlParts = (path).split('/');    // splitting the path
        let langPart = arrUrlParts[1];          // language part

        if( !availableLanguage.includes(langPart) ) { // if language string is missing
            navigate(`/${language}${path}`);
        } else if( !availableLanguage.includes(langPart) && langPart!==language ) { // if language string is present but incorrect
            navigate(`/${language}${path.substring(3)}`);
        } else {
            // everything is fine
        }
    },[])
    

    return (
        <Routes>
            <Route path="/" element={<Navigate replace to={`/${language}/`} />} />
            <Route path="/:lang/*" element={<AppRouter />} />
            <Route path="/*" element={<>404</>} />
        </Routes>
    )
}


export default LocalRouter;