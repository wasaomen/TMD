document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.classList.add('fade-out');
        
        setTimeout(function() {
            loadingScreen.style.display = 'none';
            // メインコンテンツのフェードイン
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.8s ease-in-out';
            setTimeout(function() {
                document.body.style.opacity = '1';
            }, 50);
        }, 800);
    }, 3000);
}); 