/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')
/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
    skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills() {
    let itemClass = this.parentNode.className

    for (i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills__content skills__close'
    }
    if (itemClass === 'skills__content skills__close') {
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills)
})

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
    modalBtns = document.querySelectorAll('.services__button'),
    modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function (modalClick) {
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})

/*==================== PORTFOLIO SWIPER  ====================*/
let portfolioSwiper = null;
let testimonialSwiper = null;

// Initialize the swipers only if the elements exist
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Portfolio Swiper
    if (document.querySelector('.portfolio__container')) {
        portfolioSwiper = new Swiper('.portfolio__container', {
            cssMode: true,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }

    // Initialize Testimonial Swiper
    if (document.querySelector('.testimonial__container')) {
        testimonialSwiper = new Swiper('.testimonial__container', {
            loop: true,
            grabCursor: true,
            spaceBetween: 48,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            breakpoints:{
                568:{
                    slidesPerView: 2,
                }
            }
        });
    }
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            const activeLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
            if (activeLink) {
                document.querySelectorAll('.nav__menu a').forEach(link => {
                    link.classList.remove('active-link');
                });
                activeLink.classList.add('active-link');
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
});

/*==================== ANIMATED TEXT TYPING ====================*/
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if the element exists
    if (document.querySelector('.auto-input')) {
        var typed = new Typed(".auto-input", {
            strings: [
                "a Student",
                "a Web Developer",
                "an UI Designer",
            ],
            typeSpeed: 100,
            backSpeed: 100,
            loop: true,
        });
    }
});

/*==================== FORM VALIDATION ====================*/
document.addEventListener('DOMContentLoaded', function() {
    // Check if jQuery and jQuery Validate are available
    if (typeof $ !== 'undefined' && $.fn.validate) {
        // Only initialize if the form exists
        if ($("#contact-form").length) {
            $("#contact-form").validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 3
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    telepon: {
                        required: true,
                        number: true
                    },
                    message: {
                        required: true,
                        minlength: 10
                    }
                },
                messages: {
                    name: {
                        required: "Please enter your name",
                        minlength: "Name must be at least 3 characters long"
                    },
                    email: {
                        required: "Please enter your email address",
                        email: "Please enter a valid email address"
                    },
                    telepon: {
                        required: "Please enter your phone number",
                        number: "Please enter a valid phone number"
                    },
                    message: {
                        required: "Please enter your message",
                        minlength: "Message must be at least 10 characters long"
                    }
                },
                errorElement: "span",
                errorClass: "error-message",
                highlight: function(element) {
                    $(element).addClass("input-error");
                },
                unhighlight: function(element) {
                    $(element).removeClass("input-error");
                },
                submitHandler: function(form) {
                    form.submit();
                }
            });
        }
    }
});

/*==================== ANIMATE ON SCROLL ====================*/
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS if it exists
    if (typeof AOS !== 'undefined') {
        AOS.init({
            offset: 200,
            duration: 1000,
            once: true
        });
    }
});

/*==================== BLOG FUNCTIONALITY ====================*/
document.addEventListener('DOMContentLoaded', function() {
    // Handle article query parameters on article page
    if (window.location.pathname.includes('article.html')) {
        // Get article ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id') || '1';
        
        // Article data mapping (this would typically come from a backend)
        const articleData = {
            '1': {
                title: 'Modern Web Development Techniques',
                category: 'Web Development',
                author: 'Try Nugraha',
                date: '07 Jun 2023',
                comments: 5,
                image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97'
            },
            '2': {
                title: 'UI Design Principles for Developers',
                category: 'UI/UX Design',
                author: 'Try Nugraha',
                date: '15 May 2023',
                comments: 3,
                image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3'
            },
            '3': {
                title: 'Getting Started with React Hooks',
                category: 'React',
                author: 'Try Nugraha',
                date: '03 May 2023',
                comments: 7,
                image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613'
            },
            '4': {
                title: 'Responsive Design Best Practices',
                category: 'CSS',
                author: 'Try Nugraha',
                date: '22 Apr 2023',
                comments: 2,
                image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3'
            }
        };
        
        // Update page elements if article data is available
        if (articleData[articleId]) {
            const article = articleData[articleId];
            
            // Update page title and meta
            document.title = article.title + ' - Try Nugraha';
            
            // Update article elements
            const titleEl = document.querySelector('.article-title');
            const categoryEl = document.querySelector('.article-category');
            const authorEl = document.querySelector('.article-meta-item:nth-child(1) span');
            const dateEl = document.querySelector('.article-meta-item:nth-child(2) span');
            const commentsEl = document.querySelector('.article-meta-item:nth-child(3) span');
            const imageEl = document.querySelector('.article-featured-img');
            
            if (titleEl) titleEl.textContent = article.title;
            if (categoryEl) categoryEl.textContent = article.category;
            if (authorEl) authorEl.textContent = article.author;
            if (dateEl) dateEl.textContent = article.date;
            if (commentsEl) commentsEl.textContent = article.comments + ' Comments';
            if (imageEl) imageEl.src = article.image;
        }
        
        // Update navigation links based on article ID
        updateArticleNavigation(articleId);
    }
    
    // Add active class to category filters on blog page
    const categoryBadges = document.querySelectorAll('.category-badge');
    if (categoryBadges.length) {
        categoryBadges.forEach(badge => {
            badge.addEventListener('click', function(e) {
                e.preventDefault();
                // Remove active class from all badges
                categoryBadges.forEach(b => b.classList.remove('active'));
                // Add active class to clicked badge
                this.classList.add('active');
                // Here you would typically filter posts based on category
            });
        });
    }
});

function updateArticleNavigation(currentId) {
    const prevId = parseInt(currentId) - 1;
    const nextId = parseInt(currentId) + 1;
    
    // Update previous article link
    const prevLink = document.querySelector('.article-navigation-item:first-child');
    if (prevLink) {
        if (prevId < 1) {
            prevLink.style.visibility = 'hidden';
        } else {
            prevLink.href = `article.html?id=${prevId}`;
            
            // Update title based on previous article
            const prevTitle = {
                '1': 'Modern Web Development Techniques',
                '2': 'UI Design Principles for Developers',
                '3': 'Getting Started with React Hooks',
                '4': 'Responsive Design Best Practices'
            }[prevId];
            
            const prevTitleEl = prevLink.querySelector('.article-navigation-title');
            if (prevTitleEl && prevTitle) {
                prevTitleEl.textContent = prevTitle;
            }
        }
    }
    
    // Update next article link
    const nextLink = document.querySelector('.article-navigation-item:last-child');
    if (nextLink) {
        if (nextId > 4) {
            nextLink.style.visibility = 'hidden';
        } else {
            nextLink.href = `article.html?id=${nextId}`;
            
            // Update title based on next article
            const nextTitle = {
                '1': 'Modern Web Development Techniques',
                '2': 'UI Design Principles for Developers',
                '3': 'Getting Started with React Hooks',
                '4': 'Responsive Design Best Practices'
            }[nextId];
            
            const nextTitleEl = nextLink.querySelector('.article-navigation-title');
            if (nextTitleEl && nextTitle) {
                nextTitleEl.textContent = nextTitle;
            }
        }
    }
}