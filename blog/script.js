$(document).ready(function () {
  // Theme initialization
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Theme toggle functionality
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

    // Add copy buttons to code blocks
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach(function(codeBlock) {
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-btn';
        copyButton.textContent = 'Copy';
        
        // Add copy functionality
        copyButton.addEventListener('click', async function() {
            try {
                const code = codeBlock.textContent;
                await navigator.clipboard.writeText(code);
                
                // Visual feedback
                copyButton.textContent = 'Copied!';
                copyButton.classList.add('copied');
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                    copyButton.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code:', err);
                copyButton.textContent = 'Error';
            }
        });
        
        // Add button to code block
        codeBlock.appendChild(copyButton);
    });

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        let targetHref = $(this).attr('href');
        
        // If the link is to the main page sections (like '/#home')
        if (targetHref.startsWith('/#')) {
            window.location.href = targetHref;
            return;
        }
        
        // For local page anchors
        let $target = $(targetHref);
        if ($target.length) {
            $('html, body').animate({
                scrollTop: $target.offset().top,
            }, 500, 'linear');
        }
    });

    // Load blog posts from JSON file
    async function fetchBlogPosts() {
        try {
            const response = await fetch("/blog/posts.json");
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching blog posts:", error);
            return [];
        }
    }

    function displayBlogPosts(posts) {
        let blogContainer = document.getElementById("blogContainer");
        let blogHTML = "";

        if (posts.length === 0) {
            // Display placeholder content if no posts are available
            blogHTML = `
            <div class="box tilt">
                <img draggable="false" src="/assets/images/cmsoon.png" alt="Coming Soon">
                <div class="content">
                    <div class="tag">
                        <h3>Blog Posts Coming Soon</h3>
                    </div>
                    <div class="desc">
                        <p>Stay tuned for upcoming articles on cybersecurity, ethical hacking, and more!</p>
                        <div class="btns">
                            <span class="date"><i class="fas fa-calendar"></i> Coming Soon</span>
                        </div>
                    </div>
                </div>
            </div>`;
        } else {
            // Display actual blog posts
            posts.forEach(post => {
                blogHTML += `
                <div class="box tilt">
                    <img draggable="false" src="${post.image}" alt="${post.title}">
                    <div class="content">
                        <div class="tag">
                            <h3>${post.title}</h3>
                        </div>
                        <div class="desc">
                            <p>${post.excerpt}</p>
                            <div class="btns">
                                <a href="${post.link}" class="btn"><i class="fas fa-eye"></i> Read More</a>
                                <span class="date"><i class="fas fa-calendar"></i> ${post.date}</span>
                            </div>
                        </div>
                    </div>
                    <div class="content hover-content">
                        <div class="tag">
                            <h3>${post.title}</h3>
                        </div>
                        <div class="desc">
                            <p>${post.excerpt}</p>
                            <div class="btns">
                                <a href="${post.link}" class="btn"><i class="fas fa-eye"></i> Read More</a>
                                <span class="date"><i class="fas fa-calendar"></i> ${post.date}</span>
                            </div>
                        </div>
                    </div>
                </div>`;
            });
        }

        blogContainer.innerHTML = blogHTML;

        // Initialize tilt effect
        VanillaTilt.init(document.querySelectorAll(".tilt"), {
            max: 15,
        });

        // Initialize scroll reveal animation
        const srtop = ScrollReveal({
            origin: 'top',
            distance: '80px',
            duration: 1000,
            reset: true
        });

        srtop.reveal('.blog .box', { interval: 200 });
    }

    // Load blog posts
    fetchBlogPosts().then(posts => {
        displayBlogPosts(posts);
    });
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Blog | Pancham Narang | Cybersecurity";
            $("#favicon").attr("href", "/assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Blog";
            $("#favicon").attr("href", "/assets/images/favicon.png");
        }
    });

// scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}