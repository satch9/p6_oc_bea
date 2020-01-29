export default class Tileset {
    constructor(url) {
        this.image = new Image();
        this.image.src =  '/tilesets/' + url;
    }

    dessinerTile(numero, context, xDestination, yDestination) {
               
        let xSourceEnTiles = numero % this.getLargeur();

        if (xSourceEnTiles == 0) xSourceEnTiles = this.getLargeur();

        let ySourceEnTiles = Math.ceil(numero / this.getLargeur());
        
        let xSource = (xSourceEnTiles - 1) * 32;
        let ySource = (ySourceEnTiles - 1) * 32;

        this.image.onload = () =>{
            context.drawImage(this.image, xSource, ySource, 32, 32, xDestination, yDestination, 32, 32);
        };

        context.drawImage(this.image, xSource, ySource, 32, 32, xDestination, yDestination, 32, 32);
    }

    getLargeur() {
        return this.image.width / 32;
    }
}

