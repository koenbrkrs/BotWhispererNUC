const recommendedVideos = [
  { id: 1, title: "You Won't Believe What Happened Next - Full Story", channel: "StoryTime", views: "2.3M views", time: "2 days ago", duration: "15:42" },
  { id: 2, title: "10 Things Nobody Tells You About This Topic", channel: "TruthSeeker", views: "892K views", time: "1 week ago", duration: "22:15" },
  { id: 3, title: "Expert Breaks Down the Latest Controversy", channel: "NewsDaily", views: "1.5M views", time: "4 days ago", duration: "18:33" },
  { id: 4, title: "Why Everyone Is Wrong About This", channel: "FactCheck", views: "3.1M views", time: "5 days ago", duration: "11:28" },
  { id: 5, title: "The Hidden Truth Behind The Headlines", channel: "DeepDive", views: "756K views", time: "1 day ago", duration: "25:17" },
  { id: 6, title: "I Was Wrong - Here's Why I Changed My Mind", channel: "HonestTalks", views: "1.8M views", time: "3 days ago", duration: "19:44" },
  { id: 7, title: "This Changes Everything We Thought We Knew", channel: "MindBlown", views: "4.2M views", time: "1 week ago", duration: "14:22" },
  { id: 8, title: "Live Debate: Both Sides Finally Agree?", channel: "OpenForum", views: "567K views", time: "6 hours ago", duration: "45:12" },
  { id: 9, title: "What The Media Won't Tell You", channel: "RealTalk", views: "2.9M views", time: "2 weeks ago", duration: "28:55" },
  { id: 10, title: "Scientists React To Viral Claims", channel: "ScienceHub", views: "1.1M views", time: "4 days ago", duration: "16:38" },
  { id: 11, title: "The Argument Nobody Is Making", channel: "Contrarian", views: "623K views", time: "5 days ago", duration: "21:09" },
  { id: 12, title: "Full Documentary: The Untold Story", channel: "DocuWorld", views: "5.7M views", time: "3 weeks ago", duration: "1:02:44" },
  { id: 13, title: "Reacting To The Most Controversial Takes", channel: "ReactKing", views: "1.4M views", time: "2 days ago", duration: "23:17" },
  { id: 14, title: "How To Actually Win Any Argument", channel: "DebatePro", views: "892K views", time: "1 week ago", duration: "12:45" },
  { id: 15, title: "Why This Generation Thinks Differently", channel: "GenZExplained", views: "3.3M views", time: "6 days ago", duration: "17:22" },
  { id: 16, title: "The Psychology Behind Online Debates", channel: "MindGames", views: "445K views", time: "4 days ago", duration: "19:55" },
  { id: 17, title: "Breaking: New Evidence Just Dropped", channel: "UpdateNow", views: "789K views", time: "8 hours ago", duration: "8:32" },
  { id: 18, title: "Interviewing People With Opposite Views", channel: "StreetTalks", views: "2.1M views", time: "1 week ago", duration: "31:18" },
  { id: 19, title: "Can We All Just Get Along? (Social Experiment)", channel: "SocialLab", views: "1.6M views", time: "5 days ago", duration: "24:33" },
  { id: 20, title: "The Most Heated Debate Of 2025", channel: "HotTakes", views: "4.8M views", time: "2 weeks ago", duration: "38:17" },
];

export const RecommendedVideos = () => {
  return (
    <div className="space-y-2">
      {recommendedVideos.map((video, index) => (
        <div 
          key={video.id}
          className="flex gap-2 p-1 rounded-xl hover:bg-yt-hover cursor-pointer transition-colors group"
        >
          {/* Thumbnail */}
          <div className="relative flex-shrink-0 w-40 md:w-44">
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-600">
              {/* Grey placeholder thumbnail */}
            </div>
            <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded font-medium">
              {video.duration}
            </span>
          </div>
          
          {/* Info */}
          <div className="flex-1 min-w-0 py-0.5">
            <h3 className="text-sm font-medium text-yt-text-primary line-clamp-2 leading-snug mb-1">
              {video.title}
            </h3>
            <p className="text-xs text-yt-text-secondary hover:text-yt-text-primary transition-colors">
              {video.channel}
            </p>
            <p className="text-xs text-yt-text-secondary">
              {video.views} • {video.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
