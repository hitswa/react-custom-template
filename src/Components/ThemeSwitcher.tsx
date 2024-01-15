import React from "react";
import { useTheme } from "../Contexts";
import predefinedThemes from "../Static/Theme.json"

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="bg-custom-primary text-custom-secondary">
            <div className="flex gap-4">
                <button
                    className="border border-gray-500 px-4 py-1 rounded-full"
                    onClick={()=>{
                        let currentTheme = predefinedThemes.find( t => t.name === 'Theme 1' )
                        setTheme(()=>{
                            return {
                                primaryColor: currentTheme?.colors?.primary || '',
                                secondaryColor: currentTheme?.colors?.secondary || ''
                            }
                        })
                    }}
                >
                    Theme1
                </button>
                <button
                    className="border border-gray-500 px-4 py-1 rounded-full"
                    onClick={()=>{
                        let currentTheme = predefinedThemes.find( t => t.name === 'Theme 2' )
                        setTheme(()=>{
                            return {
                                primaryColor: currentTheme?.colors?.primary || '',
                                secondaryColor: currentTheme?.colors?.secondary || ''
                            }
                        })
                    }}
                >
                    Theme2
                </button>
                <button
                    className="border border-gray-500 px-4 py-1 rounded-full"
                    onClick={()=>{
                        let currentTheme = predefinedThemes.find( t => t.name === 'Theme 3' )
                        setTheme(()=>{
                            return {
                                primaryColor: currentTheme?.colors?.primary || '',
                                secondaryColor: currentTheme?.colors?.secondary || ''
                            }
                        })
                    }}
                >
                    Theme3
                </button>
            </div>
            <div className="flex gap-2">
                <label>
                    <div className="text-lg font-medium">Select Primary Color:</div>
                    <div className="flex items-center border border-gray-500 w-fit bg-slate-100 px-2 rounded-md">
                        <input 
                            type="text"
                            value={theme.primaryColor}
                            className="bg-slate-100 h-8 outline-none uppercase text-custom-primary"
                            readOnly
                        />
                        <input 
                            type="color"
                            value={theme.primaryColor}
                            onChange={(e)=>{
                                setTheme((prevTheme)=>{
                                    return {
                                        ...prevTheme,
                                        primaryColor: e.target.value
                                    }
                                })
                            }}
                            className="w-6"
                        />
                    </div>
                </label>
                <label>
                    <div className="text-lg font-medium">Select Secondary Color:</div>
                    <div className="flex items-center border border-gray-500 w-fit bg-slate-100 px-2 rounded-md">
                        <input 
                            type="text"
                            value={theme.secondaryColor}
                            className="bg-slate-100 h-8 outline-none uppercase text-custom-secondary"
                            readOnly
                        />
                        <input 
                            type="color"
                            value={theme.secondaryColor}
                            onChange={(e)=>{
                                setTheme((prevTheme)=>{
                                    return {
                                        ...prevTheme,
                                        secondaryColor: e.target.value
                                    }
                                })
                            }}
                            className="w-6"
                        />
                    </div>
                </label>
            </div>
        </div>
    )
}

export default ThemeSwitcher;