document.addEventListener('DOMContentLoaded', function() {
    // Список всех изображений для загрузки
    const images = [
        // Логотипы и иконки
        'assets/logo.png',
        'assets/icon.png',
        'assets/favicon.ico',
        
        // Hero изображения
        'assets/glavn0.png',
        'assets/glavn2.png',
        
        // Изображения памятников
        'assets/pam1.jpg',
        'assets/pam2.jpg',
        'assets/pam3.jpg',
        
        // Изображения гробов
        'assets/kos1.jpg',
        'assets/kos2.jpg',
        'assets/gran1.jpg',
        'assets/gran2.jpg',
        'assets/pol1.jpg',
        'assets/pol2.jpg',
        'assets/sarc1.jpg',
        'assets/rezn1.jpg',
        'assets/rezn2.jpg',
        
        // Другие изображения
        'assets/about.jpg',
        'assets/car.png',
        'assets/plane.png',
        'assets/tgk1.png',
        
        // Внешние изображения (из Unsplash)
        'https://images.unsplash.com/photo-1471970471555-19d4b113e9ed?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1445445290350-18a3b86e0b5a?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1455659817273-f96807779a8a?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1445445290350-18a3b86e0b5a?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?auto=format&fit=crop&w=800&q=80'
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
    
    // Таймаут на случай, если какие-то изображения не загрузятся
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
    }, 8000);
});