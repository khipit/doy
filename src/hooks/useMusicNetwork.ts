import { useState, useCallback } from 'react';
import { NetworkNode, Song } from '../types/music';
import { musicDatabase } from '../data/musicDatabase';

export function useMusicNetwork() {
  const [nodes, setNodes] = useState<NetworkNode[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [database, setDatabase] = useState(musicDatabase);
  const [isCrawling, setIsCrawling] = useState(false);

  const getPersonSongs = useCallback((person: string): Song[] => {
    return Object.entries(database)
      .filter(([_, song]) => song.credits[person])
      .map(([title, song]) => ({ ...song, title }));
  }, [database]);

  const getSongCredits = useCallback((song: Song) => {
    const credits = song.credits;
    const result: Array<{ name: string; role: string }> = [];
    
    Object.entries(credits).forEach(([name, roles]) => {
      roles.forEach(role => {
        result.push({ name, role });
      });
    });
    
    return result;
  }, []);

  const searchPerson = useCallback((person: string) => {
    const songs = getPersonSongs(person);
    
    if (songs.length === 0) {
      alert(`No songs found for "${person}"`);
      return false;
    }
    
    setNodes([{
      id: `root-${person}`,
      type: "person",
      name: person,
      songs: songs,
      expanded: false
    }]);
    
    return true;
  }, [getPersonSongs]);

  const expandPerson = useCallback((nodeId: string) => {
    setNodes(prevNodes => 
      prevNodes.map(node =>
        node.id === nodeId ? { ...node, expanded: !node.expanded } : node
      )
    );
  }, []);

  const expandSong = useCallback((song: Song, parentId: string) => {
    const credits = getSongCredits(song);
    const newNodeId = `song-${song.title}-${parentId}`;
    
    setNodes(prevNodes => {
      const existingIndex = prevNodes.findIndex(n => n.id === newNodeId);
      
      if (existingIndex !== -1) {
        return prevNodes.map((node, index) =>
          index === existingIndex ? { ...node, expanded: !node.expanded } : node
        );
      } else {
        return [...prevNodes, {
          id: newNodeId,
          type: "song",
          name: song.title,
          data: song,
          credits: credits,
          expanded: true,
          parentId: parentId
        }];
      }
    });
  }, [getSongCredits]);

  const expandCollaborator = useCallback((collaborator: { name: string; role: string }, parentId: string) => {
    const songs = getPersonSongs(collaborator.name);
    const newNodeId = `person-${collaborator.name}-${parentId}`;
    
    setNodes(prevNodes => {
      const existingIndex = prevNodes.findIndex(n => n.id === newNodeId);
      
      if (existingIndex !== -1) {
        return prevNodes.map((node, index) =>
          index === existingIndex ? { ...node, expanded: !node.expanded } : node
        );
      } else {
        return [...prevNodes, {
          id: newNodeId,
          type: "person",
          name: collaborator.name,
          role: collaborator.role,
          songs: songs,
          expanded: true,
          parentId: parentId
        }];
      }
    });
  }, [getPersonSongs]);

  const clearNetwork = useCallback(() => {
    setNodes([]);
  }, []);

  const toggleAdmin = useCallback(() => {
    setShowAdmin(prev => !prev);
  }, []);

  const startCrawling = useCallback(async () => {
    setIsCrawling(true);
    
    // Simulate crawling process
    const mockCrawlData = [
      {
        title: "Dynamite",
        artist: "BTS",
        releaseDate: "2020-08-21",
        streamCount: 1500000000,
        chartRank: 1,
        credits: {
          "BTS": ["artist"],
          "David Stewart": ["producer", "songwriter"],
          "Jessica Agombar": ["songwriter"],
        }
      },
      {
        title: "Butter",
        artist: "BTS", 
        releaseDate: "2021-05-21",
        streamCount: 1200000000,
        chartRank: 1,
        credits: {
          "BTS": ["artist"],
          "Rob Grimaldi": ["producer"],
          "Stephen Kirk": ["songwriter"],
          "Ron Perry": ["producer"],
        }
      }
    ];

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Add crawled data to database
    const newDatabase = { ...database };
    mockCrawlData.forEach(song => {
      newDatabase[song.title] = song;
    });
    
    setDatabase(newDatabase);
    setIsCrawling(false);
    
    alert(`Successfully crawled ${mockCrawlData.length} new songs!`);
  }, [database]);

  const addManualData = useCallback((songData: any) => {
    const newDatabase = { ...database };
    newDatabase[songData.title] = songData;
    setDatabase(newDatabase);
    
    alert(`Successfully added "${songData.title}" to the database!`);
  }, [database]);

  const getStats = useCallback(() => {
    const totalNodes = nodes.length;
    const connections = nodes.filter(n => n.parentId).length;
    
    // Calculate database stats
    const songs = Object.keys(database);
    const allArtists = new Set<string>();
    const allProducers = new Set<string>();
    const allSongwriters = new Set<string>();

    Object.values(database).forEach(song => {
      Object.entries(song.credits).forEach(([name, roles]) => {
        roles.forEach(role => {
          if (role === 'artist') allArtists.add(name);
          else if (role === 'producer') allProducers.add(name);
          else if (role === 'songwriter') allSongwriters.add(name);
        });
      });
    });

    return {
      nodes: totalNodes,
      connections,
      database: {
        songs: songs.length,
        artists: allArtists.size,
        producers: allProducers.size,
        songwriters: allSongwriters.size,
      }
    };
  }, [nodes, database]);

  return {
    nodes,
    showAdmin,
    isCrawling,
    searchPerson,
    expandPerson,
    expandSong,
    expandCollaborator,
    clearNetwork,
    toggleAdmin,
    startCrawling,
    addManualData,
    getStats
  };
}