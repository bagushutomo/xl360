/**
 * @class Scene Component class for manipulating 360 panorama.
 * @namespace XM.com
 * @requires JQuery
 * @requires XM
 * @requires THREE
 **/
(function($, com, THREE) {

  var cameraHi, cameraLo, sceneHi, sceneLo, rendererHi, rendererLo;
  var effect, controlsHi, controlsLo;
  var element, containerHi, containerLo;
  var textureHi, geometryHi, materialHi, meshHi;
  var textureLo, geometryLo, materialLo, meshLo;
  var widthHi, widthLo, heightHi, heightLo;
  var sceneIDHi, sceneIDLo;
  var clock = new THREE.Clock();


  /**
   * Set orientation control for mobile devices..
   */
  function setOrientationControls(e) {
    if (!e.alpha) {
      return;
    }

    controlsHi = new THREE.DeviceOrientationControls(cameraHi, true);
    controlsHi.connect();
    controlsHi.update();
    controlsLo = new THREE.DeviceOrientationControls(cameraLo, true);
    controlsLo.connect();
    controlsLo.update();

    // element.addEventListener('click', fullscreen, false);

    window.removeEventListener('deviceorientation', setOrientationControls, true);
  }


  function onWindowResize() {
    // widthHi = containerHi.offsetWidth;
    // heightHi = containerLo.offsetHeight;
    widthHi = window.innerWidth;
    heightHi = window.innerHeight;
    widthLo = window.innerWidth;
    heightLo = window.innerHeight;

    cameraHi.aspect = widthHi / heightHi;
    cameraHi.updateProjectionMatrix();
    cameraLo.aspect = widthLo / heightLo;
    cameraLo.updateProjectionMatrix();

    rendererHi.setSize(widthHi, heightHi);
    rendererLo.setSize(widthLo, heightLo);
  }

  function fullscreen() {
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen();
    } else if (container.mozRequestFullScreen) {
      container.mozRequestFullScreen();
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    }
  }

  function animate() {
      requestAnimationFrame( animate );

      update(clock.getDelta());
      render(clock.getDelta());
  }

  function update(dt) {
    onWindowResize();
    cameraHi.updateProjectionMatrix();
    controlsHi.update(dt);
    cameraLo.updateProjectionMatrix();
    controlsLo.update(dt);
  }
  function render(dt) {
    rendererHi.render(sceneHi, cameraHi);
    rendererLo.render(sceneLo, cameraLo);
  }


  com.Scene = {};
  XM.apply(com.Scene, {

    init: function(data) {

      sceneIDHi = data[0].id;
      sceneIDLo = data[1].id;

      textureHi = data[0].img;
      textureLo = data[1].img;

      containerHi = document.getElementById(sceneIDHi);
      containerLo = document.getElementById(sceneIDLo);

      // cameraHi = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
      cameraHi = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
      cameraHi.target = new THREE.Vector3( 0, 0, 0 );
      cameraLo = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
      cameraLo.target = new THREE.Vector3( 0, 0, 0 );

      geometryHi = new THREE.SphereGeometry( 500, 60, 40 );
      geometryHi.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );
      geometryLo = new THREE.SphereGeometry( 500, 60, 40 );
      geometryLo.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );

      materialHi = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture(textureHi)
      });
      materialLo = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture(textureLo)
      });

      meshHi = new THREE.Mesh( geometryHi, materialHi );
      meshLo = new THREE.Mesh( geometryLo, materialLo );

      sceneHi = new THREE.Scene();
      sceneHi.add( meshHi );
      sceneLo = new THREE.Scene();
      sceneLo.add( meshLo );

      rendererHi = new THREE.WebGLRenderer();
      rendererLo = new THREE.WebGLRenderer();
      rendererHi.setSize( window.innerWidth, window.innerHeight );
      rendererLo.setSize( window.innerWidth, window.innerHeight );

      containerLo.appendChild( rendererLo.domElement );
      containerHi.appendChild( rendererHi.domElement );

      // Listeners..
      window.addEventListener('resize', onWindowResize, false);
      window.addEventListener('deviceorientation', setOrientationControls, true);

      /*
      effect = new THREE.StereoEffect(renderer);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(90, 1, 0.001, 700);
      camera.position.set(0, 10, 0);
      scene.add(camera);

      controls = new THREE.OrbitControls(camera, element);
      controls.rotateUp(Math.PI / 4);
      controls.target.set(
        camera.position.x + 0.1,
        camera.position.y,
        camera.position.z
      );
      controls.noZoom = true;
      controls.noPan = true;

      var light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
      scene.add(light);
      
      texture = THREE.ImageUtils.loadTexture(texturePath);

      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat = new THREE.Vector2(50, 50);
      texture.anisotropy = renderer.getMaxAnisotropy();


      var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 20,
        shading: THREE.FlatShading,
        map: texture
      });

      var geometry = new THREE.PlaneGeometry(1000, 1000);

      var mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 2;
      scene.add(mesh);

      window.addEventListener('resize', resize, false);
      setTimeout(resize, 1);

      // window.addEventListener('deviceorientation', setOrientationControls, true);
      */
    },

    start: function(t) {
      animate();
    }
  });

})(jQuery, window.XM.com, THREE);