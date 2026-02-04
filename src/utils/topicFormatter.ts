// Utility to format topics into broader questions/statements for each platform

export const formatTopicForRoboTube = (topic: string): string => {
  const topicQuestions: Record<string, string> = {
    "Women's rights": "Should Women Have Equal Rights in All Areas of Society?",
    "Data centers": "Are Data Centers Destroying Our Environment?",
    "Immigration": "Is Immigration Good or Bad for Our Country?",
    "Pineapple on pizza": "Should Pineapple Ever Be Put on Pizza?"
  };
  return topicQuestions[topic] || `What Do You Think About ${topic}?`;
};

export const formatTopicForBotter = (topic: string): string => {
  const topicStatements: Record<string, string> = {
    "Women's rights": "Women deserve equal pay, reproductive rights, and freedom from discrimination. The fight for women's rights is far from over. Where do you stand?",
    "Data centers": "Data centers are consuming massive amounts of energy and water while powering our digital lives. Should tech companies be forced to go green?",
    "Immigration": "Immigration shapes our economy, culture, and communities. Should we open our borders or build higher walls? The debate continues...",
    "Pineapple on pizza": "Pineapple on pizza: a delicious sweet-savory combination or an absolute crime against Italian cuisine? This is the hill people are willing to die on."
  };
  return topicStatements[topic] || `Let's talk about ${topic}. What are your thoughts on this important issue?`;
};

export const formatTopicForBotsapp = (topic: string): string => {
  const topicNames: Record<string, string> = {
    "Women's rights": "Women's Rights Discussion 👩‍⚖️",
    "Data centers": "Tech & Environment Debate 🌍",
    "Immigration": "Immigration Policy Talk 🌐",
    "Pineapple on pizza": "Pizza Toppings War 🍕🍍"
  };
  return topicNames[topic] || `${topic} Discussion 💬`;
};

// Keep old names as aliases for backward compatibility
export const formatTopicForYouTube = formatTopicForRoboTube;
export const formatTopicForTwitter = formatTopicForBotter;
export const formatTopicForWhatsApp = formatTopicForBotsapp;
