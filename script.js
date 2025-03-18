// Función para manejar el scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Función para cambiar el color de fondo con efecto de gradiente
function cambiarColorFondo() {
    const gradientes = [
        'linear-gradient(45deg, #121212, #1a1a1a)',
        'linear-gradient(45deg, #1a1a1a, #121212)',
        'linear-gradient(45deg, #0a0a0a, #1a1a1a)'
    ];
    const gradienteActual = document.body.style.background;
    const gradienteIndex = gradientes.indexOf(gradienteActual);
    const siguienteGradiente = gradientes[(gradienteIndex + 1) % gradientes.length];
    document.body.style.background = siguienteGradiente;
}

// Función para mostrar ofertas especiales
function mostrarMensaje() {
    const mensaje = document.getElementById('mensaje');
    const ofertas = [
        {
            texto: '¡20% OFF en zapatos de vestir!',
            color: '#ff6b00'
        },
        {
            texto: '¡Oferta especial en deportivos!',
            color: '#ff3e00'
        },
        {
            texto: '¡Segundo par con 50% de descuento!',
            color: '#ff6b00'
        },
        {
            texto: '¡Envío gratis en compras superiores a $200!',
            color: '#ff3e00'
        }
    ];
    
    const ofertaAleatoria = ofertas[Math.floor(Math.random() * ofertas.length)];
    
    mensaje.style.backgroundColor = ofertaAleatoria.color;
    mensaje.style.padding = '1rem';
    mensaje.style.borderRadius = '4px';
    mensaje.style.color = '#ffffff';
    mensaje.style.fontWeight = 'bold';
    mensaje.style.textAlign = 'center';
    mensaje.innerHTML = ofertaAleatoria.texto;
    
    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
        mensaje.innerHTML = '';
        mensaje.style.backgroundColor = '';
        mensaje.style.padding = '';
        mensaje.style.borderRadius = '';
        mensaje.style.color = '';
        mensaje.style.fontWeight = '';
        mensaje.style.textAlign = '';
    }, 3000);
}

// Función para animar los números en la sección de estadísticas
function animarNumeros() {
    const stats = document.querySelectorAll('.stat-item h3');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        
        const updateNumber = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.round(current) + (stat.textContent.includes('K') ? 'K+' : '%');
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target + (stat.textContent.includes('K') ? 'K+' : '%');
            }
        };
        
        updateNumber();
    });
}

// Función para manejar el formulario de newsletter
function manejarNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    if (email) {
        alert('¡Gracias por suscribirte! Te enviaremos las últimas ofertas.');
        e.target.reset();
    }
}

// Función para agregar efecto hover a las tarjetas de productos
function agregarEfectoHover() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Botón para cambiar el color de fondo
    const botonColor = document.getElementById('cambiarColor');
    if (botonColor) {
        botonColor.addEventListener('click', cambiarColorFondo);
    }

    // Botón para mostrar mensaje
    const botonMensaje = document.getElementById('mostrarMensaje');
    if (botonMensaje) {
        botonMensaje.addEventListener('click', mostrarMensaje);
    }

    // Formulario de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', manejarNewsletter);
    }

    // Inicializar efectos
    agregarEfectoHover();

    // Animar números cuando sean visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarNumeros();
                observer.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}); 