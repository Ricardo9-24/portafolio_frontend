import { useEffect, useState } from "react";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// export type Theme = "light" | "dark";

// interface ThemeState {
//     theme: Theme;
//     toggleTheme: () => void;
// }
// const useDarkMode = create<ThemeState>()(
//     persist(
//         (set) => ({
//             theme: "light",
//             toggleTheme: () => set((state) => ({
//                 theme: state.theme === "light" ? "dark" : "light"
//             })),
//         }),
//         {
//             name: "theme-storage",
//         }
//     )
// )
const UseDarkMode = () => {
    const [dark, setDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    }, [dark])

    const changeTheme = () => {
        const newTheme = !dark;
        setDark(newTheme);
        localStorage.setItem("theme", newTheme ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    }

    return (
        <>
            <button
                className="btn-dark-mode"
                onClick={() => changeTheme()}
            >{dark ? 'Tema Claro' : 'Tema Oscuro'}</button>
        </>
    )
}

export default UseDarkMode