// External URLs for Spotify
export interface SpotifyExternalUrls {
  spotify: string;
}

// Owner of the playlist
export interface SpotifyOwner {
  display_name: string;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

// Image object
export interface SpotifyImage {
  url: string;
  height?: number;
  width?: number;
}

// Tracks object
export interface SpotifyTracks {
  href: string;
  total: number;
}

// Single playlist item
export interface SpotifyPlaylistItem {
  collaborative: boolean;
  description: string;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  owner: SpotifyOwner;
  primary_color: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: SpotifyTracks;
  type: string;
  uri: string;
}

// Root object of the playlist response
export interface SpotifyPlaylistResponse {
  href: string;
  items: SpotifyPlaylistItem[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface SpotifySong {
  id: string;
  name: string;
  artist: string;
  album: string;
  image: string;
}

export interface SpotifyPlaylistSongsResponse {
  playlist_name: string;
  songs: SpotifySong[];
}
