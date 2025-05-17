// scripts.js
let prevButton = document.getElementById('prev');
let nextButton = document.getElementById('next');
let container = document.querySelector('.container');
let items = container.querySelectorAll('.list .item');
let indicator = document.querySelector('.indicators');
let dots = indicator.querySelectorAll('ul li');
let numberElement = indicator.querySelector('.number');

let active = 0;
let firstPosition = 0;
let lastPosition = items.length - 1;
let autoSlideInterval;

// Função para atualizar o slide
function updateSlide(newActive) {
    // Remove a classe active do item atual
    items[active].classList.remove('active');
    dots[active].classList.remove('active');
    
    // Atualiza o índice ativo
    active = newActive;
    
    // Adiciona a classe active ao novo item
    items[active].classList.add('active');
    dots[active].classList.add('active');
    
    // Atualiza o número do slide
    numberElement.textContent = `0${active + 1}`;
}

// Evento para o botão next
nextButton.onclick = () => {
    let newActive = active + 1 > lastPosition ? firstPosition : active + 1;
    updateSlide(newActive);
    resetAutoSlide();
}

// Evento para o botão prev
prevButton.onclick = () => {
    let newActive = active - 1 < firstPosition ? lastPosition : active - 1;
    updateSlide(newActive);
    resetAutoSlide();
}

// Adiciona navegação pelos dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        updateSlide(index);
        resetAutoSlide();
    });
});

// Adiciona navegação por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextButton.click();
    } else if (e.key === 'ArrowLeft') {
        prevButton.click();
    }
});

// Função para slides automáticos
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextButton.click();
    }, 5000); // Muda a cada 5 segundos
}

// Função para resetar o auto slide quando o usuário interage
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Inicia o slideshow automático
startAutoSlide();

// Pausa o slideshow quando o mouse está sobre o carrossel
container.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

// Retoma o slideshow quando o mouse sai do carrossel
container.addEventListener('mouseleave', () => {
    startAutoSlide();
});