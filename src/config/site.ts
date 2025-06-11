export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Todolist App",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Today",
      href: "/today",
    },
    {
      label: "Archive",
      href: "/archive",
    },
    {
      label: "Settings",
      href: "/settings",
    },
  ],
};
