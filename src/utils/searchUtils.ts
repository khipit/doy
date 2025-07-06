// 검색어 정규화 함수
export function normalizeSearchTerm(term) {
  return term
    .toLowerCase()                    // 소문자 변환
    .replace(/\s+/g, '')             // 모든 공백 제거
    .replace(/[^\w가-힣]/g, '')       // 특수문자 제거 (한글, 영문, 숫자만)
    .trim();
}

// 한글 초성 추출 함수
export function getChosung(str) {
  const chosungList = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  let result = '';
  
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i) - 44032;
    if (code >= 0 && code <= 11171) {
      result += chosungList[Math.floor(code / 588)];
    }
  }
  return result;
}

// 향상된 검색 함수
export function searchMusic(query, musicDatabase) {
  const normalizedQuery = normalizeSearchTerm(query);
  const chosungQuery = getChosung(query);
  
  return musicDatabase.songs.filter(song => {
    // 제목 검색
    const normalizedTitle = normalizeSearchTerm(song.title);
    const titleChosung = getChosung(song.title);
    
    // 아티스트 검색
    const normalizedArtist = normalizeSearchTerm(song.artist);
    const artistChosung = getChosung(song.artist);
    
    // 앨범 검색
    const normalizedAlbum = normalizeSearchTerm(song.album);
    const albumChosung = getChosung(song.album);
    
    // 다양한 검색 조건
    return (
      // 완전 일치
      normalizedTitle.includes(normalizedQuery) ||
      normalizedArtist.includes(normalizedQuery) ||
      normalizedAlbum.includes(normalizedQuery) ||
      
      // 초성 검색
      titleChosung.includes(chosungQuery) ||
      artistChosung.includes(chosungQuery) ||
      albumChosung.includes(chosungQuery) ||
      
      // 부분 일치 (원본 대소문자 무시)
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase()) ||
      song.album.toLowerCase().includes(query.toLowerCase())
    );
  });
}

// 검색 결과 점수 계산 (관련도 순 정렬)
export function searchWithRanking(query, musicDatabase) {
  const normalizedQuery = normalizeSearchTerm(query);
  const results = musicDatabase.songs.map(song => {
    let score = 0;
    
    // 제목 일치 점수 (가장 높은 점수)
    if (normalizeSearchTerm(song.title).includes(normalizedQuery)) {
      score += 100;
    }
    
    // 아티스트 일치 점수
    if (normalizeSearchTerm(song.artist).includes(normalizedQuery)) {
      score += 50;
    }
    
    // 앨범 일치 점수
    if (normalizeSearchTerm(song.album).includes(normalizedQuery)) {
      score += 20;
    }
    
    // 초성 일치 점수
    const chosungQuery = getChosung(query);
    if (getChosung(song.title).includes(chosungQuery)) {
      score += 10;
    }
    
    return { ...song, searchScore: score };
  })
  .filter(song => song.searchScore > 0)
  .sort((a, b) => b.searchScore - a.searchScore);
  
  return results;
}

// 음악 데이터베이스
export const musicDatabase = {
  songs: [
    {
      id: "seven",
      title: "Seven",
      artist: "Jung Kook",
      album: "Golden",
      releaseDate: "2023-07-14",
      streamCount: 300000000,
      chartRank: 1
    },
    {
      id: "butter",
      title: "Butter",
      artist: "BTS",
      album: "Butter",
      releaseDate: "2021-05-21",
      streamCount: 1000000000,
      chartRank: 1
    },
    {
      id: "spring-day",
      title: "봄날",
      artist: "방탄소년단",
      album: "You Never Walk Alone",
      releaseDate: "2017-02-13",
      streamCount: 500000000,
      chartRank: 5
    },
    {
      id: "dynamite",
      title: "Dynamite",
      artist: "BTS",
      album: "BE",
      releaseDate: "2020-08-21",
      streamCount: 1500000000,
      chartRank: 1
    },
    {
      id: "stay-alive",
      title: "Stay Alive",
      artist: "정국",
      album: "7FATES: CHAKHO OST",
      releaseDate: "2022-02-11",
      streamCount: 200000000,
      chartRank: 3
    },
    {
      id: "permission-to-dance",
      title: "Permission to Dance",
      artist: "BTS",
      album: "Butter",
      releaseDate: "2021-07-09",
      streamCount: 800000000,
      chartRank: 1
    }
  ]
};

/*
// 테스트 코드 (필요시 주석 해제)
console.log("=== 검색 테스트 ===");
console.log("'정국' 검색:", searchMusic("정국", musicDatabase));
console.log("'jungkook' 검색:", searchMusic("jungkook", musicDatabase));
console.log("'Jung Kook' 검색:", searchMusic("Jung Kook", musicDatabase));
console.log("'ㅂㅌㅅ' 검색:", searchMusic("ㅂㅌㅅ", musicDatabase));
console.log("'butter' 검색:", searchMusic("butter", musicDatabase));

// 랭킹 검색 테스트
console.log("\n=== 랭킹 검색 테스트 ===");
console.log("'정국' 랭킹 검색:", searchWithRanking("정국", musicDatabase));
*/
