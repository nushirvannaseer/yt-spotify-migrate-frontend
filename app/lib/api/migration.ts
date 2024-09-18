const migratePlaylist = async (playlistId: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/spotify/migrate-spotify-playlist?playlistId=${playlistId}`, {
            method: 'GET',
            credentials: 'include',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export {
    migratePlaylist
}