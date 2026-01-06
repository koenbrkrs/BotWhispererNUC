interface IntroScreenProps {
  onStart: () => void;
  onSetupBots: () => void;
}

export const IntroScreen = ({ onStart, onSetupBots }: IntroScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] flex flex-col items-center justify-center p-8 font-retro">
      <div className="max-w-4xl w-full text-center space-y-12">
        {/* Main Title */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-retro-red leading-tight">
            <span className="border-b-4 border-retro-blue">Your mission.</span>
          </h1>
          <h2 className="text-4xl md:text-6xl lg:text-7xl text-retro-red leading-tight pl-8 md:pl-16">
            Spot the bots.
            <span className="block text-right text-retro-red text-2xl md:text-3xl mt-2">
              ////////////////////////
            </span>
          </h2>
        </div>

        {/* Instructions */}
        <div className="text-left text-white/90 space-y-2 text-sm md:text-base max-w-xl mx-auto">
          <p className="text-retro-muted">&gt; Actions</p>
          <p className="pl-4">[1] You get two minutes to find all the botted comments</p>
          <p className="pl-4">[2] Suspect that a comment is a bot? Press it.</p>
          <p className="pl-4">[3] Correct = Disappears, Wrong = Turns red.</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <button
            onClick={onStart}
            className="px-8 py-3 bg-retro-button text-retro-button-text text-lg hover:bg-retro-button-hover transition-colors border-2 border-retro-button-text/20"
          >
            Start
          </button>
          <button
            onClick={onSetupBots}
            className="px-8 py-3 bg-retro-button text-retro-button-text text-lg hover:bg-retro-button-hover transition-colors border-2 border-retro-button-text/20"
          >
            Setup Bots
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 right-4 text-retro-muted text-xs">
        Made by: Malmö University Students
      </div>
    </div>
  );
};
