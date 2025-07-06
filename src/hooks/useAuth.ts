import { useState, useCallback } from 'react';
import { User, UserProfile, StyleMatch } from '../types/user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Mock style matches data
  const mockStyleMatches: StyleMatch[] = [
    {
      userId: 'user2',
      username: 'KpopLover99',
      matchPercentage: 94,
      commonInterests: ['Jung Kook', 'aespa', 'K-pop'],
      avatar: undefined
    },
    {
      userId: 'user3',
      username: 'MusicProducer',
      matchPercentage: 87,
      commonInterests: ['Tony Esterly', 'Music Production', 'ENHYPEN'],
      avatar: undefined
    },
    {
      userId: 'user4',
      username: 'StanAccount',
      matchPercentage: 82,
      commonInterests: ['BTS', 'Songwriting', 'K-pop'],
      avatar: undefined
    }
  ];

  const login = useCallback((email: string, password: string) => {
    // Mock login - in real app, this would call an API
    const mockUser: User = {
      id: 'user1',
      username: email.split('@')[0],
      email,
      joinDate: new Date().toISOString(),
      isLoggedIn: true
    };

    const mockProfile: UserProfile = {
      userId: mockUser.id,
      displayName: mockUser.username,
      bio: "Music enthusiast exploring the K-pop universe 🎵",
      favoriteGenres: ['K-pop', 'Pop', 'R&B'],
      favoriteSong: {
        title: "Seven",
        artist: "Jung Kook",
        reason: "The perfect blend of vocals and production that gets me every time!"
      },
      favoriteSongwriter: {
        name: "Jon Bellion",
        reason: "His creativity and unique approach to songwriting is incredible"
      },
      favoriteMusician: {
        name: "Jung Kook",
        reason: "Amazing vocals and stage presence that never fails to impress"
      },
      fandomTier: 'Stan',
      fandomScore: 85,
      boardActivities: [
        {
          id: '1',
          type: 'post',
          content: 'Just discovered this amazing collaboration between Tony Esterly and aespa!',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          likes: 23
        },
        {
          id: '2',
          type: 'comment',
          content: 'Jung Kook\'s vocal range in "Seven" is absolutely incredible',
          timestamp: new Date(Date.now() - 172800000).toISOString(),
          likes: 15
        },
        {
          id: '3',
          type: 'like',
          content: 'Liked a post about ENHYPEN\'s latest release',
          timestamp: new Date(Date.now() - 259200000).toISOString(),
          likes: 0
        }
      ],
      myClips: [
        {
          id: '1',
          title: 'Seven - Vocal Cover',
          description: 'My take on Jung Kook\'s amazing vocals',
          musicianName: 'Jung Kook',
          clipType: 'cover',
          thumbnail: '',
          views: 1250,
          likes: 89,
          createdAt: new Date(Date.now() - 604800000).toISOString()
        },
        {
          id: '2',
          title: 'Spicy Dance Challenge',
          description: 'Learning aespa\'s choreography',
          musicianName: 'aespa',
          clipType: 'dance',
          thumbnail: '',
          views: 2100,
          likes: 156,
          createdAt: new Date(Date.now() - 1209600000).toISOString()
        }
      ],
      genreCollection: [
        { genre: 'K-pop', level: 8, songsCollected: 245, totalSongs: 300, badge: '👑' },
        { genre: 'Pop', level: 6, songsCollected: 180, totalSongs: 250, badge: '🎵' },
        { genre: 'R&B', level: 4, songsCollected: 95, totalSongs: 150, badge: '🎤' },
        { genre: 'Hip-Hop', level: 3, songsCollected: 60, totalSongs: 120, badge: '🎧' }
      ],
      profileTheme: {
        primaryColor: '#39FF14',
        secondaryColor: '#2BCC10',
        backgroundPattern: 'music-notes',
        fontStyle: 'fredoka',
        decorativeElements: ['stars', 'music-notes']
      },
      badges: ['Early Adopter', 'Music Explorer', 'Community Star'],
      musicPersonality: 'The Trendsetter Explorer'
    };

    setUser(mockUser);
    setUserProfile(mockProfile);
    setShowLoginModal(false);
  }, []);

  const signup = useCallback((username: string, email: string, password: string) => {
    // Mock signup - in real app, this would call an API
    login(email, password);
  }, [login]);

  const logout = useCallback(() => {
    setUser(null);
    setUserProfile(null);
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, ...updates });
    }
  }, [userProfile]);

  return {
    user,
    userProfile,
    showLoginModal,
    styleMatches: mockStyleMatches,
    login,
    signup,
    logout,
    updateProfile,
    setShowLoginModal
  };
}