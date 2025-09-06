document.addEventListener('DOMContentLoaded', function() {
    // Lógica para o menu sanduíche
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-list');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Fecha o menu ao clicar em um link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Lógica para o contador de idade na seção Home
    function updateAge() {
        const birthDate = new Date(2004, 0, 1);
        const currentDate = new Date();

        let years = currentDate.getFullYear() - birthDate.getFullYear();
        let months = currentDate.getMonth() - birthDate.getMonth();
        let days = currentDate.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            days = lastMonth.getDate() + days;
        }
        if (months < 0) {
            years--;
            months = 12 + months;
        }

        const yearsSpan = document.getElementById('years');
        const monthsSpan = document.getElementById('months');
        const daysSpan = document.getElementById('days');

        if (yearsSpan && monthsSpan && daysSpan) {
            yearsSpan.innerText = years;
            monthsSpan.innerText = months;
            daysSpan.innerText = days;
        }
    }

    updateAge();
    setInterval(updateAge, 86400000);

    // Lógica para o botão "Ver Mais" nas Experiências
    const readMoreButtons = document.querySelectorAll('.btn-read-more');

    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cardDetails = this.previousElementSibling;
            const icon = this.querySelector('i');

            cardDetails.classList.toggle('show');
            this.classList.toggle('active');

            if (cardDetails.classList.contains('show')) {
                this.innerHTML = 'Ver Menos <i class="fas fa-chevron-up"></i>';
            } else {
                this.innerHTML = 'Ver Mais <i class="fas fa-chevron-down"></i>';
            }
        });
    });

    // Código para Animação de Scroll e Link Ativo
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-list a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Código para Animação de Entrada
    const animateElements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animateElements.forEach(element => {
        animationObserver.observe(element);
    });
});
