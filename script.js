function openApp(appName) {
    const apps = document.querySelectorAll('.app');
    apps.forEach(app => app.style.display = 'none');
    document.getElementById('apps').style.display = 'block';
    document.getElementById(appName).style.display = 'block';
}

document.getElementById('weather-widget').addEventListener('click', function() {
    openApp('weather');
});

document.getElementById('clock-widget').addEventListener('click', function() {
    openApp('clock');
});

function calcInput(value) {
    document.getElementById('calc-display').value += value;
}

function calcClear() {
    document.getElementById('calc-display').value = '';
}

function calcCalculate() {
    const display = document.getElementById('calc-display');
    try {
        display.value = eval(display.value);
    } catch {
        display.value = 'エラー';
    }
}

let currentImageIndex = 1;
function nextImage() {
    currentImageIndex++;
    if (currentImageIndex > 3) currentImageIndex = 1;
    document.getElementById('gallery-img').src = `gallery-image${currentImageIndex}.jpg`;
}

function changeBackground() {
    document.body.style.backgroundImage = "url('new-background.jpg')";
}

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock-display').textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();

// ドラッグ時にウィンドウとヘッダーが連動して移動するように調整
function addWindowControls(appId) {
    const app = document.getElementById(appId);
    const header = document.createElement('div');
    header.classList.add('app-header');
    
    const minimizeBtn = document.createElement('button');
    minimizeBtn.textContent = '－';
    minimizeBtn.onclick = () => app.style.display = 'none';
    
    const maximizeBtn = document.createElement('button');
    maximizeBtn.textContent = '□';
    maximizeBtn.onclick = () => {
        if (app.classList.contains('maximized')) {
            app.classList.remove('maximized');
            app.style.width = '';
            app.style.height = '';
            app.style.top = '';
            app.style.left = '';
        } else {
            app.classList.add('maximized');
            app.style.width = '100%';
            app.style.height = '100%';
            app.style.top = '0';
            app.style.left = '0';
        }
    };
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.onclick = () => app.style.display = 'none';
    
    header.appendChild(minimizeBtn);
    header.appendChild(maximizeBtn);
    header.appendChild(closeBtn);
    
    app.insertBefore(header, app.firstChild);
    
    let initialX, initialY;
    let initialAppX, initialAppY;

    // ドラッグ機能の追加
    header.onmousedown = function(e) {
        isDragging = true;
        initialX = e.clientX;
        initialY = e.clientY;
        const appRect = app.getBoundingClientRect();
        initialAppX = appRect.left;
        initialAppY = appRect.top;
    };
    
    document.onmousemove = function(e) {
        if (isDragging) {
            const deltaX = e.clientX - initialX;
            const deltaY = e.clientY - initialY;
            app.style.left = initialAppX + deltaX + 'px';
            app.style.top = initialAppY + deltaY + 'px';
        }
    };
    
    document.onmouseup = function() {
        isDragging = false;
    };

    // タッチ対応のドラッグ機能
    header.ontouchstart = function(e) {
        isDragging = true;
        const touch = e.touches[0];
        initialX = touch.clientX;
        initialY = touch.clientY;
        const appRect = app.getBoundingClientRect();
        initialAppX = appRect.left;
        initialAppY = appRect.top;
    };
    
    document.ontouchmove = function(e) {
        if (isDragging) {
            const touch = e.touches[0];
            const deltaX = touch.clientX - initialX;
            const deltaY = touch.clientY - initialY;
            app.style.left = initialAppX + deltaX + 'px';
            app.style.top = initialAppY + deltaY + 'px';
        }
    };
    
    document.ontouchend = function() {
        isDragging = false;
    };
}

// 各アプリにウィンドウ操作を追加
['notepad', 'weather', 'calculator', 'gallery', 'music', 'browser', 'settings', 'clock'].forEach(appId => {
    addWindowControls(appId);
});

function toggleStartMenu() {
    const startMenu = document.getElementById('startMenu');
    startMenu.style.display = startMenu.style.display === 'none' ? 'block' : 'none';
}

// ダークモードの切り替え
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// ウィンドウを開く関数
function openApp(appId) {
    const app = document.getElementById(appId);
    app.style.display = 'block';
    toggleStartMenu(); // スタートメニューを閉じる
}
