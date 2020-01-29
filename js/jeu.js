import Map from './classes/Map.js';
import Personnage from './classes/Personnage.js';

const DIRECTION = {
    "BAS": 0,
    "GAUCHE": 1,
    "DROITE": 2,
    "HAUT": 3
}

//let ts = new Tileset('basique.png');
const map = new Map('premiere');
let joueur = new Personnage("hero.png", 7, 14, DIRECTION.BAS);
map.addPersonnage(joueur);

window.onload = () => {

    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const CANVAS_WIDTH = map.getMapLargeur() * 32;
    const CANVAS_HEIGHT = map.getMapHauteur() * 32;

    /*ts.dessinerTile(1, context, 10, 10);
    ts.dessinerTile(1, context, 20, 10);*/

    setInterval(function(){
        map.dessinerMap(context);
    },40);
   

    // Gestion du clavier
    window.onkeydown = function (event) {
        event.preventDefault();
        let e = event || window.event;
        let key = e.which || e.keyCode;
        
        switch (key) {
            case 38:
            case 122:
            case 119:
            case 90:
            case 87: // Flèche haut, z, w, Z, W
                joueur.deplacer(DIRECTION.HAUT, map);
                break;
            case 40:
            case 115:
            case 83: // Flèche bas, s, S
                joueur.deplacer(DIRECTION.BAS, map);
                break;
            case 37:
            case 113:
            case 97:
            case 81:
            case 65: // Flèche gauche, q, a, Q, A
                joueur.deplacer(DIRECTION.GAUCHE, map);
                break;
            case 39:
            case 100:
            case 68: // Flèche droite, d, D
                joueur.deplacer(DIRECTION.DROITE, map);
                break;
            default:
                //alert(key);
                // Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
                return true;
        }

    }
};