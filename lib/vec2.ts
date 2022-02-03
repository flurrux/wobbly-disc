import { interpolate as lerpNum } from '../src/util';

type Vec2 = [number, number];

export const add = (a: Vec2, b: Vec2): Vec2 => [
	a[0] + b[0],
	a[1] + b[1],
];
export const multiply = (vector: Vec2, scalar: number): Vec2 => [
	vector[0] * scalar,
	vector[1] * scalar,
];
export const subtract = (a: Vec2, b: Vec2): Vec2 => add(a, multiply(b, -1));
export const divide = (vector: Vec2, denominator: number) => multiply(vector, 1 / denominator);

export const isZero = (vector: Vec2): boolean => vector.every(component => component === 0);
export const magnitude = (vector: Vec2): number => Math.hypot(...vector);
export const normalize = (vector: Vec2): Vec2 => isZero(vector) ? [0, 0] : divide(vector, magnitude(vector));
export const distance = (a: Vec2, b: Vec2): number => magnitude(subtract(a, b));
export const dot = (a: Vec2, b: Vec2): number => a[0] * b[0] + a[1] * b[1];
export const mapComponents = (map: (c: number) => number) => (v: Vec2): Vec2 => {
	return [
		map(v[0]),
		map(v[1])
	]
};
export const signedAngle = (a: Vec2, b: Vec2): number => {
	const angleSign = -Math.sign(a[1] * b[0] - a[0] * b[1]);
	return Math.acos(dot(a, b)) * angleSign;
}
export const round = mapComponents(Math.round);
export const vector2 = (x: number, y: number) => [x, y] as Vec2;
export const interpolate = (a: Vec2, b: Vec2, t: number) => vector2(
	lerpNum(a[0], b[0], t),
	lerpNum(a[1], b[1], t),
);