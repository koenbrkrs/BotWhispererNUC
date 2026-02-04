// Utility to load human comments from Google Sheet CSV

const CSV_URL = 'https://docs.google.com/spreadsheets/d/10gVYuXHB1-IHJu2z9YEMh8sBIez0gIcgmaT1lQyXp4A/export?format=csv';

// Column mapping (0-indexed)
const COLUMN_MAP: Record<string, Record<string, number>> = {
  "Women's rights": {
    youtube: 1,
    twitter: 2,
    whatsapp: 3,
  },
  "Data centers": {
    youtube: 4,
    twitter: 5,
    whatsapp: 6,
  },
  "Immigration": {
    youtube: 7,
    twitter: 8,
    whatsapp: 9,
  },
  "Pineapple on pizza": {
    youtube: 10,
    twitter: 11,
    whatsapp: 12,
  },
};

// Cache for CSV data
let csvCache: string[][] | null = null;

const parseCSV = (csvText: string): string[][] => {
  const lines = csvText.split('\n');
  return lines.map(line => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  });
};

export const fetchHumanComments = async (): Promise<string[][]> => {
  if (csvCache) {
    console.log('Using cached CSV data');
    return csvCache;
  }

  console.log('Fetching human comments from Google Sheet...');
  const response = await fetch(CSV_URL);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch CSV: ${response.statusText}`);
  }

  const csvText = await response.text();
  csvCache = parseCSV(csvText);
  console.log(`Loaded ${csvCache.length} rows from CSV`);
  
  return csvCache;
};

export const getHumanCommentsForLevel = async (
  topic: string,
  platform: 'youtube' | 'twitter' | 'whatsapp',
  count: number = 10
): Promise<string[]> => {
  const csvData = await fetchHumanComments();
  
  const columnIndex = COLUMN_MAP[topic]?.[platform];
  if (columnIndex === undefined) {
    console.warn(`No column mapping for topic "${topic}" and platform "${platform}"`);
    return [];
  }

  // Get all non-empty values from the column (skip header row 0)
  const comments: string[] = [];
  for (let i = 1; i < csvData.length; i++) {
    const value = csvData[i]?.[columnIndex]?.trim();
    if (value && value.length > 0) {
      comments.push(value);
    }
  }

  console.log(`Found ${comments.length} human comments for ${topic} on ${platform}`);

  if (comments.length === 0) {
    return [];
  }

  // Randomly pick 'count' unique comments (with repetition if needed)
  const selected: string[] = [];
  const shuffled = [...comments].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < count; i++) {
    if (i < shuffled.length) {
      selected.push(shuffled[i]);
    } else {
      // If we need more than available, repeat randomly
      selected.push(comments[Math.floor(Math.random() * comments.length)]);
    }
  }

  return selected;
};

export const clearHumanCommentsCache = () => {
  csvCache = null;
};
