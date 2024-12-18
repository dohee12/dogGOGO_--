function showSection(sectionId) {
    // 모든 섹션을 숨김
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // 선택된 섹션만 표시
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

// 기본적으로 첫 번째 섹션을 보여줌
window.onload = () => {
    showSection('places');
};

// 슬라이드
let currentIndex = 0; // 현재 슬라이드 인덱스
const wrap = document.querySelector('.wrap');
const images = document.querySelectorAll('.wrap img');
const totalImages = images.length;

// 슬라이드 이동 함수
function moveToNextSlide() {
    currentIndex++;
    if (currentIndex === totalImages) {
        wrap.style.transition = 'none';
        currentIndex = 0;
        wrap.style.transform = `translateX(0)`;
        setTimeout(() => {
            wrap.style.transition = 'transform 0.5s ease';
            moveToNextSlide();
        }, 10);
        return;
    }
    wrap.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// 3초 간격으로 슬라이드 이동
setInterval(moveToNextSlide, 3000);
