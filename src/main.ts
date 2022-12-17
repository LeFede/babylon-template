import './style.css'
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { CreateGround } from "@babylonjs/core/Meshes/Builders/groundBuilder";
import { CreateSphere } from "@babylonjs/core/Meshes/Builders/sphereBuilder";
import { Scene } from "@babylonjs/core/scene";

import { GridMaterial } from "@babylonjs/materials/grid/gridMaterial";

import { Pane } from "tweakpane";
const pane = new Pane()




const canvas = document.getElementById("app") as HTMLCanvasElement;
const engine = new Engine(canvas, true);

var scene = new Scene(engine);

var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
camera.setTarget(Vector3.Zero());
camera.attachControl(canvas, true);

var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
light.intensity = 0.7;

var material = new GridMaterial("grid", scene);

var sphere = CreateSphere("sphere1", { segments: 16, diameter: 2 }, scene);
sphere.position.y = 2;
sphere.material = material;

var ground = CreateGround("ground1", { width: 16, height: 6, subdivisions: 2 }, scene);

ground.material = material;

engine.runRenderLoop(() => {
  scene.render();
});

const PARAMS = {
  x: 0,
  y: 5,
  z: -10,
  lock: false,
};

const config = {min: -15, max: 15, step: .1}
pane.addInput(PARAMS, 'x', config).on('change', ({value}) => sphere.position.x = value)
pane.addInput(PARAMS, 'y', config).on('change', ({value}) => sphere.position.y = value)
pane.addInput(PARAMS, 'z', config).on('change', ({value}) => sphere.position.z = value)
pane.addButton({title: 'lock'}).on('click', () => {
  canvas.requestPointerLock = 
  canvas.requestPointerLock ||
  canvas.mozRequestPointerLock ||
  canvas.webkitRequestPointerLock

  canvas.requestPointerLock();
})

window.onresize = () => engine.resize()
