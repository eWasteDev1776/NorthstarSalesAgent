import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Icons
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const LeadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const LogIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

const StrategyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const TemplateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <line x1="3" x2="21" y1="9" y2="9" />
    <line x1="9" x2="9" y1="21" y2="9" />
  </svg>
);

// Navigation items based on PRD requirements
const navigationItems = [
  {
    name: 'Find Leads',
    href: '/',
    icon: SearchIcon,
  },
  {
    name: 'Lead Queue',
    href: '/leads',
    icon: LeadIcon,
  },
  {
    name: 'Agent Log',
    href: '/logs',
    icon: LogIcon,
  },
  {
    name: 'Strategy Center',
    href: '/strategy',
    icon: StrategyIcon,
  },
  {
    name: 'Templates',
    href: '/templates',
    icon: TemplateIcon,
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: ProfileIcon,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: SettingsIcon,
  },
];

export default function Navigation() {
  const router = useRouter();
  const [activePath, setActivePath] = useState('/');

  // Update active item based on router path
  useEffect(() => {
    setActivePath(router.pathname);
  }, [router.pathname]);

  return (
    <div className="flex flex-col h-full w-64 bg-background-soft p-4 rounded-2xl shadow-glow">
      {/* Logo and title */}
      <div className="flex items-center mb-8 px-2">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
          <span className="text-white font-bold text-lg">N</span>
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
          Northstar
        </span>
      </div>

      {/* Navigation items */}
      <nav className="flex flex-col space-y-1 flex-1">
        {navigationItems.map((item) => {
          const isActive = activePath === item.href;
          
          return (
            <Link
              href={item.href}
              key={item.name}
              className={`
                flex items-center py-3 px-4 rounded-xl transition-all duration-300
                ${isActive 
                  ? 'bg-primary/10 text-primary glow' 
                  : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'
                }
              `}
            >
              <div className="flex items-center">
                <item.icon />
                <span className="ml-4 font-medium">{item.name}</span>
              </div>
              
              {/* Active indicator */}
              {isActive && (
                <div className="ml-auto w-1.5 h-5 bg-primary rounded-full animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Agent status */}
      <div className="mt-auto pt-4 border-t border-border/30">
        <div className="flex items-center px-4 py-3">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse mr-2" />
          <span className="text-sm text-muted-foreground">Northstar Agent Active</span>
        </div>
      </div>
    </div>
  );
}
