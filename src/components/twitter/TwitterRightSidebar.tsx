import { Search, MoreHorizontal } from 'lucide-react';

const trends = [
  { category: 'Technology · Trending', topic: '#AIRevolution', posts: '125K' },
  { category: 'Sports · Trending', topic: 'Champions League', posts: '89K' },
  { category: 'Politics · Trending', topic: '#Election2025', posts: '234K' },
  { category: 'Entertainment · Trending', topic: 'New Movie Release', posts: '56K' },
  { category: 'Gaming · Trending', topic: '#GTA6', posts: '445K' },
];

const whoToFollow = [
  { name: 'Tech News Daily', handle: '@technewsdaily', avatar: 'https://i.pravatar.cc/100?img=1' },
  { name: 'Science Facts', handle: '@sciencefacts', avatar: 'https://i.pravatar.cc/100?img=2' },
  { name: 'World Updates', handle: '@worldupdates', avatar: 'https://i.pravatar.cc/100?img=3' },
];

export const TwitterRightSidebar = () => {
  return (
    <aside className="hidden xl:block w-[350px] h-screen sticky top-0 py-2 pl-6 pr-4">
      {/* Search */}
      <div className="sticky top-2 mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-tw-text-secondary" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-tw-bg-secondary rounded-full py-3 pl-12 pr-4 text-sm text-tw-text-primary placeholder:text-tw-text-secondary focus:outline-none focus:ring-2 focus:ring-tw-blue focus:bg-transparent"
          />
        </div>
      </div>

      {/* Trends */}
      <div className="bg-tw-bg-secondary rounded-2xl mb-4">
        <h2 className="text-xl font-bold text-tw-text-primary p-4">What's happening</h2>
        {trends.map((trend, i) => (
          <div key={i} className="px-4 py-3 hover:bg-tw-bg-hover cursor-pointer transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-tw-text-secondary">{trend.category}</p>
                <p className="font-bold text-tw-text-primary">{trend.topic}</p>
                <p className="text-xs text-tw-text-secondary">{trend.posts} posts</p>
              </div>
              <button className="p-1.5 hover:bg-tw-blue/20 rounded-full transition-colors">
                <MoreHorizontal className="w-4 h-4 text-tw-text-secondary" />
              </button>
            </div>
          </div>
        ))}
        <button className="w-full p-4 text-left text-tw-blue hover:bg-tw-bg-hover rounded-b-2xl transition-colors">
          Show more
        </button>
      </div>

      {/* Who to follow */}
      <div className="bg-tw-bg-secondary rounded-2xl">
        <h2 className="text-xl font-bold text-tw-text-primary p-4">Who to follow</h2>
        {whoToFollow.map((user, i) => (
          <div key={i} className="px-4 py-3 hover:bg-tw-bg-hover cursor-pointer transition-colors flex items-center gap-3">
            <img src={user.avatar} alt="" className="w-10 h-10 rounded-full" />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-tw-text-primary truncate">{user.name}</p>
              <p className="text-sm text-tw-text-secondary truncate">{user.handle}</p>
            </div>
            <button className="px-4 py-1.5 bg-tw-text-primary text-tw-bg-primary font-bold rounded-full text-sm hover:opacity-90 transition-opacity">
              Follow
            </button>
          </div>
        ))}
        <button className="w-full p-4 text-left text-tw-blue hover:bg-tw-bg-hover rounded-b-2xl transition-colors">
          Show more
        </button>
      </div>
    </aside>
  );
};
