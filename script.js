document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelector('.nav-links');
    const links = navLinks.querySelectorAll('a');
    
    function updateIndicator() {
        const activeLink = navLinks.querySelector('a.active');
        if (activeLink) {
            const left = activeLink.offsetLeft;
            const width = activeLink.offsetWidth;
            
            navLinks.style.setProperty('--indicator-left', `${left}px`);
            navLinks.style.setProperty('--indicator-width', `${width}px`);
        }
    }
    
    function setActiveLink() {
        const currentPage = window.location.pathname;
        const currentHash = window.location.hash;
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.remove('active');
            
            // Vérifier si on est sur la page formulaire
            if (currentPage.includes('formulaire-etudiant.html') && href === 'formulaire-etudiant.html') {
                link.classList.add('active');
            }
            // Vérifier si on est sur la page projets
            else if (currentPage.includes('projets.html') && href === 'projets.html') {
                link.classList.add('active');
            }
            // Vérifier si on est sur la page d'accueil
            else if ((currentPage === '/' || currentPage.includes('index.html') || currentPage.endsWith('/')) && href === 'index.html') {
                link.classList.add('active');
            }
            // Vérifier les ancres
            else if (currentHash && href === currentHash) {
                link.classList.add('active');
            }
        });
        
        updateIndicator();
    }
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Pour les ancres sur la même page
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                links.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                updateIndicator();
                
                // Faire défiler vers la section
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // Pour les liens vers d'autres pages, laisser la navigation normale se faire
        });
    });
    
    // Initialiser l'indicateur au chargement
    setActiveLink();
    
    // Mettre à jour l'indicateur si le hash change
    window.addEventListener('hashchange', setActiveLink);
    
    // Gestion du menu burger mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('mobile-active');
            document.body.style.overflow = navLinks.classList.contains('mobile-active') ? 'hidden' : '';
        });
        
        // Fermer le menu lors du clic sur un lien
        const mobileLinks = navLinks.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('mobile-active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Gestion de la soumission du formulaire étudiant
    const studentForm = document.querySelector('.student-form');
    if (studentForm) {
        studentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Afficher la modal de succès
            const successModal = document.getElementById('successModal');
            if (successModal) {
                successModal.classList.add('show');
                
                // Fermer la modal après 3 secondes
                setTimeout(() => {
                    successModal.classList.remove('show');
                }, 3000);
            }
        });
    }
});
