import { Comment, GameConfig, GameResults } from '@/types/game';
import { CommentCard } from './CommentCard';
import { Bot, User, Trophy, Clock, Target, XCircle, CheckCircle, RotateCcw, Sparkles, MessageSquare, Zap } from 'lucide-react';

interface RevealPhaseProps {
  config: GameConfig;
  comments: Comment[];
  results: GameResults;
  onPlayAgain: () => void;
}

export const RevealPhase = ({ config, comments, results, onPlayAgain }: RevealPhaseProps) => {
  const accuracy = results.totalBotted > 0 
    ? Math.round((results.correctGuesses / results.totalBotted) * 100) 
    : 0;
  
  const getGrade = () => {
    if (accuracy >= 90) return { grade: 'S', color: 'text-primary', message: 'Bot Hunter Elite!' };
    if (accuracy >= 75) return { grade: 'A', color: 'text-success', message: 'Great Detection!' };
    if (accuracy >= 50) return { grade: 'B', color: 'text-warning', message: 'Good Effort!' };
    if (accuracy >= 25) return { grade: 'C', color: 'text-orange-500', message: 'Needs Practice' };
    return { grade: 'D', color: 'text-destructive', message: 'The Bots Won...' };
  };

  const gradeInfo = getGrade();

  return (
    <div className="min-h-screen p-6 animate-fade-in">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Results Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">Game Complete</span>
          </div>
          
          <div className={`text-8xl font-bold ${gradeInfo.color}`}>
            {gradeInfo.grade}
          </div>
          <h2 className="text-2xl font-bold text-foreground">{gradeInfo.message}</h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass p-4 rounded-xl border border-border/50 text-center">
            <Target className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{results.totalBotted}</div>
            <div className="text-xs text-muted-foreground">Total Bots</div>
          </div>
          
          <div className="glass p-4 rounded-xl border border-border/50 text-center">
            <CheckCircle className="w-6 h-6 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-success">{results.correctGuesses}</div>
            <div className="text-xs text-muted-foreground">Found</div>
          </div>
          
          <div className="glass p-4 rounded-xl border border-border/50 text-center">
            <XCircle className="w-6 h-6 text-destructive mx-auto mb-2" />
            <div className="text-2xl font-bold text-destructive">{results.incorrectGuesses}</div>
            <div className="text-xs text-muted-foreground">Wrong Guesses</div>
          </div>
          
          <div className="glass p-4 rounded-xl border border-border/50 text-center">
            <Clock className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {results.timerExpired ? '0:00' : `${Math.floor(results.timeRemaining / 60)}:${(results.timeRemaining % 60).toString().padStart(2, '0')}`}
            </div>
            <div className="text-xs text-muted-foreground">
              {results.timerExpired ? 'Time Up!' : 'Remaining'}
            </div>
          </div>
        </div>

        {/* Bot Configuration Reveal */}
        <div className="glass p-6 rounded-2xl border border-primary/30 space-y-4">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            Bot Configuration Revealed
          </h3>
          
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <MessageSquare className="w-3 h-3" />
                Topic
              </div>
              <div className="font-medium text-foreground">{config.topic}</div>
            </div>
            
            <div className="p-3 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <Sparkles className="w-3 h-3" />
                Bot Opinion
              </div>
              <div className="font-medium text-foreground">{config.botOpinion}</div>
            </div>
            
            <div className="p-3 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <Zap className="w-3 h-3" />
                Bot Style
              </div>
              <div className="font-medium text-foreground">{config.botStyle}</div>
            </div>
          </div>
        </div>

        {/* Full Thread */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Full Thread (Annotated)
          </h3>
          
          <div className="space-y-3">
            {comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                mode="reveal"
              />
            ))}
          </div>
        </div>

        {/* Play Again */}
        <button
          onClick={onPlayAgain}
          className="btn-game w-full"
        >
          <span className="flex items-center justify-center gap-2">
            <RotateCcw className="w-5 h-5" />
            Play Again
          </span>
        </button>
      </div>
    </div>
  );
};
