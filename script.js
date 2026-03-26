const API_KEY = "ENTER_YOUR_API_KEY";
const EXCHANGE_API = `https://open.er-api.com/v6/latest`;
const CURRENCY_LIST = {
  USD: "United States Dollar",
  EUR: "Euro",
  INR: "Indian Rupee",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  CAD: "Canadian Dollar",
  AUD: "Australian Dollar",
  CNY: "Chinese Yuan",
  AED: "UAE Dirham",
  CHF: "Swiss Franc",
  SGD: "Singapore Dollar",
  NZD: "New Zealand Dollar",
  HKD: "Hong Kong Dollar",
  SEK: "Swedish Krona",
  NOK: "Norwegian Krone",
  DKK: "Danish Krone",
  ZAR: "South African Rand",
  BRL: "Brazilian Real",
  MXN: "Mexican Peso",
  KRW: "South Korean Won",
  TRY: "Turkish Lira",
  RUB: "Russian Ruble",
  PLN: "Polish Zloty",
  THB: "Thai Baht",
  IDR: "Indonesian Rupiah",
  SAR: "Saudi Riyal",
  MYR: "Malaysian Ringgit",
  ILS: "Israeli Shekel",
  CZK: "Czech Koruna",
  HUF: "Hungarian Forint",
  CLP: "Chilean Peso",
  PHP: "Philippine Peso",
  COP: "Colombian Peso",
  ARS: "Argentine Peso",
  VND: "Vietnamese Dong",
  EGP: "Egyptian Pound",
  NGN: "Nigerian Naira",
  KWD: "Kuwaiti Dinar",
};

const COUNTRIES = {
  USD: { country: "United States", code: "US" },
  EUR: { country: "European Union", code: "EU" },
  INR: { country: "India", code: "IN" },
  GBP: { country: "United Kingdom", code: "GB" },
  JPY: { country: "Japan", code: "JP" },
  CAD: { country: "Canada", code: "CA" },
  AUD: { country: "Australia", code: "AU" },
  CNY: { country: "China", code: "CN" },
  AED: { country: "United Arab Emirates", code: "AE" },
  CHF: { country: "Switzerland", code: "CH" },
  SGD: { country: "Singapore", code: "SG" },
  NZD: { country: "New Zealand", code: "NZ" },
  HKD: { country: "Hong Kong", code: "HK" },
  SEK: { country: "Sweden", code: "SE" },
  NOK: { country: "Norway", code: "NO" },
  DKK: { country: "Denmark", code: "DK" },
  ZAR: { country: "South Africa", code: "ZA" },
  BRL: { country: "Brazil", code: "BR" },
  MXN: { country: "Mexico", code: "MX" },
  KRW: { country: "South Korea", code: "KR" },
  TRY: { country: "Turkey", code: "TR" },
  RUB: { country: "Russia", code: "RU" },
  PLN: { country: "Poland", code: "PL" },
  THB: { country: "Thailand", code: "TH" },
  IDR: { country: "Indonesia", code: "ID" },
  SAR: { country: "Saudi Arabia", code: "SA" },
  MYR: { country: "Malaysia", code: "MY" },
  ILS: { country: "Israel", code: "IL" },
  CZK: { country: "Czech Republic", code: "CZ" },
  HUF: { country: "Hungary", code: "HU" },
  CLP: { country: "Chile", code: "CL" },
  PHP: { country: "Philippines", code: "PH" },
  COP: { country: "Colombia", code: "CO" },
  ARS: { country: "Argentina", code: "AR" },
  VND: { country: "Vietnam", code: "VN" },
  EGP: { country: "Egypt", code: "EG" },
  NGN: { country: "Nigeria", code: "NG" },
  KWD: { country: "Kuwait", code: "KW" },
};

const symbolMap = {
  USD: "$", EUR: "€", INR: "₹", GBP: "£", JPY: "¥", CAD: "C$", AUD: "A$", CNY: "¥", AED: "د.إ", CHF: "CHF",
  SGD: "S$", NZD: "NZ$", HKD: "HK$", SEK: "kr", NOK: "kr", DKK: "kr", ZAR: "R", BRL: "R$", MXN: "MX$", KRW: "₩",
  TRY: "₺", RUB: "₽", PLN: "zł", THB: "฿", IDR: "Rp", SAR: "﷼", MYR: "RM", ILS: "₪", CZK: "Kč", HUF: "Ft",
  CLP: "$", PHP: "₱", COP: "$", ARS: "$", VND: "₫", EGP: "E£", NGN: "₦", KWD: "د.ك",
};

// 3D Globe Setup
const threeEnabled = typeof THREE !== 'undefined';
let globeScene, globeCamera, globeRenderer, globeMesh, symbolGroup, lineGroup;
const earthSpeeds = { rotate: 0.0008, cameraLerp: 0.05 };
const mouse = threeEnabled ? new THREE.Vector2(0, 0) : { x: 0, y: 0 };
if (!threeEnabled) {
  console.warn('Three.js not available; 3D globe disabled.');
}

const COUNTRY_COORDINATES = {
  USD: { lat: 38.0, lon: -97.0 },
  EUR: { lat: 48.5, lon: 11.4 },
  INR: { lat: 20.3, lon: 78.9 },
  GBP: { lat: 51.5, lon: -0.1 },
  JPY: { lat: 35.7, lon: 139.7 },
  CAD: { lat: 56.1, lon: -106.3 },
  AUD: { lat: -25.0, lon: 133.8 },
  CNY: { lat: 35.9, lon: 104.2 },
  AED: { lat: 24.4, lon: 54.4 },
  CHF: { lat: 46.8, lon: 8.2 },
  INR: { lat: 20.3, lon: 78.9 },
  SGD: { lat: 1.35, lon: 103.8 },
  NZD: { lat: -40.9, lon: 174.8 },
  HKD: { lat: 22.3, lon: 114.2 },
  SEK: { lat: 60.1, lon: 18.6 },
  NOK: { lat: 60.5, lon: 8.5 },
  DKK: { lat: 55.7, lon: 12.6 },
  ZAR: { lat: -30.6, lon: 22.9 },
  BRL: { lat: -14.2, lon: -51.9 },
  MXN: { lat: 23.6, lon: -102.5 },
  KRW: { lat: 36.0, lon: 128.0 },
  TRY: { lat: 39.0, lon: 35.2 },
  RUB: { lat: 61.5, lon: 105.3 },
  PLN: { lat: 52.2, lon: 21.0 },
  THB: { lat: 15.9, lon: 100.9 },
  IDR: { lat: -2.5, lon: 118.0 },
  SAR: { lat: 23.9, lon: 45.2 },
  MYR: { lat: 4.2, lon: 101.7 },
  ILS: { lat: 31.8, lon: 34.8 },
  CZK: { lat: 49.8, lon: 15.5 },
  HUF: { lat: 47.1, lon: 19.4 },
  CLP: { lat: -35.7, lon: -71.5 },
  PHP: { lat: 12.9, lon: 121.8 },
  COP: { lat: 4.6, lon: -74.1 },
  ARS: { lat: -34.6, lon: -58.4 },
  VND: { lat: 14.0, lon: 108.3 },
  EGP: { lat: 26.8, lon: 30.8 },
  NGN: { lat: 9.1, lon: 8.7 },
  KWD: { lat: 29.3, lon: 47.7 },
};

function geoToVec3(lat, lon, radius = 2.2) {
  if (!threeEnabled) return { x: 0, y: 0, z: 0 };
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function createTextSprite(text, color = '#ffffff') {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(40, 44, 52, 0.85)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = 'bold 36px Arial';
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new THREE.CanvasTexture(canvas);
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(0.9, 0.45, 1);
  return sprite;
}

function createGlobeLine(fromVec, toVec) {
  const curve = new THREE.CatmullRomCurve3([fromVec, fromVec.clone().multiplyScalar(1.15), toVec]);
  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0x00d3c8, transparent: true, opacity: 0.65 });
  return new THREE.Line(geometry, material);
}

function updateGlobePath(fromCode, toCode) {
  if (!threeEnabled || !lineGroup || !COUNTRY_COORDINATES[fromCode] || !COUNTRY_COORDINATES[toCode]) return;
  lineGroup.clear?.();
  const source = COUNTRY_COORDINATES[fromCode];
  const target = COUNTRY_COORDINATES[toCode];
  const fromV = geoToVec3(source.lat, source.lon);
  const toV = geoToVec3(target.lat, target.lon);
  const line = createGlobeLine(fromV, toV);
  lineGroup.add(line);
}

function initGlobe3D() {
  if (!threeEnabled) {
    const container = document.getElementById('threeContainer');
    if (container) container.style.display = 'none';
    return;
  }

  try {
    const canvas = document.getElementById('globeCanvas');
    globeRenderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    globeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    globeRenderer.setSize(window.innerWidth, window.innerHeight);

    globeScene = new THREE.Scene();
    globeCamera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 1000);
    globeCamera.position.set(0, 0, 6.4);

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    globeScene.add(ambient);
    const dir = new THREE.DirectionalLight(0xf7f7ff, 0.6);
    dir.position.set(5, 3, 5);
    globeScene.add(dir);

    const sphere = new THREE.SphereGeometry(2.2, 36, 36);
    const globeMaterial = new THREE.MeshStandardMaterial({
      color: 0x101f40,
      roughness: 0.8,
      metalness: 0.2,
      map: null,
      emissive: 0x001c3f,
      emissiveIntensity: 0.15,
      transparent: true,
      opacity: 0.98,
    });
    globeMesh = new THREE.Mesh(sphere, globeMaterial);
    globeMesh.rotateY(Math.PI);
    globeScene.add(globeMesh);

    lineGroup = new THREE.Group();
    globeScene.add(lineGroup);

    symbolGroup = new THREE.Group();
    ['$', '₹', '€', '¥'].forEach((symbol, idx) => {
      const sprite = createTextSprite(symbol, '#44e6ff');
      const angle = idx * (Math.PI / 2);
      sprite.position.set(Math.cos(angle) * 3.1, Math.sin(angle) * 2.4, -1.5);
      symbolGroup.add(sprite);
    });
    globeScene.add(symbolGroup);

    window.addEventListener('resize', () => {
      globeCamera.aspect = window.innerWidth / window.innerHeight;
      globeCamera.updateProjectionMatrix();
      globeRenderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    function animateGlobe() {
      requestAnimationFrame(animateGlobe);
      globeMesh.rotation.y += earthSpeeds.rotate;
      globeMesh.rotation.x += earthSpeeds.rotate * 0.12;
      const targetX = mouse.x * 0.1;
      const targetY = mouse.y * 0.07;
      globeCamera.position.x += (targetX - globeCamera.position.x) * earthSpeeds.cameraLerp;
      globeCamera.position.y += (targetY - globeCamera.position.y) * earthSpeeds.cameraLerp;
      globeCamera.lookAt(0, 0, 0);

      symbolGroup.children.forEach((sprite, idx) => {
        sprite.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.001 * (idx + 0.6));
      });

      globeRenderer.render(globeScene, globeCamera);
    }

    animateGlobe();
    updateGlobePath('USD', 'INR');
  } catch (err) {
    console.warn('3D globe initialization failed:', err);
    document.getElementById('threeContainer').style.display = 'none';
  }
}

function setJoinPath(from, to) {
  updateGlobePath(from, to);
}

const fromSelect = document.getElementById("fromSelect");
const toSelect = document.getElementById("toSelect");
const amountInput = document.getElementById("amountInput");
const resultValue = document.getElementById("resultValue");
const loadingEl = document.getElementById("loading");
const fromFlag = document.getElementById("fromFlag");
const toFlag = document.getElementById("toFlag");
const fromCountry = document.getElementById("fromCountry");
const toCountry = document.getElementById("toCountry");
const fromCurr = document.getElementById("fromCurr");
const toCurr = document.getElementById("toCurr");
const swapBtn = document.getElementById("swapBtn");
const themeBtn = document.getElementById("themeBtn");
const app = document.getElementById("app");
const historyList = document.getElementById("historyList");

function setLocalHistory(data) {
  const existing = JSON.parse(localStorage.getItem("currencyHistory") || "[]");
  existing.unshift(data);
  localStorage.setItem("currencyHistory", JSON.stringify(existing.slice(0, 8)));
  renderHistory();
}
function renderHistory() {
  const lis = JSON.parse(localStorage.getItem("currencyHistory") || "[]");
  historyList.innerHTML = lis
    .map(item => `<li>${item.amount} ${item.from} => ${item.converted} ${item.to} (${item.rate.toFixed(4)})</li>`)
    .join("") || "<li>No saved conversions yet.</li>";
}

function getFlagUrl(code) {
  if (!code) return "";
  const iso = COUNTRIES[code]?.code?.toLowerCase() || code.toLowerCase();
  return `https://flagcdn.com/48x36/${iso}.png`;
}

function updateInfo() {
  const from = fromSelect.value;
  const to = toSelect.value;
  fromFlag.src = getFlagUrl(from);
  toFlag.src = getFlagUrl(to);
  fromCountry.textContent = `From: ${COUNTRIES[from]?.country || "Unknown"}`;
  toCountry.textContent = `To: ${COUNTRIES[to]?.country || "Unknown"}`;
  fromCurr.textContent = `Currency: ${CURRENCY_LIST[from] || "Unknown"} (${from})`;
  toCurr.textContent = `Currency: ${CURRENCY_LIST[to] || "Unknown"} (${to})`;
}

async function fetchRates(base = "USD") {
  loadingEl.classList.remove("hidden");
  try {
    const res = await fetch(`${EXCHANGE_API}/${base}`);
    const data = await res.json();
    if (data.result !== "success" && data.result !== "ok") {
      throw new Error("API request failed");
    }
    return data.rates || data.conversion_rates || {};
  } catch (err) {
    resultValue.textContent = "Error loading rates";
    return null;
  } finally {
    loadingEl.classList.add("hidden");
  }
}

async function convert() {
  const amount = Number(amountInput.value || 0);
  const from = fromSelect.value;
  const to = toSelect.value;
  if (!amount || !from || !to) return;

  const fromRates = await fetchRates(from);
  if (!fromRates || !fromRates[to]) { resultValue.textContent = "Rate not available"; return; }

  const rate = fromRates[to];
  const converted = amount * rate;
  resultValue.innerHTML = `${symbolMap[to] || ""} ${converted.toFixed(4)}`;
  setLocalHistory({ amount, from, to, rate, converted: converted.toFixed(4) });
  setJoinPath(from, to);
}

function populateSelects() {
  const keys = Object.keys(CURRENCY_LIST).sort();
  keys.forEach(code => {
    const option1 = document.createElement("option");
    option1.value = code;
    option1.textContent = `${code} - ${CURRENCY_LIST[code]}`;
    const option2 = option1.cloneNode(true);
    fromSelect.appendChild(option1);
    toSelect.appendChild(option2);
  });
  fromSelect.value = "USD";
  toSelect.value = "INR";
}

swapBtn.addEventListener("click", () => {
  [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];
  updateInfo();
  convert();
  setJoinPath(fromSelect.value, toSelect.value);
});

themeBtn.addEventListener("click", () => app.classList.toggle("dark"));

[amountInput, fromSelect, toSelect].forEach(el => {
  el.addEventListener("input", () => { updateInfo(); convert(); });
});

function startApp() {
  populateSelects();
  renderHistory();
  updateInfo();
  convert();
  initGlobe3D();
  setInterval(convert, 90000);
}

document.addEventListener("DOMContentLoaded", () => {
  const appContainer = document.getElementById("app");
  const threeContainerEl = document.getElementById("threeContainer");
  const splash = document.getElementById("splash");

  if (appContainer) appContainer.style.display = "none";
  if (threeContainerEl) threeContainerEl.style.display = "none";

  setTimeout(() => {
    if (splash) splash.style.display = "none";
    if (appContainer) appContainer.style.display = "grid";
    if (threeContainerEl) threeContainerEl.style.display = "block";

    startApp();
  }, 3000);
});
