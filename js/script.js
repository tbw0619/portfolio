// =======================================
// モバイルナビゲーション
// =======================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// ハンバーガーメニューのトグル
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // アニメーション用のクラス追加
        navToggle.classList.toggle('active');
    });
}

// ナビゲーションリンクをクリックしたらメニューを閉じる
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (navToggle) {
            navToggle.classList.remove('active');
        }
    });
});

// =======================================
// スクロール時のヘッダー動作
// =======================================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // スクロール時に影を強調
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// =======================================
// アクティブナビゲーションの更新
// =======================================
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// =======================================
// スムーズスクロール
// =======================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =======================================
// スクロールアニメーション
// =======================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// アニメーション対象の要素を監視
const animateElements = document.querySelectorAll(
    '.skill-card, .achievement-card, .project-item, .timeline-item, .about-text'
);

animateElements.forEach(element => {
    observer.observe(element);
});

// =======================================
// お問い合わせフォームのバリデーション
// =======================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // フォームの値を取得
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // バリデーション
        if (!name || !email || !subject || !message) {
            alert('すべての項目を入力してください。');
            return;
        }

        // メールアドレスの形式チェック
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('正しいメールアドレスを入力してください。');
            return;
        }

        // 成功メッセージ（実際にはここでフォームを送信する処理を実装）
        alert('お問い合わせありがとうございます。\n内容を確認次第、ご連絡させていただきます。');

        // フォームをリセット
        contactForm.reset();
    });
}

// =======================================
// スキルカードのホバーエフェクト
// =======================================
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// =======================================
// ページ読み込み時の初期化
// =======================================
document.addEventListener('DOMContentLoaded', () => {
    // ページトップへのスクロール
    window.scrollTo(0, 0);

    // 初期状態でのアクティブナビゲーション設定
    updateActiveNav();

    // ヒーローセクションのアニメーション
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('fade-in-up');
        }, 100);
    }
});

// =======================================
// 数値カウントアップアニメーション
// =======================================
const achievementNumbers = document.querySelectorAll('.achievement-number');

const countUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const text = target.textContent;
            const hasPercent = text.includes('%');
            const hasPlus = text.includes('+');
            const numberMatch = text.match(/\d+/);

            if (numberMatch) {
                const finalNumber = parseInt(numberMatch[0]);
                let currentNumber = 0;
                const increment = finalNumber / 50;
                const duration = 1500;
                const stepTime = duration / 50;

                const counter = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= finalNumber) {
                        currentNumber = finalNumber;
                        clearInterval(counter);
                    }

                    let displayText = Math.floor(currentNumber).toString();
                    if (hasPlus) displayText += '+';
                    if (hasPercent) displayText += '%';
                    if (text.includes('年')) displayText += '年';
                    if (text.includes('回')) displayText += '回';

                    target.textContent = displayText;
                }, stepTime);
            }

            countUpObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

achievementNumbers.forEach(number => {
    countUpObserver.observe(number);
});

// =======================================
// 外部リンクを新しいタブで開く
// =======================================
document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.href.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});
