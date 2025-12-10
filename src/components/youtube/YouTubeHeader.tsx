import { Menu, Search, Mic, Video, Bell, User } from 'lucide-react';

interface YouTubeHeaderProps {
  onMenuClick?: () => void;
}

export const YouTubeHeader = ({ onMenuClick }: YouTubeHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-yt-bg-primary flex items-center justify-between px-4 z-50">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-yt-hover rounded-full transition-colors"
        >
          <Menu className="w-6 h-6 text-yt-text-primary" />
        </button>
        <div className="flex items-center gap-1">
          <svg viewBox="0 0 90 20" className="h-5 w-auto">
            <g fill="none">
              <path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="#FF0000"/>
              <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white"/>
            </g>
            <g fill="#FFFFFF">
              <path d="M40.0566 6.34524V7.03668C40.0566 10.1573 38.5906 11.8389 35.6894 11.8389H34.5765V17.5765H31.5765V1.42041H35.6894C38.5906 1.42041 40.0566 3.08997 40.0566 6.22384V6.34524ZM34.5765 4.14498V9.11486H35.6894C36.7854 9.11486 37.2566 8.54627 37.2566 7.03668V6.22384C37.2566 4.71426 36.7854 4.14498 35.6894 4.14498H34.5765Z"/>
              <path d="M46.2471 8.26498V9.81669H43.2471V14.8523H47.2471V17.5765H40.2471V1.42041H47.2471V4.14498H43.2471V8.26498H46.2471Z"/>
              <path d="M55.4459 4.14498H52.4459V17.5765H49.4459V4.14498H46.4459V1.42041H55.4459V4.14498Z"/>
              <path d="M62.9988 1.42041V17.5765H59.9988V10.6108H56.9988V17.5765H53.9988V1.42041H56.9988V7.88628H59.9988V1.42041H62.9988Z"/>
              <path d="M71.2471 6.34524V12.6573C71.2471 15.778 69.7812 17.5765 66.88 17.5765H63.2471V1.42041H66.88C69.7812 1.42041 71.2471 3.20667 71.2471 6.34524ZM66.2471 4.14498V14.8523H66.88C67.9765 14.8523 68.4471 14.2837 68.4471 12.7741V6.22384C68.4471 4.71426 67.9765 4.14498 66.88 4.14498H66.2471Z"/>
              <path d="M79.4459 8.26498V9.81669H76.4459V14.8523H80.4459V17.5765H73.4459V1.42041H80.4459V4.14498H76.4459V8.26498H79.4459Z"/>
            </g>
          </svg>
          <span className="text-yt-text-secondary text-[10px] -mt-2 ml-0.5">IN</span>
        </div>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-2xl mx-4 hidden sm:flex items-center">
        <div className="flex flex-1">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 h-10 px-4 bg-yt-bg-primary border border-yt-border rounded-l-full text-yt-text-primary placeholder:text-yt-text-secondary focus:outline-none focus:border-yt-blue"
          />
          <button className="h-10 px-6 bg-yt-bg-secondary border border-l-0 border-yt-border rounded-r-full hover:bg-yt-hover transition-colors">
            <Search className="w-5 h-5 text-yt-text-primary" />
          </button>
        </div>
        <button className="ml-3 p-2 bg-yt-bg-secondary hover:bg-yt-hover rounded-full transition-colors">
          <Mic className="w-5 h-5 text-yt-text-primary" />
        </button>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <button className="sm:hidden p-2 hover:bg-yt-hover rounded-full transition-colors">
          <Search className="w-6 h-6 text-yt-text-primary" />
        </button>
        <button className="hidden sm:flex p-2 hover:bg-yt-hover rounded-full transition-colors">
          <Video className="w-6 h-6 text-yt-text-primary" />
        </button>
        <button className="p-2 hover:bg-yt-hover rounded-full transition-colors relative">
          <Bell className="w-6 h-6 text-yt-text-primary" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-yt-red text-white text-[10px] font-medium rounded-full flex items-center justify-center">3</span>
        </button>
        <button className="ml-2 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-medium">
          A
        </button>
      </div>
    </header>
  );
};
