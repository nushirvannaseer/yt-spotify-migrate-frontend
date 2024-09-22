// Thumbnail object for a playlist
export interface YouTubeThumbnail {
  url: string;
  height: number;
  width: number;
}

// Author of the playlist
export interface YouTubeAuthor {
  name: string; // Assuming author has a name; you can add more fields if needed
}

// Single playlist item
export interface YouTubePlaylistItem {
  description: string;
  playlistId: string;
  thumbnails: YouTubeThumbnail[];
  title: string;
  author?: YouTubeAuthor[]; // Optional, since some entries don't have 'author'
  count?: string; // Optional, since some entries don't have 'count'
}

export interface YouTubeSong {
  id: string;
  title: string;
  artist: string;
  album: string;
  image: string;
  url: string;
}

export interface YouTubePlaylistSongsResponse {
  playlist_name: string;
  songs: YouTubeSong[];
}
