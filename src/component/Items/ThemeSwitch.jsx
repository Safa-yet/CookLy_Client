"use client";

import { Button } from "@heroui/react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        isIconOnly
        variant="light"
        className="rounded-full"
      >
        <FiMoon size={18} />
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      isIconOnly
      variant="light"
      aria-label="Toggle Theme"
      onPress={() =>
        setTheme(isDark ? "light" : "dark")
      }
      className="rounded-full border border-default-200 hover:scale-105 transition-all duration-300"
    >
      {isDark ? (
        <FiSun
          size={18}
          className="text-yellow-500"
        />
      ) : (
        <FiMoon
          size={18}
          className="text-slate-700"
        />
      )}
    </Button>
  );
}