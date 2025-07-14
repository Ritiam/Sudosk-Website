
// -------------------- CLOUD ANIMATION -------------------- //

// Get the clouds and respective starting positions
const cloud1 = document.getElementById('cloud1');
const cloud2 = document.getElementById('cloud2');
const cloud3 = document.getElementById('cloud3');

const cloud1_left = 10 // 10vw
const cloud2_right = 10; // 10vw
const cloud3_left = 20; // 20vw

function CloudAnimation() {
    // Get the current scroll position and calculate the progress
    const scroll_pos = window.scrollY;
    const animation_length = 1500; // Maximum scroll distance for full animation in pixels
    const scroll_ratio = Math.min(scroll_pos / animation_length, 1); // Normalize the progress

    // Calculate the movement distances in vw units
    const step = Math.min(window.innerWidth*0.5, window.innerHeight*0.2) ;
    const movement = scroll_ratio * step;

    // Move the clouds

    const cloud1_left_position = cloud1_left - movement;
    cloud1.style.left = `${cloud1_left_position}vw`;

    const cloud2_right_position = cloud2_right - movement;
    cloud2.style.right = `${cloud2_right_position}vw`;

    const cloud3_left_position = cloud3_left - movement;
    cloud3.style.left = `${cloud3_left_position}vw`;
}

// Add scroll event listener
window.addEventListener('scroll', CloudAnimation);

// -------------------- Hidden Element Finder -------------------- //

// Get invisible components
const hidden_description = document.querySelectorAll('.club_description');
const hidden_event = document.querySelectorAll('.upcoming_event');

// Set observers to see if they are on screen with different thresholds
const clubDescriptionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log(".club_description element is visible!");
            entry.target.classList.remove("hidden");
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// .upcoming_event için gözlemci (eşik: 0.5)
const upcomingEventObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log(".upcoming_event element is visible!");
            entry.target.classList.remove("hidden");
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Start observing

document.querySelectorAll('.club_description').forEach(element => {
    clubDescriptionObserver.observe(element);
});

document.querySelectorAll('.upcoming_event').forEach(element => {
    upcomingEventObserver.observe(element);
});


// -------------------- Infinite loop effect -------------------- //

// Get the slot rows and container
const slot_row1 = document.getElementById('slot_row_1');
const slot_row2 = document.getElementById('slot_row_2');
const container = document.querySelector('.our_group');

// Set initial positions and speeds
let max_speed = 1;
let current_speed = max_speed;
let hovering = false;

let pos1 = 0;
let pos2 = slot_row1.offsetWidth + 32;

function MoveSlots() {

    // Calculate speed and smoothen
    let speed_delta = (hovering? 0 : max_speed) - current_speed;
    current_speed += speed_delta * 0.02;

    pos1 -= current_speed;
    pos2 -= current_speed;

    // Reset positions if they go out of view
    if (pos1 <= -slot_row1.offsetWidth) {
        pos1 = pos2 + slot_row1.offsetWidth + 32;
    }

    if (pos2 <= -slot_row2.offsetWidth) {
        pos2 = pos1 + slot_row2.offsetWidth + 32;
    }

    slot_row1.style.transform = `translateX(${pos1}px)`;
    slot_row2.style.transform = `translateX(${pos2}px)`;

    requestAnimationFrame(MoveSlots);

}

// Check if the container is hovered
container.addEventListener('mouseenter', () => {
    hovering = true;
});

container.addEventListener('mouseleave', () => {
    hovering = false;
});

window.addEventListener('load', () => {
    pos1 = 0;
    pos2 = slot_row1.offsetWidth + 32;
    MoveSlots();
});


// -------------------- Language Change -------------------- //


let currentLanguage = 'tr';

// Function to change the language and button states
function changeLanguage(lang) {
    currentLanguage = lang;
    updateTexts();
    updateButtonStates();
}

// Change the text using current language key
function updateTexts() {

    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[currentLanguage][key];
    });
}

// Change the button states based on the current language
function updateButtonStates() {
    document.querySelectorAll('.language_button').forEach(btn => {
        btn.classList.remove('active', 'disabled');
    });


    if (currentLanguage === 'tr') {
        document.getElementById('tr-btn').classList.add('active');
        document.getElementById('en-btn').classList.add('disabled');
    } else {
        document.getElementById('en-btn').classList.add('active');
        document.getElementById('tr-btn').classList.add('disabled');
    }
}

// Texts for translation
const translations = {
    tr: {
        about_us: "Kulübümüz hakkında",
        about_description: "Sudosk öyle bi kulüp ki anlatamam hani tırmanan var atlayan var dalan var zıplayan var kaçan var kovalayan var uzunu var kısası var kızı var erkeği var ülker çikolatalı gofreti seven yok ee'cisi var va'cisi var var da var",

        president: "Başkanlar",
        secretary: "Sekreter",
        treasurer: "Sayman",
        wall: "Duvar",
        education: "Eğitim",
        storage: "Depo",
        transportation: "Ulaşım",
        sponsors: "Sponsor",
        media: "Medya",
        advisor: "Danışmanlarımız",
        teacher: "hocamız",

        president_job: "Yönetiyolar felan çok da bi şey yaptıkları yok aslında.",
        secretary_job: "Kulüp işlerini düzenler, toplantıları organize eder.",
        treasurer_job: "Kulübün mali işlerini yönetir, bütçeyi kontrol eder.",
        wall_job: "Kulübün duvarını yönetir, bakımını yapar.",
        education_job: "Kulüp içi eğitim programlarını düzenler.",
        storage_job: "Kulüp malzemelerinin depolanmasını sağlar.",
        transportation_job: "Kulüp etkinlikleri için ulaşım düzenler.",
        sponsors_job: "Kulübün sponsor ilişkilerini yönetir.",
        media_job: "Kulübün medya ve sosyal medya hesaplarını yönetir.",
        advisor_job: "Kulübümüze destek veren danışmanlarımız.",
        teacher_job: "Kulübümüze destek veren hocamız.",

        president_name: "Mert Ali ve Buket",
        secretary_name: "Elif",
        treasurer_name: "Elif",
        wall_name: "Umut ve İlkin",
        education_name: "Buket?",
        storage_name: "Öykü ve Mert Ali?",
        transportation_name: "Can",
        sponsors_name: "Talha",
        media_name: "Ahsen",
        advisor_name: "Fikret, Alp, Seher ve Efsane",
        teacher_name: "Murat Hoca",

        this_week: "Bu hafta ne var?",
        event_name: "Hike",
        event_loc_label: "Mekan:",
        event_loc: "Belgrad Ormanı",
        event_date_label: "Tarih:",
        event_date: "30 Şubat pazartesi",
        event_diff_label: "Zorluk:",
        event_diff: "Kolay",
        event_button: "Katıl",

        whatsapp: "WhatsApp linkimiz",
        instagram: "Instagram hesabımız",
        mail_adress: "sudosk@sabanciuniv.edu",
        mail_list: "Mail Listimiz",

        faq_title: "Sıkça Sorulan Sorular",
        faq_ctg1: "Tırmanış Duvarı Hakkında",
        faq_c1_q1: "Ne zamanları kullanabilirim?",
        faq_c1_q1_a: "Tırmanış duvarı aksini belirten bir duyuru geçilmedikçe her çarşamba günü 18.00 ve 22.00 araları okuldaki herkesin kullanımına açık. Salı günü dışında odayı kullanmak isteyen üyelik alarak spor salonu açık olduğu sürece istedikleri zaman odaya girebilirler.",
        faq_c1_q2: "Nasıl Duvar Üyesi Olunur?",
        faq_c1_q2_a: "Dönemin başında whatsapp grupları ve mail liste giden üyelik formu üstünden kayıt olmanız yeterli, kayıt için herhangi bir deadline yok. Form atıldıktan sonraki 1 hafta boyunca indirimli, yakalamanızı öneririz :).",
        faq_c1_q3: "Yeni başlayanlar için öneriler?",
        faq_c1_q3_a: "Yapamadığınız bir rotaya kitlenip kalmayın, farklı rotalar deneyin, önceki rotada işinize yarayacak bi şeyler keşfedebilirsiniz. Çıkamadığınız bir rota varsa o rotayı bitirenlere danışabileceğinizi unutmayın. Sizden daha hızlı ilerleyen kişiler olabilir, moral bozmak yok, herkesin temposu farklı. Eğlenmeyi de unutmayın, bu en önemlisi.",
        faq_c1_q4: "Duvarda nelere dikkat etmem gerek?",
        faq_c1_q4_a: "Isınmayı sakın unutmayın, salı günleri orada bulunacak arkadaşlarımızdan da \"güvenli düşüş\" nasıl yapılır öğretmelerini isteyin. Tırmanan kişilerin altında beklemeyin. Spor salonundan ağırlık veya benzeri ekipmanlar getirmeyin. Ve başkalarına karşı saygılı olmayı unutmayın.",
        faq_ctg2: "Eğitimlerimiz Hakkında",
        faq_c2_q1: "Hangi eğitimler var?",
        faq_c2_q1_a: "Temel ve ileri düzey kampçılık ile yine temel ve ileri düzey tırmanış eğitimleri veriyoruz.",
        faq_c2_q2: "Eğitimlerin gidişatı nasıl oluyor?",
        faq_c2_q2_a: "Temel eğitimleri SUDOSK YK’ları olarak biz veriyoruz. İleri seviye eğitimleri kulüp hocamız veriyor. Derslerimiz kampüste oluyor.",
        faq_c2_q3: "Eğitimleri neden almalıyım?",
        faq_c2_q3_a: "Temel eğitimler ileri eğitimlerin kilidini açıyor. Ayrıca kamp veya tırmanış eğitimini alarak yaptığımız genel kamp ve tırmanış etkinliklerine katılabilirsiniz!",
        faq_ctg3: "Malzeme Kullanımı ve Depo Hakkında",
        faq_c3_q1: "Malzemeleri nasıl kullanabilirim?",
        faq_c3_q1_a: "Her etkinlik öncesi o etkinlik için gerekli malzemeler sorumlular tarafından katılımcılara verilmekte, verilen malzemeleri görevine uygun ve belirtilen şekilde kullandığınız sürece istediğiniz gibi kullanabilirsiniz.",
        faq_c3_q2: "etkinlik sonrası malzemeleri ne yapmam lazım?",
        faq_c3_q2_a: "Malzemeleri, etkinlik sonrası whatsapp grubuna ve mail listtekilere atılacak son teslim tarihinden önce depo sorumlusuna vermeniz lazım. Çamurlanmış eşyaları yıkamayı unutmayın.",
        faq_ctg4: "Etkinliklerimiz Hakkında",
        faq_c4_q1: "Ne tür etkinlikler düzenleniyor?",
        faq_c4_q1_a: "Yıl boyunca hike, oryantiring, bisiklet, kamp ve tırmanış etkinlikleri düzenliyoruz. Bunun yanında ara sıra kafa dağıtmak için içmecelerimiz de oluyor :)",
        faq_c4_q2: "Etkinlikler ne sıklıkla oluyor?",
        faq_c4_q2_a: "Her haftasonu bir etkinlik düzenliyoruz fakat etkinliklerimiz doğa sporları olduğu için hava koşulları ve benzeri faktörler uygun değilse -nadir de olsa- iptal etmemiz veya etkinliği değiştirmemiz gerekebiliyor.",
        faq_c4_q3: "Etkinliklere nasıl katılabilirim?",
        faq_c4_q3_a: "Whatsapp ve mail list'e atılacak olan etkinlik formundan kayıt yapabilirsiniz.",
        faq_ctg5: "Olimpos Etkinliği Hakkında",
        faq_c5_q1: "Olimpos etkinliği tam olarak ne?",
        faq_c5_q1_a: "Hike, tekne gezisi ve bol bol tırmanış (deep water solo dahil) yaptığımız, konakladığımız yerdeki çardaklarda veya ateş etrafında sohbet ettiğimiz, Sabancı'nın yoğun temposundan kaçmak için en güzel fırsatlardan biri olan ve kulübümüzün her yıl yaptığı en büyük etkinliği.",
        faq_c5_q2: "Nerede ve ne zaman oluyor?",
        faq_c5_q2_a: "Antalya'da Bayram's Treehouses'da konaklıyoruz, 2. dönemin ortalarında yapılıyor ve o yıl belirlenmiş tarihe göre 3 veya 4 gece kalıyoruz.",


    },
    en: {
        title: "SUDOSK",
        about_us: "About Our Club",
        about_description: "Sudosk is such a club that...",

        president: "Presidents",
        secretary: "Secretary",
        treasurer: "Treasurer",
        wall: "Wall",
        education: "Education",
        storage: "Storage",
        transportation: "Transportation",
        sponsors: "Sponsors",
        media: "Media",
        advisor: "Our Advisors",
        teacher: "Our Teacher",

        president_job: "They manage the club... but honestly, not much else.",
        secretary_job: "Organizes club affairs and meetings.",
        treasurer_job: "Handles the club’s financial matters and manages the budget.",
        wall_job: "Maintains and manages the climbing wall.",
        education_job: "Organizes internal training programs.",
        storage_job: "Manages storage of club equipment.",
        transportation_job: "Arranges transportation for club events.",
        sponsors_job: "Manages relationships with sponsors.",
        media_job: "Handles media and social media accounts.",
        advisor_job: "Our supportive advisors.",
        teacher_job: "Our supporting teacher.",

        president_name: "Mert Ali and Buket",
        secretary_name: "Elif",
        treasurer_name: "Elif",
        wall_name: "Umut and İlkin",
        education_name: "Buket?",
        storage_name: "Öykü and Mert Ali?",
        transportation_name: "Can",
        sponsors_name: "Talha",
        media_name: "Ahsen",
        advisor_name: "Fikret, Alp, Seher, and Efsane",
        teacher_name: "Murat Hoca",

        this_week: "What's happening this week?",
        event_name: "Hike",
        event_loc_label: "Location:",
        event_loc: "Belgrad Forest",
        event_date_label: "Date:",
        event_date: "Monday, February 30",
        event_diff_label: "Difficulty:",
        event_diff: "Easy",
        event_button: "Join",

        whatsapp: "Our WhatsApp",
        instagram: "Our Instagram",
        mail_adress: "sudosk@sabanciuniv.edu",
        mail_list: "Our Mailing List",

        faq_title: "Frequently Asked Questions",
        faq_ctg1: "About the Climbing Wall",
        faq_c1_q1: "When can I use it?",
        faq_c1_q1_a: "Unless announced otherwise, the climbing wall is open every Wednesday from 6 PM to 10 PM for everyone at school. Outside of Tuesdays, members can enter anytime the gym is open by getting a membership.",
        faq_c1_q2: "How can I become a wall member?",
        faq_c1_q2_a: "At the beginning of the semester, you can register via the membership form shared in WhatsApp groups and mailing list. There’s no deadline. For a week after the form is shared, there's a discount — don't miss it :)",
        faq_c1_q3: "Any tips for beginners?",
        faq_c1_q3_a: "Don’t get stuck on a route you can’t complete. Try different routes — you may discover techniques that help you later. Don’t hesitate to ask those who completed a route you couldn’t. Everyone progresses at their own pace. Most importantly, have fun!",
        faq_c1_q4: "What should I watch out for on the wall?",
        faq_c1_q4_a: "Don’t forget to warm up. Ask the people present on Tuesdays to teach you safe falling. Don’t wait under someone who's climbing. Don’t bring weights or equipment from the gym. Be respectful to others.",

        faq_ctg2: "About Our Trainings",
        faq_c2_q1: "What trainings are available?",
        faq_c2_q1_a: "We offer basic and advanced camping and climbing training.",
        faq_c2_q2: "How are the trainings structured?",
        faq_c2_q2_a: "Basic trainings are provided by SUDOSK board members. Advanced trainings are led by our club teacher. Classes are held on campus.",
        faq_c2_q3: "Why should I take the trainings?",
        faq_c2_q3_a: "Basic training unlocks access to advanced ones. Also, only those who’ve completed the respective training can join our general climbing and camping events!",

        faq_ctg3: "About Equipment & Storage",
        faq_c3_q1: "How can I use the equipment?",
        faq_c3_q1_a: "Before every event, needed equipment is provided by responsible members. As long as you use it as instructed and for the right purpose, you're good to go.",
        faq_c3_q2: "What should I do after using the equipment?",
        faq_c3_q2_a: "Return them to the storage responsible before the deadline that will be shared in the WhatsApp group and mailing list. Don’t forget to clean any muddy gear.",

        faq_ctg4: "About Our Events",
        faq_c4_q1: "What kinds of events do you organize?",
        faq_c4_q1_a: "Throughout the year we organize hikes, orienteering, cycling, camping, and climbing trips. Occasionally, we also have chill drinking nights :)",
        faq_c4_q2: "How often are the events?",
        faq_c4_q2_a: "We organize events every weekend. However, since they involve outdoor activities, they might rarely be canceled or changed due to weather or similar factors.",
        faq_c4_q3: "How can I join the events?",
        faq_c4_q3_a: "You can register through the event form shared via WhatsApp and mailing list.",

        faq_ctg5: "About the Olimpos Event",
        faq_c5_q1: "What exactly is the Olimpos event?",
        faq_c5_q1_a: "It's our biggest annual event with hiking, boat trips, lots of climbing (including deep water solo), and chilling in gazebos or around the fire — a great escape from the hectic Sabancı life.",
        faq_c5_q2: "Where and when is it?",
        faq_c5_q2_a: "We stay at Bayram's Treehouses in Antalya. It takes place in the middle of the second semester and lasts for 3–4 nights depending on the year’s schedule."
    }
};

// Add event listeners for the buttons
document.addEventListener('DOMContentLoaded', function() {
    updateTexts();
    updateButtonStates();
});


// -------------------- Color Change -------------------- //

// Initialize the color theme
function initializeTheme() {
    // Get the buttons and other necessary components
    const sunButton = document.getElementById('sun');
    const moonButton = document.getElementById('moon');
    const body = document.body;
    const weatherWheel = document.querySelector('.weather_wheel');

    // Check for saved theme preference or use dark mode if there is no preference
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme === 'dark' || !savedTheme;

    // Apply initial theme
    if (isDarkMode) {
        setDarkMode();
    } else {
        setLightMode();
    }

    // Add event listeners to color buttons
    sunButton.addEventListener('click', setDarkMode);  // Sun click = go back to dark
    moonButton.addEventListener('click', setLightMode); // Moon click = go to light

    // Function to change images
    function switchThemeImages(isDark) {

        const imageMap = {
            'images/Hike icon.png': 'images/light Hike icon.png',
            'images/Phone.png': 'images/light Phone.png',
            'images/Camera.png': 'images/light Camera.png',
            'images/Mail.png': 'images/light Mail.png',
            'images/Event Card.png': 'images/light Event Card.png'
        };

        // Get all the images in the document
        const images = document.querySelectorAll('img');

        // Loop through each image and switch the source image with target image
        images.forEach(img => {
            const currentSrc = img.getAttribute('src');

            if (isDark) {
                // Switching to dark mode: check if current image is a light version
                for (const [darkSrc, lightSrc] of Object.entries(imageMap)) {
                    if (currentSrc === lightSrc) {
                        img.setAttribute('src', darkSrc);
                        break;
                    }
                }
            } else {
                // Switching to light mode: check if current image is a dark version
                for (const [darkSrc, lightSrc] of Object.entries(imageMap)) {
                    if (currentSrc === darkSrc) {
                        img.setAttribute('src', lightSrc);
                        break;
                    }
                }
            }
        });
    }

    // Function to change color palette to light
    function setLightMode() {
        // Add light mode class to body which overrides the color variables of root
        body.classList.add('light_mode');

        // Rotate weather wheel 180 degrees
        weatherWheel.classList.add('light');

        // Swap button positions: moon goes left, sun comes to center
        moonButton.classList.add('active');
        sunButton.classList.add('active');

        // Switch all images to light theme
        switchThemeImages(false);

        // Save preference
        localStorage.setItem('theme', 'light');
    }

    // Function to change color palette to dark
    function setDarkMode() {
        // Remove light mode class from body (back to dark palette)
        body.classList.remove('light_mode');

        // Rotate weather wheel back to normal
        weatherWheel.classList.remove('light');

        // Swap button positions: sun goes left (hidden), moon comes to center
        sunButton.classList.remove('active');
        moonButton.classList.remove('active');

        // Switch all images to dark theme
        switchThemeImages(true);

        // Save preference
        localStorage.setItem('theme', 'dark');
    }
}

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTheme);

