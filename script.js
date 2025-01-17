function toggleLanguage() {
    // تحديث اللغة الحالية
    currentLanguage = currentLanguage === "ar" ? "en" : "ar";

    // تغيير خاصية اللغة في العنصر <html>
    document.documentElement.setAttribute("lang", currentLanguage);

    // تطبيق الترجمة
    applyTranslations();

    // تحديث اتجاه الصفحة
    updateBodyDirection();

    // تحديث النص الخاص بزر اللغة
    updateLanguageToggleText();

    // تبديل طبقة الخريطة
    if (map && currentLayer) {
        map.removeLayer(currentLayer);
        const arabicLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        });

        const englishLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        });

        currentLayer = currentLanguage === "ar" ? arabicLayer : englishLayer;
        currentLayer.addTo(map);
    }
}



let currentLanguage = "ar"; // اللغة الافتراضية

function toggleLanguage() {
    currentLanguage = currentLanguage === "ar" ? "en" : "ar";
      document.documentElement.setAttribute("lang", currentLanguage);
    loadTimeline(); // إعادة تحميل الشريط الزمني
    applyTranslations();
    updateLanguageToggleText();
    updateBodyDirection();
  // تحديث أسماء الفرق في القائمة المنسدلة
}


function applyTranslations() {
    document.querySelectorAll("[data-key]").forEach(element => {
        const key = element.getAttribute("data-key");
        const translation = translations[currentLanguage][key];
        if (translation) {
            element.textContent = translation;
        }
    });
    
    document.querySelectorAll("[data-placeholder-key]").forEach(element => {
        const key = element.getAttribute("data-placeholder-key");
        const translation = translations[currentLanguage][key];
        if (translation) {
            element.setAttribute("placeholder", translation);
        }
    });
}


function updateLanguageToggleText() {
    const toggleButton = document.getElementById("language-toggle");
    toggleButton.textContent = currentLanguage === "ar" ? "English" : "العربية";
}

function updateBodyDirection() {
    document.body.setAttribute("lang", currentLanguage);
    document.body.style.direction = currentLanguage === "ar" ? "rtl" : "ltr";
}

// تطبيق النصوص عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    applyTranslations();
    updateBodyDirection();
});

const translations = {
    ar: {
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
        footer_text: "© جميع الحقوق محفوظة لحساب \"حالي الذوق\" - الإصدار الأول 2025"
      
    },
    en: {
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
        footer_text: "© All rights reserved to \"Sweet Taste\" - Version 1.0 2025"
    }
};




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
            mainContent.innerHTML = `<h2>⭐ المسابقات</h2><p>مرحبًا بك في قسم المسابقات!</p>`;
            break;
        case "youtube":
            mainContent.innerHTML = `<h2>📹 اليوتيوب</h2><p>مرحبًا بك في قسم اليوتيوب!</p>`;
            break;
         case "year-stats": // حالة زر حسميات الدوري
            openYearStats(); 
            break;
         case "today-events": // حالة زر "في مثل هذا اليوم"
            openTodayEvents(); // فتح قسم "في مثل هذا اليوم"
            break;
        case "managers":
            openManagers(); // فتح قسم المدراء
            break;
       case "youtube-videos":
    openYouTubeVideos();
    break;
       case "world-cup":
    openWorldCup(); // دالة عرض قسم كأس العالم
    break;
    case "hilal-map":
            openHilalMap(); // فتح قسم "منصات الهلال"
            break;
case "privacy-policy":
    openContent("سياسة الخصوصية");
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
                callback(results.data);
            } else {
                console.error(`No data found in sheet: ${sheetName}`);
            }
        },
        error: function (error) {
            console.error(`Error fetching data from sheet: ${sheetName}`, error);
        },
    });
}

//============================================================================================================================================
// دوال عرض التتويجات



function openChampionships() {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `
        <h2 data-key="championships_title">🏆 ${currentLanguage === "ar" ? "تتويجات البطولات النهائية" : "Championship Titles"}</h2>
        <div class="dropdown-container">
            <select id="year-select" class="styled-dropdown">
                <option value="" disabled selected>${currentLanguage === "ar" ? "اختر السنة" : "Select Year"}</option>
            </select>
        </div>
        <div id="championships-data" class="cards-container"></div>
    `;

    fetchDataFromSheet(SHEET_CHAMPIONSHIPS, (data) => {
        populateChampionshipYears(data); // ملء قائمة السنوات
    });
}

function populateChampionshipYears(data) {
    const uniqueYears = [...new Set(data.map(row => row.Year))].sort();
    const yearSelect = document.getElementById("year-select");

    yearSelect.innerHTML = `<option value="" disabled selected>${currentLanguage === "ar" ? "اختر السنة" : "Select Year"}</option>`;
    uniqueYears.forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = `🏆 ${year}`;
        yearSelect.appendChild(option);
    });

    yearSelect.addEventListener("change", () => {
        const selectedYear = yearSelect.value;
        const filteredData = data.filter(row => row.Year === selectedYear);
        renderChampionships(filteredData);
    });
}

function renderChampionships(data) {
    const dataContainer = document.getElementById("championships-data");
    dataContainer.innerHTML = "";

    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "championship-card";

        card.innerHTML = `
            <div class="card-rank">
                ${currentLanguage === "ar" ? "رقم البطولة" : "Championship No"}: 
                <span class="rank-value">${item["Championship Rank"]}</span>
            </div>
            <h3 class="card-title">${currentLanguage === "ar" ? item["Name"] : item["Name_en"]}</h3>
            <img src="${item["Image URL"]}" alt="${currentLanguage === "ar" ? item["Name"] : item["Name_en"]}" class="championship-image">
            <div class="info-section">
                <i class="fa fa-trophy"></i>
                <span class="info-label">${currentLanguage === "ar" ? "المباراة النهائية" : "Final Match"}:</span>
                <span class="info-value">${currentLanguage === "ar" ? item["Final Match"] : item["Final_Match_en"]}</span>
            </div>
            <div class="info-section">
                <i class="fa fa-calendar-alt"></i>
                <span class="info-label">${currentLanguage === "ar" ? "الموسم" : "Season"}:</span>
                <span class="info-value">${item["Date"]}</span>
            </div>
            <div class="info-section">
                <i class="fa fa-users"></i>
                <span class="info-label">${currentLanguage === "ar" ? "الفريق المهزوم" : "Opponent"}:</span>
                <span class="info-value">${currentLanguage === "ar" ? item["Opponent"] : item["Opponent_en"]}</span>
            </div>
            <div class="info-section">
                <i class="fa fa-futbol"></i>
                <span class="info-label">${currentLanguage === "ar" ? "النتيجة" : "Score"}:</span>
                <span class="info-value">${currentLanguage === "ar" ? item["Score"] : item["Score_en"]}</span>
            </div>
            <div class="info-section">
                <i class="fa fa-user"></i>
                <span class="info-label">${currentLanguage === "ar" ? "الكابتن" : "Captain"}:</span>
                <span class="info-value">${currentLanguage === "ar" ? item["captn"] : item["captn_en"] || "Not Available"}</span>
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
/**
 * دالة لعرض اللاعبين حسب اللغة المختارة
 */
function displayPlayers() {
    const playersContainer = document.getElementById("players-container");
    playersContainer.innerHTML = ""; // تنظيف المحتوى السابق

    const start = (teamPlayersCurrentPage - 1) * playersPerPage;
    const end = start + playersPerPage;
    const playersToDisplay = playersData.slice(start, end);

    playersToDisplay.forEach((player) => {
        // اختيار الأعمدة بناءً على اللغة
        const playerName = currentLanguage === "ar" ? player['neam'] : player['name_en'];
        const playerClass = currentLanguage === "ar" ? player['class'] : player['class_en'];
        const positionIcon = getPositionIcon(playerClass);

        // إنشاء بطاقة اللاعب
        const playerCard = `
            <div class="player-card">
                <div class="player-number left">#${player['player_number']}</div>
                <img src="${player['Image URL']}" alt="${playerName}" class="player-image">
                <div class="player-name">${playerName}</div>
                <div class="player-position">${positionIcon} ${playerClass}</div>
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
            return `<i class="fa fa-hand-paper"></i>`;
        case "مدافع":
            return `<i class="fa fa-shield-alt"></i>`;
        case "مهاجم":
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

// دالة فتح قسم المواجهات
function openTeamMatches() {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `
        <h2 id="team-matches-title" data-key="team_matches_title">${currentLanguage === "ar" ? "مواجهات الهلال في الدوري ⚽" : "Al-Hilal League Matches ⚽"}</h2>
        <select id="team-select" class="styled-dropdown" onchange="fetchTeamMatchesData()">
            <option value="">${currentLanguage === "ar" ? "اختر الفريق" : "Select Team"}</option>
        </select>
        <div id="team-stats" class="team-stats-container"></div>
        <table id="team-stats-table" class="hidden">
            <thead>
                <tr>
                    <th data-key="year">${currentLanguage === "ar" ? "السنة" : "Year"}</th>
                    <th data-key="round">${currentLanguage === "ar" ? "الدور" : "Round"}</th>
                    <th data-key="team1">${currentLanguage === "ar" ? "الهلال" : "Al-Hilal"}</th>
                    <th data-key="team2">${currentLanguage === "ar" ? "المنافس" : "Opponent"}</th>
                    <th data-key="score">${currentLanguage === "ar" ? "النتيجة" : "Score"}</th>
                    <th data-key="winner">${currentLanguage === "ar" ? "الفائز" : "Winner"}</th>
                </tr>
            </thead>
            <tbody id="team-stats-tbody"></tbody>
        </table>
        <div id="team-matches-stats" class="hidden">
            <button class="team-filter-btn all" onclick="fetchTeamMatchesData()">${currentLanguage === "ar" ? "الكل" : "All"}</button>
            <button class="team-filter-btn wins" onclick="filterMatches('win')">${currentLanguage === "ar" ? "الانتصارات" : "Wins"}</button>
            <button class="team-filter-btn losses" onclick="filterMatches('loss')">${currentLanguage === "ar" ? "الخسائر" : "Losses"}</button>
            <button class="team-filter-btn draws" onclick="filterMatches('draw')">${currentLanguage === "ar" ? "التعادلات" : "Draws"}</button>
        </div>
    `;

    // تأكد من إخفاء الجدول والأزرار افتراضيًا
    document.getElementById("team-stats-table").classList.add("hidden");
    document.getElementById("team-matches-stats").classList.add("hidden");

    // تحميل أسماء الفرق
    fetchDataFromSheet(SHEET_PAST_GAMES, populateTeamNames);
}

function populateTeamNames(data) {
    const teams = [...new Set(
        data.flatMap(game => 
            currentLanguage === "ar" 
            ? [game.Team1, game.Team2]
            : [game.Team1_en, game.Team2_en]
        ).filter(team => team && team.trim() !== "")
    )];

    const teamSelect = document.getElementById("team-select");
    teamSelect.innerHTML = `<option value="">${currentLanguage === "ar" ? "-- اختر الفريق --" : "-- Select Team --"}</option>`;

    const teamIcon = "⚽"; // أيقونة عامة للفريق

    teams.forEach(team => {
        const option = document.createElement("option");
        option.value = team;
        option.textContent = `${teamIcon} ${team}`; // إضافة أيقونة واحدة لجميع الخيارات
        teamSelect.appendChild(option);
    });
}
// دالة لجلب بيانات المواجهات
function fetchTeamMatchesData() {
    const selectedTeam = document.getElementById("team-select").value;
    if (!selectedTeam) {
        // إذا لم يتم اختيار فريق، إخفاء الجدول والأزرار
        document.getElementById("team-stats-table").classList.add("hidden");
        document.getElementById("team-matches-stats").classList.add("hidden");
        document.getElementById("team-stats").innerHTML = ""; // تنظيف الإحصائيات
        return;
    }

    fetchDataFromSheet(SHEET_PAST_GAMES, (data) => {
        // فلترة البيانات بناءً على اللغة الحالية
        const matches = data.filter(game => {
            if (currentLanguage === "ar") {
                return game.Team1 === selectedTeam || game.Team2 === selectedTeam;
            } else {
                return game.Team1_en === selectedTeam || game.Team2_en === selectedTeam;
            }
        });

        // عرض النتائج
        displayTeamMatches(matches);
        updateTeamStats(matches, selectedTeam);

        // إظهار الجدول والأزرار
        document.getElementById("team-stats-table").classList.remove("hidden");
        document.getElementById("team-matches-stats").classList.remove("hidden");
    });
}
// دالة عرض المباريات في الجدول
function displayTeamMatches(matches) {
    const tableBody = document.getElementById("team-stats-tbody");
    tableBody.innerHTML = "";
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
        tableBody.appendChild(row);
    });
}
// دالة تحديث الإحصائيات
function updateTeamStats(matches, team) {
    const statsContainer = document.getElementById("team-stats");

    const totalMatches = matches.length;
    const wins = matches.filter(match => match.Winner === (currentLanguage === "ar" ? "الهلال" : "Al-Hilal")).length;
    const losses = matches.filter(match => match.Winner === team).length;
    const draws = matches.filter(match => match.Winner === (currentLanguage === "ar" ? "التعادل" : "Draw")).length;

    statsContainer.innerHTML = `
        <div class="team-stat-card">
            <i class="fa fa-futbol"></i><h3>${currentLanguage === "ar" ? "المباريات" : "Matches"}</h3><p>${totalMatches}</p>
        </div>
        <div class="team-stat-card">
            <i class="fa fa-trophy"></i><h3>${currentLanguage === "ar" ? "الانتصارات" : "Wins"}</h3><p>${wins}</p>
        </div>
        <div class="team-stat-card">
            <i class="fa fa-times-circle"></i><h3>${currentLanguage === "ar" ? "الخسائر" : "Losses"}</h3><p>${losses}</p>
        </div>
        <div class="team-stat-card">
            <i class="fa fa-handshake"></i><h3>${currentLanguage === "ar" ? "التعادلات" : "Draws"}</h3><p>${draws}</p>
        </div>
    `;
}
// دالة تصفية المباريات
function filterMatches(filterType) {
    const selectedTeam = document.getElementById("team-select").value;
    if (!selectedTeam) return;

    // جلب البيانات بناءً على الفريق المختار
    fetchDataFromSheet(SHEET_PAST_GAMES, (data) => {
        // فلترة البيانات حسب الفريق المختار
        let matches = data.filter(game => {
            return currentLanguage === "ar"
                ? (game.Team1 === selectedTeam || game.Team2 === selectedTeam)
                : (game.Team1_en === selectedTeam || game.Team2_en === selectedTeam);
        });

        // تطبيق الفلترة حسب النوع (فوز، خسارة، تعادل)
        matches = matches.filter(game => {
            if (filterType === "win") {
                return currentLanguage === "ar"
                    ? game.Winner === "الهلال"
                    : game.Winner_en === "Al-Hilal";
            } else if (filterType === "loss") {
                return currentLanguage === "ar"
                    ? game.Winner !== "الهلال" && game.Winner !== "التعادل"
                    : game.Winner_en !== "Al-Hilal" && game.Winner_en !== "Draw";
            } else if (filterType === "draw") {
                return currentLanguage === "ar"
                    ? game.Winner === "التعادل"
                    : game.Winner_en === "Draw";
            }
            return true; // "الكل"
        });

        // عرض النتائج بعد التصفية
        displayTeamMatches(matches);
        updateTeamStats(matches, selectedTeam);
    });
}

//============================================================================================================================================

// دالة فتح قسم "حسميات الدوري"
function openYearStats() {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `
        <h2 id="year-stats-title" data-key="year_stats_title">
            ${currentLanguage === "ar" ? "📊 إحصائيات حسميات الدوري" : "📊 League Decisive Stats"}
        </h2>
        <label for="year-stats-select" class="styled-dropdown-label">
            <span>${currentLanguage === "ar" ? "اختر السنة" : "Select Year"}</span>
        </label>
        <select id="year-stats-select" class="styled-dropdown" onchange="fetchYearStatsData()">
            <option value="">${currentLanguage === "ar" ? "-- اختر السنة --" : "-- Select Year --"}</option>
        </select>
        <div id="year-stats" class="team-stats-container hidden"></div>
        <table id="year-stats-table" class="hidden">
            <thead>
                <tr>
                    <th>${currentLanguage === "ar" ? "رقم المباراة" : "Match Number"}</th>
                    <th>${currentLanguage === "ar" ? "السنة" : "Year"}</th>
                    <th>${currentLanguage === "ar" ? "الدور" : "Round"}</th>
                    <th>${currentLanguage === "ar" ? "الهلال" : "Al-Hilal"}</th>
                    <th>${currentLanguage === "ar" ? "المنافس" : "Opponent"}</th>
                    <th>${currentLanguage === "ar" ? "النتيجة" : "Score"}</th>
                    <th>${currentLanguage === "ar" ? "الفائز" : "Winner"}</th>
                </tr>
            </thead>
            <tbody id="year-stats-tbody"></tbody>
        </table>
        <div id="year-matches-stats" class="hidden">
            <button class="team-filter-btn all" onclick="fetchYearStatsData()">
                ${currentLanguage === "ar" ? "الكل" : "All"}
            </button>
            <button class="team-filter-btn wins" onclick="filterYearMatches('win')">
                ${currentLanguage === "ar" ? "الانتصارات" : "Wins"}
            </button>
            <button class="team-filter-btn losses" onclick="filterYearMatches('loss')">
                ${currentLanguage === "ar" ? "الخسائر" : "Losses"}
            </button>
            <button class="team-filter-btn draws" onclick="filterYearMatches('draw')">
                ${currentLanguage === "ar" ? "التعادلات" : "Draws"}
            </button>
        </div>
    `;

    fetchDataFromSheet(SHEET_PAST_GAMES, populateYearsDropdown);
}

// دالة لملء قائمة السنوات
function populateYearsDropdown(data) {
    const years = [...new Set(data.map(game => game.Year))].sort();
    const yearSelect = document.getElementById("year-stats-select");

    yearSelect.innerHTML = `<option value="">${currentLanguage === "ar" ? "-- اختر السنة --" : "-- Select Year --"}</option>`;
    years.forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = `📅 ${year}`;
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
    tableBody.innerHTML = "";
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
        tableBody.appendChild(row);
    });
}

// دالة تحديث الإحصائيات
function updateYearStats(matches) {
    const statsContainer = document.getElementById("year-stats");

    const totalMatches = matches.length;
    const wins = matches.filter(match => match.Winner === (currentLanguage === "ar" ? "الهلال" : "Al-Hilal")).length;
    const losses = matches.filter(match => {
        return currentLanguage === "ar"
            ? match.Winner !== "الهلال" && match.Winner !== "التعادل"
            : match.Winner_en !== "Al-Hilal" && match.Winner_en !== "Draw";
    }).length;
    const draws = matches.filter(match => match.Winner === (currentLanguage === "ar" ? "التعادل" : "Draw")).length;

    statsContainer.innerHTML = `
        <div class="team-stat-card">
            <i class="fa fa-futbol"></i><h3>${currentLanguage === "ar" ? "المباريات" : "Matches"}</h3><p>${totalMatches}</p>
        </div>
        <div class="team-stat-card">
            <i class="fa fa-trophy"></i><h3>${currentLanguage === "ar" ? "الانتصارات" : "Wins"}</h3><p>${wins}</p>
        </div>
        <div class="team-stat-card">
            <i class="fa fa-times-circle"></i><h3>${currentLanguage === "ar" ? "الخسائر" : "Losses"}</h3><p>${losses}</p>
        </div>
        <div class="team-stat-card">
            <i class="fa fa-handshake"></i><h3>${currentLanguage === "ar" ? "التعادلات" : "Draws"}</h3><p>${draws}</p>
        </div>
    `;
}

// دالة الفلترة
function filterYearMatches(filterType) {
    const selectedYear = document.getElementById("year-stats-select").value;
    if (!selectedYear) return;

    fetchDataFromSheet(SHEET_PAST_GAMES, (data) => {
        let matches = data.filter(game => game.Year === selectedYear);

        if (filterType === "win") {
            matches = matches.filter(game => currentLanguage === "ar" ? game.Winner === "الهلال" : game.Winner_en === "Al-Hilal");
        } else if (filterType === "loss") {
            matches = matches.filter(game => currentLanguage === "ar" 
                ? game.Winner !== "الهلال" && game.Winner !== "التعادل"
                : game.Winner_en !== "Al-Hilal" && game.Winner_en !== "Draw");
        } else if (filterType === "draw") {
            matches = matches.filter(game => currentLanguage === "ar" ? game.Winner === "التعادل" : game.Winner_en === "Draw");
        }

        displayYearMatches(matches);
        updateYearStats(matches);
    });
}

//============================================================================================================================================
// متغيرات خاصة بإدارة التنقل بين الرؤساء
// متغيرات خاصة بإدارة التنقل بين الرؤساء
let managers = [];
let currentManagerIndex = 0;

// دالة فتح شاشة رؤساء النادي
function openManagers() {
    const mainContent = document.getElementById("main-content");

    // إنشاء الواجهة الأساسية
    mainContent.innerHTML = `
        <div id="managers-container">
            <div class="manager-card">
                <img id="manager-image" class="manager-image" src="" alt="صورة المدير">
                <h3 id="manager-name" class="manager-name"></h3>
                <p id="manager-years" class="manager-years"></p>
                <p id="manager-wins" class="manager-wins"></p>
                <p id="manager-stats" class="manager-stats"></p>
                <div class="buttons">
                    <button onclick="prevManager()">السابق</button>
                    <button onclick="nextManager()">التالي</button>
                </div>
            </div>
        </div>
    `;

    // جلب البيانات من Google Sheets باستخدام fetchDataFromSheet
    fetchDataFromSheet("manger", (data) => {
        managers = data;
        currentManagerIndex = 0; // إعادة تعيين المؤشر
        if (managers.length > 0) {
            displayManager(currentManagerIndex); // عرض أول مدير
        } else {
            mainContent.innerHTML = "<p style='color: red;'>لا توجد بيانات متاحة للرؤساء.</p>";
        }
    });
}

// دالة عرض المدير الحالي
function displayManager(index) {
    const manager = managers[index];

    // اختيار اللغة بناءً على اللغة الحالية
    const nameField = currentLanguage === "ar" ? "mangertName" : "mangertName_en";
    const winsField = currentLanguage === "ar" ? "win" : "win_en";

    const formattedYears = manager.years
        .split(",")
        .map(year => `<span class="highlight year">${year.trim()}</span>`)
        .join("<br>");

    const formattedWins = manager[winsField]
        ? manager[winsField]
              .split(",")
              .map(win => `<span class="highlight win">${win.trim()}</span>`)
              .join("<br>")
        : "<span class='no-data'>No Championships</span>";

    const totalYears = manager.years
        .split(",")
        .reduce((sum, range) => {
            const [start, end] = range.split("-").map(Number);
            return sum + (end - start + 1);
        }, 0);

    document.getElementById("managers-container").innerHTML = `
        <!-- العنوان -->
        <h2 class="managers-title">
            <i class="fa fa-crown icon"></i> ${
                currentLanguage === "ar" ? "رؤساء المجد لنادي الهلال" : "The Glory Presidents of Al Hilal Club"
            }
        </h2>
        
        <div class="manager-container">
            <!-- البطاقة الرئيسية للرئيس -->
            <div class="manager-main-card">
                <div class="manager-number">#${manager.no}</div>
                <div class="manager-header">
                    <img class="manager-image" src="${manager.ImageURL}" alt="${manager[nameField]}">
                    <h3 class="manager-name">${manager[nameField]}</h3>
                </div>
            </div>

            <!-- البطاقات الثلاث -->
            <div class="manager-stats-row">
                <div class="stat-card">
                    <i class="fa fa-calendar-alt icon"></i>
                    <h4>${currentLanguage === "ar" ? "الفترة الزمنية" : "Tenure Periods"}</h4>
                    <p>${formattedYears}</p>
                </div>
                <div class="stat-card">
                    <i class="fa fa-trophy icon"></i>
                    <h4>${currentLanguage === "ar" ? "البطولات" : "Championships"}</h4>
                    <p>${formattedWins}</p>
                </div>
                <div class="stat-card">
                    <i class="fa fa-chart-bar icon"></i>
                    <h4>${currentLanguage === "ar" ? "الإحصائيات" : "Statistics"}</h4>
                    <p>
                        ${currentLanguage === "ar" ? "إجمالي السنوات" : "Total Years"}: 
                        <span class="highlight stat">${totalYears}</span> ${currentLanguage === "ar" ? "سنة" : "years"}<br>
                        ${currentLanguage === "ar" ? "إجمالي البطولات" : "Total Championships"}: 
                        <span class="highlight stat">${manager.milestoneCount || 0}</span>
                    </p>
                </div>
            </div>

            <!-- أزرار التنقل -->
            <div class="navigation-buttons">
                <button onclick="prevManager()">
                    ${currentLanguage === "ar" ? "السابق" : "Previous"}
                </button>
                <button onclick="nextManager()">
                    ${currentLanguage === "ar" ? "التالي" : "Next"}
                </button>
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
// عدد الفيديوهات لكل صفحة
const videosPerPage = 4;
let currentPage = 1;
let videos = [];

// دالة فتح قسم مقاطع التتويج
function openYouTubeVideos() {
    clearContent(); // تنظيف المحتوى السابق
    currentPage = 1; // إعادة تعيين الصفحة
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `
        <h2 class="videos-title">
            <i class="fa fa-play-circle"></i> ${currentLanguage === "ar" ? "مقاطع التتويج" : "Championship Videos"}
        </h2>
        <div id="youtube-videos" class="youtube-videos-grid"></div>
        <div id="pagination" class="pagination-controls"></div>
    `;
    fetchDataFromSheet("YouTubeVideos", (data) => {
        videos = data;
        displayVideos(); // عرض الفيديوهات للصفحة الأولى
    });
}

// دالة عرض الفيديوهات بناءً على الصفحة الحالية
function displayVideos() {
    const container = document.getElementById("youtube-videos");
    container.innerHTML = ""; // إعادة تعيين الحاوية

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
        videoTitle.textContent = currentLanguage === "ar" ? (video.title || "عنوان غير متوفر") : (video["title-en"] || "Title Not Available");

        const videoCard = document.createElement("div");
        videoCard.classList.add("video-card");
        videoCard.appendChild(videoElement);
        videoCard.appendChild(videoTitle);

        container.appendChild(videoCard);
    });

    displayPagination();
}

// دالة عرض أزرار التنقل بين الصفحات
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
    pageNumber.textContent = `${currentLanguage === "ar" ? "الصفحة" : "Page"} ${currentPage} ${currentLanguage === "ar" ? "من" : "of"} ${totalPages}`;
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
    // العنصر الرئيسي الذي يحتوي على المحتوى
    const mainContent = document.getElementById("main-content");

    // التأكد من وجود العنصر
    if (!mainContent) {
        console.error("العنصر 'main-content' غير موجود في الصفحة.");
        return;
    }

    // إعداد المحتوى الرئيسي
    mainContent.innerHTML = `
        <h2>🌍 مشاركات الهلال في كأس العالم</h2>
        <div id="world-cup-main" class="world-cup-grid"></div>
    `;

    // بيانات الأعوام والمواقع
    const yearsData = [
        { year: 2019, location: "قطر", flag: "https://flagcdn.com/w40/qa.png" },
        { year: 2021, location: "الإمارات", flag: "https://flagcdn.com/w40/ae.png" },
        { year: 2022, location: "المغرب", flag: "https://flagcdn.com/w40/ma.png" },
        { year: 2025, location: "أمريكا", flag: "https://flagcdn.com/w40/us.png" }
    ];

    // إنشاء البطاقات
    yearsData.reverse().forEach((entry, index) => {
        const card = `
            <div class="world-cup-card">
                <div class="card-number">${yearsData.length - index}</div>
                <h3 class="cup-title">كأس العالم ${entry.year}</h3>
                <div class="country-info">
                    <img src="${entry.flag}" alt="${entry.location}" class="country-flag">
                    <p class="country-name">${entry.location}</p>
                </div>
                <button class="details-button" onclick="openWorldCupDetails(${entry.year})">عرض التفاصيل</button>
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
                <h2><i class="fa fa-trophy"></i> تفاصيل كأس العالم ${year}</h2>
                <div id="world-cup-details" class="world-cup-details-grid"></div>
                <button class="back-button" onclick="openWorldCup()">🔙 العودة لكأس العالم</button>
            </div>
        `;

        filteredMatches.forEach(match => {
            const card = `
                <div class="match-card">
                    <h3 class="match-stage">${match.Stage}</h3>
                    <div class="match-info">
                        <p><i class="fa fa-users"></i> الفريق المنافس: ${match.Opponent}</p>
                        <p><i class="fa fa-calendar-alt"></i> التاريخ: ${match.MatchDate}</p>
                        <p><i class="fa fa-map-marker-alt"></i> الملعب: ${match.Stadium}</p>
                        <p><i class="fa fa-user"></i> الكابتن: ${match.Captain}</p>
                        <p><i class="fa fa-futbol"></i> النتيجة: ${match.GoalsFor} - ${match.GoalsAgainst}</p>
                    </div>
                    <iframe src="https://www.youtube.com/embed/${match.HighlightsLink}" class="video-frame"></iframe>
                </div>
            `;

            document.getElementById("world-cup-details").innerHTML += card;
        });
    });
}

//============================================================================================================================================
let map; // مرجع الخريطة
let currentLayer; // الطبقة الحالية


function openHilalMap() {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `
        <h2 id="map-title" style="text-align: center; margin-bottom: 20px;">
            🌍 ${currentLanguage === "ar" ? "منصات الهلال" : "Al-Hilal Platforms"}
        </h2>
        <div id="map-container" style="height: 500px; width: 70%; margin: 0 auto; border-radius: 15px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); border: 3px solid #005fbf;"></div>
        <div id="regions-bar" style="
        position: absolute; 
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
            <i class="fa fa-map"></i> ${currentLanguage === "ar" ? "إعادة تعيين الخريطة" : "Reset Map"}
        </button>
    `;

    const map = L.map('map-container').setView([24.774265, 46.738586], 6);

    // طبقات الخريطة (العربية والإنجليزية)
    const arabicLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });

    const englishLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });

    // إضافة الطبقة الحالية بناءً على اللغة
    let currentLayer = currentLanguage === "ar" ? arabicLayer : englishLayer;
    currentLayer.addTo(map);

    // تغيير الطبقة عند تبديل اللغة
    document.documentElement.addEventListener('langChange', () => {
        map.removeLayer(currentLayer);
        currentLayer = currentLanguage === "ar" ? arabicLayer : englishLayer;
        currentLayer.addTo(map);
    });

    // تعريف markers (مجموعة العلامات)
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

    fetchDataFromSheet("MAPS", (data) => {
        const regions = {};

        data.forEach(row => {
            const coordinates = row.coordinates.split(',').map(coord => parseFloat(coord.trim()));
            const region = currentLanguage === "ar" ? (row.Location || "غير محدد") : (row["Location-en"] || "Not Specified");
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
                        <h3 style="margin-bottom: 10px; color: #005fbf;">
                            ${stadium}
                        </h3>
                        <p style="font-size: 1rem; color: #005fbf;">
                            ${currentLanguage === "ar" ? "البطولة" : "Tournament"}: ${tournament} (${year})
                        </p>
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
function loadTimeline() {
    timelineData = ""; // إعادة تعيين البيانات
    const currentMonth = new Date().getMonth() + 1;

    // 1. رابط التليجرام
    timelineData += `
        <span style="display: inline-block; margin-right: 50px;">
            <a href="https://t.me/AlHilalFansChannel" target="_blank"
                style="color: #fff; text-decoration: none; font-weight: bold;">
                ${currentLanguage === "ar" ? "📱 اشترك في قناة تيليجرام للحصول على كل جديد" : "📱 Subscribe to the Telegram channel for updates"}
            </a>
        </span>
    `;

    // جلب بيانات الأحداث
    fetchDataFromSheet("today-event", (todayEvents) => {
        const currentMonthEvents = todayEvents.filter(event => {
            const eventDateParts = event.date.split("/");
            const eventMonth = parseInt(eventDateParts[1]);
            return eventMonth === currentMonth;
        });

        // 2. آخر مباراة
        fetchDataFromSheet("pastGames", (pastGames) => {
            if (pastGames.length > 0) {
                const lastGame = pastGames[pastGames.length - 1];
                timelineData += `
                    <span style="display: inline-block; margin-right: 50px;">
                        ⚽ <span style="color:#FFA500; font-weight:bold;">${currentLanguage === "ar" ? "آخر مباراة:" : "Last Match:"}</span>
                        <span style="color:#fff; font-weight:bold;">${currentLanguage === "ar" ? lastGame.Team1 : lastGame.Team1_en}</span>
                        <span style="color:#FFD700; font-weight:bold;">(${lastGame.Score1}-${lastGame.Score2})</span>
                        <span style="color:#fff; font-weight:bold;">${currentLanguage === "ar" ? lastGame.Team2 : lastGame.Team2_en}</span>
                    </span>
                `;
            } else {
                timelineData += `
                    <span style="display: inline-block; margin-right: 50px;">
                        ⚽ <span style="color:#FFA500; font-weight:bold;">${currentLanguage === "ar" ? "آخر مباراة:" : "Last Match:"}</span>
                        <span style="color:#fff;">${currentLanguage === "ar" ? "لا توجد مباريات مسجلة" : "No recorded matches"}</span>
                    </span>
                `;
            }

            // 3. بطولات هذا الشهر
            if (currentMonthEvents.length > 0) {
                const eventsText = currentMonthEvents.map(event => `
                    🏆 <span style="color:#FFD700; font-weight:bold;">${currentLanguage === "ar" ? event.title : event["title-en"]}</span>
                    (<span style="color:#fff;">${event.year}</span>)
                `).join(" | ");
                timelineData += `
                    <span style="display: inline-block; margin-right: 50px;">
                        📅 <span style="color:#FFA500; font-weight:bold;">${currentLanguage === "ar" ? "بطولات هذا الشهر:" : "This Month's Championships:"}</span> ${eventsText}
                    </span>
                `;
            } else {
                timelineData += `
                    <span style="display: inline-block; margin-right: 50px;">
                        📅 <span style="color:#FFA500; font-weight:bold;">${currentLanguage === "ar" ? "بطولات هذا الشهر:" : "This Month's Championships:"}</span>
                        <span style="color:#fff;">${currentLanguage === "ar" ? "لا توجد بطولات لهذا الشهر" : "No championships this month"}</span>
                    </span>
                `;
            }

            // تحديث الشريط الزمني
            const timelineContainer = document.getElementById("timeline-container");
            if (timelineContainer) {
                timelineContainer.innerHTML = timelineData;
                timelineContainer.style.display = "block";
            }
        });
    });
}

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
        font-size: 1.2rem;
        padding: 10px;
        white-space: nowrap;
        overflow: hidden;
        animation: scroll 50s linear infinite;
    `;
    timeline.innerHTML = `${currentLanguage === "ar" ? "جاري تحميل البيانات..." : "Loading data..."}`;
    header.insertAdjacentElement("afterend", timeline);
    loadTimeline(); // تحميل البيانات عند البداية
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
        white-space: nowrap;
    }
    #timeline-container span > span {
        margin: 0 5px;
    }
`;
document.head.appendChild(style);





function openContent(section) {
    const mainContent = document.getElementById("main-content");

    // مسح المحتوى السابق
    clearContent();

    if (section === 'سياسة الخصوصية') {
        // عرض سياسة الخصوصية
        mainContent.innerHTML = `
            <div class="privacy-container">
                <h1>سياسة الخصوصية</h1>
                <p>مرحبًا بكم في تطبيق "بطولات الهلال". هذا التطبيق تم تطويره باجتهاد شخصي ويهدف إلى جمع معلومات حول تاريخ وإنجازات نادي الهلال بشكل شامل ومفيد للجمهور.</p>
                
                <h2>بيان الاستقلالية</h2>
                <p>هذا التطبيق غير تابع أو مدعوم من قبل نادي الهلال الرسمي أو أي جهة رسمية أخرى. جميع الجهود المبذولة هنا شخصية ومستقلة.</p>
                
                <h2>مصادر المحتوى</h2>
                <p>تم جمع جميع البيانات والمعلومات من مصادر عامة موثوقة مثل الإنترنت. مقاطع الفيديو المعروضة من مصادرها الأصلية (مثل قنوات اليوتيوب) ولم يتم تعديلها. إذا كنت مالكًا لأي محتوى وترغب في إزالته، يرجى التواصل معنا.</p>
                
                <h2>حقوق النشر</h2>
                <p>جميع حقوق الملكية الفكرية للتطبيق محفوظة. يمنع نسخ أو تعديل أو استخدام التطبيق لأغراض تجارية دون إذن مسبق.</p>
                
                <h2>سياسة البيانات</h2>
                <p>نحن لا نجمع أو نشارك بيانات المستخدمين مع أطراف ثالثة. إذا قمت بالتسجيل في التطبيق، سيتم استخدام بياناتك فقط لتحسين تجربة الاستخدام.</p>
                
                <h2>تواصل معنا</h2>
                <p>إذا كان لديك أي استفسارات أو اعتراضات، يمكنك التواصل معنا عبر البريد التالي:</p>
            </div>
        `;

        // إضافة زر الرجوع إلى الشاشة الرئيسية
        addHomeButton();
        mainContent.style.display = "block"; // عرض القسم
    }
}















