/**
 * Function qui fait appel au renderer de three.js a chaque frame
 * @param {Object} lastTime, exemple d'utilisation pour le calcul de la rotation
 * @param {Object} angularSpeed, angle de rotation
 * @param {Object} three, three properties container
 */
function animate(lastTime, angularSpeed, three)
{
    // update
    var date = new Date(), time = date.getTime(), timeDiff = time - lastTime, angleChange = angularSpeed * timeDiff * 2 * Math.PI / 1000, i, j;
    
    lastTime = time;
    TWEEN.update();
    /*
    if(!window.mouseObj.isMoving) window.mouseObj.targetRotation *= .8;
    
    if(window.mouseObj.targetRotation < .5 && window.mouseObj.targetRotation > -.5) window.mouseObj.targetRotation = 0;
    else {
        for(i = 0, j = window.threeElements.length; i < j; i++) window.threeElements[i].threeElm.rotation.y += window.mouseObj.targetRotation * .1;
    }
    */
    // render
    three.renderer.render(three.scene, three.camera);
    
    // request new frame
    requestAnimationFrame(function ()
    {
        animate(lastTime, angularSpeed, three);
    });
}
/**
 * appel la function d'anim de tween et sert de
 * callback a cette fonction pour enchainer les
 * animation successivement
 * @param objPosition, angle de rotation (x, y, z)
 */
function launchTweenAnimation (objPosition)
{
    objPosition = objPosition || null;
    if(objPosition === null) tweenAnimation(window.arrToAnimate[0], launchTweenAnimation);
    else {
        var index = window.arrToAnimate.indexOf(objPosition) + 1;
        if(index < window.arrToAnimate.length) tweenAnimation(window.arrToAnimate[index], launchTweenAnimation);
        else {
            angleFrom.angle = angleTo.angle;
            isRendering = false;
        }
    }
}

var angleFrom = { angle : 0 },
angleTo = { angle : 0 },
isRendering = false;
/**
 * animation de tween sur la rotation d'un object three
 * @param objPosition, angle de rotation (x, y, z)
 * @param callBack, function de rappel une fois l'anim fini
 */
function tweenAnimation (objPosition, callBack)
{
    var randomnumber = Math.floor(Math.random()*7),
        coef = 0;
    callBack = callBack || null;
    
    angleTo.angle = (randomnumber * 90) * 2;
    tween = new TWEEN.Tween(angleFrom).to(angleTo, 1000)
    .onUpdate(function() {
        
        var difference = Math.abs(angleFrom.angle - angleTo.angle);
        //window.threeElements[0].threeElm.rotation.z = window.threeElements[0].threeElm.rotation.y = window.threeElements[0].threeElm.rotation.x = ((angleTo.angle - difference) * (Math.PI / 180));
        
        window.threeElements[0].threeElm.rotation[objPosition] = ((angleTo.angle - difference) * (Math.PI / 180));
        //window.threeElements[0].threeElm.rotation.x -= difference * (Math.PI / 180);
        //var scale = Math.cos(window.threeElements[0].threeElm.scale.x * 1.01);
        //var scale = Math.cos(window.threeElements[0].threeElm.scale.x * 1.01);
        //window.threeElements[0].threeElm.scale.set(scale,scale,scale);
        //console.log(Math.cos( coef ) * 60);
        coef+=0.1;
        var scale = -(Math.cos( coef ) * 180);
        window.threeElements[0].threeElm.position.z = scale;
        
        //window.threeElements[0].threeElm.rotation.z = (Math.cos( coef ) * 60) / 10;
        //window.threeElements[0].threeElm.scale.set(scale,scale,scale);
        
    })
    .onComplete(function() {
        if(callBack !== null && callBack !== undefined) callBack(objPosition);
    })
    .start();

}
/**
 * shuffle an array
 * @param {Array} v
 */
shuffle = function (v)
{
    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
};

window.onload = function ()
{
    // gestion des actions souris
    window.mouseObj = new MouseManager();
    window.mouseObj.init();
    
    // creation du world
    // et ajout d'element 3D
    window.threeElements = [];
    window.WGL = WEBGL_Environnement.getInstance({}, animate);
    window.threeElements.push(
        new WGL_Cube(
            window.WGL.getThree().scene,
            0,
            0,
            200,
            200,
            200,
            null,
            [
                window.location + 'img/_2.jpg', // Left side
                window.location + 'img/_5.jpg', // Right side
                window.location + 'img/_4.jpg', // Top side
                window.location + 'img/_3.jpg', // Bottom side
                window.location + 'img/_1.jpg', // Front side
                window.location + 'img/_6.jpg'  // Back side
            ],
            true
        )
    );
    //window.threeElements.push(new WGL_Cube(window.WGL.getThree().scene, 0, 0, 200, 200, 200, null, window.location + 'img/crate.jpg', true));    //window.threeElements.push( new WGL_Plane(WGL.getThree().scene, 0, 0, 200, 200, 0x0000ff, null, true) );
    //window.threeElements.push(new WGL_Sphere(window.WGL.getThree().scene, 0, 0, 200, 50, 50, 0x666666));
    var floor = new WGL_Plane(WGL.getThree().scene, 0, 0, 2000, 2000, 0x0000ff, null, true);
    floor.threeElm.doubleSided = true;
    //floor.threeElm.rotation.x = 90;
    floor.threeElm.position.z = -250;
    
    window.WGL.getThree().camera.rotation.x = (15 * (Math.PI / 180));
    window.WGL.getThree().camera.position.y = -500;
    
    // Ajout de lumieres
    var wglLight = new WGL_Light(window.WGL.getThree().scene);
    wglLight.ambientLight(0x555555);
    wglLight.directionalLight(0xFFFFFF);
    
    var projector = new THREE.Projector();
    function onDocumentMouseDown( e ) {
        if(isRendering === true) return;
        isRendering = true;
        window.arrToAnimate = ['z', 'y', 'x'];
        shuffle(window.arrToAnimate);
        launchTweenAnimation();
    }
    document.addEventListener( 'mousedown', function(e){ onDocumentMouseDown(e); }, false );
    
};