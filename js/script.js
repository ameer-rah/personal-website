gsap.registerPlugin(ScrollTrigger);

const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

const magneticButtons = document.querySelectorAll('.magnetic');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        gsap.to(button, {
            x: deltaX * 20,
            y: deltaY * 20,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
    
    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

const container = document.getElementById('webgl-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ 
    color: 0xffffff,
    transparent: true,
    opacity: 0.1
});

const elements = [];
for (let i = 0; i < 20; i++) {
    const element = new THREE.Mesh(geometry, material);
    element.position.set(
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * 20 - 10
    );
    element.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    );
    scene.add(element);
    elements.push(element);
}

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    
    elements.forEach(element => {
        element.rotation.x += 0.01;
        element.rotation.y += 0.01;
    });
    
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    gsap.to(loader, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
            loader.style.display = 'none';
        }
    });
});

gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1
    });
});

const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');

mobileNavToggle.addEventListener('click', () => {
    mobileNavToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }
  
  if (isIOS()) {
    document.body.classList.add('ios-device');
  }