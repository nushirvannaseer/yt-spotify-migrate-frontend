// Interface for User Information
export interface CurrentUser {
    id: string;
    image: string;
    name: string;
  }
  
  // Interface for Token Information (common properties for both Google and Spotify)
  export interface TokenInfo {
    access_token: string;
    expires_at: number;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
  }
  
  // Root interface for the combined object
  export interface UserSession {
    current_user: CurrentUser;
    google_token_info: TokenInfo;
    spotify_token_info: TokenInfo;
  }
  