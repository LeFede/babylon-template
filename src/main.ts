import './style.css'
import * as BABYLON from "@babylonjs/core"
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

var camera = new FreeCamera("camera1", new Vector3(0, 0,-10), scene);
camera.setTarget(new BABYLON.Vector3(0,0,0));

camera.attachControl(canvas, true);
camera.position.x = 0

var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
light.intensity = .7;
var light2 = new BABYLON.PointLight('pointlight', new BABYLON.Vector3(0,2,0), scene)
light2.intensity = .1

const axes = new BABYLON.AxesViewer(scene, 1)

// var material = new GridMaterial("grid", scene);
const material = new BABYLON.StandardMaterial('material1', scene)
material.diffuseColor = new BABYLON.Color3(255, 1, 223)
// material.emissiveColor = new BABYLON.Color3(0,0,255)
// material.ambientColor = new BABYLON.Color3(255,0,0)
// material.specularColor = new BABYLON.Color3(255,0,0)


var sphere = CreateSphere("sphere1", { segments: 1, diameter: 2 }, scene);
sphere.position.y = 0;

// sphere.material = material;
sphere.scaling.z = .3

const box = BABYLON.MeshBuilder.CreateBox('box1', {
  size: 1,
},scene)
box.position.x = -4
box.material = material

const plane = BABYLON.MeshBuilder.CreatePlane('plane1', {
}, scene)
plane.position.x = 3

const points = [
  new BABYLON.Vector3(3,2,0),
  new BABYLON.Vector3(3,3,0),
  new BABYLON.Vector3(4,3,0),
]
const lines = BABYLON.MeshBuilder.CreateLines('lines1',{
  points
}, scene)

// var ground = CreateGround("ground1", { width: 16, height: 6, subdivisions: 2 }, scene);
// ground.material = material;




let step = 0
let speed = .001

engine.runRenderLoop(() => {
  scene.render();
  step += engine.getDeltaTime() * speed

  console.log(step)
  box.position.y = 3 * Math.sin(step)

  plane.rotation.z += .01
  sphere.rotation.z = sphere.rotation.x += .01

  // axes.update(new Vector3(0,0,0), 0, 0, box.position)

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
