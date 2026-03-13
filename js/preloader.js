document.addEventListener('DOMContentLoaded', function() {
    // Только hero-изображения — сайт показывается сразу после их загрузки
    const isMobile = window.innerWidth < 768;
    const images = [
        isMobile ? 'assets/glavn2.png' : 'assets/glavn0.png'
    ];

    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('mainContent');
    const progressBar = document.getElementById('preloaderProgress');
    const counter = document.getElementById('preloaderCounter');
    
    let loadedImages = 0;
    const totalImages = images.length;
    
    // Массив цитат для смены во время загрузки
    const quotes = [
        'Память — единственный рай, из которого нас нельзя изгнать.',
        'Вечность — это время, когда идеальные становятся реальностью.',
        'Камень хранит память дольше, чем слова.',
        'Достойное прощание — последний дар любви.',
        '20 лет заботы о памяти ваших близких.'
    ];
    
    // СОЗДАЕМ ОТДЕЛЬНЫЙ КОНТЕЙНЕР ДЛЯ ЦИТАТ (вне анимированного блока)
    const quoteContainer = document.createElement('div');
    quoteContainer.style.cssText = `
        position: relative;
        z-index: 10;
        margin-top: 30px;
        min-height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const quoteElement = document.createElement('div');
    quoteElement.style.cssText = `
        color: rgba(154,138,101,0.8);
        font-size: 13px;
        max-width: 300px;
        text-align: center;
        font-style: italic;
        line-height: 1.6;
        padding: 10px 15px;
        background: rgba(0,0,0,0.2);
        border-radius: 30px;
        backdrop-filter: blur(5px);
        border: 1px solid rgba(154,138,101,0.2);
        transition: opacity 0.5s ease;
        opacity: 1;
    `;
    quoteElement.textContent = quotes[0];
    
    quoteContainer.appendChild(quoteElement);
    
    // Добавляем контейнер с цитатами в прелоадер (после основного блока)
    const preloaderContent = document.querySelector('#preloader > div');
    if (preloaderContent) {
        preloaderContent.appendChild(quoteContainer);
    }
    
    let quoteIndex = 0;
    
    // Функция смены цитаты без дерганий
    function changeQuote() {
        quoteIndex = (quoteIndex + 1) % quotes.length;
        
        // Плавно исчезает
        quoteElement.style.opacity = '0';
        
        setTimeout(() => {
            // Меняем текст
            quoteElement.textContent = quotes[quoteIndex];
            // Плавно появляется
            quoteElement.style.opacity = '1';
        }, 400); // Половина времени анимации
    }
    
    // Запускаем смену цитат каждые 3 секунды
    let quoteInterval = setInterval(changeQuote, 3000);
    
    // Функция обновления прогресса
    function updateProgress() {
        const percentage = Math.round((loadedImages / totalImages) * 100);
        if (progressBar) progressBar.style.width = percentage + '%';
        if (counter) counter.textContent = percentage + '%';
        
        // Меняем цвет прогресс-бара в зависимости от прогресса
        if (percentage > 70) {
            progressBar.style.background = 'linear-gradient(90deg, #C9A96E, #E5D5A6)';
        } else if (percentage > 40) {
            progressBar.style.background = 'linear-gradient(90deg, #9A8A65, #C9A96E)';
        }
        
        // Если все изображения загружены
        if (loadedImages === totalImages) {
            clearInterval(quoteInterval); // Останавливаем смену цитат
            setTimeout(() => {
                if (preloader) {
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';
                }
                if (mainContent) {
                    mainContent.style.opacity = '1';
                }
                document.body.style.overflow = 'auto';
            }, 500);
        }
    }
    
    // Блокируем прокрутку во время загрузки
    document.body.style.overflow = 'hidden';
    
    // Если нет изображений для загрузки
    if (totalImages === 0) {
        clearInterval(quoteInterval);
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }
        if (mainContent) {
            mainContent.style.opacity = '1';
        }
        document.body.style.overflow = 'auto';
        return;
    }
    
    // Загружаем каждое изображение
    images.forEach(src => {
        const img = new Image();
        
        img.onload = function() {
            loadedImages++;
            updateProgress();
        };
        
        img.onerror = function() {
            console.warn('Failed to load image:', src);
            loadedImages++;
            updateProgress();
        };
        
        img.src = src;
    });
    
    // Таймаут на случай, если изображение не загрузится
    setTimeout(() => {
        if (loadedImages < totalImages) {
            console.warn('Preloader timeout - forcing site to show');
            clearInterval(quoteInterval);
            if (preloader) {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }
            if (mainContent) {
                mainContent.style.opacity = '1';
            }
            document.body.style.overflow = 'auto';
        }
    }, 3000);
});