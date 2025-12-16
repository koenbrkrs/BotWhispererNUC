import { Home, Search, Bell, Mail, Bookmark, User, MoreHorizontal, Feather } from 'lucide-react';

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
      {/* Logo */}
      <div className="p-3 mb-1">
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-tw-text-primary fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-5 w-full p-3 rounded-full transition-colors hover:bg-tw-bg-hover group ${
              item.active ? 'font-bold' : ''
            }`}
          >
            <item.icon className={`w-[26px] h-[26px] ${item.active ? 'text-tw-text-primary' : 'text-tw-text-primary'}`} />
            <span className="text-xl text-tw-text-primary">{item.label}</span>
          </button>
        ))}

        {/* Post button */}
        <button className="w-full mt-4 py-3.5 bg-tw-blue hover:bg-tw-blue-hover rounded-full text-white font-bold text-lg transition-colors">
          Post
        </button>
      </nav>

      {/* Profile */}
      <div className="mt-auto p-3 hover:bg-tw-bg-hover rounded-full cursor-pointer transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-tw-text-primary truncate">User</p>
            <p className="text-sm text-tw-text-secondary truncate">@user</p>
          </div>
          <MoreHorizontal className="w-5 h-5 text-tw-text-primary" />
        </div>
      </div>
    </aside>
  );
};
