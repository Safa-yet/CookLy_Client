"use client";

import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const activeTheme = theme === "system" ? resolvedTheme : theme;

  const toggleTheme = () => {
    setTheme(activeTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      isIconOnly
      variant="light"
      onPress={toggleTheme}
      className="
        relative w-10 h-10 rounded-full
        bg-slate-100 dark:bg-zinc-900
        hover:scale-105 transition
      "
    >
      {/* SUN ICON */}
      <FiSun
        className={`absolute text-yellow-500 transition-all duration-300 ${
          activeTheme === "dark"
            ? "opacity-0 rotate-90 scale-50"
            : "opacity-100 rotate-0 scale-100"
        }`}
      />

      {/* MOON ICON */}
      <FiMoon
        className={`absolute text-blue-400 transition-all duration-300 ${
          activeTheme === "dark"
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 -rotate-90 scale-50"
        }`}
      />
    </Button>
  );
}