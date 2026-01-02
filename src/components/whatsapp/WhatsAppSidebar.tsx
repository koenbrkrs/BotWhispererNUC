import { Search, MessageCircle, MoreVertical, Users, Archive, Star, Settings } from 'lucide-react';

interface WhatsAppSidebarProps {
  groupName: string;
}

const dummyChats = [
  { name: 'Family Group', lastMessage: 'Mom: See you tomorrow!', time: '10:30 AM', unread: 3, isGroup: true },
  { name: 'Work Team', lastMessage: 'Boss: Meeting at 3pm', time: '9:45 AM', unread: 0, isGroup: true },
  { name: 'John Doe', lastMessage: 'Thanks for the help!', time: 'Yesterday', unread: 0, isGroup: false },
  { name: 'Alice Smith', lastMessage: 'Photo', time: 'Yesterday', unread: 1, isGroup: false },
  { name: 'College Friends', lastMessage: 'Mike: 😂😂', time: 'Tuesday', unread: 0, isGroup: true },
  { name: 'David Wilson', lastMessage: 'Sounds good!', time: 'Monday', unread: 0, isGroup: false },
];

export const WhatsAppSidebar = ({ groupName }: WhatsAppSidebarProps) => {
  return (
    <div className="w-[400px] bg-wa-bg-secondary border-r border-wa-border flex flex-col max-lg:hidden">
      {/* Header */}
      <div className="h-[60px] bg-wa-bg-header px-4 flex items-center justify-between">
        <img
          src={`https://i.pravatar.cc/40?u=me`}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex items-center gap-6 text-wa-text-secondary">
          <Users className="w-5 h-5 cursor-pointer hover:text-wa-text-primary transition-colors" />
          <Archive className="w-5 h-5 cursor-pointer hover:text-wa-text-primary transition-colors" />
          <MessageCircle className="w-5 h-5 cursor-pointer hover:text-wa-text-primary transition-colors" />
          <MoreVertical className="w-5 h-5 cursor-pointer hover:text-wa-text-primary transition-colors" />
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-2 bg-wa-bg-secondary">
        <div className="flex items-center gap-4 bg-wa-bg-input rounded-lg px-4 py-2">
          <Search className="w-5 h-5 text-wa-text-secondary" />
          <input
            type="text"
            placeholder="Search or start new chat"
            className="flex-1 bg-transparent text-wa-text-primary text-sm placeholder:text-wa-text-secondary focus:outline-none"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-3 py-2 flex gap-2">
        <button className="px-3 py-1.5 text-sm bg-wa-green/20 text-wa-green rounded-full font-medium">
          All
        </button>
        <button className="px-3 py-1.5 text-sm bg-wa-bg-input text-wa-text-secondary rounded-full hover:bg-wa-bg-hover">
          Unread
        </button>
        <button className="px-3 py-1.5 text-sm bg-wa-bg-input text-wa-text-secondary rounded-full hover:bg-wa-bg-hover">
          Groups
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {/* Active Group Chat */}
        <div className="flex items-center gap-3 px-3 py-3 bg-wa-bg-active cursor-pointer">
          <img
            src={`https://picsum.photos/seed/${groupName}/50/50`}
            alt={groupName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="font-medium text-wa-text-primary truncate">{groupName}</span>
              <span className="text-xs text-wa-green">Now</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-wa-text-secondary truncate">Tap to view discussion</p>
              <span className="bg-wa-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                50+
              </span>
            </div>
          </div>
        </div>

        {/* Other Chats */}
        {dummyChats.map((chat, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-3 py-3 hover:bg-wa-bg-hover cursor-pointer"
          >
            <img
              src={chat.isGroup 
                ? `https://picsum.photos/seed/${chat.name}/50/50`
                : `https://i.pravatar.cc/50?u=${chat.name}`
              }
              alt={chat.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0 border-b border-wa-border pb-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-wa-text-primary truncate">{chat.name}</span>
                <span className={`text-xs ${chat.unread > 0 ? 'text-wa-green' : 'text-wa-text-secondary'}`}>
                  {chat.time}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-wa-text-secondary truncate">{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <span className="bg-wa-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
