const moreVideos = [
  { id: 1, title: "Breaking Down The Latest Drama", channel: "TeaTime", views: "1.2M views", time: "2 days ago", duration: "12:34" },
  { id: 2, title: "Expert Panel: Live Discussion", channel: "TalkShow", views: "567K views", time: "Streamed 3 hours ago", duration: "2:15:22" },
  { id: 3, title: "Everything Wrong With Modern Debates", channel: "CriticalEye", views: "890K views", time: "1 week ago", duration: "24:17" },
  { id: 4, title: "How To Spot Manipulation Online", channel: "MediaLiteracy", views: "2.1M views", time: "3 days ago", duration: "18:45" },
  { id: 5, title: "The Real Story Behind The Headlines", channel: "DeepDive", views: "1.5M views", time: "5 days ago", duration: "31:22" },
  { id: 6, title: "Reacting To Your Hot Takes", channel: "ReactMaster", views: "734K views", time: "1 day ago", duration: "15:08" },
  { id: 7, title: "Why Social Media Is Changing Everything", channel: "TechExplained", views: "3.2M views", time: "2 weeks ago", duration: "22:41" },
  { id: 8, title: "Inside The Mind Of An Influencer", channel: "PsychologyDaily", views: "1.8M views", time: "4 days ago", duration: "19:55" },
  { id: 9, title: "Fact vs Fiction: The Ultimate Test", channel: "QuizMaster", views: "945K views", time: "6 days ago", duration: "16:33" },
  { id: 10, title: "24 Hours Living By Internet Advice", channel: "ChallengeKing", views: "4.5M views", time: "1 week ago", duration: "28:17" },
  { id: 11, title: "The Art Of Changing Minds", channel: "Persuasion101", views: "623K views", time: "3 days ago", duration: "21:09" },
  { id: 12, title: "What Your Comments Really Mean", channel: "DataNerd", views: "412K views", time: "5 days ago", duration: "14:22" },
  { id: 13, title: "Politicians Try To Explain The Internet", channel: "GovWatch", views: "2.7M views", time: "1 day ago", duration: "11:45" },
  { id: 14, title: "The Evolution Of Online Arguments", channel: "WebHistory", views: "567K views", time: "2 weeks ago", duration: "25:33" },
  { id: 15, title: "Making Sense Of The Chaos", channel: "OrderFromChaos", views: "891K views", time: "4 days ago", duration: "17:28" },
  { id: 16, title: "Interview: The Person Behind The Viral Take", channel: "FaceToFace", views: "1.3M views", time: "3 days ago", duration: "42:15" },
  { id: 17, title: "Why We Can't Stop Arguing", channel: "HumanNature", views: "2.0M views", time: "1 week ago", duration: "20:44" },
  { id: 18, title: "The Science Of Going Viral", channel: "AlgorithmSecrets", views: "1.6M views", time: "6 days ago", duration: "18:22" },
  { id: 19, title: "Reading The Worst Takes On The Internet", channel: "CringeCompilation", views: "5.2M views", time: "2 days ago", duration: "23:17" },
  { id: 20, title: "How To Have Better Conversations", channel: "SoftSkills", views: "734K views", time: "5 days ago", duration: "15:55" },
  { id: 21, title: "The Truth About Echo Chambers", channel: "SociologyNow", views: "456K views", time: "1 week ago", duration: "26:12" },
  { id: 22, title: "Extreme Opinions Explained", channel: "Radical101", views: "1.9M views", time: "3 days ago", duration: "19:38" },
  { id: 23, title: "What Happened To Civil Discourse?", channel: "NostalgiaTrip", views: "823K views", time: "4 days ago", duration: "22:09" },
  { id: 24, title: "Bot Or Human: Can You Tell?", channel: "TuringTest", views: "3.4M views", time: "2 days ago", duration: "14:17" },
];

export const MoreVideosGrid = () => {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold text-yt-text-primary mb-4">More videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {moreVideos.map((video, index) => (
          <div key={video.id} className="group cursor-pointer">
            {/* Thumbnail */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-yt-bg-secondary mb-2">
              <img 
                src={`https://picsum.photos/400/225?random=${index + 50}`}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                loading="lazy"
              />
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                {video.duration}
              </span>
            </div>
            
            {/* Info */}
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-yt-text-primary line-clamp-2 leading-snug mb-1 group-hover:text-yt-blue transition-colors">
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
          </div>
        ))}
      </div>
    </div>
  );
};
