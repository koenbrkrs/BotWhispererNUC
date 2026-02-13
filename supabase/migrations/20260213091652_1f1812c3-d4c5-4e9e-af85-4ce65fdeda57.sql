
CREATE TABLE public.game_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  topic TEXT NOT NULL,
  stance TEXT NOT NULL,
  friendly SMALLINT NOT NULL CHECK (friendly BETWEEN 0 AND 100),
  aggressive SMALLINT NOT NULL CHECK (aggressive BETWEEN 0 AND 100),
  logical SMALLINT NOT NULL CHECK (logical BETWEEN 0 AND 100),
  illogical SMALLINT NOT NULL CHECK (illogical BETWEEN 0 AND 100),
  humor SMALLINT NOT NULL CHECK (humor BETWEEN 0 AND 100),
  serious SMALLINT NOT NULL CHECK (serious BETWEEN 0 AND 100),
  sarcasm SMALLINT NOT NULL CHECK (sarcasm BETWEEN 0 AND 100),
  direct SMALLINT NOT NULL CHECK (direct BETWEEN 0 AND 100),
  open_minded SMALLINT NOT NULL CHECK (open_minded BETWEEN 0 AND 100),
  closed_minded SMALLINT NOT NULL CHECK (closed_minded BETWEEN 0 AND 100),
  minimal SMALLINT NOT NULL CHECK (minimal BETWEEN 0 AND 100),
  verbose_level SMALLINT NOT NULL CHECK (verbose_level BETWEEN 0 AND 100),
  emoji_amount SMALLINT NOT NULL CHECK (emoji_amount BETWEEN 0 AND 100),
  bots_found SMALLINT NOT NULL,
  humans_misidentified SMALLINT NOT NULL,
  total_bots SMALLINT NOT NULL,
  won BOOLEAN NOT NULL,
  score INTEGER NOT NULL,
  time_used REAL NOT NULL,
  player_code TEXT,
  consent_given BOOLEAN NOT NULL DEFAULT true
);

ALTER TABLE public.game_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert game sessions"
  ON public.game_sessions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read game sessions"
  ON public.game_sessions FOR SELECT
  USING (true);
