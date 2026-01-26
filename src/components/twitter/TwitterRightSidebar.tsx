import { Search } from 'lucide-react';

// Dimmed color for non-interactive elements
const dimmedColor = '#787878';

const whoToFollow = [
  { name: 'Tech News Daily', handle: '@technewsdaily', avatar: 'https://i.pravatar.cc/100?img=1' },
  { name: 'Science Facts', handle: '@sciencefacts', avatar: 'https://i.pravatar.cc/100?img=2' },
  { name: 'World Updates', handle: '@worldupdates', avatar: 'https://i.pravatar.cc/100?img=3' },
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

      {/* Who to follow - all dimmed */}
      <div className="bg-tw-bg-secondary rounded-2xl">
        <h2 className="text-xl font-bold p-4" style={{ color: dimmedColor }}>Who to follow</h2>
        {whoToFollow.map((user, i) => (
          <div key={i} className="px-4 py-3 cursor-not-allowed flex items-center gap-3">
            <div className="w-10 h-10 rounded-full" style={{ backgroundColor: dimmedColor }} />
            <div className="flex-1 min-w-0">
              <p className="font-bold truncate" style={{ color: dimmedColor }}>{user.name}</p>
              <p className="text-sm truncate" style={{ color: dimmedColor }}>{user.handle}</p>
            </div>
            <button 
              className="px-4 py-1.5 font-bold rounded-full text-sm cursor-not-allowed"
              style={{ backgroundColor: dimmedColor, color: '#1a1a1a' }}
            >
              Follow
            </button>
          </div>
        ))}
        <button 
          className="w-full p-4 text-left rounded-b-2xl cursor-not-allowed"
          style={{ color: dimmedColor }}
        >
          Show more
        </button>
      </div>
    </aside>
  );
};
