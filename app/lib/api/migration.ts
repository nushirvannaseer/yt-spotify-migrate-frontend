const migratePlaylist = async (playlistId: string) => {
    try {
        const response = await fetch(`http://localhost:8888/migrate-spotify-playlist?playlistId=${playlistId}`, {
            method: 'GET',
            credentials: 'include',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export {
    migratePlaylist
}