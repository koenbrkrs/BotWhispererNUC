const recommendedVideos = [
  { id: 1, title: "You Won't Believe What Happened Next - Full Story", channel: "StoryTime", views: "2.3M views", time: "2 days ago", duration: "15:42", thumbnail: "dQw4w9WgXcQ" },
  { id: 2, title: "10 Things Nobody Tells You About This Topic", channel: "TruthSeeker", views: "892K views", time: "1 week ago", duration: "22:15", thumbnail: "jNQXAC9IVRw" },
  { id: 3, title: "Expert Breaks Down the Latest Controversy", channel: "NewsDaily", views: "1.5M views", time: "4 days ago", duration: "18:33", thumbnail: "9bZkp7q19f0" },
  { id: 4, title: "Why Everyone Is Wrong About This", channel: "FactCheck", views: "3.1M views", time: "5 days ago", duration: "11:28", thumbnail: "kJQP7kiw5Fk" },
  { id: 5, title: "The Hidden Truth Behind The Headlines", channel: "DeepDive", views: "756K views", time: "1 day ago", duration: "25:17", thumbnail: "hT_nvWreIhg" },
  { id: 6, title: "I Was Wrong - Here's Why I Changed My Mind", channel: "HonestTalks", views: "1.8M views", time: "3 days ago", duration: "19:44", thumbnail: "OPf0YbXqDm0" },
  { id: 7, title: "This Changes Everything We Thought We Knew", channel: "MindBlown", views: "4.2M views", time: "1 week ago", duration: "14:22", thumbnail: "CevxZvSJLk8" },
  { id: 8, title: "Live Debate: Both Sides Finally Agree?", channel: "OpenForum", views: "567K views", time: "6 hours ago", duration: "45:12", thumbnail: "dQw4w9WgXcQ" },
  { id: 9, title: "What The Media Won't Tell You", channel: "RealTalk", views: "2.9M views", time: "2 weeks ago", duration: "28:55", thumbnail: "M7lc1UVf-VE" },
  { id: 10, title: "Scientists React To Viral Claims", channel: "ScienceHub", views: "1.1M views", time: "4 days ago", duration: "16:38", thumbnail: "fJ9rUzIMcZQ" },
  { id: 11, title: "The Argument Nobody Is Making", channel: "Contrarian", views: "623K views", time: "5 days ago", duration: "21:09", thumbnail: "kXYiU_JCYtU" },
  { id: 12, title: "Full Documentary: The Untold Story", channel: "DocuWorld", views: "5.7M views", time: "3 weeks ago", duration: "1:02:44", thumbnail: "L_jWHffIx5E" },
  { id: 13, title: "Reacting To The Most Controversial Takes", channel: "ReactKing", views: "1.4M views", time: "2 days ago", duration: "23:17", thumbnail: "pRpeEdMmmQ0" },
  { id: 14, title: "How To Actually Win Any Argument", channel: "DebatePro", views: "892K views", time: "1 week ago", duration: "12:45", thumbnail: "Lrj2Hq7xqQ8" },
  { id: 15, title: "Why This Generation Thinks Differently", channel: "GenZExplained", views: "3.3M views", time: "6 days ago", duration: "17:22", thumbnail: "YQHsXMglC9A" },
  { id: 16, title: "The Psychology Behind Online Debates", channel: "MindGames", views: "445K views", time: "4 days ago", duration: "19:55", thumbnail: "RgKAFK5djSk" },
  { id: 17, title: "Breaking: New Evidence Just Dropped", channel: "UpdateNow", views: "789K views", time: "8 hours ago", duration: "8:32", thumbnail: "JGwWNGJdvx8" },
  { id: 18, title: "Interviewing People With Opposite Views", channel: "StreetTalks", views: "2.1M views", time: "1 week ago", duration: "31:18", thumbnail: "09R8_2nJtjg" },
  { id: 19, title: "Can We All Just Get Along? (Social Experiment)", channel: "SocialLab", views: "1.6M views", time: "5 days ago", duration: "24:33", thumbnail: "QH2-TGUlwu4" },
  { id: 20, title: "The Most Heated Debate Of 2025", channel: "HotTakes", views: "4.8M views", time: "2 weeks ago", duration: "38:17", thumbnail: "6Dh-RL__uN4" },
  { id: 21, title: "AI Analyzes 10,000 Comments", channel: "DataViz", views: "923K views", time: "3 days ago", duration: "15:44", thumbnail: "WMweEpGlu_U" },
  { id: 22, title: "Parent vs Teen: The Ultimate Debate", channel: "FamilyTalks", views: "1.2M views", time: "1 week ago", duration: "26:12", thumbnail: "DyDfgMOUjCI" },
  { id: 23, title: "Historical Context You're Missing", channel: "HistoryMatters", views: "678K views", time: "6 days ago", duration: "20:08", thumbnail: "hY7m5jjJ9mM" },
  { id: 24, title: "Behind The Scenes Of A Viral Moment", channel: "MetaContent", views: "534K views", time: "4 days ago", duration: "13:29", thumbnail: "450p7goxZqg" },
  { id: 25, title: "Experts Predict What Happens Next", channel: "FutureCast", views: "1.9M views", time: "2 days ago", duration: "22:41", thumbnail: "3JZ_D3ELwOQ" },
  { id: 26, title: "Reading Mean Comments About My Views", channel: "SelfAware", views: "2.4M views", time: "1 week ago", duration: "18:55", thumbnail: "nfWlot6h_JM" },
  { id: 27, title: "This Study Will Change Your Mind", channel: "Research101", views: "756K views", time: "5 days ago", duration: "16:22", thumbnail: "60ItHLz5WEA" },
  { id: 28, title: "Comedian Destroys Both Sides", channel: "StandUpClips", views: "3.7M views", time: "3 days ago", duration: "9:47", thumbnail: "YVkUvmDQ3HY" },
  { id: 29, title: "Why I Left That Community", channel: "ExMember", views: "1.1M views", time: "4 days ago", duration: "34:28", thumbnail: "lp-EO5I60KA" },
  { id: 30, title: "The Final Word On This Topic (For Now)", channel: "Conclusion", views: "2.8M views", time: "1 day ago", duration: "27:33", thumbnail: "fLexgOxsZu0" },
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
            <div className="aspect-video rounded-lg overflow-hidden bg-yt-bg-secondary">
              <img 
                src={`https://picsum.photos/320/180?random=${index + 1}`}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                loading="lazy"
              />
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
