document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-bar input');
    const filterTags = document.querySelectorAll('.filter-tag');
    const projectCards = document.querySelectorAll('.project-card');
    const resultsCount = document.querySelector('.results-count');
    
    let currentFilter = 'Tous les métiers';
    
    // Mapping des métiers aux projets
    const projectCategories = {
        'Développeur Full-Stack React /Node.js': ['Développement Web'],
        'Designer UX/UI': ['UX/UI Design'],
        'Data Analyst': ['Data / IA'],
        'Développeur Mobile iOS/Android': ['Développement Mobile'],
        'Chargé de Marketing Digital': ['Marketing Digital'],
        'Community Manager': ['Community Management'],
        'Product Manager Digital': ['Product Management'],
        'Analyste Cybersécurité': ['Cybersécurité'],
        'Responsable E-commerce': ['E-commerce']
    };
    
    // Fonction pour mettre à jour le compteur
    function updateResultsCount() {
        const visibleCards = Array.from(projectCards).filter(card => 
            card.style.display !== 'none'
        ).length;
        resultsCount.textContent = `${visibleCards} résultat${visibleCards > 1 ? 's' : ''}`;
    }
    
    // Fonction de filtrage
    function filterProjects() {
        const searchTerm = searchInput.value.toLowerCase();
        
        projectCards.forEach(card => {
            const title = card.querySelector('.project-title').textContent.toLowerCase();
            const company = card.querySelector('.project-company span').textContent.toLowerCase();
            const description = card.querySelector('.project-description').textContent.toLowerCase();
            const location = card.querySelector('.project-location span').textContent.toLowerCase();
            const techTags = Array.from(card.querySelectorAll('.tech-tag')).map(tag => 
                tag.textContent.toLowerCase()
            );
            
            // Vérifier si le texte de recherche correspond
            const matchesSearch = 
                title.includes(searchTerm) ||
                company.includes(searchTerm) ||
                description.includes(searchTerm) ||
                location.includes(searchTerm) ||
                techTags.some(tag => tag.includes(searchTerm));
            
            // Vérifier si le filtre de métier correspond
            const projectTitle = card.querySelector('.project-title').textContent;
            const projectMetiers = projectCategories[projectTitle] || [];
            const matchesFilter = currentFilter === 'Tous les métiers' || 
                                projectMetiers.includes(currentFilter);
            
            // Afficher ou masquer la carte
            if (matchesSearch && matchesFilter) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
        
        updateResultsCount();
    }
    
    // Événement de recherche
    searchInput.addEventListener('input', filterProjects);
    
    // Événements de filtrage par métier
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Retirer la classe active de tous les tags
            filterTags.forEach(t => t.classList.remove('active'));
            
            // Ajouter la classe active au tag cliqué
            this.classList.add('active');
            
            // Mettre à jour le filtre actuel
            currentFilter = this.textContent;
            
            // Filtrer les projets
            filterProjects();
        });
    });
    
    // Initialiser le compteur
    updateResultsCount();
});
