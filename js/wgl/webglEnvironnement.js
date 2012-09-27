/**
 * @author Fabrice
 *
 * pattern : Singleton
 * Objet d'instance unique dans un projet (pas de doublon possible)
 */
var WEBGL_Environnement = ( function()
{
    // private var
    _options = {};
    _three = null;
    _callBackAnimate = null;
    _instance = undefined; // only instance of the Singleton object

    function setup ()
    {
        var angularSpeed = _options.angularSpeed,
            lastTime = 0, // revolutions per second
            renderer = new THREE.WebGLRenderer();
        
        renderer.setSize(_options.rendererWidth, _options.rendererHeight);
        document.body.appendChild(renderer.domElement);
        
        // camera
        var camera = new THREE.PerspectiveCamera(
            _options.fieldOfView,
            _options.cameraW / _options.cameraH,
            _options.cameraNear,
            _options.cameraFar
        );
        
        camera.rotation.x = _options.cameraX; camera.position.y = _options.cameraY; camera.position.z = _options.cameraZ; // camera x, y, z
        
        var scene = new THREE.Scene(); // scene
        
        _three = { // create wrapper object that contains three.js objects
            renderer: renderer,
            camera  : camera,
            scene   : scene
        };
        
        _callBackAnimate(lastTime, _options.angularSpeed, _three);
    };
    /**
     * constructor du singleton
     * @param {Object} options,
     *      - angularSpeed
     *      - rendererWidth
     *      - rendererHeight
     *      - fieldOfView
     *      - cameraX
     *      - cameraY
     *      - cameraZ
     *      - cameraW
     *      - cameraH
     *      - cameraNear
     *      - cameraFar
     * @param {function} callBack, appeler quand la scene est prete a etre rendered (meme fonction que celle qui servira au loop de l'animation frame par frame)
     */
    function Singleton (options, callBack)
    {
        _callBackAnimate = callBack;
        options = options || {};
        // environnement setting
        _options.angularSpeed = options.angularSpeed || 0.2;
        _options.rendererWidth = options.rendererWidth || window.innerWidth;
        _options.rendererHeight = options.rendererHeight || window.innerHeight;
        // camera setting
        _options.fieldOfView = options.fieldOfView || 45;
        _options.cameraX = options.cameraX || 0;
        _options.cameraY = options.cameraY || 0;
        _options.cameraZ = options.cameraZ || 900;
        _options.cameraW = options.cameraW || _options.rendererWidth;
        _options.cameraH = options.cameraH || _options.rendererHeight;
        _options.cameraNear = options.cameraNear || 1;
        _options.cameraFar = options.cameraFar || 1500;
        
        setup();
        
        // Singleton public var and methods
        return {
            getOptions : function() {
                return _options;
            },
            getThree : function() {
                return _three;
            },
            setup : setup
        };
    }

    var _static = {
        name : "webglEnvironnement",
        /**
         * Only way to get the only instance of the singleton object
         * @param {Object} options
         * @param {Object} callBack
         */
        getInstance : function(options, callBack)
        {
            if (_instance === undefined) _instance = new Singleton(options, callBack);
            return _instance;
        }
    };
    return _static;

})(); 