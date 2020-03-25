var dev = document.getElementById("dev");
var stats = initStats();
var step = 0;



function init() {


    // ---------- Render Env ---------- //
    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // cretate renderer
    let renderer = new THREE.WebGLRenderer({
        antialias: true
    }); //  アンチエイリアスの設定

    renderer.setClearColor(new THREE.Color(0xEEEEFF)); // set background-color
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // 影を有効化

    // show origin
    scene.add(new THREE.AxesHelper(20));
    // ---------- Render Env ---------- //



    // ---------- Geometry ---------- //
    // create plane
    // THREE.MeshLambertMaterial : 高原を計算できるマテリアル
    var planeGeometry = new THREE.PlaneGeometry(60, 20);
    var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xcccccc
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.receiveShadow = true; // 影を落とされる設定
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    scene.add(plane);


    // create box
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xff0000
    }); // red, wirefreme
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.castShadow = true; // 影を落とす設定

    // set position
    cube.position.x = -8;
    cube.position.y = 2;
    cube.position.z = 0;

    scene.add(cube);

    // create box 2
    var cubeGeometryMini = new THREE.BoxGeometry(2, 2, 5);
    var cubeMaterialMini = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true
    }); // green // defalt : wireframe:true
    var cubeMini = new THREE.Mesh(cubeGeometryMini, cubeMaterialMini);
    cubeMini.position.x = 0;
    cubeMini.position.y = 15; // y が上の座標系
    cubeMini.position.z = 0;
    scene.add(cubeMini);

    // create box 3
    var cubeGeometryMini2 = new THREE.BoxGeometry(2, 2, 5);
    var cubeMaterialMini2 = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    }); // green // defalt : wireframe:true
    var cubeMini2 = new THREE.Mesh(cubeGeometryMini2, cubeMaterialMini2);
    cubeMini2.position.x = 0;
    cubeMini2.position.y = 10; // y が上の座標系
    cubeMini2.position.z = 0;
    scene.add(cubeMini2);

    // create box 3
    var cubeGeometryMini3 = new THREE.BoxGeometry(2, 2, 5);
    var cubeMaterialMini3 = new THREE.MeshLambertMaterial({
        color: 0x00ff00
    }); // green // defalt : wireframe:true
    var cubeMini3 = new THREE.Mesh(cubeGeometryMini3, cubeMaterialMini3);
    cubeMini3.position.x = 0;
    cubeMini3.position.y = 5; // y が上の座標系
    cubeMini3.position.z = 0;
    cubeMini3.castShadow = true; // 影を落とす設定
    scene.add(cubeMini3);



    // create sphere
    var sphereGeometry = new THREE.SphereGeometry(4, 20, 10); // THREE.SphereGeometry(radius, widthSegments, heightSegments);
    var sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0x0000ff
    }); // blue
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    sphere.castShadow = true; // 影を落とす設定

    // set position
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 0;

    scene.add(sphere);

    // create sphere 2
    var sphereGeometryMini = new THREE.SphereGeometry(4, 8, 8);
    var sphereMaterialMini = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
    }); // white
    var sphereMini = new THREE.Mesh(sphereGeometryMini, sphereMaterialMini);
    sphereMini.position.x = 10;
    sphereMini.position.y = 0;
    scene.add(sphereMini);
    // ---------- Geometry ---------- //



    // ---------- Camera ---------- //
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    // camera
    camera.lookAt(scene.position);
    // ---------- Camera ---------- //



    // ---------- Spot Light ---------- //
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-20, 30, -5);
    spotLight.castShadow = true;
    scene.add(spotLight);
    // ---------- Spot Light ---------- //



    // ---------- GUI ---------- //
    var controls = new function() {
        this.rotationSpeedX = 0.02;
        this.rotationSpeedY = 0.03;
        this.bouncingSpeed = 0.03;
    };

    var gui = new dat.GUI();
    gui.add(controls, "rotationSpeedX", 0, 0.5);
    gui.add(controls, "rotationSpeedY", 0, 0.5);
    gui.add(controls, "bouncingSpeed", 0, 0.5);
    // ---------- GUI ---------- //




    // ---------- UPDATE ---------- //
    function updateScene() {

        stats.update();

        cube.rotation.x += controls.rotationSpeedX;
        cube.rotation.y += controls.rotationSpeedY;
        cubeMini3.rotation.y += 0.01;
        sphereMini.rotation.y -= 0.02;

        // // bounce sphere up to down
        step += controls.bouncingSpeed;
        sphere.position.x = 20 + (10 * (Math.cos(step)));
        sphere.position.y = 2 + (10 * (Math.abs(Math.sin(step))));

        // // requestAnimationFrame
        // // update scene
        requestAnimationFrame(updateScene);
        renderer.render(scene, camera);

    };
    // ---------- UPDATE ---------- //






    // add output of the renderer to html object
    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    // renderer
    updateScene();

};




window.onload = init;