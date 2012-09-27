/**
 * @author Fabrice
 * 
 * Class d'automatisation de creation de Cube 3D
 */
(function() {

    this.WGL_Cube = (function()
    {
        /**
         * @param {three scene object} scene
         * @param {int} x
         * @param {int} y
         * @param {int} width
         * @param {int} height
         * @param {int} depth
         * @param {Array.<hexadecimal>} color
         * @param {String} texture
         * @param {Boolean} overdraw
         */
        function WGL_Cube (scene, x, y, width, height, depth, color, texture, overdraw)
        {
            this.depth = depth;
            // herite de WGL_Elem
            WGL_Elem.call(this, scene, x, y, width, height, (color || null), (texture || null), (overdraw || true));
            
            this.init();
        }
    
        /**
         * Initialise le cube
         */
        WGL_Cube.prototype.init = function ()
        {
            var _this = this, materials, i, j;
            if(this.color !== null) {
                materials = [];
                for(i = 0, j = this.color.length; i < j; i++)
                    materials.push([new THREE.MeshBasicMaterial({ color: _this.color[i] })]);
            }
            else if(this.texture !== null){
                if (this.texture instanceof Array) { // si il y a un tableau contenant touts les materiaux de toutes les face du cube
                    materials = [];
                    for (i = 0, j = this.texture.length; i < j; i++) {
                        var img = new Image();
                        img.src = this.texture[i];
                        img.tex = new THREE.Texture(img);
                        img.onload = function() { this.tex.needsUpdate = true; };
                        materials.push( new THREE.MeshBasicMaterial({color: 0xffffff, map: img.tex}) );
                    }
                } else { // si on a passer un simple string (toutes les faces on la meme texture)
                    materials = new THREE.MeshLambertMaterial({
                        map: THREE.ImageUtils.loadTexture(this.texture)
                    });
                }
            }
            
            this.threeElm = new THREE.Mesh(new THREE.CubeGeometry(this.width, this.height, this.depth, 1, 1, 1, materials), new THREE.MeshFaceMaterial());
            
            this.threeElm.position.x = this.x;
            this.threeElm.position.y = this.y;
            this.threeElm.overdraw = this.overdraw;
            this.scene.add(this.threeElm);
        };
        
        return WGL_Cube;

    })();

}).call(this);
