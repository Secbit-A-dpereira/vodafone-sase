export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "O que é VB SASE", href: "/sase" },
  { label: "Arquitetura", href: "/arquitetura" },
  { label: "Soluções", href: "/solucoes" },
  { label: "Valor", href: "/valor" },
  { label: "Casos de Uso", href: "/casos-de-uso" },
  { label: "Recursos", href: "/recursos" },
  { label: "Construtor", href: "/construtor" },
];
