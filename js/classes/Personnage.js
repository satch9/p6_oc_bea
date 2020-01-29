const DIRECTION = {
    "BAS": 0,
    "GAUCHE": 1,
    "DROITE": 2,
    "HAUT": 3
}
const DUREE_ANIMATION = 4;
const DUREE_DEPLACEMENT = 15;

export default class Personnage {
    constructor(url, x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.image = new Image();
        this.image.src = 'personnages/' + url;
        this.etatAnimation = -1;
    }

    dessinerPersonnage(context) {
        let h = this.getHauteur();
        let l = this.getLargeur();

        let frame = 0; // Numéro de l'image à prendre pour l'animation
        let decalageX = 0,
            decalageY = 0; // Décalage à appliquer à la position du personnage
        if (this.etatAnimation >= DUREE_DEPLACEMENT) {
            // Si le déplacement a atteint ou dépassé le temps nécessaire pour s'effectuer, on le termine
            this.etatAnimation = -1;
        } else if (this.etatAnimation >= 0) {
            // On calcule l'image (frame) de l'animation à afficher
            frame = Math.floor(this.etatAnimation / DUREE_ANIMATION);
            if (frame > 3) {
                frame %= 4;
            }

            // Nombre de pixels restant à parcourir entre les deux cases
            let pixelsAParcourir = 32 - (32 * (this.etatAnimation / DUREE_DEPLACEMENT));

            // À partir de ce nombre, on définit le décalage en x et y.
            // NOTE : Si vous connaissez une manière plus élégante que ces quatre conditions, je suis preneur
            if (this.direction == DIRECTION.HAUT) {
                decalageY = pixelsAParcourir;
            } else if (this.direction == DIRECTION.BAS) {
                decalageY = -pixelsAParcourir;
            } else if (this.direction == DIRECTION.GAUCHE) {
                decalageX = pixelsAParcourir;
            } else if (this.direction == DIRECTION.DROITE) {
                decalageX = -pixelsAParcourir;
            }

            this.etatAnimation++;
        }
        /*
         * Si aucune des deux conditions n'est vraie, c'est qu'on est immobile, 
         * donc il nous suffit de garder les valeurs 0 pour les variables 
         * frame, decalageX et decalageY
         */

        // this.image.onload = function() {
        //     context.drawImage(
        //         this.image, 
        //         0, 
        //         this.direction * h, // Point d'origine du rectangle source à prendre dans notre image
        //         l, 
        //         h, // Taille du rectangle source (c'est la taille du personnage)
        //         (this.x * 32) - (l / 2) + 16, 
        //         (this.y * 32) - h + 24, // Point de destination (dépend de la taille du personnage)
        //         l, 
        //         h // Taille du rectangle destination (c'est la taille du personnage)
        //     );
        // };
        context.drawImage(
            this.image,
            l * frame,
            this.direction * h, // Point d'origine du rectangle source à prendre dans notre image
            l,
            h, // Taille du rectangle source (c'est la taille du personnage)
            (this.x * 32) - (l / 2) + 16 + decalageX,
            (this.y * 32) - h + 24 + decalageY, // Point de destination (dépend de la taille du personnage)
            l,
            h // Taille du rectangle destination (c'est la taille du personnage)
        );
    }

    getHauteur() {
        return this.image.height / 4;
    }
    getLargeur() {
        return this.image.width / 4;
    }

    getCoordonneesAdjacentes(direction) {
        let coord = {
            'x': this.x,
            'y': this.y
        };
        switch (direction) {
            case DIRECTION.BAS:
                coord.y++;
                break;
            case DIRECTION.GAUCHE:
                coord.x--;
                break;
            case DIRECTION.DROITE:
                coord.x++;
                break;
            case DIRECTION.HAUT:
                coord.y--;
                break;
        }
        return coord;
    }

    deplacer(direction, map) {
        // On ne peut pas se déplacer si un mouvement est déjà en cours !
        if (this.etatAnimation >= 0) {
            return false;
        }

        // On change la direction du personnage
        this.direction = direction;

        // On commence l'animation
        this.etatAnimation = 1;

        // On vérifie que la case demandée est bien située dans la carte
        var prochaineCase = this.getCoordonneesAdjacentes(direction);
        if (prochaineCase.x < 0 || prochaineCase.y < 0 || prochaineCase.x >= map.getMapLargeur() || prochaineCase.y >= map.getMapHauteur()) {
            // On retourne un booléen indiquant que le déplacement ne s'est pas fait, 
            // Ça ne coute pas cher et ca peut toujours servir
            return false;
        }

        // On effectue le déplacement
        this.x = prochaineCase.x;
        this.y = prochaineCase.y;

        return true;
    }
}