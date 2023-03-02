import { Theme,getTheme } from '../theme';
import React,{createContext,FC,ReactNode, useState} from 'react'
import { ThemeProvider } from '@mui/material/styles';
type ThemeContextType={
    currentTheme:Theme;
    setTheme:((theme:Theme)=>void)|null;
}
export const AppThemeContext = createContext<ThemeContextType>({
    currentTheme:Theme.LIGHT,
    setTheme:null,
});
type Props={
    children:ReactNode;
}

export const AppThemeProvider:FC<Props>=({children})=>{
    const addOrRemoveBodyClass=(theme:Theme)=>{
        if(theme===Theme.DARK)
        {
           document.body.classList.add('dark-theme');
        }
        else
        {
            document.body.classList.remove('dark-theme');
        }
    }
    const getCurrentTheme=()=>{
        const currentTheme=sessionStorage.getItem('theme')
        ?(sessionStorage.getItem('theme')as Theme)
        :Theme.LIGHT;
        return currentTheme;
    };
    const currentTheme=getCurrentTheme();

const [theme,_setCurrentTheme]=useState<Theme>(currentTheme);

const setTheme=(theme:Theme)=>{
    sessionStorage.setItem('theme',theme);
    addOrRemoveBodyClass(theme)
    _setCurrentTheme(theme);
}
const value={
    currentTheme:theme,
    setTheme,
}
return <AppThemeContext.Provider value={value}>
    <ThemeProvider theme={getTheme(theme)}>{children}</ThemeProvider>
</AppThemeContext.Provider>
}

