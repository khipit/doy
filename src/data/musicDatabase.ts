import { MusicDatabase } from '../types/music';

export const musicDatabase: MusicDatabase = {
  Seven: {
    title: "Seven",
    artist: "Jung Kook",
    album: "Golden",
    releaseDate: "2023-07-14",
    streamCount: 300000000,
    chartRank: 1,
    credits: {
      "Jung Kook": ["artist"],
      "Latto": ["artist"],
      "Andrew Watt": ["producer"],
      "Jon Bellion": ["songwriter"],
      "Cirkut": ["producer"],
      "Theron Thomas": ["songwriter"],
    },
  },
  Begin: {
    title: "Begin",
    artist: "Jung Kook",
    album: "Wings",
    releaseDate: "2023-07-14", 
    streamCount: 90000000,
    chartRank: 5,
    credits: {
      "Jung Kook": ["artist"],
      "Tony Esterly": ["producer"],
      "David Quinones": ["songwriter"],
      "RM": ["songwriter"],
    },
  },
  Spicy: {
    title: "Spicy",
    artist: "aespa",
    album: "MY WORLD",
    releaseDate: "2023-05-08",
    streamCount: 95000000,
    chartRank: 2,
    credits: {
      "aespa": ["artist"],
      "Tony Esterly": ["producer"],
      "Kenzie": ["songwriter"],
      "IMLAY": ["songwriter"],
    },
  },
  Bills: {
    title: "Bills",
    artist: "ENHYPEN",
    album: "MANIFESTO : DAY 1",
    releaseDate: "2023-05-22",
    streamCount: 80000000,
    chartRank: 3,
    credits: {
      "ENHYPEN": ["artist"],
      "Tony Esterly": ["producer"],
      "David Quinones": ["songwriter"],
    },
  },
  Loose: {
    title: "Loose",
    artist: "ENHYPEN",
    album: "DIMENSION : ANSWER",
    releaseDate: "2022-11-01",
    streamCount: 120000000,
    chartRank: 11,
    credits: {
      "ENHYPEN": ["artist"],
      "Tony Esterly": ["producer"],
      "VITALS": ["producer"],
    },
  }
};