import { Search } from 'lucide-react';

// Dimmed color for non-interactive elements
const dimmedColor = '#787878';

const whoToFollow = [
  {
    name: 'Surfshark',
    handle: '@Surfshark',
    bio: 'Fast, secure VPN for online privacy',
    avatar: '/surfshark.png',
    accentColor: '#1DA1F2',
  },
  {
    name: 'Arduino',
    handle: '@arduino',
    bio: 'Open-source electronics & IoT',
    avatar: '/arduino.png',
    accentColor: '#00979D',
  },
  {
    name: 'Malmö University',
    handle: '@malmouniversity',
    bio: 'Innovation & research in Malmö',
    avatar: '/malmo-university.png',
    accentColor: '#D32F2F',
  },
];

export const TwitterRightSidebar = () => {
  return (
    <aside className="hidden xl:block w-[350px] h-screen sticky top-0 py-2 pl-6 pr-4">
      {/* Search - dimmed */}
      <div className="sticky top-2 mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: dimmedColor }} />
          <input
            type="text"
            placeholder="Search"
            disabled
            className="w-full bg-tw-bg-secondary rounded-full py-3 pl-12 pr-4 text-sm placeholder:opacity-50 focus:outline-none cursor-not-allowed"
            style={{ color: dimmedColor }}
          />
        </div>
      </div>

      {/* Who to follow */}
      <div className="bg-tw-bg-secondary rounded-2xl">
        <h2 className="text-xl font-bold p-4 text-white">Who to follow</h2>
        {whoToFollow.map((user, i) => (
          <div key={i} className="px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors cursor-default">
            {/* Avatar */}
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              style={{ border: `2px solid ${user.accentColor}30` }}
            />
            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-bold truncate text-white/90 text-sm">{user.name}</p>
              <p className="text-xs truncate text-white/50">{user.handle}</p>
              <p className="text-xs truncate text-white/40 mt-0.5">{user.bio}</p>
            </div>
            {/* Follow button — dimmed/decorative */}
            <button
              className="px-3 py-1 font-bold rounded-full text-xs border cursor-not-allowed flex-shrink-0"
              style={{ borderColor: dimmedColor, color: dimmedColor }}
              disabled
            >
              Follow
            </button>
          </div>
        ))}
        <div className="px-4 pb-3 pt-1">
          <p className="text-xs text-white/20 italic">Recommended accounts</p>
        </div>
      </div>
    </aside>
  );
};
