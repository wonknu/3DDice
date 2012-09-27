/**
 * @author Fabrice
 * 
 * Class d'automatisation de creation de Sphere 3D
 */
(function() {

    this.WGL_Sphere = (function()
    {
        /**
         * @param {three scene object} scene
         * @param {int} x
         * @param {int} y
         * @param {int} radius
         * @param {int} segmentsWidth
         * @param {int} segmentsHeight
         * @param {Array.<hexadecimal>} color
         * @param {String} texture
         * @param {Boolean} overdraw
         */
        function WGL_Sphere (scene, x, y, radius, segmentsWidth, segmentsHeight, color, texture, overdraw)
        {
            this.segmentsWidth = segmentsWidth;
            this.segmentsHeight = segmentsHeight;
            // herite de WGL_Elem
            WGL_Elem.call(this, scene, x, y, radius, 0, (color || null), (texture || null), (overdraw || true));
            
            this.init();
        }
    
        /**
         * Initialise le cube
         */
        WGL_Sphere.prototype.init = function ()
        {
            var _this = this;
            // sphere
            this.threeElm = new THREE.Mesh(new THREE.SphereGeometry(this.width, this.segmentsWidth, this.segmentsHeight), new THREE.MeshLambertMaterial({
              color: _this.color
            }));
            this.threeElm.overdraw = this.overdraw;
            this.scene.add(this.threeElm);
        };
        
        return WGL_Sphere;

    })();

}).call(this);
