"use client";

import * as React from "react";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  // Resolve system theme
  const resolveTheme = useCallback((t: Theme): "light" | "dark" => {
    if (t === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return t;
  }, []);

  // Apply theme to document
  const applyTheme = useCallback((t: Theme) => {
    const resolved = resolveTheme(t);
    setResolvedTheme(resolved);
    document.documentElement.setAttribute("data-theme", resolved);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(resolved);
  }, [resolveTheme]);

  // Initialize theme from localStorage
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setThemeState(stored);
      applyTheme(stored);
    } else {
      applyTheme("system");
    }
  }, [applyTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted) return;
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyTheme("system");
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, mounted, applyTheme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  }, [applyTheme]);

  const toggleTheme = useCallback(() => {
    const themes: Theme[] = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }, [theme, setTheme]);

  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: "system", resolvedTheme: "dark", setTheme: () => {}, toggleTheme: () => {} }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}