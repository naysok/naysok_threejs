var dev0 = document.getElementById("devMsg0");
var dev1 = document.getElementById("devMsg1");
var dev2 = document.getElementById("devMsg2");


var stats = initStats();
var sceneCount = 0;


function init() {


    // ---------- GUI ---------- //
    var controls = new function() {
        this.value = 0;
        this.stop = false;
        this.reset = function() { resetFrameCount(); }
    };

    var gui = new dat.GUI();

    gui.add(controls, "value", 0, 100, 1).onChange(printValue);
    gui.add(controls, "stop").onChange(updateScene);
    gui.add(controls, "reset").onChange(updateScene);
    // ---------- GUI ---------- //



    function printValue() {
        dev1.textContent = "Value : " + controls.value;
    }

    function resetFrameCount() {
        sceneCount = 0;
        dev0.textContent = "Frame Count : 0";

    }


    function updateScene() {

        if (controls.stop == false) {

            stats.update();

            requestAnimationFrame(updateScene);

            dev0.textContent = "Frame Count : " + sceneCount;
            sceneCount += 1;
        }
    };



    updateScene();

};


window.onload = init;