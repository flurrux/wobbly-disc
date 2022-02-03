export function adjustCanvasSizeToWindow(canvas: HTMLCanvasElement) {
	const widthPx = window.innerWidth;
	const heightPx = window.innerHeight;
	const scalePx = window.devicePixelRatio || 1;
	Object.assign(canvas.style, {
		width: `${widthPx}px`,
		height: `${heightPx}px`
	});
	Object.assign(canvas, {
		width: widthPx * scalePx,
		height: heightPx * scalePx
	});
}

export function setupCanvas(): HTMLCanvasElement {
	const canvas = document.createElement("canvas");
	document.body.appendChild(canvas);
	adjustCanvasSizeToWindow(canvas);
	return canvas;
}