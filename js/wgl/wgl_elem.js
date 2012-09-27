/**
 * @author Fabrice
 *
 * Class d'automatisation de creation d'Object 3D
 */

/**
 * @author Fabrice
 */
(function() {

    this.WGL_Elem = (function ()
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
        function WGL_Elem (scene, x, y, width, height, color, texture, overdraw)
        {
            this.scene = scene;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color || null;
            this.texture = texture || null;
            this.overdraw = overdraw || true;
            
            this.threeElm = null;
            
        }
        
        return WGL_Elem;

    })();

}).call(this);