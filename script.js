document.addEventListener("DOMContentLoaded", function() {
    const wrapper = document.getElementById('scrollLockWrapper');
    const textScroll = document.getElementById('textScroll');
    const image = document.getElementById('projectImage');
    const paragraphs = textScroll.children;
    const totalParagraphs = paragraphs.length;
    const paragraphHeight = window.innerHeight;
    
    const images = ['mockup1.jpg', 'mockup2.jpg', 'mockup3.jpg'];
    
    const image1 = document.getElementById('projectImage1');
    const image2 = document.getElementById('projectImage2');
    let isImage1Active = true;
    let currentImageIndex = 0;
    
    function crossfadeToImage(index) {
        if (index === currentImageIndex) return;
        currentImageIndex = index;
    
        const nextImage = isImage1Active ? image2 : image1;
        const currentImage = isImage1Active ? image1 : image2;
    
        nextImage.src = images[index];
    
        nextImage.onload = () => {
            nextImage.classList.add('active');
            currentImage.classList.remove('active');
            isImage1Active = !isImage1Active;
        };
    }
    
    window.addEventListener('scroll', () => {
        const wrapperRect = wrapper.getBoundingClientRect();
        const containerHeight = document.querySelector('.text-container').offsetHeight;
        const scrollContentHeight = textScroll.scrollHeight;
        const maxScroll = scrollContentHeight - containerHeight;
    
        if (wrapperRect.top <= 0 && wrapperRect.bottom > window.innerHeight) {
            let scrollDistance = -wrapperRect.top;
            if (scrollDistance > maxScroll) scrollDistance = maxScroll;
            textScroll.style.transform = `translateY(-${scrollDistance}px)`;
    
            for (let i = 0; i < paragraphs.length; i++) {
                const para = paragraphs[i];
                const rect = para.getBoundingClientRect();
                const imageCenter = window.innerHeight / 2;
    
                if (rect.top <= imageCenter && rect.bottom >= imageCenter) {
                    crossfadeToImage(i);
                    break;
                }
            }
        }
    });    
});
