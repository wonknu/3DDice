/**
 * @author Fabrice
 * 
 * Class de gestion des evenements sourie avec action sur le mouvement en mouse down
 */
(function() {

    this.MouseManager = (function()
    {
        /**
         * 
         */
        function MouseManager()
        {
            this.targetRotation = null;
            this.targetRotationOnMouseDown = null;
            this.mouseX = null;
            this.mouseXOnMouseDown = null;
            this.isMoving = false;
        }
        
        /**
         * initialise listener d'event mouse down
         */
        MouseManager.prototype.init = function()
        {
            var _this = this;
            document.addEventListener( 'mousedown', function(e){ _this.onDocumentMouseDown(e); }, false );
        };
        
        MouseManager.prototype.onDocumentMouseDown = function(e)
        {
            this.isMoving = true;
            var _this = this;
            e.preventDefault();
            document.addEventListener( 'mousemove', function(e){ _this.onDocumentMouseMove(e); }, false );
            document.addEventListener( 'mouseup', function(e){ _this.onDocumentMouseUp(e); }, false );
            document.addEventListener( 'mouseout', function(e){ _this.onDocumentMouseOut(e); }, false );
            this.mouseXOnMouseDown = e.clientX - (window.innerWidth * .5);
            this.targetRotationOnMouseDown = this.targetRotation;
        };
        
        /**
         * event mouse move
         */
        MouseManager.prototype.onDocumentMouseMove = function(e)
        {
            this.mouseX = e.clientX - (window.innerWidth * .5);
            this.targetRotation = this.targetRotationOnMouseDown + ( this.mouseX - this.mouseXOnMouseDown ) * 0.02;
        };
    
        /**
         * event mouse up
         */
        MouseManager.prototype.onDocumentMouseUp = function(e)
        {
            this.removeListener(e);
        };
    
        /**
         * event mouse out
         */
        MouseManager.prototype.onDocumentMouseOut = function(e)
        {
            this.removeListener(e);
        };
        
        /**
         * remove listener mousemove, mouseup, mouseout
         * @param {Object} e
         */
        MouseManager.prototype.removeListener = function(e)
        {
            this.isMoving = false;
            var _this = this;
            document.removeEventListener( 'mousemove', function(e){ _this.onDocumentMouseMove(e); }, false );
            document.removeEventListener( 'mouseup', function(e){ _this.onDocumentMouseUp(e); }, false );
            document.removeEventListener( 'mouseout', function(e){ _this.onDocumentMouseOut(e); }, false );
        };
        
        return MouseManager;

    })();

}).call(this);
