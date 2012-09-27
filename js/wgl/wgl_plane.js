/**
 * @author Fabrice
 * 
 * Class d'automatisation de creation de Plane 3D
 */
(function() {

    this.WGL_Plane = (function ()
    {
        /**
         * @param {three scene object} scene
         * @param {int} x
         * @param {int} y
         * @param {int} width
         * @param {int} height
         * @param {hexadecimal} color
         * @param {THREE.MeshLambertMaterial} texture
         * @param {Boolean} overdraw
         */
        function WGL_Plane (scene, x, y, width, height, color, texture, overdraw)
        {
            // herite de WGL_Elem
            WGL_Elem.call(this, scene, x, y, width, height, (color || null), (texture || null), (overdraw || true));
            
            this.init();
        }
    
        /**
         * Initialise le plane
         */
        WGL_Plane.prototype.init = function ()
        {
            var _this = this, materials;
            
            if(this.color !== null) { // initialise couleur
                materials = new THREE.MeshBasicMaterial({
                    color: _this.color
                });
            }
            else if(this.texture !== null){ // initialise texture material
                materials = new THREE.MeshLambertMaterial({
                    map: THREE.ImageUtils.loadTexture(this.texture)
                });
            }
            
            this.threeElm = new THREE.Mesh(new THREE.PlaneGeometry(this.width, this.height), materials);
            
            this.threeElm.position.x = this.x;
            this.threeElm.position.y = this.y;
            
            this.threeElm.overdraw = this.overdraw;
            this.scene.add(this.threeElm);
        };
        
        return WGL_Plane;

    })();

}).call(this);
