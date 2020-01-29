import Tileset from './Tileset.js';

export default class Map {
    constructor(nom) {
        this.nom = nom;
        this.xhr = this.getXMLHttpRequest();
        // Chargement du fichier
        this.xhr.open("GET", './maps/' + nom + '.json', false);
        this.xhr.send(null);
        if (this.xhr.readyState != 4 || (this.xhr.status != 200 && this.xhr.status != 0)) // Code == 0 en local
            throw new Error("Impossible de charger la carte nommée \"" + nom + "\" (code HTTP : " + this.xhr.status + ").");
        let mapJsonData = this.xhr.responseText;
        // Analyse des données
        this.mapData = JSON.parse(mapJsonData);
        this.tileset = new Tileset(this.mapData.tileset);
        this.terrain = this.mapData.terrain;
        // Liste des personnages présents sur le terrain.
        this.personnages = new Array();
    }


    getXMLHttpRequest() {
        let xhr = null;

        if (window.XMLHttpRequest || window.ActiveXObject) {
            if (window.ActiveXObject) {
                try {
                    xhr = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }
            } else {
                xhr = new XMLHttpRequest();
            }
        } else {
            alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
            return null;
        }

        return xhr;
    }

    dessinerMap(context) {
        for (let i = 0, l = this.terrain.length; i < l; i++) {
            let ligne = this.terrain[i];
            let y = i * 32;
            for (let j = 0, k = ligne.length; j < k; j++) {
                this.tileset.dessinerTile(ligne[j], context, j * 32, y);
            }
        }
        // Dessin des personnages
        
        for (let i = 0, l = this.personnages.length; i < l; i++) {
            this.personnages[i].dessinerPersonnage(context);
        }
    }

    getMapLargeur() {
        return this.terrain[0].length;
    }

    getMapHauteur() {
        return this.terrain.length;
    }

    addPersonnage(perso) {
        this.personnages.push(perso);
    }

    
}