export interface Song {
  title: string;
  artist: string;
  album: string;
  releaseDate: string;
  streamCount: number;
  chartRank: number;
  credits: Record<string, string[]>;
}

export interface NetworkNode {
  id: string;
  type: 'person' | 'song';
  name: string;
  role?: string;
  songs?: Song[];
  data?: Song;
  credits?: Array<{ name: string; role: string }>;
  expanded: boolean;
  parentId?: string;
}

export interface MusicDatabase {
  [songTitle: string]: Song;
}