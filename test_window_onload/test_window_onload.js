var dev = document.getElementById("dev");
var stats = initStats();
var sceneCount = 0;


function updateScene() {

    stats.update();

    requestAnimationFrame(updateScene);

    dev.textContent = sceneCount;
    sceneCount += 1;

};



function init() {

    updateScene();

};


window.onload = init;