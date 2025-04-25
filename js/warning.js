document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.site-logo');
    const warningScreen = document.createElement('div');
    const warningSound = document.getElementById('warning-sound');
    warningScreen.className = 'warning-screen';
    warningScreen.innerHTML = `
        <div class="warning-text">警告</div>
        <div class="warning-message">TMDはこのサイトを安全と主張した。</div>
    `;
    document.body.appendChild(warningScreen);

    logo.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // 警告画面を表示
        warningScreen.classList.add('active');
        
        // 警告音を再生（ループなし）
        warningSound.currentTime = 0;
        warningSound.play();
        
        // 5秒後に警告画面を非表示
        setTimeout(function() {
            warningScreen.classList.remove('active');
        }, 5000);
    });

    // 警告画面が表示されている間は他のクリックイベントを防止
    warningScreen.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
}); 