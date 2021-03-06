// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"4UKJc":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "043affa210fd5d10be6d99797cacc1f4";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('???? [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] ???? Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ??? Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          ???? ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"3rfh7":[function(require,module,exports) {
var _fpTsLibFunction = require('fp-ts/lib/function');
var _libCanvasUtil = require('../lib/canvas-util');
var _libCtxUtil = require('../lib/ctx-util');
var _libMat3x = require('../lib/mat3x3');
var _libTransform = require('../lib/transform');
var _libVec = require('../lib/vec3');
var _libVec2 = require('../lib/vec2');
var _cameraOrbitCamera = require('./camera/orbit-camera');
var _spaceConversion = require('./space-conversion');
var _util = require('./util');
const {sin, cos, sqrt} = Math;
function setupOrbitCameraControl(canvas, transformCamera) {
  canvas.addEventListener("mousemove", e => {
    if (e.buttons !== 1) return;
    const s = 0.01;
    transformCamera(cam => ({
      ...cam,
      longitude: cam.longitude + e.movementX * s,
      latitude: cam.latitude + e.movementY * s
    }));
  });
  canvas.addEventListener("wheel", e => {
    transformCamera(cam => ({
      ...cam,
      radius: cam.radius * (1 + e.deltaY * 0.001)
    }));
  });
}
// floor-grid ###
const renderFloorGrid = (function () {
  function createGridPoints(size) {
    let points = [];
    for (let x = 0; x < size[0]; x++) {
      for (let y = 0; y < size[1]; y++) {
        points.push([x, y]);
      }
    }
    return points;
  }
  const floorCellCounts = [6, 6];
  const floorGridPoints = createGridPoints(floorCellCounts).map(point => _libVec.multiply([point[0] - (floorCellCounts[0] - 1) / 2, 0, point[1] - (floorCellCounts[1] - 1) / 2], 1));
  const floorGridLines = (function () {
    let lines = [];
    for (let x = 0; x < floorCellCounts[0]; x++) {
      const baseIndex = x * floorCellCounts[1];
      for (let y = 0; y < floorCellCounts[1] - 1; y++) {
        lines.push([baseIndex + y, baseIndex + y + 1]);
      }
    }
    for (let y = 0; y < floorCellCounts[1]; y++) {
      for (let x = 0; x < floorCellCounts[0] - 1; x++) {
        lines.push([y + x * floorCellCounts[1], y + (x + 1) * floorCellCounts[1]]);
      }
    }
    return lines;
  })();
  return (ctx, worldToScreen) => {
    const screenGridPoints = floorGridPoints.map(worldToScreen);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    for (const line of floorGridLines) {
      _libCtxUtil.pathPolyline(ctx, [screenGridPoints[line[0]], screenGridPoints[line[1]]]);
      ctx.stroke();
    }
  };
})();
// disc ###
const circle = (function () {
  let points = [];
  const pointCount = 40;
  for (let i = 0; i < pointCount; i++) {
    const p = i / pointCount;
    const angle = p * 2 * Math.PI;
    points.push([sin(angle), cos(angle)]);
  }
  return points;
})();
function calculateWobblyDiscTransformWithoutOffset(state) {
  const {theta, radius, y} = state;
  const w = Math.sqrt(radius ** 2 - y ** 2);
  const a = theta * radius / w;
  const r = [-sin(a) * radius, 0, cos(a) * radius];
  const f = [cos(a) * w, -y, sin(a) * w];
  const baseMatrix = [...r, ..._libVec.cross(r, f), ...f];
  const localOffsetMatrix = [-sin(theta), 0, cos(theta), 0, 1, 0, cos(theta), 0, sin(theta)];
  return {
    position: [0, y, 0],
    orientation: _libMat3x.multiplyMatrix(baseMatrix, localOffsetMatrix)
  };
}
function calculateWobblyDiscTransform(state) {
  const transform = calculateWobblyDiscTransformWithoutOffset(state);
  return {
    ...transform,
    orientation: _libMat3x.multiplyMatrix(state.offsetOrientation, transform.orientation)
  };
}
const projectPointOntoShadow = flatSunDirection => point => {
  return [point[0] + flatSunDirection[0] * point[1], 0, point[2] + flatSunDirection[2] * point[1]];
};
function getWorldCirclePoints(state) {
  const transform = calculateWobblyDiscTransform(state);
  return circle.map(_fpTsLibFunction.flow(point => [point[0], 0, point[1]], _libTransform.transformPoint(transform)));
}
function renderWobblyDisc(ctx, worldToCam, camToScreen, worldToScreen, state) {
  const circlePointsWorld = getWorldCirclePoints(state);
  const circlePointsScreen = circlePointsWorld.map(worldToScreen);
  // draw shadow
  const shadowPoints = circlePointsWorld.map(projectPointOntoShadow([0.8, 0, 0.2]));
  ctx.fillStyle = "black";
  ctx.globalAlpha = 0.6;
  _libCtxUtil.pathPolygon(ctx, shadowPoints.map(worldToScreen));
  ctx.fill();
  ctx.globalAlpha = 1;
  // draw circle shape and outline
  ctx.fillStyle = "#c23d23";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  _libCtxUtil.pathPolyline(ctx, [...circlePointsScreen, circlePointsScreen[0]]);
  // ctx.stroke();
  ctx.fill();
  ctx.stroke();
  // draw each vertex
  for (const worldPoint of circlePointsWorld) {
    const camPoint = worldToCam(worldPoint);
    const dist = _libVec.magnitude(camPoint);
    const screenPoint = camToScreen(camPoint);
    _libCtxUtil.drawDisc(ctx, screenPoint, 60 / dist, {
      fillStyle: "black"
    });
  }
}
function renderScene(ctx, cam) {
  const worldToCam = _spaceConversion.worldPointToCamPoint(cam);
  const camToScreen = _spaceConversion.camPointToScreenPoint(ctx, cam);
  const worldToScreen = _fpTsLibFunction.flow(worldToCam, camToScreen);
  renderFloorGrid(ctx, worldToScreen);
  renderWobblyDisc(ctx, worldToCam, camToScreen, worldToScreen, wobblyDiscState);
}
const canvas = _libCanvasUtil.setupCanvas();
const ctx = canvas.getContext("2d");
const backgroundColor = "#d4d3d2";
let wobblyDiscState = {
  radius: 2,
  y: 0.2,
  theta: 0,
  energy: 10,
  offsetOrientation: _libMat3x.identity
};
function calculateW(state) {
  const {radius, y} = state;
  return sqrt(radius ** 2 - y ** 2);
}
function calculateWobbleSpeed(state) {
  const {energy, radius, y} = state;
  const kineticEnergy = energy - y;
  const w = calculateW(state);
  return sqrt(kineticEnergy / (Math.PI * radius ** 2 * (radius ** 2 * w ** -2 - 1)));
}
function calculateAlpha(state) {
  const {theta, radius} = state;
  const w = calculateW(state);
  return theta * radius / w;
}
let camera = {
  radius: 10,
  latitude: 0.5,
  longitude: 0,
  orthoSize: [canvas.width, canvas.height]
};
const updateCamera = () => {
  camera = {
    ...camera,
    orthoSize: [canvas.width / 2, canvas.height / 2]
  };
};
const transformCamera = transformation => {
  camera = transformation(camera);
  render();
};
const render = () => {
  const {canvas} = ctx;
  const [w, h] = [canvas.width, canvas.height];
  ctx.save();
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, w, h);
  ctx.translate(w / 2, h / 2);
  ctx.scale(window.devicePixelRatio, -window.devicePixelRatio);
  const perspectiveCam = {
    ..._cameraOrbitCamera.toRegularCamera(camera),
    settings: {
      planeWidthHalf: canvas.width,
      planeHeightHalf: canvas.height,
      zScale: 2000
    }
  };
  Object.assign(ctx, {
    strokeStyle: "#3b3a39",
    lineWidth: 2,
    lineJoin: "round"
  });
  renderScene(ctx, perspectiveCam);
  ctx.restore();
};
function calculateOffsetMatrix(a, b) {
  const normalA = a.slice(3, 6);
  const normalB = b.slice(3, 6);
  const va = _libVec2.normalize([normalA[0], normalA[2]]);
  const vb = _libVec2.normalize([normalB[0], normalB[2]]);
  return _libMat3x.rotation([0, _libVec2.signedAngle(va, vb), 0]);
}
function setupSimulationControls() {
  document.body.insertAdjacentHTML("beforeend", `
		<div style="position: absolute; display: grid; grid-template-columns: max-content auto; width: 90%; top: 0px; padding: 10px; font-size: 24px; grid-column-gap: 20px;">
			<span>energy</span>
			<input id="energy-input" type="range" min="0" max="200" step="0.001" />
			<span>elevation</span>
			<input id="elevation-input" type="range" min="0" max="1" step="0.001" />
		</div>
	`);
  const energyInput = document.querySelector("#energy-input");
  const elevationInput = document.querySelector("#elevation-input");
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
      ...wobblyDiscState,
      y: nextY
    });
    const offsetMatrix = calculateOffsetMatrix(transformBefore.orientation, transformAfter.orientation);
    wobblyDiscState = {
      ...wobblyDiscState,
      y: nextY,
      offsetOrientation: _libMat3x.multiplyMatrix(wobblyDiscState.offsetOrientation, offsetMatrix)
    };
    render();
  });
}
let prevPoints = getWorldCirclePoints(wobblyDiscState);
function logKineticEnergy(dt) {
  const curPoints = getWorldCirclePoints(wobblyDiscState);
  const velocities = curPoints.map((curPoint, i) => _libVec.divide(_libVec.subtract(curPoint, prevPoints[i]), dt));
  const massDelta = 1 / curPoints.length;
  let kineticEnergySum = 0;
  for (const vel of velocities) {
    kineticEnergySum += massDelta * _libVec.sqrdMagnitude(vel);
  }
  prevPoints = curPoints;
}
setupSimulationControls();
updateCamera();
setupOrbitCameraControl(canvas, transformCamera);
render();
let loopRunning = false;
_util.startLoop(args => {
  if (!loopRunning) return;
  const wobbleSpeed = calculateWobbleSpeed(wobblyDiscState);
  wobblyDiscState = {
    ...wobblyDiscState,
    theta: wobblyDiscState.theta + args.dt * wobbleSpeed
  };
  render();
});
document.addEventListener("keydown", e => {
  if (e.key === " ") {
    loopRunning = !loopRunning;
  }
});

},{"fp-ts/lib/function":"2ewLd","../lib/canvas-util":"4Mm8I","../lib/ctx-util":"QBffB","../lib/vec3":"35rAi","./camera/orbit-camera":"4OBIx","./space-conversion":"6XrnP","../lib/transform":"5xWxN","./util":"5HQhk","../lib/mat3x3":"3JkjF","../lib/vec2":"2wb4Y"}],"2ewLd":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndomorphismMonoid = exports.not = exports.SK = exports.hole = exports.pipe = exports.untupled = exports.tupled = exports.absurd = exports.decrement = exports.increment = exports.tuple = exports.flow = exports.flip = exports.constVoid = exports.constUndefined = exports.constNull = exports.constFalse = exports.constTrue = exports.constant = exports.unsafeCoerce = exports.identity = exports.apply = exports.getRing = exports.getSemiring = exports.getMonoid = exports.getSemigroup = exports.getBooleanAlgebra = void 0;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.10.0
 */
var getBooleanAlgebra = function (B) { return function () { return ({
    meet: function (x, y) { return function (a) { return B.meet(x(a), y(a)); }; },
    join: function (x, y) { return function (a) { return B.join(x(a), y(a)); }; },
    zero: function () { return B.zero; },
    one: function () { return B.one; },
    implies: function (x, y) { return function (a) { return B.implies(x(a), y(a)); }; },
    not: function (x) { return function (a) { return B.not(x(a)); }; }
}); }; };
exports.getBooleanAlgebra = getBooleanAlgebra;
/**
 * Unary functions form a semigroup as long as you can provide a semigroup for the codomain.
 *
 * @example
 * import { Predicate, getSemigroup } from 'fp-ts/function'
 * import * as B from 'fp-ts/boolean'
 *
 * const f: Predicate<number> = (n) => n <= 2
 * const g: Predicate<number> = (n) => n >= 0
 *
 * const S1 = getSemigroup(B.SemigroupAll)<number>()
 *
 * assert.deepStrictEqual(S1.concat(f, g)(1), true)
 * assert.deepStrictEqual(S1.concat(f, g)(3), false)
 *
 * const S2 = getSemigroup(B.SemigroupAny)<number>()
 *
 * assert.deepStrictEqual(S2.concat(f, g)(1), true)
 * assert.deepStrictEqual(S2.concat(f, g)(3), true)
 *
 * @category instances
 * @since 2.10.0
 */
var getSemigroup = function (S) { return function () { return ({
    concat: function (f, g) { return function (a) { return S.concat(f(a), g(a)); }; }
}); }; };
exports.getSemigroup = getSemigroup;
/**
 * Unary functions form a monoid as long as you can provide a monoid for the codomain.
 *
 * @example
 * import { Predicate } from 'fp-ts/Predicate'
 * import { getMonoid } from 'fp-ts/function'
 * import * as B from 'fp-ts/boolean'
 *
 * const f: Predicate<number> = (n) => n <= 2
 * const g: Predicate<number> = (n) => n >= 0
 *
 * const M1 = getMonoid(B.MonoidAll)<number>()
 *
 * assert.deepStrictEqual(M1.concat(f, g)(1), true)
 * assert.deepStrictEqual(M1.concat(f, g)(3), false)
 *
 * const M2 = getMonoid(B.MonoidAny)<number>()
 *
 * assert.deepStrictEqual(M2.concat(f, g)(1), true)
 * assert.deepStrictEqual(M2.concat(f, g)(3), true)
 *
 * @category instances
 * @since 2.10.0
 */
var getMonoid = function (M) {
    var getSemigroupM = exports.getSemigroup(M);
    return function () { return ({
        concat: getSemigroupM().concat,
        empty: function () { return M.empty; }
    }); };
};
exports.getMonoid = getMonoid;
/**
 * @category instances
 * @since 2.10.0
 */
var getSemiring = function (S) { return ({
    add: function (f, g) { return function (x) { return S.add(f(x), g(x)); }; },
    zero: function () { return S.zero; },
    mul: function (f, g) { return function (x) { return S.mul(f(x), g(x)); }; },
    one: function () { return S.one; }
}); };
exports.getSemiring = getSemiring;
/**
 * @category instances
 * @since 2.10.0
 */
var getRing = function (R) {
    var S = exports.getSemiring(R);
    return {
        add: S.add,
        mul: S.mul,
        one: S.one,
        zero: S.zero,
        sub: function (f, g) { return function (x) { return R.sub(f(x), g(x)); }; }
    };
};
exports.getRing = getRing;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * @since 2.11.0
 */
var apply = function (a) { return function (f) { return f(a); }; };
exports.apply = apply;
/**
 * @since 2.0.0
 */
function identity(a) {
    return a;
}
exports.identity = identity;
/**
 * @since 2.0.0
 */
exports.unsafeCoerce = identity;
/**
 * @since 2.0.0
 */
function constant(a) {
    return function () { return a; };
}
exports.constant = constant;
/**
 * A thunk that returns always `true`.
 *
 * @since 2.0.0
 */
exports.constTrue = 
/*#__PURE__*/
constant(true);
/**
 * A thunk that returns always `false`.
 *
 * @since 2.0.0
 */
exports.constFalse = 
/*#__PURE__*/
constant(false);
/**
 * A thunk that returns always `null`.
 *
 * @since 2.0.0
 */
exports.constNull = 
/*#__PURE__*/
constant(null);
/**
 * A thunk that returns always `undefined`.
 *
 * @since 2.0.0
 */
exports.constUndefined = 
/*#__PURE__*/
constant(undefined);
/**
 * A thunk that returns always `void`.
 *
 * @since 2.0.0
 */
exports.constVoid = exports.constUndefined;
/**
 * Flips the order of the arguments of a function of two arguments.
 *
 * @since 2.0.0
 */
function flip(f) {
    return function (b, a) { return f(a, b); };
}
exports.flip = flip;
function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
    switch (arguments.length) {
        case 1:
            return ab;
        case 2:
            return function () {
                return bc(ab.apply(this, arguments));
            };
        case 3:
            return function () {
                return cd(bc(ab.apply(this, arguments)));
            };
        case 4:
            return function () {
                return de(cd(bc(ab.apply(this, arguments))));
            };
        case 5:
            return function () {
                return ef(de(cd(bc(ab.apply(this, arguments)))));
            };
        case 6:
            return function () {
                return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
            };
        case 7:
            return function () {
                return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
            };
        case 8:
            return function () {
                return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
            };
        case 9:
            return function () {
                return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
            };
    }
    return;
}
exports.flow = flow;
/**
 * @since 2.0.0
 */
function tuple() {
    var t = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        t[_i] = arguments[_i];
    }
    return t;
}
exports.tuple = tuple;
/**
 * @since 2.0.0
 */
function increment(n) {
    return n + 1;
}
exports.increment = increment;
/**
 * @since 2.0.0
 */
function decrement(n) {
    return n - 1;
}
exports.decrement = decrement;
/**
 * @since 2.0.0
 */
function absurd(_) {
    throw new Error('Called `absurd` function which should be uncallable');
}
exports.absurd = absurd;
/**
 * Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.
 *
 * @example
 * import { tupled } from 'fp-ts/function'
 *
 * const add = tupled((x: number, y: number): number => x + y)
 *
 * assert.strictEqual(add([1, 2]), 3)
 *
 * @since 2.4.0
 */
function tupled(f) {
    return function (a) { return f.apply(void 0, a); };
}
exports.tupled = tupled;
/**
 * Inverse function of `tupled`
 *
 * @since 2.4.0
 */
function untupled(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return f(a);
    };
}
exports.untupled = untupled;
function pipe(a, ab, bc, cd, de, ef, fg, gh, hi) {
    switch (arguments.length) {
        case 1:
            return a;
        case 2:
            return ab(a);
        case 3:
            return bc(ab(a));
        case 4:
            return cd(bc(ab(a)));
        case 5:
            return de(cd(bc(ab(a))));
        case 6:
            return ef(de(cd(bc(ab(a)))));
        case 7:
            return fg(ef(de(cd(bc(ab(a))))));
        case 8:
            return gh(fg(ef(de(cd(bc(ab(a)))))));
        case 9:
            return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
        default:
            var ret = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                ret = arguments[i](ret);
            }
            return ret;
    }
}
exports.pipe = pipe;
/**
 * Type hole simulation
 *
 * @since 2.7.0
 */
exports.hole = absurd;
/**
 * @since 2.11.0
 */
var SK = function (_, b) { return b; };
exports.SK = SK;
/**
 * Use `Predicate` module instead.
 *
 * @since 2.0.0
 * @deprecated
 */
function not(predicate) {
    return function (a) { return !predicate(a); };
}
exports.not = not;
/**
 * Use `Endomorphism` module instead.
 *
 * @category instances
 * @since 2.10.0
 * @deprecated
 */
var getEndomorphismMonoid = function () { return ({
    concat: function (first, second) { return flow(first, second); },
    empty: identity
}); };
exports.getEndomorphismMonoid = getEndomorphismMonoid;

},{}],"4Mm8I":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "adjustCanvasSizeToWindow", function () {
  return adjustCanvasSizeToWindow;
});
_parcelHelpers.export(exports, "setupCanvas", function () {
  return setupCanvas;
});
function adjustCanvasSizeToWindow(canvas) {
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
function setupCanvas() {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  adjustCanvasSizeToWindow(canvas);
  return canvas;
}

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"3tkE2"}],"3tkE2":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}],"QBffB":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "pathPolygon", function () {
  return pathPolygon;
});
_parcelHelpers.export(exports, "pathPolyline", function () {
  return pathPolyline;
});
_parcelHelpers.export(exports, "drawDisc", function () {
  return drawDisc;
});
const pathPolygon = (ctx, polygon) => {
  pathPolyline(ctx, polygon);
  ctx.closePath();
};
const pathPolyline = (ctx, polyline) => {
  ctx.beginPath();
  ctx.moveTo(...polyline[0]);
  polyline.slice(1).map(point => ctx.lineTo(...point));
};
function drawDisc(ctx, point, radius, style) {
  if (style) {
    Object.assign(ctx, style);
  }
  ctx.beginPath();
  ctx.arc(point[0], point[1], radius, 0, Math.PI * 2);
  ctx.fill();
}

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"3tkE2"}],"35rAi":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "vector3", function () {
  return vector3;
});
_parcelHelpers.export(exports, "add", function () {
  return add;
});
_parcelHelpers.export(exports, "sum", function () {
  return sum;
});
_parcelHelpers.export(exports, "multiply", function () {
  return multiply;
});
_parcelHelpers.export(exports, "subtract", function () {
  return subtract;
});
_parcelHelpers.export(exports, "divide", function () {
  return divide;
});
_parcelHelpers.export(exports, "isZero", function () {
  return isZero;
});
_parcelHelpers.export(exports, "equal", function () {
  return equal;
});
_parcelHelpers.export(exports, "magnitude", function () {
  return magnitude;
});
_parcelHelpers.export(exports, "sqrdMagnitude", function () {
  return sqrdMagnitude;
});
_parcelHelpers.export(exports, "normalize", function () {
  return normalize;
});
_parcelHelpers.export(exports, "distance", function () {
  return distance;
});
_parcelHelpers.export(exports, "dot", function () {
  return dot;
});
_parcelHelpers.export(exports, "cross", function () {
  return cross;
});
_parcelHelpers.export(exports, "project", function () {
  return project;
});
_parcelHelpers.export(exports, "interpolate", function () {
  return interpolate;
});
_parcelHelpers.export(exports, "round", function () {
  return round;
});
const vector3 = (x, y, z) => [x, y, z];
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
function sum(vectors) {
  let sum = [0, 0, 0];
  for (const vec of vectors) {
    sum[0] += vec[0];
    sum[1] += vec[1];
    sum[2] += vec[2];
  }
  return sum;
}
const multiply = (vector, scalar) => [vector[0] * scalar, vector[1] * scalar, vector[2] * scalar];
const subtract = (a, b) => add(a, multiply(b, -1));
const divide = (vector, denominator) => multiply(vector, 1 / denominator);
const isZero = vector => vector.every(component => component === 0);
const equal = (a, b) => isZero(subtract(a, b));
const magnitude = vector => Math.hypot(...vector);
const sqrdMagnitude = v => v[0] ** 2 + v[1] ** 2 + v[2] ** 2;
const normalize = vector => isZero(vector) ? [0, 0, 0] : divide(vector, magnitude(vector));
const distance = (a, b) => magnitude(subtract(a, b));
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - b[1] * a[2], a[2] * b[0] - b[2] * a[0], a[0] * b[1] - b[0] * a[1]];
const project = (normal, point) => {
  return multiply(normal, dot(normal, point));
};
const interpolate = (a, b, t) => add(a, multiply(subtract(b, a), t));
const round = v => v.map(Math.round);

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"3tkE2"}],"4OBIx":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "toRegularCamera", function () {
  return toRegularCamera;
});
var _libMat3x = require("../../lib/mat3x3");
var _libVec = require('../../lib/vec3');
function calculateOrientation(orbitCam) {
  const rotationMatrix1 = _libMat3x.rotation([0, orbitCam.longitude, 0]);
  const rotationMatrix2 = _libMat3x.rotation([orbitCam.latitude, 0, 0]);
  return _libMat3x.multiplyMatrix(rotationMatrix1, rotationMatrix2);
}
function calculateTransform(orbitCam) {
  const orientation = calculateOrientation(orbitCam);
  const forward = orientation.slice(6);
  const position = _libVec.multiply(forward, -orbitCam.radius);
  return {
    position,
    orientation
  };
}
function toRegularCamera(orbitCam) {
  const transform = calculateTransform(orbitCam);
  return {
    transform,
    inverseMatrix: _libMat3x.inverse(transform.orientation)
  };
}

},{"../../lib/mat3x3":"3JkjF","../../lib/vec3":"35rAi","@parcel/transformer-js/lib/esmodule-helpers.js":"3tkE2"}],"3JkjF":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "identity", function () {
  return identity;
});
_parcelHelpers.export(exports, "multiplyVector", function () {
  return multiplyVector;
});
_parcelHelpers.export(exports, "multiplyMatrix", function () {
  return multiplyMatrix;
});
_parcelHelpers.export(exports, "inverse", function () {
  return inverse;
});
_parcelHelpers.export(exports, "rotation", function () {
  return rotation;
});
var _vec = require("./vec3");
const identity = [1, 0, 0, 0, 1, 0, 0, 0, 1];
const multiplyVector = (matrix, vector) => [matrix[0] * vector[0] + matrix[3] * vector[1] + matrix[6] * vector[2], matrix[1] * vector[0] + matrix[4] * vector[1] + matrix[7] * vector[2], matrix[2] * vector[0] + matrix[5] * vector[1] + matrix[8] * vector[2]];
const multiplyMatrix = (a, b) => [...multiplyVector(a, b.slice(0, 3)), ...multiplyVector(a, b.slice(3, 6)), ...multiplyVector(a, b.slice(6, 9))];
const inverse = matrix => {
  const [a, b, c, d, e, f, g, h, i] = matrix;
  const vals = [e * i - f * h, f * g - i * d, h * d - g * e, b * i - c * h, c * g - a * i, h * a - g * b, e * c - f * b, f * a - d * c, b * d - a * e];
  const m = 1 / (a * vals[0] + b * vals[1] + c * vals[2]);
  const n = 1 / (d * vals[3] + e * vals[4] + f * vals[5]);
  const o = 1 / (g * vals[6] + h * vals[7] + i * vals[8]);
  return [vals[0] * m, vals[3] * n, vals[6] * o, vals[1] * m, vals[4] * n, vals[7] * o, vals[2] * m, vals[5] * n, vals[8] * o];
};
const rotateVector = (axis, angle) => vec => {
  const sinDir = _vec.normalize(_vec.cross(axis, vec));
  const axisCenter = _vec.multiply(axis, _vec.dot(axis, vec));
  const cosDir = _vec.normalize(_vec.subtract(vec, axisCenter));
  const [sin, cos] = [Math.sin(angle), Math.cos(angle)];
  const radius = _vec.distance(axisCenter, vec);
  return _vec.add(axisCenter, _vec.multiply(_vec.add(_vec.multiply(sinDir, sin), _vec.multiply(cosDir, cos)), radius));
};
const rotation = vector => {
  if (_vec.isZero(vector)) {
    return identity;
  }
  const axis = _vec.normalize(vector);
  const angle = _vec.magnitude(vector);
  const rotateFunc = rotateVector(axis, angle);
  return [...rotateFunc([1, 0, 0]), ...rotateFunc([0, 1, 0]), ...rotateFunc([0, 0, 1])];
};

},{"./vec3":"35rAi","@parcel/transformer-js/lib/esmodule-helpers.js":"3tkE2"}],"6XrnP":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "viewportToCanvas", function () {
  return viewportToCanvas;
});
_parcelHelpers.export(exports, "camPointToScreenPoint", function () {
  return camPointToScreenPoint;
});
_parcelHelpers.export(exports, "worldPointToCamPoint", function () {
  return worldPointToCamPoint;
});
_parcelHelpers.export(exports, "worldPointToScreenPoint", function () {
  return worldPointToScreenPoint;
});
var _fpTsLibFunction = require('fp-ts/lib/function');
var _libMat3x = require('../lib/mat3x3');
var _libVec = require('../lib/vec3');
var _cameraPerspectiveCamera = require('./camera/perspective-camera');
const viewportToCanvas = ctx => {
  const canvas = ctx.canvas;
  return point => {
    return [point[0] * canvas.offsetWidth / 2, point[1] * canvas.offsetHeight / 2];
  };
};
const camPointToScreenPoint = (ctx, camera) => camPoint => {
  return viewportToCanvas(ctx)(_cameraPerspectiveCamera.projectPoint(camera.settings)(camPoint));
};
const worldPointToCamPoint = camera => worldPoint => {
  return _libMat3x.multiplyVector(camera.inverseMatrix, _libVec.subtract(worldPoint, camera.transform.position));
};
const worldPointToScreenPoint = (ctx, camera) => _fpTsLibFunction.flow(worldPointToCamPoint(camera), camPointToScreenPoint(ctx, camera));

},{"fp-ts/lib/function":"2ewLd","../lib/mat3x3":"3JkjF","../lib/vec3":"35rAi","./camera/perspective-camera":"6j9Bw","@parcel/transformer-js/lib/esmodule-helpers.js":"3tkE2"}],"6j9Bw":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "createCamSettingsFromCanvas", function () {
  return createCamSettingsFromCanvas;
});
_parcelHelpers.export(exports, "projectPoint", function () {
  return projectPoint;
});
_parcelHelpers.export(exports, "projectPoints", function () {
  return projectPoints;
});
const createCamSettingsFromCanvas = (zScale, planeScale, canvas) => {
  return {
    zScale,
    planeWidthHalf: canvas.offsetWidth * planeScale / 2,
    planeHeightHalf: canvas.offsetHeight * planeScale / 2
  };
};
const projectPoint = cam => {
  return point => {
    const c = cam.zScale / point[2];
    return [c * point[0] / cam.planeWidthHalf, c * point[1] / cam.planeHeightHalf];
  };
};
const projectPoints = cam => {
  return points => {
    return points.map(projectPoint(cam));
  };
};

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"3tkE2"}],"5xWxN":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "transformPoint", function () {
  return transformPoint;
});
_parcelHelpers.export(exports, "transformDirection", function () {
  return transformDirection;
});
_parcelHelpers.export(exports, "inverseTransformPoint", function () {
  return inverseTransformPoint;
});
_parcelHelpers.export(exports, "inverseTransformDirection", function () {
  return inverseTransformDirection;
});
_parcelHelpers.export(exports, "transformTransform", function () {
  return transformTransform;
});
_parcelHelpers.export(exports, "inverseTransformTransform", function () {
  return inverseTransformTransform;
});
var _mat3x = require('./mat3x3');
var _vec = require('./vec3');
;
const transformPoint = transform => {
  return point => {
    return _vec.add(transform.position, _mat3x.multiplyVector(transform.orientation, point));
  };
};
const transformDirection = transform => {
  return direction => {
    return _mat3x.multiplyVector(transform.orientation, direction);
  };
};
const inverseTransformPoint = transform => {
  const invMat = _mat3x.inverse(transform.orientation);
  return point => _mat3x.multiplyVector(invMat, _vec.subtract(point, transform.position));
};
const inverseTransformDirection = transform => {
  const invMat = _mat3x.inverse(transform.orientation);
  return direction => _mat3x.multiplyVector(invMat, direction);
};
const transformTransform = transform => {
  return toTransform => {
    const pointTransform = transformPoint(transform);
    return {
      position: pointTransform(toTransform.position),
      orientation: _mat3x.multiplyMatrix(transform.orientation, toTransform.orientation)
    };
  };
};
const inverseTransformTransform = transform => {
  const inversePointTransform = inverseTransformPoint(transform);
  const inverseOrientation = _mat3x.inverse(transform.orientation);
  return toTransform => {
    return {
      position: inversePointTransform(toTransform.position),
      orientation: _mat3x.multiplyMatrix(inverseOrientation, toTransform.orientation)
    };
  };
};

},{"./mat3x3":"3JkjF","./vec3":"35rAi","@parcel/transformer-js/lib/esmodule-helpers.js":"3tkE2"}],"5HQhk":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "randomVector", function () {
  return randomVector;
});
_parcelHelpers.export(exports, "vec3ToColor", function () {
  return vec3ToColor;
});
_parcelHelpers.export(exports, "randomColor", function () {
  return randomColor;
});
_parcelHelpers.export(exports, "randomRange", function () {
  return randomRange;
});
_parcelHelpers.export(exports, "scaleVector", function () {
  return scaleVector;
});
_parcelHelpers.export(exports, "randomUnitVector", function () {
  return randomUnitVector;
});
_parcelHelpers.export(exports, "createArray", function () {
  return createArray;
});
_parcelHelpers.export(exports, "normalize", function () {
  return normalize;
});
_parcelHelpers.export(exports, "interpolate", function () {
  return interpolate;
});
_parcelHelpers.export(exports, "mapRange", function () {
  return mapRange;
});
_parcelHelpers.export(exports, "setY", function () {
  return setY;
});
_parcelHelpers.export(exports, "setYZero", function () {
  return setYZero;
});
_parcelHelpers.export(exports, "flattenY", function () {
  return flattenY;
});
_parcelHelpers.export(exports, "isVoxelEnclosed", function () {
  return isVoxelEnclosed;
});
_parcelHelpers.export(exports, "removeEnclosedVoxels", function () {
  return removeEnclosedVoxels;
});
_parcelHelpers.export(exports, "startLoop", function () {
  return startLoop;
});
_parcelHelpers.export(exports, "range", function () {
  return range;
});
var _fpTsLibFunction = require('fp-ts/lib/function');
var _libVec = require('../lib/vec3');
const randomVector = (maxMag = 2) => [0, 1, 2].map(() => (Math.random() - 0.5) * maxMag);
const vec3ToColor = v => `rgb(${_libVec.round(v).join(",")})`;
const randomColor = () => `rgb(${[0, 1, 2].map(() => Math.round(Math.random() * 255)).join(",")})`;
const randomRange = (min, max) => min + (max - min) + Math.random();
const scaleVector = scale => vec => [vec[0] * scale, vec[1] * scale];
const randomUnitVector = () => _libVec.normalize([0, 1, 2].map(() => Math.random() - 0.5));
const createArray = length => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr[i] = i;
  }
  return arr;
};
function normalize(from, to, value) {
  return (value - from) / (to - from);
}
function interpolate(from, to, value) {
  return from + (to - from) * value;
}
const mapRange = (range1, range2, value) => {
  const relVal = value - range1[0];
  const scale = (range2[1] - range2[0]) / (range1[1] - range1[0]);
  return range2[0] + relVal * scale;
};
const setY = y => v => [v[0], y, v[2]];
const setYZero = setY(0);
const flattenY = _fpTsLibFunction.flow(setYZero, _libVec.normalize);
const voxelExistsAt = (voxels, point) => {
  return voxels.some(v => _libVec.equal(v, point));
};
const voxelExistsOrIsGroundAt = voxels => point => {
  if (point[1] < 0) return true;
  return voxelExistsAt(voxels, point);
};
const enclosingOffsets = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
const isVoxelEnclosed = voxels => voxel => {
  return enclosingOffsets.map(offset => _libVec.add(voxel, offset)).every(voxelExistsOrIsGroundAt(voxels));
};
function removeEnclosedVoxels(voxels) {
  return voxels.filter(_fpTsLibFunction.not(isVoxelEnclosed(voxels)));
}
const startLoop = onLoop => {
  let accumTime = 0;
  let prevTime = 0;
  const loop = () => {
    const curTime = window.performance.now();
    const deltaTime = (curTime - prevTime) / 1000;
    accumTime += deltaTime;
    prevTime = curTime;
    onLoop({
      dt: deltaTime,
      t: accumTime
    });
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
};
function range(start, end) {
  const array = [];
  for (let i = start; i < end; i++) {
    array.push(i);
  }
  return array;
}

},{"fp-ts/lib/function":"2ewLd","../lib/vec3":"35rAi","@parcel/transformer-js/lib/esmodule-helpers.js":"3tkE2"}],"2wb4Y":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "add", function () {
  return add;
});
_parcelHelpers.export(exports, "multiply", function () {
  return multiply;
});
_parcelHelpers.export(exports, "subtract", function () {
  return subtract;
});
_parcelHelpers.export(exports, "divide", function () {
  return divide;
});
_parcelHelpers.export(exports, "isZero", function () {
  return isZero;
});
_parcelHelpers.export(exports, "magnitude", function () {
  return magnitude;
});
_parcelHelpers.export(exports, "normalize", function () {
  return normalize;
});
_parcelHelpers.export(exports, "distance", function () {
  return distance;
});
_parcelHelpers.export(exports, "dot", function () {
  return dot;
});
_parcelHelpers.export(exports, "mapComponents", function () {
  return mapComponents;
});
_parcelHelpers.export(exports, "signedAngle", function () {
  return signedAngle;
});
_parcelHelpers.export(exports, "round", function () {
  return round;
});
_parcelHelpers.export(exports, "vector2", function () {
  return vector2;
});
_parcelHelpers.export(exports, "interpolate", function () {
  return interpolate;
});
var _srcUtil = require('../src/util');
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const multiply = (vector, scalar) => [vector[0] * scalar, vector[1] * scalar];
const subtract = (a, b) => add(a, multiply(b, -1));
const divide = (vector, denominator) => multiply(vector, 1 / denominator);
const isZero = vector => vector.every(component => component === 0);
const magnitude = vector => Math.hypot(...vector);
const normalize = vector => isZero(vector) ? [0, 0] : divide(vector, magnitude(vector));
const distance = (a, b) => magnitude(subtract(a, b));
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const mapComponents = map => v => {
  return [map(v[0]), map(v[1])];
};
const signedAngle = (a, b) => {
  const angleSign = -Math.sign(a[1] * b[0] - a[0] * b[1]);
  return Math.acos(dot(a, b)) * angleSign;
};
const round = mapComponents(Math.round);
const vector2 = (x, y) => [x, y];
const interpolate = (a, b, t) => vector2(_srcUtil.interpolate(a[0], b[0], t), _srcUtil.interpolate(a[1], b[1], t));

},{"../src/util":"5HQhk","@parcel/transformer-js/lib/esmodule-helpers.js":"3tkE2"}]},["4UKJc","3rfh7"], "3rfh7", "parcelRequire60de")

//# sourceMappingURL=index.7cacc1f4.js.map
