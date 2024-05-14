"use client";

import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

interface IDarkMode { }

export default function DarkMode({ }: IDarkMode) {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const [isLight, setIsLight] = useState(true)

  useEffect(() => {
    if (currentTheme === 'light') {
      setIsLight(true)
    } else {
      setIsLight(false)
    }
  }, [currentTheme])


  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleHandler = () => () => {
    if (isLight) {
      setIsLight(false)
      setTheme('light');
    } else {
      setIsLight(true)
      setTheme('dark');
    }
  }

  return (

    <label className="inline-flex items-center cursor-pointer" onClick={toggleHandler()}>
      <input type="checkbox" checked={!isLight} value="" className="sr-only peer" />
      <div className="relative w-11 h-6 from-sky-300 to-sky-50  peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] peer-checked:after:bg-slate-100 after:bg-yellow-400  after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 bg-gradient-to-b peer-checked:from-blue-900 peer-checked:to-indigo-500" />
    </label>
  );
}