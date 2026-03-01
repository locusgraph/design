import { useState } from "react";
import { Outlet } from "react-router";
import { Layout } from "../layouts";

export default function BrandingLayout() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <Layout
      title="Branding & Design System"
      subtitle="Comprehensive showcase of UI components, colors, typography, and theming"
      breadcrumb={[{ label: "Branding", href: "/branding" }]}
    >
      <Outlet context={{ theme, toggleTheme }} />
    </Layout>
  );
}
