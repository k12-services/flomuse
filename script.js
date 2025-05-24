document.addEventListener('DOMContentLoaded', async () => {
    const musicProjectsContainer = document.getElementById('music-projects-container');

    // Annahme: Die Projektordnernamen sind bekannt oder können serverseitig gelistet werden.
    // Für eine statische Website musst du diese manuell pflegen.
    // Wenn du einen Backend-Server hast, könnte dieser eine API bereitstellen,
    // die die Projektordner auflistet.
    const projectFolders = ['Projektname1', 'Projektname2', 'Projektname3']; // Passe dies an deine Ordner an

    for (const folderName of projectFolders) {
        try {
            // Pfade zu den Dateien im Projektordner
            const audioPath = `Musik/${folderName}/audio.mp3`; // Annahme: audio.mp3, passe den Typ an
            const namePath = `Musik/${folderName}/name.txt`;
            const descriptionPath = `Musik/${folderName}/beschreibung.txt`;

            // Lade Name und Beschreibung
            const nameResponse = await fetch(namePath);
            const projectName = nameResponse.ok ? await nameResponse.text() : 'Unbekanntes Projekt';

            const descriptionResponse = await fetch(descriptionPath);
            const projectDescription = descriptionResponse.ok ? await descriptionResponse.text() : 'Keine Beschreibung vorhanden.';

            // Erstelle das HTML-Element für das Musikprojekt
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('music-project');

            projectDiv.innerHTML = `
                <h2>${projectName.trim()}</h2>
                <p>${projectDescription.trim()}</p>
                <audio controls>
                    <source src="${audioPath}" type="audio/mpeg">
                    Dein Browser unterstützt das Audio-Element nicht.
                </audio>
            `;
            musicProjectsContainer.appendChild(projectDiv);

        } catch (error) {
            console.error(`Fehler beim Laden von Projekt ${folderName}:`, error);
            // Optional: Zeige eine Fehlermeldung auf der Seite an
            const errorDiv = document.createElement('div');
            errorDiv.classList.add('music-project', 'error');
            errorDiv.innerHTML = `<h2>Fehler beim Laden von '${folderName}'</h2><p>Dieses Projekt konnte nicht geladen werden.</p>`;
            musicProjectsContainer.appendChild(errorDiv);
        }
    }
});
