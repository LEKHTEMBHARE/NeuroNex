document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('scrolled'); // Force glassmorphism navbar from start to look cohesive
        }
    });
    
    // Apply scrolled class on load just in case
    navbar.classList.add('scrolled');

    // Reveal animations on scroll
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;
        
        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger instantly for above-the-fold content

    // --- Interactive Eligibility Simulator ---
    const cgpaSlider = document.getElementById('cgpa-slider');
    const cgpaValue = document.getElementById('cgpa-value');
    const simResults = document.getElementById('sim-results');
    const backlogRadios = document.querySelectorAll('input[name="backlogs"]');

    // Mock Job Requirements Data
    const jobs = [
        {
            company: 'Google',
            role: 'Software Engineer',
            minCgpa: 8.5,
            maxBacklogs: 0,
            salary: '25 LPA'
        },
        {
            company: 'Microsoft',
            role: 'Frontend Developer',
            minCgpa: 8.0,
            maxBacklogs: 1,
            salary: '18 LPA'
        },
        {
            company: 'Amazon',
            role: 'SDE Intern',
            minCgpa: 7.0,
            maxBacklogs: 0,
            salary: '15 LPA'
        },
        {
            company: 'TCS Digital',
            role: 'System Engineer',
            minCgpa: 6.5,
            maxBacklogs: 1,
            salary: '7 LPA'
        },
        {
            company: 'Infosys',
            role: 'Systems Engineer',
            minCgpa: 6.0,
            maxBacklogs: 2,
            salary: '4.5 LPA'
        }
    ];

    const renderResults = () => {
        const currentCgpa = parseFloat(cgpaSlider.value);
        let currentBacklogs = 0;
        
        backlogRadios.forEach(radio => {
            if (radio.checked) {
                currentBacklogs = parseInt(radio.value);
            }
        });

        simResults.innerHTML = ''; // Clear previous

        jobs.forEach((job, index) => {
            // Logic: student is eligible if CGPA >= minCgpa AND backlogs <= maxBacklogs
            const isEligible = (currentCgpa >= job.minCgpa) && (currentBacklogs <= job.maxBacklogs);
            
            const card = document.createElement('div');
            card.className = `sim-card`;
            card.style.animationDelay = `${index * 0.1}s`;
            
            card.innerHTML = `
                <div class="sim-info">
                    <h4>${job.company} - ${job.role}</h4>
                    <p>Req: ${job.minCgpa}+ CGPA • Max ${job.maxBacklogs} Backlogs • ${job.salary}</p>
                </div>
                <div class="sim-status ${isEligible ? 'status-eligible' : 'status-ineligible'}">
                    ${isEligible ? '<i class="ph-bold ph-check"></i> Eligible' : '<i class="ph-bold ph-x"></i> Not Eligible'}
                </div>
            `;
            simResults.appendChild(card);
        });
    };

    // Event listeners for simulator inputs
    cgpaSlider.addEventListener('input', (e) => {
        cgpaValue.textContent = e.target.value;
        renderResults();
    });

    backlogRadios.forEach(radio => {
        radio.addEventListener('change', renderResults);
    });

    // Initial render
    renderResults();
});
