

document.addEventListener("DOMContentLoaded", () => {
    applyStaticTranslations(); // تطبيق الترجمة عند تحميل الصفحة
});




let currentLanguage = localStorage.getItem("language") || "ar"; // اللغة الافتراضية
const translations = {
    ar: {
        app_title: "تطبيق نادي الهلال",
        change_language_ar: "عربي",
        change_language_en: "إنجليزي",
        menu_toggle: "☰",
       hilal_info: "معلومات الهلال",
        support: "الدعم",
        championships: "التتويجات",
        competitions: "المسابقات",
        team_matches: "المواجهات",
        team_players: "الفريق الأول",
        year_stats: "حسميات الدوري",
        managers: "رؤساء النادي",
        youtube_videos: "مقاطع التتويج",
        hilal_map: "منصات الهلال",
        world_cup: "كأس العالم",
        privacy_policy: "سياسة الخصوصية",
        about_us: "من نحن",
        support_notes: "ملاحظات الدعم",
       app_title: "تطبيق حالي الذوق",
       welcome_message: "مرحبًا بك في تطبيقنا!",
        welcome_description: "استمتع بالمعلومات والبيانات الحصرية حول تاريخ وإنجازات نادي الهلال.",
        timer_message: "سيتم تسجيل خروجك بعد 10 ثوانٍ...",
       register_title: "شاشة تسجيل الدخول",
        user_name_label: "اسم المستخدم",
        user_name_placeholder: "اسم المستخدم",
        user_name_error: "الرجاء إدخال اسم مستخدم صحيح.",
        user_email_label: "البريد الإلكتروني",
        user_email_placeholder: "example@example.com",
        user_email_error: "الرجاء إدخال بريد إلكتروني صحيح.",
        register_button: "تسجيل",
        twitter: "تويتر",
        youtube: "يوتيوب",
        telegram: "تيليجرام",
        select_year_label: "اختر السنة",
        match_number: "رقم المباراة",
        year: "السنة",
        round: "الدور",
        team1: "الهلال",
        team2: "المنافس",
        result: "النتيجة",  year_stats: "📊 حسميات الدوري",
        select_year_label: "اختر السنة",
        all: "الكل",
        wins: "الانتصارات",
        losses: "الخسائر",
        draws: "التعادلات",
        match_number: "رقم المباراة",
        managers_title: "رؤساء النادي",
        manager_image: "صورة المدير",
        prev: "السابق",
        next: "التالي",
        no_data: "لا توجد بيانات متاحة للرؤساء",
        no_wins: "لا توجد بطولات",
        period: "الفترة الزمنية",
        trophies: "البطولات",
        stats: "الإحصائيات",
        total_years: "إجمالي السنوات",
        total_trophies: "إجمالي البطولات",
             years: "سنة",
 youtube_videos: "مقاطع التتويج",
        previous: "السابق",
        next: "التالي",
        page: "الصفحة",
        of: "من",
        video_title_not_available: "عنوان غير متوفر",
        winner: "الفائز",
       world_cup: "كأس العالم",
        world_cup_details: "تفاصيل كأس العالم",
        back_to_world_cup: "العودة لكأس العالم",
        view_details: "عرض التفاصيل",
        opponent: "الفريق المنافس",
        date: "التاريخ",
        stadium: "الملعب",
        captain: "الكابتن",
        result: "النتيجة",
        championship: "البطولة",
      loading: "جاري تحميل البيانات...",
        telegram_link: "اشترك في قناة تيليجرام للحصول على كل جديد",
        last_match: "آخر مباراة",
        no_matches: "لا توجد مباريات مسجلة",
        this_month_events: "بطولات هذا الشهر",
        no_events: "لا توجد بطولات لهذا الشهر",
      
        championships: "التتويجات",
        select_year_label: "اختر السنة",
        championship_rank: "رقم البطولة",
        final_match: "المباراة النهائية",
        season: "الموسم",
        opponent: "الفريق المهزوم",
        score: "النتيجة",
        captain: "الكابتن",
        not_available: "غير متوفر",
privacy_policy: "سياسة الخصوصية",
privacy_welcome: "مرحبًا بكم في تطبيق \"بطولات الهلال\". هذا التطبيق تم تطويره باجتهاد شخصي ويهدف إلى جمع معلومات حول تاريخ وإنجازات نادي الهلال بشكل شامل ومفيد للجمهور.",
independence_statement: "بيان الاستقلالية",
independence_content: "هذا التطبيق غير تابع أو مدعوم من قبل نادي الهلال الرسمي أو أي جهة رسمية أخرى. جميع الجهود المبذولة هنا شخصية ومستقلة.",
content_sources: "مصادر المحتوى",
sources_content: "تم جمع جميع البيانات والمعلومات من مصادر عامة موثوقة مثل الإنترنت. مقاطع الفيديو المعروضة من مصادرها الأصلية (مثل قنوات اليوتيوب) ولم يتم تعديلها. إذا كنت مالكًا لأي محتوى وترغب في إزالته، يرجى التواصل معنا.",
copyright: "حقوق النشر",
copyright_content: "جميع حقوق الملكية الفكرية للتطبيق محفوظة. يمنع نسخ أو تعديل أو استخدام التطبيق لأغراض تجارية دون إذن مسبق.",
data_policy: "سياسة البيانات",
data_policy_content: "نحن لا نجمع أو نشارك بيانات المستخدمين مع أطراف ثالثة. إذا قمت بالتسجيل في التطبيق، سيتم استخدام بياناتك فقط لتحسين تجربة الاستخدام.",
contact_us: "تواصل معنا",
contact_content: "إذا كان لديك أي استفسارات أو اعتراضات، يمكنك التواصل معنا عبر البريد التالي:",

        footer_text: "© جميع الحقوق محفوظة لحساب \"حالي الذوق\" - الإصدار الأول 2025"
      
        // إضافة المزيد من النصوص هنا...
    },
    en: {
      
        app_title: "Hilal Club App",
        change_language_ar: "Arabic",
        change_language_en: "English",
        menu_toggle: "☰",
        hilal_info: "Hilal Information",
        support: "Support",
        championships: "Championships",
        competitions: "Competitions",
        team_matches: "Matches",
        team_players: "First Team",
        year_stats: "League Stats",
        managers: "Club Presidents",
        youtube_videos: "Highlight Videos",
        hilal_map: "Hilal Platforms",
        world_cup: "World Cup",
        privacy_policy: "Privacy Policy",
        about_us: "About Us",
        support_notes: "Support Notes",
      app_title: "Sweet Taste App",
        welcome_message: "Welcome to our app!",
        welcome_description: "Enjoy exclusive information and data about Al Hilal's history and achievements.",
        timer_message: "You will be logged out in 10 seconds...",
        register_title: "Login Screen",
        user_name_label: "Username",
        user_name_placeholder: "Enter your username",
        user_name_error: "Please enter a valid username.",
        user_email_label: "Email Address",
        user_email_placeholder: "example@example.com",
        user_email_error: "Please enter a valid email address.",
        register_button: "Register",
       twitter: "Twitter",
        youtube: "YouTube",
        telegram: "Telegram",
       year_stats: "📊 League Stats",
        select_year_label: "Select Year",
        match_number: "Match Number",
        year: "Year",
        round: "Round",
        team1: "Al-Hilal",
        team2: "Opponent",
        result: "Result",
        winner: "Winner",
       year_stats: "📊 League Stats",
        select_year_label: "Select Year",
        all: "All",
        wins: "Wins",
        losses: "Losses",
        draws: "Draws",
        match_number: "Match Number",
        managers_title: "Club Presidents",
        manager_image: "Manager Image",
        prev: "Previous",
        next: "Next",
        no_data: "No data available for managers",
        no_wins: "No trophies",
        period: "Time Period",
        trophies: "Trophies",
        stats: "Statistics",
        total_years: "Total Years",
        total_trophies: "Total Trophies",
        years: "Years",
        youtube_videos: "YouTube Videos",
        previous: "Previous",
        next: "Next",
        page: "Page",
        of: "of",
        video_title_not_available: "Title not available",
       world_cup: "World Cup",
        world_cup_details: "World Cup Details",
        back_to_world_cup: "Back to World Cup",
        view_details: "View Details",
        opponent: "Opponent",
        date: "Date",
        stadium: "Stadium",
        captain: "Captain",
        result: "Result",
       championship: "Championship",
        loading: "Loading data...",
        telegram_link: "Subscribe to Telegram channel for updates",
        last_match: "Last Match",
        no_matches: "No matches recorded",
        this_month_events: "This Month's Events",
        no_events: "No events this month",
        championships: "Championships",
        select_year_label: "Select Year",
        championship_rank: "Championship Rank",
        final_match: "Final Match",
        season: "Season",
        opponent: "Opponent",
        score: "Score",
        captain: "Captain",
        not_available: "Not Available",
      
      privacy_policy: "Privacy Policy",
privacy_welcome: "Welcome to the \"Al Hilal Achievements\" app. This app was developed as a personal effort to gather comprehensive and useful information about Al Hilal Club's history and achievements.",
independence_statement: "Independence Statement",
independence_content: "This app is not affiliated with or endorsed by the official Al Hilal Club or any other official entity. All efforts here are personal and independent.",
content_sources: "Content Sources",
sources_content: "All data and information were collected from reliable public sources like the internet. Videos are displayed from their original sources (e.g., YouTube channels) without modification. If you own any content and wish to have it removed, please contact us.",
copyright: "Copyright",
copyright_content: "All intellectual property rights of the app are reserved. Copying, modifying, or using the app for commercial purposes without prior permission is prohibited.",
data_policy: "Data Policy",
data_policy_content: "We do not collect or share user data with third parties. If you register in the app, your data will only be used to improve the user experience.",
contact_us: "Contact Us",
contact_content: "If you have any inquiries or objections, you can contact us at the following email:",
      
      

        footer_text: "© All rights reserved to \"Sweet Taste\" - Version 1.0 2025"
        // إضافة المزيد من النصوص هنا...
    }
};
/**
 * دالة لتطبيق الترجمة على النصوص الثابتة
 */
function applyStaticTranslations() {
    document.querySelectorAll("[data-key]").forEach(element => {
        const key = element.getAttribute("data-key");
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        } else {
            console.warn(`Translation key "${key}" is missing for language "${currentLanguage}"`);
        }
    });
}

function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem("language", lang);

    // تحديث اتجاه الصفحة
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;

    // تطبيق الترجمة الثابتة
    applyStaticTranslations();

    // تحديث القسم المفتوح بناءً على اللغة
    const mainContent = document.getElementById("main-content");
    const currentSection = mainContent.dataset.section;

    // تحديث القسم المفتوح ديناميكيًا
    switch (currentSection) {
        case "year-stats":
            const selectedYear = document.getElementById("year-stats-select")?.value;
            if (selectedYear) fetchYearStatsData(); // تحديث بيانات قسم "حسميات الدوري"
            break;

    case "team-matches":
    const selectedTeam = document.getElementById("team-select")?.value;
    fetchTeamMatchesData(); // تحديث الجدول بناءً على الفريق واللغة
    break;
    
       case "championships":
            const championshipsSelectedYear = document.getElementById("year-select")?.value; // حفظ السنة المحددة
            openChampionships(championshipsSelectedYear); // إعادة تحميل القسم بالسنة المحددة
            break;

        case "managers":
            openManagers(); // إعادة تحميل قسم "رؤساء النادي"
            break;

        case "youtube-videos":
            openYouTubeVideos(); // إعادة تحميل قسم "مقاطع التتويج"
            break;

        case "world-cup":
            openWorldCup(); // إعادة تحميل قسم "كأس العالم"
            break;

        case "hilal-map":
            openHilalMap(); // إعادة تحميل قسم "منصات الهلال"
            break;

        case "timeline":
            loadTimeline(); // إعادة تحميل الشريط الزمني
            break;

       case "privacy-policy":
    openContent("privacy-policy");
    break;
        
     case "team-players":
    openTeamPlayers(); // إعادة تحميل شاشة الفريق الأول
    break;
        
case "youtube-videos":
    openYouTubeVideos(); // إعادة تحميل صفحة الفيديوهات مع الترجمة
    break;

        default:
            console.warn("القسم الحالي غير معرف أو لا يحتاج إلى تحديث ديناميكي.");
    }

    // إضافة زر الرجوع عند كل تحديث
    addHomeButton();
}

      

const googleSheetURL = "https://script.google.com/macros/s/AKfycbzvHbZnVRWDv0yDMoWMEDhrUBmwNI_890WfWZFYDN0Rx7l2AzJX3sq_dQz9cFtkbghW/exec";

let sessionTimer;
let countdownTimer;
/* 
دالة initializeApp
تقوم بتحديد حالة المستخدم (مسجل دخول أو غير مسجل) وتعرض الشاشة المناسبة بناءً على حالته.
*/
function initializeApp() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const toggleButton = document.getElementById("menu-toggle");
    if (storedUser) {
        showWelcomeScreen(storedUser);
        if (toggleButton) toggleButton.style.display = "inline-block";
    } else {
        showRegisterScreen();
        if (toggleButton) toggleButton.style.display = "none"; // إخفاء زر الميني بار عند الإقلاع إذا لم يكن المستخدم مسجلاً
    }
}

/* 
دالة showWelcomeScreen
تعرض شاشة الترحيب عند تسجيل الدخول بنجاح وتقوم بتهيئة الميني بار وزر تسجيل الخروج.
*/
function showWelcomeScreen(user) {
    document.getElementById("welcome-screen").style.display = "block";
    document.getElementById("register-screen").style.display = "none";
    document.getElementById("logout-btn").style.display = "inline-block";

    const toggleButton = document.getElementById("menu-toggle");
    if (toggleButton) toggleButton.style.display = "inline-block"; // إظهار زر الميني بار

    const minibar = document.getElementById("minibar");
    if (minibar) minibar.style.display = "block";

    startSessionTimer(); // إعادة بدء مؤقت الجلسة
}


/* 
دالة showRegisterScreen
تعرض شاشة التسجيل إذا لم يكن المستخدم مسجل دخول وتقوم بإخفاء الأزرار غير الضرورية.
*/
function showRegisterScreen() {
    document.getElementById("register-screen").style.display = "block";
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("logout-btn").style.display = "none";

    const toggleButton = document.getElementById("menu-toggle");
    if (toggleButton) toggleButton.style.display = "none"; // إخفاء زر الميني بار
}
/* 
دالة startSessionTimer
تقوم بتشغيل عداد الجلسة (5 دقائق) وعند انتهائه يتم تسجيل الخروج تلقائيًا.
*/
/* دالة startSessionTimer */
function startSessionTimer() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const adminEmail = "Abunowaf@outlook.com";

    // إذا كان المستخدم الحالي هو الإدمن، استثناء من تسجيل الخروج
    if (storedUser && storedUser.email === adminEmail) {
        console.log("الإدمن مسجل دخول، تم استثناؤه من تسجيل الخروج التلقائي.");
        return;
    }

    // إلغاء أي مؤقت جلسة سابق
    if (sessionTimer) clearTimeout(sessionTimer);

    // إعداد مؤقت الجلسة
    sessionTimer = setTimeout(() => {
        const timerElement = document.getElementById("timer");
        let countdown = 10; // عدد الثواني للعد التنازلي

        if (timerElement) {
            timerElement.style.display = "block"; // إظهار العداد
            timerElement.textContent = `سيتم تسجيل خروجك بعد ${countdown} ثوانٍ...`;
        }
        // بدء العد التنازلي
        countdownTimer = setInterval(() => {
            countdown--;

            if (timerElement) {
                timerElement.textContent = `سيتم تسجيل خروجك بعد ${countdown} ثوانٍ...`;
            }

            if (countdown === 0) {
                clearInterval(countdownTimer); // إلغاء العد التنازلي
                if (timerElement) timerElement.style.display = "none"; // إخفاء العداد
                logoutUser(); // تسجيل الخروج بعد انتهاء العداد
            }
        }, 1000);
    }, 5 * 60 * 1000); // 5 دقائق من عدم النشاط
}

/* 
دالة logoutUser
تقوم بتسجيل خروج المستخدم وإعادة تعيين حالة البرنامج وإخفاء جميع العناصر المرتبطة بالمستخدم.
*/
// تعديل logoutUser للتأكد من إعادة تعيين الحالة بالكامل
 function logoutUser() {
    const minibar = document.getElementById("minibar");
    const overlay = document.getElementById("overlay");
    const toggleButton = document.getElementById("menu-toggle");
    const logoutButton = document.getElementById("logout-btn");

    localStorage.removeItem("user");

    // إعادة ضبط الشاشات
    document.getElementById("register-screen").style.display = "block";
    document.getElementById("welcome-screen").style.display = "none";

    // مسح محتوى التتويجات
    const mainContent = document.getElementById("main-content");
    mainContent.style.display = "none";
    mainContent.innerHTML = "";

    // إعادة إخفاء الأزرار والعناصر
    if (minibar) {
        minibar.classList.remove("open");
        minibar.style.display = "none";
    }
    if (overlay) overlay.classList.remove("show");
    if (toggleButton) toggleButton.style.display = "none";
    if (logoutButton) logoutButton.style.display = "none";

    alert("تم تسجيل خروجك بنجاح.");
}

/* 
دالة registerUser
تقوم بتسجيل مستخدم جديد عن طريق التحقق من البيانات وإرسالها إلى Google Sheets.
*/
function registerUser() {
    const name = document.getElementById("user-name").value.trim();
    const email = document.getElementById("user-email").value.trim();
    const registerButton = document.getElementById("register-btn");

    // إخفاء رسائل الخطأ أولاً
    clearErrors();

    // التحقق من المدخلات
    let hasError = false;
    if (!name) {
        showError("user-name", "يرجى إدخال اسم المستخدم (مثال: Ali123).");
        hasError = true;
    }
    if (!isValidEmail(email)) {
        showError("user-email", "يرجى إدخال بريد إلكتروني صحيح (مثال: example@example.com).");
        hasError = true;
    }

    if (hasError) return; // إذا كان هناك خطأ، لا تكمل العملية

    const storedUser = JSON.parse(localStorage.getItem("user"));

    // إذا كان المستخدم موجودًا مسبقًا
    if (storedUser && storedUser.name === name && storedUser.email === email) {
        alert(`مرحبًا بعودتك، ${name}!`);
        showWelcomeScreen(storedUser);
        return;
    }
/* 
دالة showError
تقوم بعرض رسالة خطأ بجانب الحقل المحدد.
*/
function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    errorElement.textContent = message;
    errorElement.style.display = "block";
}

/* 
دالة clearErrors
تقوم بإخفاء جميع رسائل الخطأ.
*/
function clearErrors() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((error) => {
        error.textContent = "";
        error.style.display = "none";
    });
}

    // إذا كان المستخدم جديدًا
    const uuid = generateUUID();
    registerButton.disabled = true;
    registerButton.textContent = "جاري التسجيل...";

    fetch(googleSheetURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, uuid }),
        mode: "no-cors"
    })
        .then(() => {
            const user = { name, email, uuid };
            localStorage.setItem("user", JSON.stringify(user));
            alert("تم تسجيلك بنجاح!");
            showWelcomeScreen(user);
        })
        .catch(() => alert("حدث خطأ أثناء التسجيل. حاول مرة أخرى."))
        .finally(() => {
            registerButton.disabled = false;
            registerButton.textContent = "تسجيل";
        });
}

/* 
دالة isValidEmail
تتحقق من صحة عنوان البريد الإلكتروني باستخدام تعبير منتظم.
*/
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


/* 
دالة generateUUID
تقوم بإنشاء معرف فريد عالمي (UUID) لتحديد كل مستخدم.
*/
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


/* 
دالة openContent
تعرض محتوى معين في القسم الرئيسي بناءً على الزر الذي ضغط عليه المستخدم.
*/
function openContent(content) {
    clearContent(); // مسح المحتوى السابق

    const mainContent = document.getElementById("main-content");
    const welcomeScreen = document.getElementById("welcome-screen");
    mainContent.style.display = "block";
    welcomeScreen.style.display = "none";

    // إضافة المحتوى الجديد
    mainContent.innerHTML = `<h2>${content}</h2><p>مرحبًا بك في قسم ${content}!</p>`;
    toggleMinibar(); // إغلاق الميني بار بعد اختيار المحتوى
}





/* 
دالة toggleMinibar
تتحكم في فتح وإغلاق الميني بار.
*/
function toggleMinibar() {
    const minibar = document.getElementById("minibar");
    const overlay = document.getElementById("overlay");
    const welcomeScreen = document.getElementById("welcome-screen");

    minibar.classList.toggle("open");
    if (minibar.classList.contains("open")) {
        overlay.classList.add("show");
        document.body.style.overflow = "hidden";
        welcomeScreen.style.display = "none"; // إخفاء الترحيب عند فتح الميني بار
    } else {
        overlay.classList.remove("show");
        document.body.style.overflow = "";
        const mainContent = document.getElementById("main-content");
        if (!mainContent.innerHTML.trim()) {
            // إذا لم يتم اختيار محتوى
            welcomeScreen.style.display = "block";
        }
    }
}


// إغلاق الميني بار عند الضغط على أي زر داخله.
document.querySelectorAll(".minibar-buttons button").forEach(button => {
    button.addEventListener("click", () => {
        const minibar = document.getElementById("minibar");
        const overlay = document.getElementById("overlay");

        minibar.classList.remove("open");
        overlay.classList.remove("show");
        document.body.style.overflow = ""; // استعادة التمرير
    });
});

// تعديل دالة showWelcomeScreen لمنع تشغيل العداد مباشرة
function showWelcomeScreen(user) {
    const welcomeMessage = document.querySelector(".welcome-title");
    welcomeMessage.textContent = `مرحبًا بك يا ${user.name} في تطبيق نادي الهلال!`;

    // إظهار شاشة الترحيب
    document.getElementById("welcome-screen").style.display = "block";
    document.getElementById("register-screen").style.display = "none";

    // إظهار زر تسجيل الخروج وزر الميني بار
    document.getElementById("logout-btn").style.display = "inline-block";
document.getElementById("menu-toggle").style.display = "inline-block";

    // إعادة تمكين الميني بار
    const minibar = document.getElementById("minibar");
    minibar.style.display = "block";

    // إعادة ضبط مؤقت الجلسة
    clearTimeout(sessionTimer);
    clearInterval(countdownTimer);

    // لا يتم استدعاء العداد إلا بعد 5 دقائق من الخمول
    startSessionTimer();
}
function clearContent() {
    const mainContent = document.getElementById("main-content");
    const welcomeScreen = document.getElementById("welcome-screen");
    
    // تنظيف جميع الأقسام
    mainContent.innerHTML = ""; // حذف المحتوى السابق
    mainContent.style.display = "none"; // إخفاء المحتوى الرئيسي
    welcomeScreen.style.display = "none"; // إخفاء شاشة الترحيب
}

function addHomeButton() {
    const mainContent = document.getElementById("main-content");
    const backButton = document.createElement("button");
    backButton.textContent = "الرجوع إلى الصفحة الرئيسية";
    backButton.classList.add("back-to-home-btn");
    backButton.addEventListener("click", () => {
        clearContent(); // تنظيف المحتوى
        showWelcomeScreen(JSON.parse(localStorage.getItem("user"))); // عرض شاشة الترحيب
    });
    mainContent.appendChild(backButton);
}
function handleButtonClick(event) {
    const contentType = event.target.getAttribute("data-content");
    const mainContent = document.getElementById("main-content");

    // مسح المحتوى السابق
    clearContent();
    mainContent.dataset.section = contentType; // تعيين القسم الحالي

    switch (contentType) {
          case "championships":
            openChampionships(); // فتح قسم التتويجات
            break;
        
      
        case "team-players":
            openTeamPlayers(); // فتح قسم الفريق الأول
            break;
        case "team-matches":
            openTeamMatches(); // فتح قسم المواجهات
            break;
        case "competitions":
            openCompetitions(); // فتح قسم المسابقات
            break;
        case "youtube":
            openYouTubeSection(); // فتح قسم اليوتيوب
            break;
        case "year-stats":
            openYearStats(); // فتح قسم حسميات الدوري
            break;
        case "today-events":
            openTodayEvents(); // فتح قسم "في مثل هذا اليوم"
            break;
        case "managers":
            openManagers(); // فتح قسم رؤساء النادي
            break;
        case "youtube-videos":
            openYouTubeVideos(); // فتح قسم مقاطع التتويج
            break;
        case "world-cup":
            openWorldCup(); // فتح قسم كأس العالم
            break;
        case "hilal-map":
            openHilalMap(); // فتح قسم منصات الهلال
            break;
       case "privacy-policy":
    openContent("privacy-policy"); // تأكد من تمرير نفس القيمة
    break;

        default:
            mainContent.innerHTML = `<h2>محتوى غير معروف</h2>`;
    }

    addHomeButton(); // إضافة زر الرجوع إلى الصفحة الرئيسية
    mainContent.style.display = "block"; // عرض المحتوى
    toggleMinibar(); // إغلاق الميني بار
}


//============================================================================================================================================

//============================================================================================================================================
// المتغيرات العامة والثابتة

// معرف Google Sheets
const ConsentSheetID = "1ksZhTi3JW4QP5MOk8fcWnUCeXbmTqpXW4BLxLaHtmc8";

// أسماء الشيتات
const SHEET_CHAMPIONSHIPS = "Sheet2"; // شيت التتويجات
const SHEET_PLAYERS = "player"; // شيت الفريق الأول
const SHEET_PAST_GAMES = "PastGames"; // شيت المواجهات
const managersSheet = "manger";
const todayEventSheet = "today-event";
const mapsSheet = "MAPS";  
const fifaWorldCupSheet = "WorldCupParticipation";

// متغيرات الفريق الأول
let playersData = [];
let teamPlayersCurrentPage = 1;
const playersPerPage = 5; // عدد اللاعبين لكل صفحة

//============================================================================================================================================
// الدوال العامة

/**
 * دالة لجلب البيانات من Google Sheets
 * @param {string} sheetName - اسم الشيت
 * @param {function} callback - الدالة التي سيتم تنفيذها بعد استلام البيانات
 */
function fetchDataFromSheet(sheetName, callback) {
    const url = `https://docs.google.com/spreadsheets/d/${ConsentSheetID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
    Papa.parse(url, {
        download: true,
        header: true,
        complete: function (results) {
            if (results && results.data && results.data.length > 0) {
                const translatedData = results.data.map(row => {
                    Object.keys(row).forEach(key => {
                        if (key.endsWith("_en")) {
                            const baseKey = key.replace("_en", "");
                            row[baseKey] = currentLanguage === "ar" ? row[baseKey] : row[`${baseKey}_en`] || row[baseKey];
                        }
                    });
                    return row;
                });
                callback(translatedData); // تمرير البيانات بعد الترجمة
            } else {
                console.error("No data found or invalid format.");
            }
        },
        error: function (error) {
            console.error("Error fetching data: ", error);
        }
    });
}

//============================================================================================================================================
function openChampionships(selectedYear = null) {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `
        <h2 data-key="championships">🏆 ${translations[currentLanguage].championships || "تتويجات البطولات النهائية"}</h2>
        <div class="dropdown-container">
            <select id="year-select" class="styled-dropdown">
                <option value="" disabled selected>${translations[currentLanguage].select_year_label || "اختر السنة"}</option>
            </select>
        </div>
        <div id="championships-data" class="cards-container"></div>
    `;

    // جلب البيانات باستخدام الدالة العامة
    fetchDataFromSheet(SHEET_CHAMPIONSHIPS, (data) => {
        populateChampionshipYears(data, selectedYear); // ملء قائمة السنوات
    });
}

function populateChampionshipYears(data, selectedYear = null) {
    const uniqueYears = [...new Set(data.map(row => row.Year))].sort();
    const yearSelect = document.getElementById("year-select");

    yearSelect.innerHTML = `<option value="" disabled selected>${translations[currentLanguage].select_year_label || "اختر السنة"}</option>`;
    uniqueYears.forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = `🏆 ${year}`; // السنة لا تحتاج ترجمة
        yearSelect.appendChild(option);
    });

    // إذا كانت هناك سنة محددة، حددها وأعد عرض البيانات
    if (selectedYear) {
        yearSelect.value = selectedYear; // تحديد السنة
        const filteredData = data.filter(row => row.Year === selectedYear);
        renderChampionships(filteredData); // عرض البيانات المفلترة
    }

    // إضافة حدث عند تغيير السنة
    yearSelect.addEventListener("change", () => {
        const selectedYear = yearSelect.value;
        const filteredData = data.filter(row => row.Year === selectedYear);
        renderChampionships(filteredData);
    });
}

function renderChampionships(data) {
    const dataContainer = document.getElementById("championships-data");
    dataContainer.innerHTML = ""; // تنظيف البيانات القديمة

    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "championship-card";
        card.innerHTML = `
            <div class="card-rank">
                ${translations[currentLanguage].championship_rank || "رقم البطولة"}: 
                <span class="rank-value">${item["Championship Rank"]}</span>
            </div>
            <h3 class="card-title">${currentLanguage === "ar" ? item["Name"] : item["Name_en"]}</h3>
            <img src="${item["Image URL"]}" alt="${item["Name"]}" class="championship-image">
            <div class="info-section">
                <i class="fa fa-trophy"></i>
                <span class="info-label">${translations[currentLanguage].final_match || "المباراة النهائية"}:</span>
                <span class="info-value">${currentLanguage === "ar" ? item["Final Match"] : item["Final_Match_en"]}</span>
            </div>
            <div class="info-section">
                <i class="fa fa-calendar-alt"></i>
                <span class="info-label">${translations[currentLanguage].season || "الموسم"}:</span>
                <span class="info-value">${item["Date"]}</span>
            </div>
            <div class="info-section">
                <i class="fa fa-users"></i>
                <span class="info-label">${translations[currentLanguage].opponent || "الفريق المهزوم"}:</span>
                <span class="info-value">${currentLanguage === "ar" ? item["Opponent"] : item["Opponent_en"]}</span>
            </div>
            <div class="info-section">
                <i class="fa fa-futbol"></i>
                <span class="info-label">${translations[currentLanguage].score || "النتيجة"}:</span>
                <span class="info-value">${currentLanguage === "ar" ? item["Score"] : item["Score_en"]}</span>
            </div>
            <div class="info-section">
                <i class="fa fa-user"></i>
                <span class="info-label">${translations[currentLanguage].captain || "الكابتن"}:</span>
                <span class="info-value">${currentLanguage === "ar" ? item["captn"] : item["captn_en"] || translations[currentLanguage].not_available}</span>
            </div>
        `;
        dataContainer.appendChild(card);
    });
}

//============================================================================================================================================
// دوال عرض الفريق الأول

/**
 * دالة لفتح شاشة الفريق الأول
 */
function openTeamPlayers() {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `
        <h2 id="team-players-title">👥 الفريق الأول</h2>
        <div id="players-container" class="players-grid"></div>
        <div class="pagination-controls">
            <button id="prev-page-btn" onclick="prevPage()">السابق</button>
            <button id="next-page-btn" onclick="nextPage()">التالي</button>
        </div>
    `;

    // جلب البيانات باستخدام الدالة العامة
    fetchDataFromSheet(SHEET_PLAYERS, (data) => {
        playersData = data; // تخزين البيانات
        teamPlayersCurrentPage = 1; // إعادة تعيين الصفحة الحالية
        displayPlayers(); // عرض اللاعبين
    });
}

/**
 * دالة لعرض اللاعبين حسب الصفحة الحالية
 */
function displayPlayers() {
    const playersContainer = document.getElementById("players-container");
    playersContainer.innerHTML = ""; // تنظيف المحتوى السابق

    const start = (teamPlayersCurrentPage - 1) * playersPerPage;
    const end = start + playersPerPage;
    const playersToDisplay = playersData.slice(start, end);

    playersToDisplay.forEach((player) => {
        const positionIcon = getPositionIcon(currentLanguage === "ar" ? player['class'] : player['class_en']);
        const playerCard = `
            <div class="player-card">
                <div class="player-number left">#${player['player_number']}</div>
                <img src="${player['Image URL']}" alt="${currentLanguage === "ar" ? player['neam'] : player['name_en']}" class="player-image">
                <div class="player-name">${currentLanguage === "ar" ? player['neam'] : player['name_en']}</div>
                <div class="player-position">${positionIcon} ${currentLanguage === "ar" ? player['class'] : player['class_en']}</div>
            </div>
        `;
        playersContainer.innerHTML += playerCard;
    });

    // التحكم في ظهور أزرار التنقل
    document.getElementById("prev-page-btn").style.display = teamPlayersCurrentPage > 1 ? "inline-block" : "none";
    document.getElementById("next-page-btn").style.display = end < playersData.length ? "inline-block" : "none";
}

/**
 * دالة لإرجاع أيقونة المركز بناءً على تصنيف اللاعب
 */
function getPositionIcon(playerClass) {
    switch (playerClass) {
        case "حارس مرمى":
        case "Goalkeeper":
            return `<i class="fa fa-hand-paper"></i>`;
        case "مدافع":
        case "Defender":
            return `<i class="fa fa-shield-alt"></i>`;
        case "مهاجم":
        case "Forward":
            return `<i class="fa fa-futbol"></i>`;
        default:
            return `<i class="fa fa-user"></i>`;
    }
}

/**
 * التنقل للصفحة التالية
 */
function nextPage() {
    teamPlayersCurrentPage++;
    displayPlayers();
}

/**
 * التنقل للصفحة السابقة
 */
function prevPage() {
    teamPlayersCurrentPage--;
    displayPlayers();
}
//============================================================================================================================================
function openTeamMatches() {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `
        <h2 id="team-matches-title" data-key="team_matches">⚽ ${translations[currentLanguage].team_matches || "مواجهات الهلال"}</h2>
        <select id="team-select" class="styled-dropdown" onchange="fetchTeamMatchesData()">
            <option value="">-- ${translations[currentLanguage].select_year_label || "اختر الفريق"} --</option>
        </select>
        <div id="team-stats" class="team-stats-container"></div>
        <table id="team-stats-table" class="hidden">
            <thead>
                <tr>
                    <th data-key="year">${translations[currentLanguage].year || "السنة"}</th>
                    <th data-key="round">${translations[currentLanguage].round || "الدور"}</th>
                    <th data-key="team1">${translations[currentLanguage].team1 || "الهلال"}</th>
                    <th data-key="team2">${translations[currentLanguage].team2 || "المنافس"}</th>
                    <th data-key="result">${translations[currentLanguage].result || "النتيجة"}</th>
                    <th data-key="winner">${translations[currentLanguage].winner || "الفائز"}</th>
                </tr>
            </thead>
            <tbody id="team-stats-tbody"></tbody>
        </table>
        <div id="team-matches-stats" class="hidden">
            <button class="team-filter-btn all" onclick="fetchTeamMatchesData()" data-key="all">${translations[currentLanguage].all || "الكل"}</button>
            <button class="team-filter-btn wins" onclick="filterMatches('win')" data-key="wins">${translations[currentLanguage].wins || "الانتصارات"}</button>
            <button class="team-filter-btn losses" onclick="filterMatches('loss')" data-key="losses">${translations[currentLanguage].losses || "الخسائر"}</button>
            <button class="team-filter-btn draws" onclick="filterMatches('draw')" data-key="draws">${translations[currentLanguage].draws || "التعادلات"}</button>
        </div>
    `;

    // تأكد من إخفاء الجدول والأزرار افتراضيًا
    document.getElementById("team-stats-table").classList.add("hidden");
    document.getElementById("team-matches-stats").classList.add("hidden");

    // تحميل أسماء الفرق
    fetchDataFromSheet(SHEET_PAST_GAMES, populateTeamNames);
}
function populateTeamNames(data) {
    const teams = [...new Set(data.flatMap(game => [
        currentLanguage === "ar" ? game.Team1 : game.Team1_en,
        currentLanguage === "ar" ? game.Team2 : game.Team2_en
    ]).filter(team => team.trim() !== ""))];
    
    const teamSelect = document.getElementById("team-select");
    teamSelect.innerHTML = `<option value="">-- ${translations[currentLanguage].select_year_label || "اختر الفريق"} --</option>`;

    const teamIcon = "⚽"; // أيقونة عامة للفريق

    teams.forEach(team => {
        const option = document.createElement("option");
        option.value = team;
        option.textContent = `${teamIcon} ${team}`; // إضافة أيقونة واحدة لجميع الخيارات
        teamSelect.appendChild(option);
    });
}
function displayTeamMatches(matches) {
    const tableBody = document.getElementById("team-stats-tbody");
    tableBody.innerHTML = ""; // تنظيف محتويات الجدول

    matches.forEach(match => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${match.Year}</td>
            <td>${currentLanguage === "ar" ? match.Round : match.Round_en}</td>
            <td>${currentLanguage === "ar" ? match.Team1 : match.Team1_en}</td>
            <td>${currentLanguage === "ar" ? match.Team2 : match.Team2_en}</td>
            <td>${match.Score1} - ${match.Score2}</td>
            <td>${currentLanguage === "ar" ? match.Winner : match.Winner_en}</td>
        `;
        tableBody.appendChild(row); // إضافة الصف إلى الجدول
    });
}


function fetchTeamMatchesData() {
    const selectedTeam = document.getElementById("team-select")?.value;
    if (!selectedTeam) {
        // إذا لم يتم اختيار فريق، إخفاء الجدول والأزرار
        document.getElementById("team-stats-table").classList.add("hidden");
        document.getElementById("team-matches-stats").classList.add("hidden");
        document.getElementById("team-stats").innerHTML = ""; // تنظيف الإحصائيات
        return;
    }

    fetchDataFromSheet(SHEET_PAST_GAMES, (data) => {
        const matches = data.filter(game => 
            (currentLanguage === "ar" ? game.Team1 : game.Team1_en) === selectedTeam || 
            (currentLanguage === "ar" ? game.Team2 : game.Team2_en) === selectedTeam
        );

        if (matches.length > 0) {
            displayTeamMatches(matches); // عرض البيانات في الجدول
            updateTeamStats(matches, selectedTeam); // تحديث الإحصائيات
            document.getElementById("team-stats-table").classList.remove("hidden");
            document.getElementById("team-matches-stats").classList.remove("hidden");
        } else {
            console.warn("لا توجد بيانات مطابقة.");
        }
    });
}

function updateTeamStats(matches, team) {
    const statsContainer = document.getElementById("team-stats");

    const totalMatches = matches.length;
    const wins = matches.filter(match => match.Winner === (currentLanguage === "ar" ? "الهلال" : "Al-Hilal")).length;
    const losses = matches.filter(match => match.Winner === team).length;
    const draws = matches.filter(match => match.Winner === (currentLanguage === "ar" ? "التعادل" : "Draw")).length;

    statsContainer.innerHTML = `
        <div class="team-stat-card">
            <i class="fa fa-futbol"></i><h3>${translations[currentLanguage].all || "المباريات"}</h3><p>${totalMatches}</p>
        </div>
        <div class="team-stat-card">
            <i class="fa fa-trophy"></i><h3>${translations[currentLanguage].wins || "الانتصارات"}</h3><p>${wins}</p>
        </div>
        <div class="team-stat-card">
            <i class="fa fa-times-circle"></i><h3>${translations[currentLanguage].losses || "الخسائر"}</h3><p>${losses}</p>
        </div>
        <div class="team-stat-card">
            <i class="fa fa-handshake"></i><h3>${translations[currentLanguage].draws || "التعادلات"}</h3><p>${draws}</p>
        </div>
    `;
}
function filterMatches(filterType) {
    const selectedTeam = document.getElementById("team-select")?.value;
    if (!selectedTeam) return;

    fetchDataFromSheet(SHEET_PAST_GAMES, (data) => {
        let matches = data.filter(game => game.Team1 === selectedTeam || game.Team2 === selectedTeam);

        // تطبيق الفلترة بناءً على النوع
        if (filterType === "win") {
            matches = matches.filter(game => game.Winner === (currentLanguage === "ar" ? "الهلال" : "Al-Hilal"));
        } else if (filterType === "loss") {
            matches = matches.filter(game => game.Winner !== (currentLanguage === "ar" ? "الهلال" : "Al-Hilal") && 
                                             game.Winner !== (currentLanguage === "ar" ? "التعادل" : "Draw"));
        } else if (filterType === "draw") {
            matches = matches.filter(game => game.Winner === (currentLanguage === "ar" ? "التعادل" : "Draw"));
        }

        displayTeamMatches(matches); // عرض البيانات المفلترة
        updateTeamStats(matches, selectedTeam); // تحديث الإحصائيات
    });
}

//============================================================================================================================================

// دالة فتح قسم "حسميات الدوري"
function openYearStats() {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `
        <h2 id="year-stats-title" data-key="year_stats">📊 ${translations[currentLanguage].year_stats}</h2>
        <label for="year-stats-select" class="styled-dropdown-label">
            <span data-key="select_year_label">${translations[currentLanguage].select_year_label || "اختر السنة"}</span>
        </label>
        <select id="year-stats-select" class="styled-dropdown" onchange="fetchYearStatsData()">
            <option value="">-- ${translations[currentLanguage].select_year_label || "اختر السنة"} --</option>
        </select>
        <div id="year-stats" class="team-stats-container hidden"></div>
        <table id="year-stats-table" class="hidden">
            <thead>
                <tr>
                    <th data-key="match_number">${translations[currentLanguage].match_number || "رقم المباراة"}</th>
                    <th data-key="year">${translations[currentLanguage].year || "السنة"}</th>
                    <th data-key="round">${translations[currentLanguage].round || "الدور"}</th>
                    <th data-key="team1">${translations[currentLanguage].team1 || "الهلال"}</th>
                    <th data-key="team2">${translations[currentLanguage].team2 || "المنافس"}</th>
                    <th data-key="result">${translations[currentLanguage].result || "النتيجة"}</th>
                    <th data-key="winner">${translations[currentLanguage].winner || "الفائز"}</th>
                </tr>
            </thead>
            <tbody id="year-stats-tbody"></tbody>
        </table>
        <div id="year-matches-stats" class="hidden">
            <button class="team-filter-btn all" onclick="fetchYearStatsData()" data-key="all">${translations[currentLanguage].all || "الكل"}</button>
            <button class="team-filter-btn wins" onclick="filterYearMatches('win')" data-key="wins">${translations[currentLanguage].wins || "الانتصارات"}</button>
            <button class="team-filter-btn losses" onclick="filterYearMatches('loss')" data-key="losses">${translations[currentLanguage].losses || "الخسائر"}</button>
            <button class="team-filter-btn draws" onclick="filterYearMatches('draw')" data-key="draws">${translations[currentLanguage].draws || "التعادلات"}</button>
        </div>
    `;

    fetchDataFromSheet(SHEET_PAST_GAMES, populateYearsDropdown);
}

// دالة لملء قائمة السنوات
function populateYearsDropdown(data) {
    const years = [...new Set(data.map(game => game.Year))].sort();
    const yearSelect = document.getElementById("year-stats-select");

    yearSelect.innerHTML = `<option value="">-- ${translations[currentLanguage].select_year_label || "اختر السنة"} --</option>`;
    years.forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year; // السنة لا تحتاج ترجمة
        yearSelect.appendChild(option);
    });
}

// دالة لجلب بيانات السنة
function fetchYearStatsData() {
    const selectedYear = document.getElementById("year-stats-select").value;
    if (!selectedYear) {
        document.getElementById("year-stats-table").classList.add("hidden");
        document.getElementById("year-matches-stats").classList.add("hidden");
        document.getElementById("year-stats").classList.add("hidden");
        return;
    }

    fetchDataFromSheet(SHEET_PAST_GAMES, (data) => {
        const matches = data.filter(game => game.Year === selectedYear);
        displayYearMatches(matches);
        updateYearStats(matches);

        document.getElementById("year-stats-table").classList.remove("hidden");
        document.getElementById("year-matches-stats").classList.remove("hidden");
        document.getElementById("year-stats").classList.remove("hidden");
    });
}

// دالة لعرض المباريات
function displayYearMatches(matches) {
    const tableBody = document.getElementById("year-stats-tbody");
    tableBody.innerHTML = ""; // تنظيف محتويات الجدول

    matches.forEach(match => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${match.Index}</td>
            <td>${match.Year}</td>
            <td>${currentLanguage === "ar" ? match.Round : match.Round_en}</td>
            <td>${currentLanguage === "ar" ? match.Team1 : match.Team1_en}</td>
            <td>${currentLanguage === "ar" ? match.Team2 : match.Team2_en}</td>
            <td>${match.Score1} - ${match.Score2}</td>
            <td>${currentLanguage === "ar" ? match.Winner : match.Winner_en}</td>
        `;
        tableBody.appendChild(row); // إضافة الصف إلى الجدول
    });
}

// دالة تحديث الإحصائيات
function updateYearStats(matches) {
    const statsContainer = document.getElementById("year-stats");
    const totalMatches = matches.length;
    const wins = matches.filter(match => match.Winner === "الهلال").length;
    const losses = matches.filter(match => match.Winner !== "الهلال" && match.Winner !== "التعادل").length;
    const draws = matches.filter(match => match.Winner === "التعادل").length;

    statsContainer.innerHTML = `
        <div class="team-stat-card">
            <i class="fa fa-futbol"></i><h3>المباريات</h3><p>${totalMatches}</p>
        </div>
        <div class="team-stat-card">
            <i class="fa fa-trophy"></i><h3>الانتصارات</h3><p>${wins}</p>
        </div>
        <div class="team-stat-card">
            <i class="fa fa-times-circle"></i><h3>الخسائر</h3><p>${losses}</p>
        </div>
        <div class="team-stat-card">
            <i class="fa fa-handshake"></i><h3>التعادلات</h3><p>${draws}</p>
        </div>
    `;
}

// دالة الفلترة
function filterYearMatches(filterType) {
    const selectedYear = document.getElementById("year-stats-select").value;
    if (!selectedYear) return;

    fetchDataFromSheet(SHEET_PAST_GAMES, (data) => {
        let matches = data.filter(game => game.Year === selectedYear);

        // تطبيق الفلترة بناءً على النوع
        if (filterType === "win") {
            matches = matches.filter(game => 
                (currentLanguage === "ar" ? game.Winner === "الهلال" : game.Winner_en === "Al-Hilal")
            );
        } else if (filterType === "loss") {
            matches = matches.filter(game => 
                (currentLanguage === "ar"
                    ? game.Winner !== "الهلال" && game.Winner !== "التعادل"
                    : game.Winner_en !== "Al-Hilal" && game.Winner_en !== "Draw")
            );
        } else if (filterType === "draw") {
            matches = matches.filter(game => 
                (currentLanguage === "ar" ? game.Winner === "التعادل" : game.Winner_en === "Draw")
            );
        }

        // عرض البيانات المفلترة
        displayYearMatches(matches);
    });
}

//============================================================================================================================================
// متغيرات خاصة بإدارة التنقل بين الرؤساء
let managers = [];
let currentManagerIndex = 0;

// دالة فتح شاشة رؤساء النادي
function openManagers() {
    const mainContent = document.getElementById("main-content");

    // إنشاء الواجهة الأساسية
    mainContent.dataset.section = "managers"; // تعيين القسم الحالي
    mainContent.innerHTML = `
        <div id="managers-container">
            <div class="manager-card">
                <img id="manager-image" class="manager-image" src="" alt="${translations[currentLanguage].manager_image || 'صورة المدير'}">
                <h3 id="manager-name" class="manager-name"></h3>
                <p id="manager-years" class="manager-years"></p>
                <p id="manager-wins" class="manager-wins"></p>
                <p id="manager-stats" class="manager-stats"></p>
                <div class="buttons">
                    <button onclick="prevManager()">${translations[currentLanguage].prev || 'السابق'}</button>
                    <button onclick="nextManager()">${translations[currentLanguage].next || 'التالي'}</button>
                </div>
            </div>
        </div>
    `;

    // جلب البيانات من Google Sheets باستخدام fetchDataFromSheet
    fetchDataFromSheet("manger", (data) => {
        managers = data.map(manager => {
            return {
                ...manager,
                mangertName: currentLanguage === "ar" ? manager.mangertName : manager.mangertName_en,
                win: currentLanguage === "ar" ? manager.win : manager.win_en,
            };
        });
        currentManagerIndex = 0; // إعادة تعيين المؤشر
        if (managers.length > 0) {
            displayManager(currentManagerIndex); // عرض أول مدير
        } else {
            mainContent.innerHTML = `<p style="color: red;">${translations[currentLanguage].no_data || "لا توجد بيانات متاحة للرؤساء."}</p>`;
        }
    });
}

// دالة عرض المدير بناءً على اللغة الحالية
function displayManager(index) {
    const manager = managers[index];

    const formattedYears = manager.years
        .split(",")
        .map(year => `<span class="highlight year">${year.trim()}</span>`)
        .join("<br>");

    const formattedWins = manager.win
        ? manager.win
              .split(",")
              .map(win => `<span class="highlight win">${win.trim()}</span>`)
              .join("<br>")
        : `<span class="no-data">${translations[currentLanguage].no_wins || "لا توجد بطولات"}</span>`;

    const totalYears = manager.years
        .split(",")
        .reduce((sum, range) => {
            const [start, end] = range.split("-").map(Number);
            return sum + (end - start + 1);
        }, 0);

    document.getElementById("managers-container").innerHTML = `
        <!-- العنوان -->
        <h2 class="managers-title">
            <i class="fa fa-crown icon"></i> ${translations[currentLanguage].managers_title || "رؤساء النادي"}
        </h2>
        
        <div class="manager-container">
            <!-- البطاقة الرئيسية للرئيس -->
            <div class="manager-main-card">
                <div class="manager-number">#${manager.no}</div>
                <div class="manager-header">
                    <img class="manager-image" src="${manager.ImageURL}" alt="${manager.mangertName}">
                    <h3 class="manager-name">${manager.mangertName}</h3>
                </div>
            </div>

            <!-- البطاقات الثلاث -->
            <div class="manager-stats-row">
                <div class="stat-card">
                    <i class="fa fa-calendar-alt icon"></i>
                    <h4>${translations[currentLanguage].period || "الفترة الزمنية"}</h4>
                    <p>${formattedYears}</p>
                </div>
                <div class="stat-card">
                    <i class="fa fa-trophy icon"></i>
                    <h4>${translations[currentLanguage].trophies || "البطولات"}</h4>
                    <p>${formattedWins}</p>
                </div>
                <div class="stat-card">
                    <i class="fa fa-chart-bar icon"></i>
                    <h4>${translations[currentLanguage].stats || "الإحصائيات"}</h4>
                    <p>
                        ${translations[currentLanguage].total_years || "إجمالي السنوات"}: <span class="highlight stat">${totalYears}</span> ${translations[currentLanguage].years || "سنة"}<br>
                        ${translations[currentLanguage].total_trophies || "إجمالي البطولات"}: <span class="highlight stat">${manager.milestoneCount || 0}</span> ${translations[currentLanguage].trophies || "بطولة"}
                    </p>
                </div>
            </div>

            <!-- أزرار التنقل -->
            <div class="navigation-buttons">
                <button onclick="prevManager()">${translations[currentLanguage].prev || "السابق"}</button>
                <button onclick="nextManager()">${translations[currentLanguage].next || "التالي"}</button>
            </div>
        </div>
    `;
}

// دالة للانتقال إلى المدير السابق
function prevManager() {
    if (currentManagerIndex > 0) {
        currentManagerIndex--;
        displayManager(currentManagerIndex);
    }
}

// دالة للانتقال إلى المدير التالي
function nextManager() {
    if (currentManagerIndex < managers.length - 1) {
        currentManagerIndex++;
        displayManager(currentManagerIndex);
    }
}

//============================================================================================================================================
// عدد الفيديوهات لكل صفحة
const videosPerPage = 4;
let currentPage = 1;
let videos = [];

function openYouTubeVideos() {
    clearContent(); // تنظيف المحتوى السابق
    currentPage = 1; // إعادة تعيين الصفحة
    const mainContent = document.getElementById("main-content");
    mainContent.dataset.section = "youtube-videos"; // تعيين القسم الحالي
    mainContent.innerHTML = `
        <h2 class="videos-title">
            <i class="fa fa-play-circle"></i> ${translations[currentLanguage].youtube_videos || "مقاطع التتويج"}
        </h2>
        <div id="youtube-videos" class="youtube-videos-grid"></div>
        <div id="pagination" class="pagination-controls"></div>
    `;

    fetchDataFromSheet("YouTubeVideos", (data) => {
        // استخدام اللغة الحالية لعرض البيانات
        videos = data.map(video => ({
            title: currentLanguage === "ar" ? video.title : video["title-en"],
            videoId: video.videoId
        }));

        displayVideos(); // عرض الفيديوهات بناءً على الصفحة الأولى
    });
}

// دالة عرض أزرار التنقل بين الصفحات
function displayVideos() {
    const container = document.getElementById("youtube-videos");
    container.innerHTML = ""; // تنظيف الحاوية

    const start = (currentPage - 1) * videosPerPage;
    const end = start + videosPerPage;
    const currentVideos = videos.slice(start, end);

    currentVideos.forEach(video => {
        const videoElement = document.createElement("iframe");
        videoElement.src = `https://www.youtube.com/embed/${video.videoId}`;
        videoElement.width = "100%";
        videoElement.height = "250";
        videoElement.frameBorder = "0";
        videoElement.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        videoElement.allowFullscreen = true;

        const videoTitle = document.createElement("p");
        videoTitle.classList.add("video-title");
        videoTitle.textContent = video.title || (currentLanguage === "ar" ? "عنوان غير متوفر" : "No Title Available");

        const videoCard = document.createElement("div");
        videoCard.classList.add("video-card");
        videoCard.appendChild(videoElement);
        videoCard.appendChild(videoTitle);

        container.appendChild(videoCard);
    });

    displayPagination();
}
function displayPagination() {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    const totalPages = Math.ceil(videos.length / videosPerPage);

    if (currentPage > 1) {
        const prevButton = document.createElement("button");
        prevButton.textContent = currentLanguage === "ar" ? "السابق" : "Previous";
        prevButton.className = "pagination-button";
        prevButton.onclick = () => {
            currentPage--;
            displayVideos();
        };
        paginationContainer.appendChild(prevButton);
    }

    const pageNumber = document.createElement("span");
    pageNumber.textContent = currentLanguage === "ar" 
        ? `الصفحة ${currentPage} من ${totalPages}` 
        : `Page ${currentPage} of ${totalPages}`;
    pageNumber.className = "page-number";
    paginationContainer.appendChild(pageNumber);

    if (currentPage < totalPages) {
        const nextButton = document.createElement("button");
        nextButton.textContent = currentLanguage === "ar" ? "التالي" : "Next";
        nextButton.className = "pagination-button";
        nextButton.onclick = () => {
            currentPage++;
            displayVideos();
        };
        paginationContainer.appendChild(nextButton);
    }
}

//============================================================================================================================================
function openWorldCup() {
    const mainContent = document.getElementById("main-content");

    if (!mainContent) {
        console.error("العنصر 'main-content' غير موجود.");
        return;
    }

    // إعداد المحتوى الرئيسي
    mainContent.dataset.section = "world-cup"; // تعيين القسم الحالي
    mainContent.innerHTML = `
        <h2>🌍 ${translations[currentLanguage].world_cup || "مشاركات الهلال في كأس العالم"}</h2>
        <div id="world-cup-main" class="world-cup-grid"></div>
    `;

    const yearsData = [
        { year: 2019, location: currentLanguage === "ar" ? "قطر" : "Qatar", flag: "https://flagcdn.com/w40/qa.png" },
        { year: 2021, location: currentLanguage === "ar" ? "الإمارات" : "UAE", flag: "https://flagcdn.com/w40/ae.png" },
        { year: 2022, location: currentLanguage === "ar" ? "المغرب" : "Morocco", flag: "https://flagcdn.com/w40/ma.png" },
        { year: 2025, location: currentLanguage === "ar" ? "أمريكا" : "USA", flag: "https://flagcdn.com/w40/us.png" }
    ];

    yearsData.reverse().forEach((entry, index) => {
        const card = `
            <div class="world-cup-card">
                <div class="card-number">${yearsData.length - index}</div>
                <h3 class="cup-title">${translations[currentLanguage].world_cup || "كأس العالم"} ${entry.year}</h3>
                <div class="country-info">
                    <img src="${entry.flag}" alt="${entry.location}" class="country-flag">
                    <p class="country-name">${entry.location}</p>
                </div>
                <button class="details-button" onclick="openWorldCupDetails(${entry.year})">${translations[currentLanguage].view_details || "عرض التفاصيل"}</button>
            </div>
        `;
        document.getElementById("world-cup-main").innerHTML += card;
    });
}

function openWorldCupDetails(year) {
    const mainContent = document.getElementById("main-content");

    fetchDataFromSheet(fifaWorldCupSheet, (data) => {
        const filteredMatches = data.filter(match => match.Year == year);

        mainContent.innerHTML = `
            <div class="details-container">
                <h2><i class="fa fa-trophy"></i> ${translations[currentLanguage].world_cup_details || "تفاصيل كأس العالم"} ${year}</h2>
                <div id="world-cup-details" class="world-cup-details-grid"></div>
                <button class="back-button" onclick="openWorldCup()">🔙 ${translations[currentLanguage].back_to_world_cup || "العودة لكأس العالم"}</button>
            </div>
        `;

        filteredMatches.forEach(match => {
            const card = `
                <div class="match-card">
                    <h3 class="match-stage">${currentLanguage === "ar" ? match.Stage : match["Stage-en"]}</h3>
                    <div class="match-info">
                        <p><i class="fa fa-users"></i> ${translations[currentLanguage].opponent || "الفريق المنافس"}: ${currentLanguage === "ar" ? match.Opponent : match["Opponent-en"]}</p>
                        <p><i class="fa fa-calendar-alt"></i> ${translations[currentLanguage].date || "التاريخ"}: ${match.MatchDate}</p>
                        <p><i class="fa fa-map-marker-alt"></i> ${translations[currentLanguage].stadium || "الملعب"}: ${currentLanguage === "ar" ? match.Stadium : match["Stadium-en"]}</p>
                        <p><i class="fa fa-user"></i> ${translations[currentLanguage].captain || "الكابتن"}: ${currentLanguage === "ar" ? match.Captain : match["Captain-en"]}</p>
                        <p><i class="fa fa-futbol"></i> ${translations[currentLanguage].result || "النتيجة"}: ${match.GoalsFor} - ${match.GoalsAgainst}</p>
                    </div>
                    <iframe src="https://www.youtube.com/embed/${match.HighlightsLink}" class="video-frame"></iframe>
                </div>
            `;
            document.getElementById("world-cup-details").innerHTML += card;
        });
    });
}

//============================================================================================================================================
function openHilalMap() {
    const mainContent = document.getElementById("main-content");
    mainContent.dataset.section = "hilal-map"; // تعيين القسم الحالي
    mainContent.innerHTML = `
        <h2 id="map-title" style="text-align: center; margin-bottom: 20px;">🌍 ${translations[currentLanguage].hilal_map || "منصات الهلال"}</h2>
        <div id="map-container" style="height: 500px; width: 70%; margin: 0 auto; border-radius: 15px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); border: 3px solid #005fbf;"></div>
        <div id="regions-bar" style="
            display: flex; 
            flex-wrap: wrap; 
            justify-content: center; 
            align-items: center; 
            padding: 10px; 
            margin: 20px auto 10px; 
            background-color: #001F54; 
            border-radius: 10px; 
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            width: 70%;">
        </div>
        <button id="reset-map" style="
            display: block; 
            margin: 20px auto; 
            padding: 10px 20px; 
            background-color: #005fbf; 
            color: white; 
            border: none; 
            border-radius: 5px; 
            cursor: pointer;
            font-weight: bold;">
            <i class="fa fa-map"></i> ${translations[currentLanguage].reset_map || "إعادة تعيين الخريطة"}
        </button>
    `;

    // تحميل الخريطة الأساسية بناءً على اللغة
    const tileLayerUrl =
        currentLanguage === "ar"
            ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // خريطة بالعربي
            : "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"; // خريطة بالإنجليزية

    const map = L.map('map-container').setView([24.774265, 46.738586], 6);

    // إضافة طبقة الخريطة
    L.tileLayer(tileLayerUrl, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const markers = L.markerClusterGroup({
        iconCreateFunction: (cluster) => {
            const count = cluster.getChildCount();
            return L.divIcon({
                html: `<div style="
                    background-color: #005fbf;
                    color: white;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: bold;
                ">${count}</div>`,
                className: 'custom-cluster-icon',
                iconSize: [40, 40],
            });
        }
    });

    const regionsBar = document.getElementById("regions-bar");

    // تحميل البيانات من Google Sheets
    fetchDataFromSheet("MAPS", (data) => {
        const regions = {};

        data.forEach(row => {
            const coordinates = row.coordinates.split(',').map(coord => parseFloat(coord.trim()));
            const region = currentLanguage === "ar" ? row.Location : row["Location-en"];
            const stadium = currentLanguage === "ar" ? row.Stadium : row["Stadium-en"];
            const tournament = currentLanguage === "ar" ? row.Name : row["Name-en"];
            const year = row.Year;

            if (!regions[region]) {
                regions[region] = {
                    coordinates: coordinates,
                    stadiums: []
                };
            }

            regions[region].stadiums.push({ stadium, tournament, year, coordinates });
        });

        Object.keys(regions).forEach(region => {
            const { coordinates, stadiums } = regions[region];

            stadiums.forEach(({ stadium, tournament, year }) => {
                const popupContent = `
                    <div style="text-align: center; padding: 10px;">
                        <h3 style="margin-bottom: 10px; color: #005fbf;">${stadium}</h3>
                        <p style="font-size: 1rem; color: #005fbf;">${translations[currentLanguage].tournament || "البطولة"}: ${tournament} (${year})</p>
                    </div>
                `;
                const marker = L.marker(coordinates, {
                    icon: L.icon({
                        iconUrl: 'https://github.com/sweettaste95/hilal-images/blob/main/png-transparent-copa-del-rey-football-cup-trophy-football-color-gold-sports11.png?raw=true',
                        iconSize: [40, 40],
                        iconAnchor: [20, 40],
                        popupAnchor: [0, -40]
                    })
                }).bindPopup(popupContent);
                markers.addLayer(marker);
            });

            const regionItem = document.createElement("div");
            regionItem.style = `
                display: inline-flex; 
                align-items: center; 
                margin: 5px 10px;
                padding: 10px;
                background-color: #005fbf;
                color: white;
                border-radius: 5px;
                font-weight: bold;
                cursor: pointer;
                transition: transform 0.3s ease;
            `;
            regionItem.innerHTML = `
                <span style="margin-right: 5px;">🏆</span>
                <span>${region}</span>
                <span style="background-color:#52159e; color: white; padding: 5px 10px; margin-left: 10px; border-radius: 5px;">
                    ${stadiums.length}
                </span>
            `;
            regionItem.addEventListener("click", () => {
                map.setView(coordinates, 10);
            });
            regionItem.addEventListener("mouseover", () => {
                regionItem.style.transform = "scale(1.1)";
            });
            regionItem.addEventListener("mouseout", () => {
                regionItem.style.transform = "scale(1)";
            });

            regionsBar.appendChild(regionItem);
        });

        map.addLayer(markers);

        document.getElementById('reset-map').addEventListener('click', () => {
            map.setView([24.774265, 46.738586], 6);
        });

        setTimeout(() => {
            map.invalidateSize();
        }, 200);
    });
}

//============================================================================================================================================

let timelineData = "";

// إعداد الشريط الزمني
fetchDataFromSheet("today-event", (todayEvents) => {
    const currentMonth = new Date().getMonth() + 1;
    const currentMonthEvents = todayEvents.filter(event => {
        const eventDateParts = event.date.split("/");
        const eventMonth = parseInt(eventDateParts[1]);
        return eventMonth === currentMonth;
    });

    // 1. رابط التليجرام
    timelineData += `
        <span style="display: inline-block; margin-right: 50px;">
            <a href="https://t.me/AlHilalFansChannel" target="_blank"
                style="color: #fff; text-decoration: none; font-weight: bold;">
                📱 اشترك في قناة تيليجرام للحصول على كل جديد
            </a>
        </span>
    `;

    // 2. آخر مباراة
    fetchDataFromSheet("pastGames", (pastGames) => {
        if (pastGames.length > 0) {
            const lastGame = pastGames[pastGames.length - 1];
            timelineData += `
                <span style="display: inline-block; margin-right: 50px;">
                    ⚽ <span style="color:#FFA500; font-weight:bold;">آخر مباراة:</span>
                    <span style="color:#fff; font-weight:bold;">${lastGame.Team1}</span>
                    <span style="color:#FFD700; font-weight:bold;">(${lastGame.Score1}-${lastGame.Score2})</span>
                    <span style="color:#fff; font-weight:bold;">${lastGame.Team2}</span>
                </span>
            `;
        } else {
            timelineData += `
                <span style="display: inline-block; margin-right: 50px;">
                    ⚽ <span style="color:#FFA500; font-weight:bold;">آخر مباراة:</span>
                    <span style="color:#fff;">لا توجد مباريات مسجلة</span>
                </span>
            `;
        }

        // 3. بطولات هذا الشهر
        if (currentMonthEvents.length > 0) {
            const eventsText = currentMonthEvents.map(event => `
                🏆 <span style="color:#FFD700; font-weight:bold;">${event.title}</span>
                (<span style="color:#fff;">${event.year}</span>)
            `).join(" | ");
            timelineData += `
                <span style="display: inline-block; margin-right: 50px;">
                    📅 <span style="color:#FFA500; font-weight:bold;">بطولات هذا الشهر:</span> ${eventsText}
                </span>
            `;
        } else {
            timelineData += `
                <span style="display: inline-block; margin-right: 50px;">
                    📅 <span style="color:#FFA500; font-weight:bold;">بطولات هذا الشهر:</span>
                    <span style="color:#fff;">لا توجد بطولات لهذا الشهر</span>
                </span>
            `;
        }

        // تحديث الشريط الزمني
        const timelineContainer = document.getElementById("timeline-container");
        timelineContainer.innerHTML = timelineData;
        timelineContainer.style.display = "block";
    });
});

// إضافة الشريط إلى DOM
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const timeline = document.createElement("div");
    timeline.id = "timeline-container";
    timeline.style = `
      display: fixed; 
       top: 50px;
        left: 0;
        width: 100%;
        color: white;
        font-size: 1.2rem; /* تكبير النص */
        padding: 10px;
        white-space: nowrap;
        overflow: auto;
        animation: scroll 50s linear infinite; /* تقليل السرعة */
    `;
    timeline.innerHTML = "جاري تحميل البيانات...";
    header.insertAdjacentElement("afterend", timeline);
});

// حركة الشريط
const style = document.createElement("style");
style.innerHTML = `
    @keyframes scroll {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
    }
    #timeline-container a:hover {
        text-decoration: underline;
    }
    #timeline-container span {
        font-size: 1rem;
        font-weight: bold;
        white-space: nowrap; /* منع الالتفاف */
    }
    #timeline-container span > span {
        margin: 0 5px; /* إضافة مسافات بين العناصر داخل النص */
    }
`;
document.head.appendChild(style);
function openContent(section) {
    const mainContent = document.getElementById("main-content");

    // تعيين القسم الحالي في dataset
    mainContent.dataset.section = section;

    // مسح المحتوى السابق
    clearContent();

    // عرض سياسة الخصوصية بناءً على اللغة الحالية
    if (section === "privacy-policy") {
        mainContent.innerHTML = `
            <div class="privacy-container">
                <h1>${translations[currentLanguage]?.privacy_policy || "سياسة الخصوصية"}</h1>
                <p>${translations[currentLanguage]?.privacy_welcome || "مرحبًا بكم في تطبيق \"بطولات الهلال\". هذا التطبيق تم تطويره باجتهاد شخصي ويهدف إلى جمع معلومات حول تاريخ وإنجازات نادي الهلال بشكل شامل ومفيد للجمهور."}</p>
                
                <h2>${translations[currentLanguage]?.independence_statement || "بيان الاستقلالية"}</h2>
                <p>${translations[currentLanguage]?.independence_content || "هذا التطبيق غير تابع أو مدعوم من قبل نادي الهلال الرسمي أو أي جهة رسمية أخرى. جميع الجهود المبذولة هنا شخصية ومستقلة."}</p>
                
                <h2>${translations[currentLanguage]?.content_sources || "مصادر المحتوى"}</h2>
                <p>${translations[currentLanguage]?.sources_content || "تم جمع جميع البيانات والمعلومات من مصادر عامة موثوقة مثل الإنترنت. مقاطع الفيديو المعروضة من مصادرها الأصلية (مثل قنوات اليوتيوب) ولم يتم تعديلها. إذا كنت مالكًا لأي محتوى وترغب في إزالته، يرجى التواصل معنا."}</p>
                
                <h2>${translations[currentLanguage]?.copyright || "حقوق النشر"}</h2>
                <p>${translations[currentLanguage]?.copyright_content || "جميع حقوق الملكية الفكرية للتطبيق محفوظة. يمنع نسخ أو تعديل أو استخدام التطبيق لأغراض تجارية دون إذن مسبق."}</p>
                
                <h2>${translations[currentLanguage]?.data_policy || "سياسة البيانات"}</h2>
                <p>${translations[currentLanguage]?.data_policy_content || "نحن لا نجمع أو نشارك بيانات المستخدمين مع أطراف ثالثة. إذا قمت بالتسجيل في التطبيق، سيتم استخدام بياناتك فقط لتحسين تجربة الاستخدام."}</p>
                
                <h2>${translations[currentLanguage]?.contact_us || "تواصل معنا"}</h2>
                <p>${translations[currentLanguage]?.contact_content || "إذا كان لديك أي استفسارات أو اعتراضات، يمكنك التواصل معنا عبر البريد التالي:"}</p>
            </div>
        `;

        mainContent.style.display = "block"; 
    } else {
        mainContent.innerHTML = `<p>${translations[currentLanguage]?.error_message || "القسم غير معروف."}</p>`;
    }
}
