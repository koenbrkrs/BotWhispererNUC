import { Home, Search, Bell, Mail, Bookmark, User, MoreHorizontal, Feather } from 'lucide-react';

// Dimmed color for non-interactive elements
const dimmedColor = '#787878';

const menuItems = [
  { icon: Home, label: 'Home', active: true },
  { icon: Search, label: 'Explore', active: false },
  { icon: Bell, label: 'Notifications', active: false },
  { icon: Mail, label: 'Messages', active: false },
  { icon: Bookmark, label: 'Bookmarks', active: false },
  { icon: User, label: 'Profile', active: false },
  { icon: MoreHorizontal, label: 'More', active: false },
];

export const TwitterSidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-[275px] h-screen sticky top-0 py-2 px-3">
      {/* Logo - dimmed */}
      <div className="p-3 mb-1">
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" style={{ color: dimmedColor }}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>

      {/* Navigation - all dimmed */}
      <nav className="flex-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-5 w-full p-3 rounded-full cursor-not-allowed"
          >
            <item.icon className="w-[26px] h-[26px]" style={{ color: dimmedColor }} />
            <span className="text-xl" style={{ color: dimmedColor }}>{item.label}</span>
          </button>
        ))}

        {/* Post button - dimmed */}
        <button 
          className="w-full mt-4 py-3.5 rounded-full font-bold text-lg cursor-not-allowed"
          style={{ backgroundColor: dimmedColor, color: '#1a1a1a' }}
        >
          Post
        </button>
      </nav>

      {/* Profile - dimmed */}
      <div className="mt-auto p-3 rounded-full cursor-not-allowed">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full" style={{ backgroundColor: dimmedColor }} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate" style={{ color: dimmedColor }}>User</p>
            <p className="text-sm truncate" style={{ color: dimmedColor }}>@user</p>
          </div>
          <MoreHorizontal className="w-5 h-5" style={{ color: dimmedColor }} />
        </div>
      </div>
    </aside>
  );
};
