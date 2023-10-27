import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Icons from "@/components/icons";

export default function ThemeChanger() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => setTheme(theme == "light" ? "dark" : "light")}
    >
      <Icons.lightMode className="dark:hidden" />
      <Icons.darkMode className="hidden dark:block" />
    </Button>
  );
}
