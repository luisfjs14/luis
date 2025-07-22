document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o botão de toggle do menu (hamburguer)
    const navToggle = document.querySelector('.nav-toggle');
    // Seleciona a lista de navegação
    const navList = document.querySelector('.nav-list');
    // Seleciona todos os links dentro da lista de navegação
    const navLinks = document.querySelectorAll('.nav-list a');

    // Funcionalidade do menu sanduíche
    if (navToggle && navList) {
        navToggle.addEventListener('click', function() {
            navList.classList.toggle('active'); // Adiciona/remove a classe 'active'
            // Opcional: Adicionar classe para mudar o ícone do hamburguer para um 'X'
            navToggle.querySelector('i').classList.toggle('fa-bars');
            navToggle.querySelector('i').classList.toggle('fa-times');
        });

        // Fecha o menu ao clicar em um link (para single-page applications)
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    // Opcional: Voltar o ícone para o hamburguer
                    navToggle.querySelector('i').classList.add('fa-bars');
                    navToggle.querySelector('i').classList.remove('fa-times');
                }
            });
        });
    }

    // Funcionalidade de animação ao rolar (já existente, ajustada para ser mais robusta)
    const animateElements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in');

    const observerOptions = {
        root: null, // Observa a viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% do elemento visível para acionar
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); // Para animar apenas uma vez
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Animação para a foto de perfil na seção home (já existente)
    const profilePic = document.querySelector('.profile-pic');
    if (profilePic) {
        profilePic.classList.add('animated'); // Inicia a animação imediatamente ou conforme definido no CSS
    }

    // Funcionalidade de scrollspy para destacar o link ativo no cabeçalho
    const sections = document.querySelectorAll('section');
    const navListItems = document.querySelectorAll('.nav-list li a');

    function highlightNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Ajuste para o offset do cabeçalho fixo
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navListItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    window.addEventListener('load', highlightNavLink); // Para destacar na carga da página

    // Lidar com o envio do formulário de contato (já existente)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            const formData = new FormData(this);
            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    // --- ATENÇÃO: MUDE ESTAS DUAS LINHAS ABAIXO ---
                    body: new URLSearchParams(formData).toString(), // Converte FormData para o formato esperado pelo Apps Script
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded' // Informa o tipo de conteúdo
                    }
                    // --- FIM DA MUDANÇA ---
                });

                // Tenta analisar a resposta como JSON
                const data = await response.json(); 

                // Verifica a propriedade 'success' da resposta do Apps Script
                if (data.success) { 
                    formStatus.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contato.';
                    formStatus.className = 'form-status success';
                    this.reset(); // Limpa o formulário
                } else {
                    // Exibe a mensagem de erro que veio do Apps Script
                    formStatus.textContent = 'Ocorreu um erro ao enviar a mensagem: ' + (data.message || 'Erro desconhecido');
                    formStatus.className = 'form-status error';
                }
            } catch (error) {
                console.error("Erro na requisição fetch ou processamento da resposta:", error); // Log para depuração
                formStatus.textContent = 'Ocorreu um erro de rede ou o serviço está temporariamente indisponível. Tente novamente mais tarde.';
                formStatus.className = 'form-status error';
            }
        });
    }
});