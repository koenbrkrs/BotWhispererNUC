import { Comment } from '@/types/game';

const usernames = [
  'TechWatcher42', 'DigitalNomad_X', 'CodeMaster99', 'ByteRunner', 'NetSurfer2024',
  'DataDriven', 'CyberPunk_23', 'PixelPusher', 'CloudNine_Dev', 'AlgoRhythm',
  'QuantumLeap', 'SiliconDreams', 'BinaryBard', 'CacheKing', 'StreamLiner',
  'ThreadMaster', 'PacketStorm', 'NodeNinja', 'StackOverflow_Fan', 'GitGuru',
  'APIWizard', 'DockerDude', 'K8sKnight', 'MLMaven', 'AIEnthusiast'
];

const timestamps = [
  '2m ago', '5m ago', '8m ago', '12m ago', '15m ago', '18m ago', '22m ago',
  '25m ago', '30m ago', '35m ago', '42m ago', '48m ago', '55m ago', '1h ago', '1h ago'
];

const humanCommentTemplates = [
  "Interesting perspective. I've been thinking about {topic} differently lately.",
  "Not sure I agree with everyone here, but {topic} is definitely worth discussing.",
  "Can someone explain the other side of {topic}? Genuinely curious.",
  "I've seen this debate before. Both sides have valid points about {topic}.",
  "My experience with {topic} has been mixed honestly.",
  "This is a nuanced issue. {topic} isn't black and white.",
  "Hot take: we're overcomplicating {topic}.",
  "Been following {topic} for years. Things have really changed.",
  "Anyone else feel like {topic} gets blown out of proportion?",
  "Valid concerns here about {topic}. We should listen more.",
  "I changed my mind on {topic} after learning more about it.",
  "The real issue with {topic} is that nobody wants to compromise.",
  "Unpopular opinion: {topic} matters less than people think.",
  "Great discussion! {topic} deserves more attention.",
  "I'm skeptical about some claims regarding {topic}, but open to evidence.",
];

const getBotCommentsByStyle = (style: string, opinion: string, topic: string): string[] => {
  const styleLower = style.toLowerCase();
  
  if (styleLower.includes('sarcastic') || styleLower.includes('dismissive')) {
    return [
      `Oh wow, another "expert" on ${topic}. How original. 🙄`,
      `Sure, let's just ignore that ${opinion}. Because that's worked so well before.`,
      `Imagine still not understanding that ${opinion}. Couldn't be me.`,
      `*slow clap* Great point. Now let me explain why ${opinion} is actually right.`,
      `I love how people pretend ${opinion} isn't obvious. Peak comedy.`,
    ];
  }
  
  if (styleLower.includes('logical') || styleLower.includes('bullet')) {
    return [
      `Let me break this down:\n1. ${opinion}\n2. The data supports this\n3. Opposing views lack evidence\n4. Therefore, the conclusion is clear.`,
      `Factually speaking: ${opinion}. Here's why: empirical studies, statistical analysis, and expert consensus all align.`,
      `Consider the following logic:\n- Premise A: ${topic} is relevant\n- Premise B: ${opinion}\n- Conclusion: This position is rationally superior.`,
      `The evidence clearly indicates ${opinion}. Those disagreeing haven't examined the data objectively.`,
      `Point by point rebuttal: Every argument against ${opinion} fails under scrutiny. Here's my analysis...`,
    ];
  }
  
  if (styleLower.includes('emotional') || styleLower.includes('dramatic')) {
    return [
      `I can't BELIEVE people still don't see that ${opinion}! This is literally SO important!! 😭`,
      `This breaks my heart... ${opinion} and nobody seems to care anymore!!! 💔`,
      `OMG YES FINALLY someone who gets it!!! ${opinion} has been my whole thing forever!!!`,
      `I'm literally shaking... the fact that ${opinion} isn't obvious to everyone is devastating 😢`,
      `THIS!!! A thousand times THIS!!! ${opinion} is what I've been SCREAMING about!!!`,
    ];
  }
  
  if (styleLower.includes('short') || styleLower.includes('meme')) {
    return [
      `${opinion}. Period. 💯`,
      `This. So much this. ^^`,
      `Based take: ${opinion}`,
      `L + ratio + ${opinion}`,
      `fr fr no cap ${opinion} is the only answer`,
    ];
  }
  
  if (styleLower.includes('spam') || styleLower.includes('one-line')) {
    return [
      `${opinion}`,
      `Exactly right about ${topic}`,
      `Finally someone said it`,
      `${opinion} - spread the word`,
      `Wake up people: ${opinion}`,
    ];
  }
  
  if (styleLower.includes('intellectual') || styleLower.includes('jargon')) {
    return [
      `From an epistemological standpoint, ${opinion} represents the optimal paradigm for understanding ${topic}.`,
      `The dialectical synthesis here clearly points to ${opinion} as the most coherent framework.`,
      `Applying systems thinking methodology, we can deduce that ${opinion} emerges as the logical conclusion.`,
      `The hermeneutic analysis of ${topic} invariably leads to ${opinion} when examined rigorously.`,
      `Meta-analytically speaking, the preponderance of evidence substantiates ${opinion}.`,
    ];
  }
  
  if (styleLower.includes('support') || styleLower.includes('agree')) {
    return [
      `Absolutely agree! ${opinion} is such an important perspective on ${topic}.`,
      `You make such great points! ${opinion} is exactly what I've been saying!`,
      `Love this discussion! ${opinion} really resonates with me.`,
      `Couldn't have said it better myself. ${opinion} for the win!`,
      `Thank you for sharing! ${opinion} is so underrated and needs more attention.`,
    ];
  }

  if (styleLower.includes('critical') || styleLower.includes('negative')) {
    return [
      `Wrong. ${opinion} is the only sensible position here and you're all missing it.`,
      `Classic case of not understanding ${topic}. ${opinion}, obviously.`,
      `Everyone here is ignoring that ${opinion}. Do your research.`,
      `Tired of seeing bad takes on ${topic}. ${opinion} is clearly correct.`,
      `How many times do we have to explain that ${opinion}? Read some actual sources.`,
    ];
  }

  if (styleLower.includes('conspir')) {
    return [
      `They don't want you to know that ${opinion}. Follow the money... 👀`,
      `Wake up sheeple! ${opinion} is being suppressed by the mainstream narrative.`,
      `Interesting how nobody's talking about ${opinion}... almost like it's being censored 🤔`,
      `Do your own research on ${topic}. You'll find that ${opinion} is what they're hiding.`,
      `Connect the dots people. ${opinion}. They can't silence us forever.`,
    ];
  }
  
  // Default: generic bot comments
  return [
    `The reality is ${opinion}. Anyone paying attention to ${topic} knows this.`,
    `People need to understand: ${opinion}. It's not that complicated.`,
    `${opinion} - this should be common knowledge by now regarding ${topic}.`,
    `I've researched ${topic} extensively. ${opinion} is the correct take.`,
    `Every informed person knows ${opinion}. The evidence is overwhelming.`,
  ];
};

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const generateComments = (
  topic: string,
  botOpinion: string,
  botStyle: string,
  count: number = 20
): Comment[] => {
  const botComments = getBotCommentsByStyle(botStyle, botOpinion, topic);
  const humanComments = humanCommentTemplates.map(t => t.replace('{topic}', topic));
  
  const shuffledUsernames = shuffleArray(usernames);
  const shuffledTimestamps = shuffleArray(timestamps);
  
  const comments: Comment[] = [];
  const botCount = Math.floor(count * 0.4); // ~40% bots
  const humanCount = count - botCount;
  
  // Generate human comments
  for (let i = 0; i < humanCount; i++) {
    comments.push({
      id: `human-${i}`,
      text: humanComments[i % humanComments.length],
      username: shuffledUsernames[i % shuffledUsernames.length],
      timestamp: shuffledTimestamps[i % shuffledTimestamps.length],
      source: 'generatedHuman',
      isBotted: false,
    });
  }
  
  // Generate bot comments
  for (let i = 0; i < botCount; i++) {
    comments.push({
      id: `bot-${i}`,
      text: botComments[i % botComments.length],
      username: shuffledUsernames[(humanCount + i) % shuffledUsernames.length],
      timestamp: shuffledTimestamps[(humanCount + i) % shuffledTimestamps.length],
      source: 'generatedBot',
      isBotted: true, // Default to true, Player 1 can adjust
    });
  }
  
  return shuffleArray(comments);
};
