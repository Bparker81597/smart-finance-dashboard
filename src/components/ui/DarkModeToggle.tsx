import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);

  function toggle() {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem("darkMode", String(newIsDark));
    document.documentElement.classList.toggle("dark", newIsDark);
  }

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggle} 
      className="rounded-2xl h-10 w-10 cursor-pointer"
      type="button"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
