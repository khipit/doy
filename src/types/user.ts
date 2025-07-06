export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  joinDate: string;
  isLoggedIn: boolean;
}

export interface UserProfile {
  userId: string;
  displayName: string;
  bio: string;
  favoriteGenres: string[];
  favoriteSong?: {
    title: string;
    artist: string;
    reason: string;
  };
  favoriteSongwriter?: {
    name: string;
    reason: string;
  };
  favoriteMusician?: {
    name: string;
    reason: string;
  };
  fandomTier: 'Casual' | 'Fan' | 'Stan' | 'Ultimate Stan';
  fandomScore: number;
  boardActivities: BoardActivity[];
  myClips: UserClip[];
  genreCollection: GenreCollection[];
  profileTheme: ProfileTheme;
  badges: string[];
  musicPersonality: string;
}

export interface BoardActivity {
  id: string;
  type: 'post' | 'comment' | 'like' | 'share';
  content: string;
  timestamp: string;
  likes: number;
}

export interface UserClip {
  id: string;
  title: string;
  description: string;
  musicianName: string;
  clipType: 'cover' | 'dance' | 'reaction' | 'analysis';
  thumbnail: string;
  views: number;
  likes: number;
  createdAt: string;
}

export interface GenreCollection {
  genre: string;
  level: number;
  songsCollected: number;
  totalSongs: number;
  badge?: string;
}

export interface ProfileTheme {
  primaryColor: string;
  secondaryColor: string;
  backgroundPattern: string;
  fontStyle: string;
  decorativeElements: string[];
}

export interface StyleMatch {
  userId: string;
  username: string;
  matchPercentage: number;
  commonInterests: string[];
  avatar?: string;
}