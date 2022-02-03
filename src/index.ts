import { flow } from 'fp-ts/lib/function';
import { setupCanvas } from '../lib/canvas-util';
import { drawDisc, pathPolygon, pathPolyline } from '../lib/ctx-util';
import { identity, multiplyMatrix, rotation } from '../lib/mat3x3';
import { Transform, transformPoint } from '../lib/transform';
import { Vector2, Vector3, Morphism, Matrix3 } from '../lib/types';
import { add, cross, divide, magnitude, multiply, sqrdMagnitude, subtract } from '../lib/vec3';
import { dot, normalize, signedAngle } from '../lib/vec2';
import { OrbitCamera, toRegularCamera } from './camera/orbit-camera';
import { PerspectiveCamera } from './camera/perspective-camera';
import { camPointToScreenPoint, worldPointToCamPoint } from './space-conversion';
import { startLoop } from './util';

const { sin, cos, sqrt } = Math;

type OrthoOrbitCamera = OrbitCamera & { orthoSize: Vector2 };
type OrbitCamTransformation = (cam: OrthoOrbitCamera) => OrthoOrbitCamera;
function setupOrbitCameraControl(canvas: HTMLCanvasElement, transformCamera: Morphism<OrbitCamTransformation, void>) {
	canvas.addEventListener("mousemove", e => {
		if (e.buttons !== 1) return;
		const s = 0.01;
		transformCamera(
			cam => ({
				...cam,
				longitude: cam.longitude + e.movementX * s,
				latitude: cam.latitude + e.movementY * s
			})
		);
	});
	canvas.addEventListener("wheel", e => {
		transformCamera(
			cam => ({
				...cam,
				radius: cam.radius * (1 + e.deltaY * 0.001)
			})
		);
	});
}

type WorldToScreen = Morphism<Vector3, Vector2>;
type WorldToCam = Morphism<Vector3, Vector3>;
type CamToScreen = Morphism<Vector3, Vector2>;

//floor-grid ###

const renderFloorGrid = (function(){
	function createGridPoints(size: Vector2): Vector2[] {
		let points: Vector2[] = [];
		for (let x = 0; x < size[0]; x++){
			for (let y = 0; y < size[1]; y++){
				points.push([x, y]);
			}
		}
		return points;
	}
	const floorCellCounts: Vector2 = [6, 6];
	const floorGridPoints = createGridPoints(floorCellCounts).map(
		point => multiply(
			[
				point[0] - (floorCellCounts[0] - 1) / 2, 
				0, 
				point[1] - (floorCellCounts[1] - 1) / 2
			] as Vector3,
			1
		)
	);
	const floorGridLines: Vector2[] = (function(){
		let lines: Vector2[] = [];
		for (let x = 0; x < floorCellCounts[0]; x++){
			const baseIndex = x * floorCellCounts[1];
			for (let y = 0; y < floorCellCounts[1] - 1; y++){
				lines.push([baseIndex + y, baseIndex + y + 1]);
			}
		}
	
		for (let y = 0; y < floorCellCounts[1]; y++) {
			for (let x = 0; x < floorCellCounts[0] - 1; x++) {
				lines.push([
					y + (x * floorCellCounts[1]), 
					y + ((x + 1) * floorCellCounts[1])
				]);
			}
		}
	
		return lines;
	})();
	return (ctx: CanvasRenderingContext2D, worldToScreen: Morphism<Vector3, Vector2>) => {
		const screenGridPoints: Vector2[] = floorGridPoints.map(worldToScreen);
		ctx.strokeStyle = "black";
		ctx.lineWidth = 4;
		for (const line of floorGridLines){
			pathPolyline(ctx, [screenGridPoints[line[0]], screenGridPoints[line[1]]]);
			ctx.stroke();
		}
	};
})();


//disc ###

const circle = (function(){
	let points: Vector2[] = [];
	const pointCount = 40;
	for (let i = 0; i < pointCount; i++){
		const p = i / pointCount;
		const angle = p * 2 * Math.PI;
		points.push([
			sin(angle), cos(angle)
		]);
	}
	return points;
})();
type WobblyDiscState = {
	radius: number,
	y: number,
	//the wobble-parameter is named theta
	theta: number,
	energy: number,
	offsetOrientation: Matrix3
};
function calculateWobblyDiscTransformWithoutOffset(state: WobblyDiscState): Transform {
	const { theta, radius, y } = state;
	const w = Math.sqrt(radius ** 2 - y ** 2);
	const a = theta * radius / w;
	const r: Vector3 = [-sin(a) * radius, 0, cos(a) * radius];
	const f: Vector3 = [cos(a) * w, -y, sin(a) * w];
	const baseMatrix: Matrix3 = [
		...r,
		...cross(r, f),
		...f
	];
	const localOffsetMatrix: Matrix3 = [
		-sin(theta), 0, cos(theta),
		0, 1, 0,
		cos(theta), 0, sin(theta),
	];

	return {
		position: [0, y, 0],
		orientation: multiplyMatrix(baseMatrix, localOffsetMatrix)
	}
}
function calculateWobblyDiscTransform(state: WobblyDiscState): Transform {
	const transform = calculateWobblyDiscTransformWithoutOffset(state);
	return {
		...transform,
		orientation: multiplyMatrix(state.offsetOrientation, transform.orientation)
	}
}
const projectPointOntoShadow = (flatSunDirection: Vector3) => (point: Vector3): Vector3 => {
	return [
		point[0] + flatSunDirection[0] * point[1], 
		0, 
		point[2] + flatSunDirection[2] * point[1]
	]
};
function getWorldCirclePoints(state: WobblyDiscState): Vector3[] {
	const transform = calculateWobblyDiscTransform(state);
	return circle.map(
		flow(
			point => [point[0], 0, point[1]] as Vector3,
			transformPoint(transform)
		)
	);
}
function renderWobblyDisc(ctx: CanvasRenderingContext2D, worldToCam: WorldToCam, camToScreen: CamToScreen, worldToScreen: WorldToScreen, state: WobblyDiscState){
	const circlePointsWorld = getWorldCirclePoints(state);
	const circlePointsScreen = circlePointsWorld.map(worldToScreen);
	//draw shadow
	const shadowPoints = circlePointsWorld.map(
		projectPointOntoShadow([0.8, 0, 0.2])
	);
	ctx.fillStyle = "black";
	ctx.globalAlpha = 0.6;
	pathPolygon(ctx, shadowPoints.map(worldToScreen));
	ctx.fill();
	ctx.globalAlpha = 1;

	//draw circle shape and outline
	ctx.fillStyle = "#c23d23";
	ctx.strokeStyle = "black";
	ctx.lineWidth = 5;
	pathPolyline(ctx, [...circlePointsScreen, circlePointsScreen[0]]);
	// ctx.stroke();
	ctx.fill();
	ctx.stroke();
	
	//draw each vertex
	for (const worldPoint of circlePointsWorld){
		const camPoint = worldToCam(worldPoint);
		const dist = magnitude(camPoint);
		const screenPoint = camToScreen(camPoint);
		drawDisc(ctx, screenPoint, 60 / dist, { fillStyle: "black" });
	}
}




function renderScene(
	ctx: CanvasRenderingContext2D, cam: PerspectiveCamera) {
	
	const worldToCam = worldPointToCamPoint(cam);
	const camToScreen = camPointToScreenPoint(ctx, cam);
	const worldToScreen = flow(worldToCam, camToScreen);

	renderFloorGrid(ctx, worldToScreen);
	renderWobblyDisc(ctx, worldToCam, camToScreen, worldToScreen, wobblyDiscState);
}

const canvas = setupCanvas();
const ctx = canvas.getContext("2d");
const backgroundColor = "#d4d3d2";
let wobblyDiscState: WobblyDiscState = {
	radius: 2,
	y: 0.2, 
	theta: 0,
	energy: 10,
	offsetOrientation: identity
};

function calculateW(state: WobblyDiscState) {
	const { radius, y } = state;
	return sqrt(radius ** 2 - y ** 2);
}
function calculateWobbleSpeed(state: WobblyDiscState){
	const { energy, radius, y } = state;
	const kineticEnergy = energy - y;
	const w = calculateW(state);
	return sqrt(kineticEnergy / (Math.PI * radius**2 * (radius**2 * w**(-2) - 1)));
}
function calculateAlpha(state: WobblyDiscState){
	const { theta, radius } = state;
	const w = calculateW(state);
	return theta * radius / w;
}


let camera: OrthoOrbitCamera = {
	radius: 10,
	latitude: 0.5,
	longitude: 0,
	orthoSize: [canvas.width, canvas.height]
};
const updateCamera = () => {
	camera = {
		...camera,
		orthoSize: [canvas.width / 2, canvas.height / 2] as Vector2
	};
};
const transformCamera = (transformation: OrbitCamTransformation) => {
	camera = transformation(camera);
	render();
};

const render = () => {

	const { canvas } = ctx;
	const [w, h] = [canvas.width, canvas.height];

	ctx.save();
	ctx.fillStyle = backgroundColor;
	ctx.fillRect(0, 0, w, h);
	ctx.translate(w / 2, h / 2);
	ctx.scale(window.devicePixelRatio, -window.devicePixelRatio);

	const perspectiveCam = {
		...toRegularCamera(camera),
		settings: {
			planeWidthHalf: canvas.width,
			planeHeightHalf: canvas.height,
			zScale: 2000
		}
	} as PerspectiveCamera;
	
	Object.assign(ctx, {
		strokeStyle: "#3b3a39",
		lineWidth: 2,
		lineJoin: "round"
	} as Partial<CanvasRenderingContext2D>);

	renderScene(ctx, perspectiveCam);

	ctx.restore();
};

function calculateOffsetMatrix(a: Matrix3, b: Matrix3): Matrix3 {
	const normalA = a.slice(3, 6) as Vector3;
	const normalB = b.slice(3, 6) as Vector3;
	const va = normalize([normalA[0], normalA[2]]);
	const vb = normalize([normalB[0], normalB[2]]);
	return rotation([0, signedAngle(va, vb), 0]);
}

function setupSimulationControls(){
	document.body.insertAdjacentHTML("beforeend", `
		<div style="position: absolute; display: grid; grid-template-columns: max-content auto; width: 90%; top: 0px; padding: 10px; font-size: 24px; grid-column-gap: 20px;">
			<span>energy</span>
			<input id="energy-input" type="range" min="0" max="200" step="0.001" />
			<span>elevation</span>
			<input id="elevation-input" type="range" min="0" max="1" step="0.001" />
		</div>
	`);
	const energyInput = document.querySelector("#energy-input") as HTMLInputElement;
	const elevationInput = document.querySelector("#elevation-input") as HTMLInputElement;
	energyInput.addEventListener("input", e => {
		wobblyDiscState = {
			...wobblyDiscState,
			energy: energyInput.valueAsNumber
		};
	}); 
	elevationInput.addEventListener("input", e => {
		const transformBefore = calculateWobblyDiscTransformWithoutOffset(wobblyDiscState);
		const nextY = elevationInput.valueAsNumber * wobblyDiscState.radius;
		const transformAfter = calculateWobblyDiscTransformWithoutOffset({
			...wobblyDiscState, y: nextY
		});
		const offsetMatrix = calculateOffsetMatrix(transformBefore.orientation, transformAfter.orientation);
		wobblyDiscState = {
			...wobblyDiscState,
			y: nextY,
			offsetOrientation: multiplyMatrix(wobblyDiscState.offsetOrientation, offsetMatrix)
		};
		render();
	});
}

let prevPoints = getWorldCirclePoints(wobblyDiscState);
function logKineticEnergy(dt: number){
	const curPoints = getWorldCirclePoints(wobblyDiscState);
	const velocities = curPoints.map(
		(curPoint, i) => divide(subtract(curPoint, prevPoints[i]), dt)
	);
	const massDelta = 1 / curPoints.length;
	let kineticEnergySum = 0;
	for (const vel of velocities){
		kineticEnergySum += massDelta * sqrdMagnitude(vel);
	}

	prevPoints = curPoints;
}

setupSimulationControls();
updateCamera();
setupOrbitCameraControl(canvas, transformCamera);
render();

let loopRunning = false;
startLoop(
	(args) => {
		if (!loopRunning) return;
		const wobbleSpeed = calculateWobbleSpeed(wobblyDiscState);
		wobblyDiscState = {
			...wobblyDiscState, 
			theta: wobblyDiscState.theta + args.dt * wobbleSpeed
		};
		render();
		// logKineticEnergy(args.dt);
	}
);
document.addEventListener("keydown", e => {
	if (e.key === " "){
		loopRunning = !loopRunning;
	}
});