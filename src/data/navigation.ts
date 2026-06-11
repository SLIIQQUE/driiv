export interface NavItem {
  name: string;
  href: string;
}

/** Main navigation items used in Navigation bar and MobileMenu */
export const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Pricing", href: "/pricing" },
  { name: "Reviews", href: "/testimonials" },
  { name: "About Us", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Service Areas", href: "/areas" },
  { name: "Features", href: "/features" },
];

/** Book Now item — rendered as a special trigger button */
export const BOOK_ITEM: NavItem = { name: "Book Now", href: "/?book=1" };

/** Footer quick links group */
export const FOOTER_QUICK_LINKS: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Book Now", href: "/?book=1" },
  { name: "Features", href: "/features" },
  { name: "Areas Covered", href: "/areas" },
  { name: "Reviews", href: "/testimonials" },
  { name: "FAQ", href: "/faq" },
];

/** Footer company links group */
export const FOOTER_COMPANY_LINKS: NavItem[] = [
  { name: "About Us", href: "/about" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];
