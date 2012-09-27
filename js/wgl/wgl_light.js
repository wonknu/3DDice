/**
 * @author Fabrice
 */
(function() {

    this.WGL_Light = (function()
    {
        /**
         * @param {Object} scene
         */
        function WGL_Light (scene)
        {
            this.scene = scene;
        }
    
        /**
         * ajout ambient light
         * @param {hexadecimal} color
         */
        WGL_Light.prototype.ambientLight = function (color)
        {
            // add subtle ambient lighting
            var ambientLight = new THREE.AmbientLight(color);
            this.scene.add(ambientLight);
        };
        
        /**
         * ajout direction light
         * @param {hexadecimal} color
         * @param {int} position x
         * @param {int} position y
         * @param {int} position z
         */
        WGL_Light.prototype.directionalLight = function (color, _x, _y, _z)
        {
            var x = _x || 1, y = _y || 1, z = _z || 1;
            
            // add directional light source
            var directionalLight = new THREE.DirectionalLight(color);
            directionalLight.position.set(x, y, z).normalize();
            this.scene.add(directionalLight);
        };
        
        return WGL_Light;

    })();

}).call(this);
