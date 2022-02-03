import { Morphism, Vector2, Vector3 } from '../lib/types';
import * as Vec3 from '../lib/vec3';

export const randomVector = (maxMag: number = 2) : Vector3 => [0, 1, 2].map(() => (Math.random() - 0.5) * maxMag) as Vector3;
export const vec3ToColor = (v: Vector3) => `rgb(${Vec3.round(v).join(",")})`
export const randomColor = () : string => `rgb(${[0, 1, 2].map(() => Math.round(Math.random() * 255)).join(",")})`;
export const randomRange = (min: number, max: number) => min + (max - min) + Math.random();
export const scaleVector = (scale: number) => ((vec: Vector2) => [vec[0] * scale, vec[1] * scale]);
export const randomUnitVector = () : Vector3 => Vec3.normalize([0, 1, 2].map(() => Math.random() - 0.5) as Vector3);


export const createArray = (length: number): any[] => {
    const arr = [];
    for (let i = 0; i < length; i++){
        arr[i] = i;
    }
    return arr;
};

export function normalize(from: number, to: number, value: number): number {
	return (value - from) / (to - from);
}
export function interpolate(from: number, to: number, value: number): number {
	return from + (to - from) * value
}

export const mapRange = (range1: [number, number], range2: [number, number], value: number): number => {
	const relVal = value - range1[0];
	const scale = (range2[1] - range2[0]) / (range1[1] - range1[0]);
	return range2[0] + relVal * scale;
};



type LoopArgs = {
	dt: number,
	t: number
};
export const startLoop = (onLoop: Morphism<LoopArgs, void>) => {
	let accumTime = 0;
	let prevTime = 0;
	const loop = () => {
		const curTime = window.performance.now();
		const deltaTime = (curTime - prevTime) / 1000;
		accumTime += deltaTime;
		prevTime = curTime;
		onLoop({ dt: deltaTime, t: accumTime });
		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
};

export function range(start: number, end: number): number[] {
	const array: number[] = [];
	for (let i = start; i < end; i++) {
		array.push(i);
	}
	return array;
}

