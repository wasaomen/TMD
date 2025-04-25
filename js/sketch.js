document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('sketchCanvas');
  const ctx = canvas.getContext('2d');
  const clearBtn = document.getElementById('clearBtn');
  const saveBtn = document.getElementById('saveBtn');
  const colorOptions = document.querySelectorAll('.color-option');
  const sketchList = document.getElementById('sketchList');

  // キャンバスのサイズを設定
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // 初期化
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let isDrawing = false;
  let currentColor = '#ffffff';
  let lastX = 0;
  let lastY = 0;

  // 描画イベントの設定
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseout', stopDrawing);

  // タッチイベントの設定
  canvas.addEventListener('touchstart', handleTouch);
  canvas.addEventListener('touchmove', handleTouch);
  canvas.addEventListener('touchend', stopDrawing);

  function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(
      e.type === 'touchstart' ? 'mousedown' : 'mousemove',
      {
        clientX: touch.clientX,
        clientY: touch.clientY
      }
    );
    canvas.dispatchEvent(mouseEvent);
  }

  function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }

  function draw(e) {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }

  function stopDrawing() {
    isDrawing = false;
  }

  // 色の選択
  colorOptions.forEach(option => {
    option.addEventListener('click', () => {
      currentColor = option.dataset.color;
      colorOptions.forEach(opt => opt.style.border = '2px solid #fff');
      option.style.border = '2px solid #0ff';
    });
  });

  // クリアボタン
  clearBtn.addEventListener('click', () => {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });

  // 保存ボタン
  saveBtn.addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const timestamp = new Date().toISOString();
    
    // ローカルストレージに保存
    const sketches = JSON.parse(localStorage.getItem('sketches') || '[]');
    sketches.push({
      id: Date.now(),
      dataURL,
      timestamp
    });
    localStorage.setItem('sketches', JSON.stringify(sketches));
    
    // スケッチリストを更新
    updateSketchList();
    alert('スケッチを保存しました');
  });

  // スケッチリストの更新
  function updateSketchList() {
    const sketches = JSON.parse(localStorage.getItem('sketches') || '[]');
    sketchList.innerHTML = '';
    
    if (sketches.length === 0) {
      sketchList.innerHTML = '<p style="color: #0ff; text-align: center;">保存されたスケッチはありません</p>';
      return;
    }
    
    sketches.forEach(sketch => {
      const sketchItem = document.createElement('div');
      sketchItem.className = 'sketch-item';
      sketchItem.innerHTML = `
        <img src="${sketch.dataURL}" alt="スケッチ">
        <p>${new Date(sketch.timestamp).toLocaleString()}</p>
      `;
      
      // スケッチをクリックで表示
      sketchItem.addEventListener('click', () => {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        };
        img.onerror = () => {
          alert('画像の読み込みに失敗しました');
        };
        img.src = sketch.dataURL;
      });
      
      sketchList.appendChild(sketchItem);
    });
  }

  // 初期表示時にスケッチリストを更新
  updateSketchList();
}); 