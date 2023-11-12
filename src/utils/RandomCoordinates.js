
export function setCoord(maxw, maxh){
    const settingcoord = [];
    const gridSize = 60; // Taille de la grille

    // Imaginons que ces constantes représentent la taille maximale de l'espace
    let maxwidth = maxw;
    let maxheight = maxh;

    // Génère 6 paires de coordonnées non chevauchantes
    for (let i = 0; i < 6; i++) {
        const newCoordinates = generateNonOverlappingCoordinates(settingcoord, gridSize, maxwidth, maxheight);
        settingcoord.push(newCoordinates);
    }
    return settingcoord

}

// Fonction pour générer des coordonnées non chevauchantes
function generateNonOverlappingCoordinates(existingCoords, gridSize, maxwidth, maxheight) {
    const maxX = maxwidth - gridSize;
    const maxY = maxheight - gridSize;

    let newX, newY;

    // Génère de nouvelles coordonnées jusqu'à ce qu'elles ne se chevauchent pas
    do {
        // Calcule de nouvelles coordonnées basées sur une grille
        newX = Math.floor(Math.random() * maxX / gridSize) * gridSize;
        newY = Math.floor(Math.random() * maxY / gridSize) * gridSize;
        console.log(newX, newY);
    } while (existingCoords.some(coord => isTooClose(coord, { x: newX, y: newY }, gridSize)));

    return { x: newX, y: newY };
}

// Fonction pour vérifier si deux coordonnées sont trop proches
function isTooClose(coordA, coordB, minDistance) {
    const distanceX = Math.abs(coordA.x - coordB.x);
    const distanceY = Math.abs(coordA.y - coordB.y);

    // Vérifie si les coordonnées sont trop proches sur les axes X ou Y
    return distanceX < minDistance || distanceY < minDistance;
}
