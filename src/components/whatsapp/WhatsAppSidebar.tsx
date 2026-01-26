import { Search, MessageCircle, MoreVertical, Users, Archive, Star, Settings } from 'lucide-react';

// Dimmed color for non-interactive elements
const dimmedColor = '#787878';

interface WhatsAppSidebarProps {
  groupName: string;
}

const dummyChats = [
  { name: 'Family Group', lastMessage: 'Mom: See you tomorrow!', time: '10:30 AM', unread: 0, isGroup: true },
  { name: 'Work Team', lastMessage: 'Boss: Meeting at 3pm', time: '9:45 AM', unread: 0, isGroup: true },
];

export const WhatsAppSidebar = ({ groupName }: WhatsAppSidebarProps) => {
  return (
    <div className="w-[400px] bg-wa-bg-secondary border-r border-wa-border flex flex-col max-lg:hidden">
      {/* Header - dimmed */}
      <div className="h-[60px] bg-wa-bg-header px-4 flex items-center justify-between">
        <div 
          className="w-10 h-10 rounded-full"
          style={{ backgroundColor: dimmedColor }}
        />
        <div className="flex items-center gap-6">
          <Users className="w-5 h-5 cursor-not-allowed" style={{ color: dimmedColor }} />
          <Archive className="w-5 h-5 cursor-not-allowed" style={{ color: dimmedColor }} />
          <MessageCircle className="w-5 h-5 cursor-not-allowed" style={{ color: dimmedColor }} />
          <MoreVertical className="w-5 h-5 cursor-not-allowed" style={{ color: dimmedColor }} />
        </div>
      </div>

      {/* Search - dimmed */}
      <div className="px-3 py-2 bg-wa-bg-secondary">
        <div className="flex items-center gap-4 bg-wa-bg-input rounded-lg px-4 py-2">
          <Search className="w-5 h-5" style={{ color: dimmedColor }} />
          <input
            type="text"
            placeholder="Search or start new chat"
            disabled
            className="flex-1 bg-transparent text-sm placeholder:opacity-50 focus:outline-none cursor-not-allowed"
            style={{ color: dimmedColor }}
          />
        </div>
      </div>

      {/* Filters - dimmed */}
      <div className="px-3 py-2 flex gap-2">
        <button 
          className="px-3 py-1.5 text-sm rounded-full font-medium cursor-not-allowed"
          style={{ backgroundColor: 'rgba(120,120,120,0.2)', color: dimmedColor }}
        >
          All
        </button>
        <button 
          className="px-3 py-1.5 text-sm bg-wa-bg-input rounded-full cursor-not-allowed"
          style={{ color: dimmedColor }}
        >
          Unread
        </button>
        <button 
          className="px-3 py-1.5 text-sm bg-wa-bg-input rounded-full cursor-not-allowed"
          style={{ color: dimmedColor }}
        >
          Groups
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {/* Active Group Chat - NOT dimmed, this is the game chat */}
        <div className="flex items-center gap-3 px-3 py-3 bg-wa-bg-active cursor-pointer">
          <img
            src={`https://picsum.photos/seed/${groupName}/50/50`}
            alt={groupName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="font-medium text-wa-text-primary truncate">{groupName}</span>
              <span className="text-xs text-wa-text-secondary">Now</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-wa-text-secondary truncate">Tap to view discussion</p>
            </div>
          </div>
        </div>

        {/* Other Chats - dimmed */}
        {dummyChats.map((chat, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-3 py-3 cursor-not-allowed"
          >
            <div 
              className="w-12 h-12 rounded-full"
              style={{ backgroundColor: dimmedColor }}
            />
            <div className="flex-1 min-w-0 border-b border-wa-border pb-3">
              <div className="flex items-center justify-between">
                <span className="font-medium truncate" style={{ color: dimmedColor }}>{chat.name}</span>
                <span className="text-xs" style={{ color: dimmedColor }}>
                  {chat.time}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm truncate" style={{ color: dimmedColor }}>{chat.lastMessage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
