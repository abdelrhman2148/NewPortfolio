// Three.js Portfolio Script

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    
    // Set up section navigation
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                }
            });
            
            // Update camera position based on section
            animateCameraToSection(sectionId);
        });
    });
    
    // Section links within content
    const sectionLinks = document.querySelectorAll('.section-link');
    sectionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            
            // Update active nav item
            navItems.forEach(nav => {
                nav.classList.remove('active');
                if (nav.getAttribute('data-section') === sectionId) {
                    nav.classList.add('active');
                }
            });
            
            // Show selected section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                }
            });
            
            // Update camera position
            animateCameraToSection(sectionId);
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            const formData = new FormData(contactForm);
            let formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Log form data (in a real app, you'd send this to a server)
            console.log('Form submitted:', formValues);
            
            // Show success message
            contactForm.innerHTML = `
                <div class="form-success">
                    <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--accent-primary); margin-bottom: 20px;"></i>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                </div>
            `;
        });
    }
});

// Three.js Scene Setup
let scene, camera, renderer;
let particlesMesh, homeGroup, aboutGroup, projectsGroup, contactGroup;
let currentSection = 'home';

// Initialize Three.js scene
function init() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
    // Add lights
    addLights();
    
    // Create objects
    createParticles();
    createHomeObjects();
    createAboutObjects();
    createProjectsObjects();
    createContactObjects();
    
    // Set initial camera position
    setCameraPosition('home');
    
    // Add event listeners
    window.addEventListener('resize', onWindowResize);
    
    // Start animation loop
    animate();
}

// Add lights to the scene
function addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
}

// Create background particles
function createParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    
    // Colors for particles
    const colors = [
        new THREE.Color(0x00e676), // Green (accent-primary)
        new THREE.Color(0x2979ff), // Blue (accent-secondary)
        new THREE.Color(0xffffff)  // White
    ];
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
        // Position
        posArray[i] = (Math.random() - 0.5) * 50;
        posArray[i + 1] = (Math.random() - 0.5) * 50;
        posArray[i + 2] = (Math.random() - 0.5) * 50;
        
        // Color
        const color = colors[Math.floor(Math.random() * colors.length)];
        colorsArray[i] = color.r;
        colorsArray[i + 1] = color.g;
        colorsArray[i + 2] = color.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
}

// Create objects for home section
function createHomeObjects() {
    homeGroup = new THREE.Group();
    
    // Create laptop base with more realistic details
    const baseGeometry = new THREE.BoxGeometry(5, 0.2, 4);
    const baseMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x333333,
        metalness: 0.9,
        roughness: 0.1,
        shininess: 100
    });
    const laptopBase = new THREE.Mesh(baseGeometry, baseMaterial);
    homeGroup.add(laptopBase);
    
    // Position the laptop in a better viewing position
    homeGroup.position.set(0, -2, -3);
    
    // Add rounded edges to the base
    const baseEdgesGeometry = new THREE.BoxGeometry(5.1, 0.2, 4.1);
    const baseEdgesMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x444444,
        metalness: 0.9,
        roughness: 0.1,
        shininess: 100
    });
    const baseEdges = new THREE.Mesh(baseEdgesGeometry, baseEdgesMaterial);
    baseEdges.position.set(0, -0.01, 0);
    laptopBase.add(baseEdges);
    
    // Create laptop screen with more realistic details
    const screenBaseGeometry = new THREE.BoxGeometry(5, 0.1, 3.5);
    const screenBaseMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x333333,
        metalness: 0.9,
        roughness: 0.1,
        shininess: 100
    });
    const laptopScreen = new THREE.Mesh(screenBaseGeometry, screenBaseMaterial);
    // Position the screen at the back edge of the base, ready to be rotated
    laptopScreen.position.set(0, 0.1, -1.75);
    // Set the pivot point to the back edge of the screen
    laptopScreen.geometry.translate(0, 0, 1.75);
    // Start with the screen closed (rotated down)
    laptopScreen.rotation.x = Math.PI / 2;
    homeGroup.add(laptopScreen);
    
    // Add screen bezel
    const bezelGeometry = new THREE.BoxGeometry(5.1, 0.15, 3.6);
    const bezelMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x222222,
        metalness: 0.9,
        roughness: 0.1,
        shininess: 100
    });
    const screenBezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
    screenBezel.position.set(0, -0.02, 0);
    laptopScreen.add(screenBezel);
    
    // Create screen display (the actual monitor part)
    const screenDisplayGeometry = new THREE.PlaneGeometry(4.8, 3.3);
    const screenDisplayMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x181c20, 
        transparent: true, 
        opacity: 0.95 
    });
    const screenDisplay = new THREE.Mesh(screenDisplayGeometry, screenDisplayMaterial);
    // Position it slightly in front of the screen base
    screenDisplay.position.set(0, 0.06, 0);
    // Rotate it to face up (will be rotated with the screen)
    screenDisplay.rotation.x = -Math.PI / 2;
    laptopScreen.add(screenDisplay);
    
    // Create keyboard on the base with more details
    const keyboardGeometry = new THREE.PlaneGeometry(4.5, 3.5);
    const keyboardMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x222222, 
        transparent: true, 
        opacity: 0.9 
    });
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.set(0, 0.11, 0);
    keyboard.rotation.x = -Math.PI / 2;
    laptopBase.add(keyboard);
    
    // Add keyboard keys (simplified)
    const keysGroup = new THREE.Group();
    const keySize = 0.2;
    const keySpacing = 0.22;
    const keyRows = 4;
    const keyCols = 15;
    const keyStartX = -(keyCols * keySpacing) / 2 + keySpacing / 2;
    const keyStartZ = -(keyRows * keySpacing) / 2 + keySpacing / 2;
    
    for (let row = 0; row < keyRows; row++) {
        for (let col = 0; col < keyCols; col++) {
            // Skip some keys for touchpad area
            if (row >= 2 && col >= 4 && col <= 10) continue;
            
            const keyGeometry = new THREE.BoxGeometry(keySize, 0.02, keySize);
            const keyMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x444444,
                metalness: 0.5,
                roughness: 0.5
            });
            const key = new THREE.Mesh(keyGeometry, keyMaterial);
            key.position.set(
                keyStartX + col * keySpacing, 
                0.01, 
                keyStartZ + row * keySpacing
            );
            keysGroup.add(key);
        }
    }
    
    // Add touchpad
    const touchpadGeometry = new THREE.PlaneGeometry(1.5, 1);
    const touchpadMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x555555,
        metalness: 0.7,
        roughness: 0.3,
        shininess: 80
    });
    const touchpad = new THREE.Mesh(touchpadGeometry, touchpadMaterial);
    touchpad.position.set(0, 0.12, 0.8);
    touchpad.rotation.x = -Math.PI / 2;
    keysGroup.add(touchpad);
    
    keyboard.add(keysGroup);
    
    // Add Apple-like logo on the back of the screen
    const logoGeometry = new THREE.CircleGeometry(0.3, 32);
    const logoMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00e676, 
        transparent: true, 
        opacity: 0.9 
    });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, -0.05, -0.1);
    logo.rotation.x = Math.PI / 2;
    laptopScreen.add(logo);
    
    // CLI (command line) interface - this will be the text display on the screen
    const cliGeometry = new THREE.PlaneGeometry(4.5, 3);
    const cliMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x181c20, 
        transparent: true, 
        opacity: 0.95 
    });
    const cli = new THREE.Mesh(cliGeometry, cliMaterial);
    cli.position.set(0, 0.06, 0);
    cli.rotation.x = -Math.PI / 2;
    cli.visible = false;
    screenDisplay.add(cli);
    
    // Attach DOM element for CLI text
    let cliDiv = document.getElementById('home-cli-text');
    if (!cliDiv) {
        cliDiv = document.createElement('div');
        cliDiv.id = 'home-cli-text';
        cliDiv.style.position = 'fixed';
        cliDiv.style.left = '50%';
        cliDiv.style.top = '50%';
        cliDiv.style.transform = 'translate(-50%, -50%)';
        cliDiv.style.width = '400px';
        cliDiv.style.height = '220px';
        cliDiv.style.background = 'rgba(24,28,32,0.95)';
        cliDiv.style.color = '#00e676';
        cliDiv.style.fontFamily = 'Source Code Pro, monospace';
        cliDiv.style.fontSize = '1.1rem';
        cliDiv.style.padding = '24px 18px';
        cliDiv.style.borderRadius = '8px';
        cliDiv.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
        cliDiv.style.zIndex = '100';
        cliDiv.style.display = 'none';
        cliDiv.style.pointerEvents = 'none';
        cliDiv.style.overflow = 'hidden';
        document.body.appendChild(cliDiv);
    }
    
    homeGroup.position.set(0, 0, 0);
    scene.add(homeGroup);
    
    // Animation state
    homeGroup.userData = {
        screen: laptopScreen,
        cli: cli,
        cliDiv: cliDiv,
        openProgress: 0,
        typingStarted: false
    };
}

// Create objects for about section
function createAboutObjects() {
    aboutGroup = new THREE.Group();
    const iconGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    
    const techIcons = [
        { color: 0x00e676, position: { x: -3, y: 2, z: 0 } },
        { color: 0x2979ff, position: { x: 0, y: -2, z: 1 } },
        { color: 0xffffff, position: { x: 3, y: 1, z: -1 } },
        { color: 0x00e676, position: { x: -2, y: -1, z: 2 } },
        { color: 0x2979ff, position: { x: 2, y: 0, z: -2 } }
    ];
    
    techIcons.forEach(icon => {
        const material = new THREE.MeshPhongMaterial({
            color: icon.color,
            transparent: true,
            opacity: 0.8
        });
        
        const mesh = new THREE.Mesh(iconGeometry, material);
        mesh.position.set(icon.position.x, icon.position.y, icon.position.z);
        aboutGroup.add(mesh);
    });
    
    aboutGroup.position.set(10, 0, -5);
    aboutGroup.visible = false;
    scene.add(aboutGroup);
}

// Create objects for projects section
function createProjectsObjects() {
    projectsGroup = new THREE.Group();
    
    // Create laptop base with more realistic details
    const baseGeometry = new THREE.BoxGeometry(5, 0.2, 4);
    const baseMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x333333,
        metalness: 0.9,
        roughness: 0.1,
        shininess: 100
    });
    const laptopBase = new THREE.Mesh(baseGeometry, baseMaterial);
    projectsGroup.add(laptopBase);
    
    // Add rounded edges to the base
    const baseEdgesGeometry = new THREE.BoxGeometry(5.1, 0.2, 4.1);
    const baseEdgesMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x444444,
        metalness: 0.9,
        roughness: 0.1,
        shininess: 100
    });
    const baseEdges = new THREE.Mesh(baseEdgesGeometry, baseEdgesMaterial);
    baseEdges.position.set(0, -0.01, 0);
    laptopBase.add(baseEdges);
    
    // Create laptop screen with more realistic details
    const screenBaseGeometry = new THREE.BoxGeometry(5, 0.1, 3.5);
    const screenBaseMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x333333,
        metalness: 0.9,
        roughness: 0.1,
        shininess: 100
    });
    const laptopScreen = new THREE.Mesh(screenBaseGeometry, screenBaseMaterial);
    // Position the screen at the back edge of the base, ready to be rotated
    laptopScreen.position.set(0, 0.1, -1.75);
    // Set the pivot point to the back edge of the screen
    laptopScreen.geometry.translate(0, 0, 1.75);
    // Start with the screen closed (rotated down)
    laptopScreen.rotation.x = Math.PI / 2;
    projectsGroup.add(laptopScreen);
    
    // Add screen bezel
    const bezelGeometry = new THREE.BoxGeometry(5.1, 0.15, 3.6);
    const bezelMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x222222,
        metalness: 0.9,
        roughness: 0.1,
        shininess: 100
    });
    const screenBezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
    screenBezel.position.set(0, -0.02, 0);
    laptopScreen.add(screenBezel);
    
    // Create screen display (the actual monitor part)
    const screenDisplayGeometry = new THREE.PlaneGeometry(4.8, 3.3);
    const screenDisplayMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x181c20, 
        transparent: true, 
        opacity: 0.95 
    });
    const screenDisplay = new THREE.Mesh(screenDisplayGeometry, screenDisplayMaterial);
    // Position it slightly in front of the screen base
    screenDisplay.position.set(0, 0.06, 0);
    // Rotate it to face up (will be rotated with the screen)
    screenDisplay.rotation.x = -Math.PI / 2;
    laptopScreen.add(screenDisplay);
    
    // Create keyboard on the base with more details
    const keyboardGeometry = new THREE.PlaneGeometry(4.5, 3.5);
    const keyboardMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x222222, 
        transparent: true, 
        opacity: 0.9 
    });
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.set(0, 0.11, 0);
    keyboard.rotation.x = -Math.PI / 2;
    laptopBase.add(keyboard);
    
    // Add keyboard keys (simplified)
    const keysGroup = new THREE.Group();
    const keySize = 0.2;
    const keySpacing = 0.22;
    const keyRows = 4;
    const keyCols = 15;
    const keyStartX = -(keyCols * keySpacing) / 2 + keySpacing / 2;
    const keyStartZ = -(keyRows * keySpacing) / 2 + keySpacing / 2;
    
    for (let row = 0; row < keyRows; row++) {
        for (let col = 0; col < keyCols; col++) {
            // Skip some keys for touchpad area
            if (row >= 2 && col >= 4 && col <= 10) continue;
            
            const keyGeometry = new THREE.BoxGeometry(keySize, 0.02, keySize);
            const keyMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x444444,
                metalness: 0.5,
                roughness: 0.5
            });
            const key = new THREE.Mesh(keyGeometry, keyMaterial);
            key.position.set(
                keyStartX + col * keySpacing, 
                0.01, 
                keyStartZ + row * keySpacing
            );
            keysGroup.add(key);
        }
    }
    
    // Add touchpad
    const touchpadGeometry = new THREE.PlaneGeometry(1.5, 1);
    const touchpadMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x555555,
        metalness: 0.7,
        roughness: 0.3,
        shininess: 80
    });
    const touchpad = new THREE.Mesh(touchpadGeometry, touchpadMaterial);
    touchpad.position.set(0, 0.12, 0.8);
    touchpad.rotation.x = -Math.PI / 2;
    keysGroup.add(touchpad);
    
    keyboard.add(keysGroup);
    
    // Add Apple-like logo on the back of the screen
    const logoGeometry = new THREE.CircleGeometry(0.3, 32);
    const logoMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00e676, 
        transparent: true, 
        opacity: 0.9 
    });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, -0.05, -0.1);
    logo.rotation.x = Math.PI / 2;
    laptopScreen.add(logo);
    
    // CLI (command line) interface - this will be the text display on the screen
    const cliGeometry = new THREE.PlaneGeometry(4.5, 3);
    const cliMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x181c20, 
        transparent: true, 
        opacity: 0.95 
    });
    const cli = new THREE.Mesh(cliGeometry, cliMaterial);
    cli.position.set(0, 0.06, 0);
    cli.rotation.x = -Math.PI / 2;
    cli.visible = false;
    screenDisplay.add(cli);
    
    // Attach DOM element for CLI text
    let cliDiv = document.getElementById('cli-text');
    if (!cliDiv) {
        cliDiv = document.createElement('div');
        cliDiv.id = 'cli-text';
        cliDiv.style.position = 'fixed';
        cliDiv.style.left = '50%';
        cliDiv.style.top = '50%';
        cliDiv.style.transform = 'translate(-50%, -50%)';
        cliDiv.style.width = '400px';
        cliDiv.style.height = '220px';
        cliDiv.style.background = 'rgba(24,28,32,0.95)';
        cliDiv.style.color = '#00e676';
        cliDiv.style.fontFamily = 'Source Code Pro, monospace';
        cliDiv.style.fontSize = '1.1rem';
        cliDiv.style.padding = '24px 18px';
        cliDiv.style.borderRadius = '8px';
        cliDiv.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
        cliDiv.style.zIndex = '100';
        cliDiv.style.display = 'none';
        cliDiv.style.pointerEvents = 'none';
        cliDiv.style.overflow = 'hidden';
        document.body.appendChild(cliDiv);
    }
    
    projectsGroup.position.set(0, 0, -10);
    projectsGroup.visible = false;
    scene.add(projectsGroup);
    
    // Animation state
    projectsGroup.userData = {
        screen: laptopScreen,
        cli: cli,
        cliDiv: cliDiv,
        openProgress: 0,
        typingStarted: false
    };
}
// Create objects for contact section
function createContactObjects() {
    contactGroup = new THREE.Group();
    
    // Create a simple envelope shape
    const envelopeGroup = new THREE.Group();
    
    // Base of envelope
    const baseGeometry = new THREE.BoxGeometry(4, 0.1, 3);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    envelopeGroup.add(base);
    
    // Sides of envelope
    const sideGeometry = new THREE.BoxGeometry(4, 1, 0.1);
    const side1 = new THREE.Mesh(sideGeometry, baseMaterial);
    side1.position.set(0, 0.5, 1.45);
    envelopeGroup.add(side1);
    
    const side2 = new THREE.Mesh(sideGeometry, baseMaterial);
    side2.position.set(0, 0.5, -1.45);
    envelopeGroup.add(side2);
    
    const sideGeometry2 = new THREE.BoxGeometry(0.1, 1, 3);
    const side3 = new THREE.Mesh(sideGeometry2, baseMaterial);
    side3.position.set(1.95, 0.5, 0);
    envelopeGroup.add(side3);
    
    const side4 = new THREE.Mesh(sideGeometry2, baseMaterial);
    side4.position.set(-1.95, 0.5, 0);
    envelopeGroup.add(side4);
    
    // Flap of envelope
    const flapGeometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        -2, 0.05, -1.5,  // bottom left
        2, 0.05, -1.5,   // bottom right
        0, 1.5, 0        // top
    ]);
    flapGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const flapMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const flap = new THREE.Mesh(flapGeometry, flapMaterial);
    envelopeGroup.add(flap);
    
    contactGroup.add(envelopeGroup);
    contactGroup.position.set(0, 0, 10);
    contactGroup.visible = false;
    scene.add(contactGroup);
}

// Set camera position based on section
function setCameraPosition(section) {
    switch(section) {
        case 'home':
            camera.position.set(0, 0, 15);
            break;
        case 'about':
            camera.position.set(15, 0, 5);
            break;
        case 'projects':
            camera.position.set(0, 5, 15);
            break;
        case 'contact':
            camera.position.set(-5, 0, 15);
            break;
    }
    
    camera.lookAt(scene.position);
}

// Animate camera to section
function animateCameraToSection(section) {
    // Update section visibility
    homeGroup.visible = section === 'home';
    aboutGroup.visible = section === 'about';
    projectsGroup.visible = section === 'projects';
    contactGroup.visible = section === 'contact';

    // Store current section
    currentSection = section;

    // Animate camera position
    let targetPosition = new THREE.Vector3();

    switch(section) {
        case 'home':
            targetPosition.set(0, 0, 15);
            break;
        case 'about':
            targetPosition.set(15, 0, 5);
            break;
        case 'projects':
            targetPosition.set(0, 5, 15);
            break;
        case 'contact':
            targetPosition.set(-5, 0, 15);
            break;
    }

    // Use GSAP for smooth animation
    gsap.to(camera.position, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: function() {
            camera.lookAt(scene.position);
        },
        onComplete: function() {
            if (section === 'projects') {
                startLaptopOpenAnimation();
            } else if (section === 'home') {
                startHomeLaptopOpenAnimation();
            } else {
                resetLaptopAnimation();
                resetHomeLaptopAnimation();
            }
        }
    });
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate particle mesh slowly
    if (particlesMesh) {
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
    }

    // Animate section-specific objects
    if (homeGroup && homeGroup.visible) {
        // Handle home laptop animation
        const { screen, cli, cliDiv, openProgress, typingStarted } = homeGroup.userData;
        if (openProgress < 1) {
            homeGroup.userData.openProgress += 0.02; // Faster animation
            const t = Math.min(homeGroup.userData.openProgress, 1);
            
            // Use easing function for smoother animation
            const easeOutQuad = t * (2 - t);
            
            // Animate screen opening from closed (PI/2) to open position (PI/6)
            screen.rotation.x = Math.PI / 2 - easeOutQuad * (Math.PI / 2 - Math.PI / 6);
            
            // Only show CLI when screen is mostly open
            if (t > 0.6) { // Show CLI earlier
                cli.visible = true;
                cliDiv.style.display = 'block';
                if (!typingStarted) {
                    homeGroup.userData.typingStarted = true;
                    startTypingHomeCLI();
                }
            }
        } else {
            // Ensure CLI is visible even after animation completes
            if (homeGroup.userData.cli && !homeGroup.userData.cli.visible) {
                homeGroup.userData.cli.visible = true;
            }
            if (homeGroup.userData.cliDiv && homeGroup.userData.cliDiv.style.display !== 'block') {
                homeGroup.userData.cliDiv.style.display = 'block';
                if (!homeGroup.userData.typingStarted) {
                    homeGroup.userData.typingStarted = true;
                    startTypingHomeCLI();
                }
            }
        }
        
        // Add subtle laptop movement
        homeGroup.rotation.y = Math.sin(Date.now() * 0.001) * 0.03;
        homeGroup.position.y = Math.sin(Date.now() * 0.002) * 0.05 + 0.05;
    }

    if (aboutGroup && aboutGroup.visible) {
        aboutGroup.children.forEach((child, i) => {
            child.rotation.x += 0.01;
            child.rotation.y += 0.01 * (i % 2 ? 1 : -1);
        });
    }

    // Laptop open animation
    if (projectsGroup && projectsGroup.visible) {
        const { screen, cli, cliDiv, openProgress, typingStarted } = projectsGroup.userData;
        if (openProgress < 1) {
            projectsGroup.userData.openProgress += 0.008; // Smoother animation
            const t = Math.min(projectsGroup.userData.openProgress, 1);
            
            // Use easing function for smoother animation
            const easeOutQuad = t * (2 - t);
            
            // Animate screen opening from closed (PI/2) to open position (PI/6)
            screen.rotation.x = Math.PI / 2 - easeOutQuad * (Math.PI / 2 - Math.PI / 6);
            
            // Only show CLI when screen is mostly open
            if (t > 0.7) {
                cli.visible = true;
                cliDiv.style.display = 'block';
                if (!typingStarted) {
                    projectsGroup.userData.typingStarted = true;
                    startTypingCLI();
                }
            }
        }
        
        // Add subtle laptop movement
        projectsGroup.rotation.y = Math.sin(Date.now() * 0.001) * 0.03;
        projectsGroup.position.y = Math.sin(Date.now() * 0.002) * 0.05 + 0.05;
    }

    if (contactGroup && contactGroup.visible) {
        contactGroup.rotation.y += 0.005;
    }

    renderer.render(scene, camera);
}

// Start laptop open animation
function startLaptopOpenAnimation() {
    if (projectsGroup) {
        projectsGroup.userData.openProgress = 0;
        projectsGroup.userData.typingStarted = false;
        if (projectsGroup.userData.cliDiv) {
            projectsGroup.userData.cliDiv.innerHTML = '';
            projectsGroup.userData.cliDiv.style.display = 'none';
        }
        if (projectsGroup.userData.cli) {
            projectsGroup.userData.cli.visible = false;
        }
    }
}

// Reset laptop animation
function resetLaptopAnimation() {
    if (projectsGroup) {
        projectsGroup.userData.openProgress = 0;
        projectsGroup.userData.typingStarted = false;
        if (projectsGroup.userData.cliDiv) {
            projectsGroup.userData.cliDiv.innerHTML = '';
            projectsGroup.userData.cliDiv.style.display = 'none';
        }
        if (projectsGroup.userData.cli) {
            projectsGroup.userData.cli.visible = false;
        }
    }
}

// Typing effect for CLI
function startTypingCLI() {
    const cliDiv = projectsGroup.userData.cliDiv;
    const lines = [
        '$ whoami',
        'DevOps Engineer',
        '$ echo "Welcome to my interactive portfolio!"',
        'Welcome to my interactive portfolio!',
        '$ date',
        new Date().toString(),
        '$ ls -la skills/',
        'total 10',
        'drwxr-xr-x 2 devops staff 68 Oct 10 09:15 .',
        'drwxr-xr-x 10 devops staff 320 Oct 10 09:14 ..',
        '-rw-r--r-- 1 devops staff 35 Oct 10 09:15 Docker.yml',
        '-rw-r--r-- 1 devops staff 42 Oct 10 09:15 Kubernetes.yml',
        '-rw-r--r-- 1 devops staff 38 Oct 10 09:15 Terraform.yml',
        '-rw-r--r-- 1 devops staff 30 Oct 10 09:15 Jenkins.yml',
        '-rw-r--r-- 1 devops staff 28 Oct 10 09:15 AWS.yml',
        '-rw-r--r-- 1 devops staff 32 Oct 10 09:15 Linux.yml',
        '$ cat skills/Docker.yml | grep level',
        'level: Expert',
        '$ cat skills/Kubernetes.yml | grep level',
        'level: Advanced',
        '$ cat skills/AWS.yml | grep level',
        'level: Advanced',
        '$ cat skills/Linux.yml | grep level',
        'level: Expert',
        '$ cat skills/Terraform.yml | grep level',
        'level: Advanced',
        '$ cat skills/Jenkins.yml | grep level',
        'level: Advanced',
        '$ cat about.txt',
        '-----------------------------------',
        'I am a passionate DevOps Engineer with',
        'expertise in cloud infrastructure,',
        'containerization, and CI/CD pipelines.',
        'I love automating processes and building',
        'scalable solutions for complex problems.',
        '-----------------------------------',
        '$ echo "Contact me for DevOps solutions!"',
        'Contact me for DevOps solutions!',
        '$',
    ];
    let idx = 0;
    cliDiv.innerHTML = '';
    
    // Add CSS for blinking cursor
    const style = document.createElement('style');
    style.textContent = `
        .cli-cursor {
            display: inline-block;
            animation: blink 1s step-end infinite;
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    function typeLine() {
        if (idx < lines.length) {
            // For command lines, type character by character
            if (lines[idx].startsWith('$')) {
                typeCharByChar(lines[idx], 0);
            } else {
                // For output lines, add the whole line at once with a slight delay
                cliDiv.innerHTML += lines[idx] + '<br>';
                idx++;
                // Scroll to bottom as new content is added
                cliDiv.scrollTop = cliDiv.scrollHeight;
                setTimeout(typeLine, Math.random() * 100 + 50);
            }
        } else {
            // Add blinking cursor at the end
            const cursor = document.createElement('span');
            cursor.className = 'cli-cursor';
            cursor.innerHTML = '█';
            cliDiv.appendChild(cursor);
        }
    }
    
    function typeCharByChar(line, charIndex) {
        if (charIndex < line.length) {
            cliDiv.innerHTML += line.charAt(charIndex);
            charIndex++;
            setTimeout(() => typeCharByChar(line, charIndex), Math.random() * 50 + 30);
        } else {
            cliDiv.innerHTML += '<br>';
            idx++;
            // Scroll to bottom
            cliDiv.scrollTop = cliDiv.scrollHeight;
            // Add a delay before the next line
            setTimeout(typeLine, Math.random() * 300 + 200);
        }
    }
    
    // Start typing with a slight delay
    setTimeout(typeLine, 500);
}

// Start home laptop open animation
function startHomeLaptopOpenAnimation() {
    if (homeGroup) {
        homeGroup.userData.openProgress = 0;
        homeGroup.userData.typingStarted = false;
        if (homeGroup.userData.cliDiv) {
            homeGroup.userData.cliDiv.innerHTML = '';
            homeGroup.userData.cliDiv.style.display = 'block';
        }
        if (homeGroup.userData.cli) {
            homeGroup.userData.cli.visible = true;
        }
        // Start the typing animation
        setTimeout(() => {
            if (!homeGroup.userData.typingStarted) {
                homeGroup.userData.typingStarted = true;
                startTypingHomeCLI();
            }
        }, 1000);
    }
}

// Reset home laptop animation
function resetHomeLaptopAnimation() {
    if (homeGroup) {
        homeGroup.userData.openProgress = 0;
        homeGroup.userData.typingStarted = false;
        if (homeGroup.userData.cliDiv) {
            homeGroup.userData.cliDiv.innerHTML = '';
            homeGroup.userData.cliDiv.style.display = 'none';
        }
        if (homeGroup.userData.cli) {
            homeGroup.userData.cli.visible = false;
        }
    }
}

// Typing effect for Home CLI
function startTypingHomeCLI() {
    const cliDiv = homeGroup.userData.cliDiv;
    const lines = [
        '$ whoami',
        'DevOps Engineer',
        '$ echo "Welcome to my portfolio!"',
        'Welcome to my portfolio!',
        '$ date',
        new Date().toString(),
        '$ cat about.txt',
        '-----------------------------------',
        'I am a passionate DevOps Engineer with',
        'expertise in cloud infrastructure,',
        'containerization, and CI/CD pipelines.',
        'I build and maintain robust CI/CD pipelines,',
        'automate infrastructure, and ensure',
        'seamless deployments for modern applications.',
        '-----------------------------------',
        '$ ls -la skills/',
        'total 10',
        'drwxr-xr-x 2 devops staff 68 Oct 10 09:15 .',
        'drwxr-xr-x 10 devops staff 320 Oct 10 09:14 ..',
        '-rw-r--r-- 1 devops staff 35 Oct 10 09:15 Docker.yml',
        '-rw-r--r-- 1 devops staff 42 Oct 10 09:15 Kubernetes.yml',
        '-rw-r--r-- 1 devops staff 38 Oct 10 09:15 Terraform.yml',
        '-rw-r--r-- 1 devops staff 30 Oct 10 09:15 Jenkins.yml',
        '-rw-r--r-- 1 devops staff 28 Oct 10 09:15 AWS.yml',
        '-rw-r--r-- 1 devops staff 32 Oct 10 09:15 Linux.yml',
        '$ echo "Explore my portfolio to learn more!"',
        'Explore my portfolio to learn more!',
        '$',
    ];
    let idx = 0;
    cliDiv.innerHTML = '';
    
    // Add CSS for blinking cursor
    const style = document.createElement('style');
    style.textContent = `
        .cli-cursor {
            display: inline-block;
            animation: blink 1s step-end infinite;
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    function typeLine() {
        if (idx < lines.length) {
            // For command lines, type character by character
            if (lines[idx].startsWith('$')) {
                typeCharByChar(lines[idx], 0);
            } else {
                // For output lines, add the whole line at once with a slight delay
                cliDiv.innerHTML += lines[idx] + '<br>';
                idx++;
                // Scroll to bottom as new content is added
                cliDiv.scrollTop = cliDiv.scrollHeight;
                setTimeout(typeLine, Math.random() * 100 + 50);
            }
        } else {
            // Add blinking cursor at the end
            const cursor = document.createElement('span');
            cursor.className = 'cli-cursor';
            cursor.innerHTML = '█';
            cliDiv.appendChild(cursor);
        }
    }
    
    function typeCharByChar(line, charIndex) {
        if (charIndex < line.length) {
            cliDiv.innerHTML += line.charAt(charIndex);
            charIndex++;
            setTimeout(() => typeCharByChar(line, charIndex), Math.random() * 50 + 30);
        } else {
            cliDiv.innerHTML += '<br>';
            idx++;
            // Scroll to bottom
            cliDiv.scrollTop = cliDiv.scrollHeight;
            // Add a delay before the next line
            setTimeout(typeLine, Math.random() * 300 + 200);
        }
    }
    
    // Start typing with a slight delay
    setTimeout(typeLine, 500);
}

// Initialize everything when window loads
window.addEventListener('load', function() {
    init();
    // Start home laptop animation when page loads
    setTimeout(startHomeLaptopOpenAnimation, 1500);
    
    // Add scroll listener to trigger laptop animation when scrolling
    window.addEventListener('scroll', function() {
        if (currentSection === 'home' && homeGroup) {
            startHomeLaptopOpenAnimation();
        }
    });
    
    // Make sure the laptop is visible and open on home page
    if (homeGroup) {
        homeGroup.visible = true;
        // Open the laptop screen
        if (homeGroup.userData.screen) {
            homeGroup.userData.screen.rotation.x = -Math.PI / 6; // Open position
        }
    }
    
    // Hide loading screen after initialization
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);
});