define(['three', '../core/scene'], function (THREE, scene) {
    var d                    = 300,
        hemiLight            = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6),
        dirLight             = new THREE.DirectionalLight(0xffffff, 2);

    hemiLight.color.setHSL(0.6, 0.75, 0.5);
    hemiLight.groundColor.setHSL(0.095, 0.5, 0.5);
    hemiLight.position.set(0, 200, 0);
    hemiLight.name = 'Hemisphere light';

    dirLight.position.set(-1, 0.75, 1);
    dirLight.position.multiplyScalar(50);
    dirLight.name  = "Directional light";

    dirLight.castShadow     = true;
    dirLight.shadowMapWidth = dirLight.shadowMapHeight = 1024 * 2;
    dirLight.shadowCameraTop    = d;
    dirLight.shadowCameraRight  = d;
    dirLight.shadowCameraLeft   = -d;
    dirLight.shadowCameraBottom = -d;
    dirLight.shadowCameraFar = 1000;
    dirLight.shadowBias      = -0.0001;
    dirLight.shadowDarkness  = 0.35;

    scene.add(hemiLight);
    scene.add(dirLight);
});