


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

/**
 * دالة لفتح شاشة التتويجات
 */
function openChampionships() {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `
        <h2>🏆 تتويجات البطولات النهائية</h2>
        <div class="dropdown-container">
            <select id="year-select" class="styled-dropdown">
                <option value="" disabled selected>اختر السنة</option>
            </select>
        </div>
        <div id="championships-data" class="cards-container"></div>
    `;

    // جلب البيانات باستخدام الدالة العامة
    fetchDataFromSheet(SHEET_CHAMPIONSHIPS, (data) => {
        populateChampionshipYears(data); // ملء قائمة السنوات
    });
}

/**
 * دالة لملء قائمة السنوات
 * @param {Array} data - البيانات المستلمة من الشيت
 */
// إصلاح عرض التتويجات
function populateChampionshipYears(data) {
    const uniqueYears = [...new Set(data.map(row => row.Year))].sort();
    const yearSelect = document.getElementById("year-select");

    yearSelect.innerHTML = `<option value="" disabled selected>اختر السنة</option>`;
    uniqueYears.forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = `🏆 ${year}`;
        yearSelect.appendChild(option);
    });

    // إضافة حدث عند تغيير السنة
    yearSelect.addEventListener("change", () => {
        const selectedYear = yearSelect.value;
        const filteredData = data.filter(row => row.Year === selectedYear);
        renderChampionships(filteredData);
    });
}
/**
 * دالة لعرض التتويجات في شكل بطاقات
 * @param {Array} data - البيانات المفلترة حسب السنة
 */
function renderChampionships(data) {
    const dataContainer = document.getElementById("championships-data");
    dataContainer.innerHTML = ""; // تنظيف البيانات القديمة

    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "championship-card";
        card.innerHTML = `
            <div class="card-rank">
                رقم البطولة: <span class="rank-value">${item["Championship Rank"]}</span>
            </div>
            <h3 class="card-title">${item["Name"]}</h3>
            <img src="${item["Image URL"]}" alt="${item["Name"]}" class="championship-image">
            <div class="info-section">
                <i class="fa fa-trophy"></i>
                <span class="info-label">المباراة النهائية:</span>
                <span class="info-value">${item["Final Match"]}</span>
            </div>
            <div class="info-section">
                <i class="fa fa-calendar-alt"></i>
                <span class="info-label">الموسم:</span>
                <span class="info-value">${item["Date"]}</span>
            </div>
            <div class="info-section">
                <i class="fa fa-users"></i>
                <span class="info-label">الفريق المهزوم:</span>
                <span class="info-value">${item["Opponent"]}</span>
            </div>
            <div class="info-section">
                <i class="fa fa-futbol"></i>
                <span class="info-label">النتيجة:</span>
                <span class="info-value">${item["Score"]}</span>
            </div>
            <div class="info-section">
                <i class="fa fa-user"></i>
                <span class="info-label">الكابتن:</span>
                <span class="info-value">${item["captn"] || "غير متوفر"}</span>
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
        const positionIcon = getPositionIcon(player['class']);
        const playerCard = `
            <div class="player-card">
                <div class="player-number left">#${player['player_number']}</div>
                <img src="${player['Image URL']}" alt="${player['neam']}" class="player-image">
                <div class="player-name">${player['neam']}</div>
                <div class="player-position">${positionIcon} ${player['class']}</div>
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
        <h2 id="team-matches-title">⚽ مواجهات الهلال</h2>
        <select id="team-select" class="styled-dropdown" onchange="fetchTeamMatchesData()">
            <option value="">-- اختر الفريق --</option>
        </select>
        <div id="team-stats" class="team-stats-container"></div>
        <table id="team-stats-table" class="hidden">
            <thead>
                <tr>
                    <th>السنة</th>
                    <th>الدور</th>
                    <th>الهلال</th>
                    <th>المنافس</th>
                    <th>النتيجة</th>
                    <th>الفائز</th>
                </tr>
            </thead>
            <tbody id="team-stats-tbody"></tbody>
        </table>
        <div id="team-matches-stats" class="hidden">
            <button class="team-filter-btn all" onclick="fetchTeamMatchesData()">الكل</button>
            <button class="team-filter-btn wins" onclick="filterMatches('win')">الانتصارات</button>
            <button class="team-filter-btn losses" onclick="filterMatches('loss')">الخسائر</button>
            <button class="team-filter-btn draws" onclick="filterMatches('draw')">التعادلات</button>
        </div>
    `;

    // تأكد من إخفاء الجدول والأزرار افتراضيًا
    document.getElementById("team-stats-table").classList.add("hidden");
    document.getElementById("team-matches-stats").classList.add("hidden");

    // تحميل أسماء الفرق
    fetchDataFromSheet(SHEET_PAST_GAMES, populateTeamNames);
}


function populateTeamNames(data) {
    const teams = [...new Set(data.flatMap(game => [game.Team1, game.Team2]).filter(team => team.trim() !== ""))];
    const teamSelect = document.getElementById("team-select");
    teamSelect.innerHTML = '<option value="">-- اختر الفريق --</option>';

    const teamIcon = "⚽"; // أيقونة عامة للفريق

    teams.forEach(team => {
        const option = document.createElement("option");
        option.value = team;
        option.textContent = `${teamIcon} ${team}`; // إضافة أيقونة واحدة لجميع الخيارات
        teamSelect.appendChild(option);
    });
}

// دالة لجلب بيانات المواجهات وعرضها
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
        const matches = data.filter(game => game.Team1 === selectedTeam || game.Team2 === selectedTeam);
        displayTeamMatches(matches);
        updateTeamStats(matches, selectedTeam);

        // إظهار الجدول والأزرار بعد اختيار فريق
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
              <td>${match.Round}</td>
              <td>${match.Team1}</td>
                          <td>${match.Team2}</td>
                                      <td>${match.Score1} - ${match.Score2}</td>
                                                  <td>${match.Winner}</td>



            
        `;
        tableBody.appendChild(row);
    });
}

// دالة تحديث الإحصائيات
function updateTeamStats(matches, team) {
    const statsContainer = document.getElementById("team-stats");

    const totalMatches = matches.length;
    const wins = matches.filter(match => match.Winner === "الهلال").length;
    const losses = matches.filter(match => match.Winner === team).length;
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

// دالة تصفية المباريات
function filterMatches(filterType) {
    const selectedTeam = document.getElementById("team-select").value;
    if (!selectedTeam) return;

    fetchDataFromSheet(SHEET_PAST_GAMES, (data) => {
        let matches = data.filter(game => game.Team1 === selectedTeam || game.Team2 === selectedTeam);

        if (filterType === "win") matches = matches.filter(game => game.Winner === "الهلال");
        if (filterType === "loss") matches = matches.filter(game => game.Winner === selectedTeam);
        if (filterType === "draw") matches = matches.filter(game => game.Winner === "التعادل");

        displayTeamMatches(matches);
        updateTeamStats(matches, selectedTeam);
    });
}
//============================================================================================================================================

// دالة فتح قسم "حسميات الدوري"
function openYearStats() {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `
        <h2 id="year-stats-title">📊 إحصائيات حسميات الدوري</h2>
        <label for="year-stats-select" class="styled-dropdown-label">
            <span>اختر السنة</span>
        </label>
        <select id="year-stats-select" class="styled-dropdown" onchange="fetchYearStatsData()">
            <option value="">-- اختر السنة --</option>
        </select>
        <div id="year-stats" class="team-stats-container hidden"></div>
        <table id="year-stats-table" class="hidden">
            <thead>
                <tr>
                    <th>رقم المباراة</th>
                    <th>السنة</th>
                    <th>الدور</th>
                    <th>الهلال</th>
                    <th>المنافس</th>
                    <th>النتيجة</th>
                    <th>الفائز</th>
                </tr>
            </thead>
            <tbody id="year-stats-tbody"></tbody>
        </table>
        <div id="year-matches-stats" class="hidden">
            <button class="team-filter-btn all" onclick="fetchYearStatsData()">الكل</button>
            <button class="team-filter-btn wins" onclick="filterYearMatches('win')">الانتصارات</button>
            <button class="team-filter-btn losses" onclick="filterYearMatches('loss')">الخسائر</button>
            <button class="team-filter-btn draws" onclick="filterYearMatches('draw')">التعادلات</button>
        </div>
    `;

    // تحميل قائمة السنوات من Google Sheets
    fetchDataFromSheet(SHEET_PAST_GAMES, populateYearsDropdown);
}

// دالة لملء قائمة السنوات
function populateYearsDropdown(data) {
    const years = [...new Set(data.map(game => game.Year))].sort();
    const yearSelect = document.getElementById("year-stats-select");

    yearSelect.innerHTML = '<option value="">-- اختر السنة --</option>';
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
            <td>${match.Round}</td>
            <td>${match.Team1}</td>
            <td>${match.Team2}</td>
            <td>${match.Score1} - ${match.Score2}</td>
            <td>${match.Winner}</td>
        `;
        tableBody.appendChild(row);
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

        if (filterType === "win") matches = matches.filter(game => game.Winner === "الهلال");
        if (filterType === "loss") matches = matches.filter(game => game.Winner !== "الهلال" && game.Winner !== "التعادل");
        if (filterType === "draw") matches = matches.filter(game => game.Winner === "التعادل");

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
        : "<span class='no-data'>لا توجد بطولات</span>";

    const totalYears = manager.years
        .split(",")
        .reduce((sum, range) => {
            const [start, end] = range.split("-").map(Number);
            return sum + (end - start + 1);
        }, 0);

    document.getElementById("managers-container").innerHTML = `
        <!-- العنوان -->
        <h2 class="managers-title">
            <i class="fa fa-crown icon"></i> رؤساء المجد لنادي الهلال
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
                    <h4>الفترة الزمنية</h4>
                    <p>${formattedYears}</p>
                </div>
                <div class="stat-card">
                    <i class="fa fa-trophy icon"></i>
                    <h4>البطولات</h4>
                    <p>${formattedWins}</p>
                </div>
                <div class="stat-card">
                    <i class="fa fa-chart-bar icon"></i>
                    <h4>الإحصائيات</h4>
                    <p>
                        إجمالي السنوات: <span class="highlight stat">${totalYears}</span> سنة<br>
                        إجمالي البطولات: <span class="highlight stat">${manager.milestoneCount || 0}</span> بطولة
                    </p>
                </div>
            </div>

            <!-- أزرار التنقل -->
            <div class="navigation-buttons">
                <button onclick="prevManager()">السابق</button>
                <button onclick="nextManager()">التالي</button>
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

// دالة فتح قسم مقاطع التتويج
function openYouTubeVideos() {
    clearContent(); // تنظيف المحتوى السابق
    currentPage = 1; // إعادة تعيين الصفحة
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `
        <h2 class="videos-title">
            <i class="fa fa-play-circle"></i> مقاطع التتويج
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
        videoTitle.textContent = video.title || "عنوان غير متوفر";

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
        prevButton.textContent = "السابق";
        prevButton.className = "pagination-button";
        prevButton.onclick = () => {
            currentPage--;
            displayVideos();
        };
        paginationContainer.appendChild(prevButton);
    }

    const pageNumber = document.createElement("span");
    pageNumber.textContent = `الصفحة ${currentPage} من ${totalPages}`;
    pageNumber.className = "page-number";
    paginationContainer.appendChild(pageNumber);

    if (currentPage < totalPages) {
        const nextButton = document.createElement("button");
        nextButton.textContent = "التالي";
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
function openHilalMap() {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `
        <h2 id="map-title" style="text-align: center; margin-bottom: 20px;">🌍 منصات الهلال</h2>
        <div id="map-container" style="height: 500px; width: 70%; margin: 0 auto; border-radius: 15px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); border: 3px solid #005fbf;"></div>
        <div id="locations-bar" style="
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
            <i class="fa fa-map"></i> إعادة تعيين الخريطة
        </button>
    `;

    const map = L.map('map-container').setView([24.774265, 46.738586], 6);

    // إضافة طبقة الخريطة
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const markers = L.markerClusterGroup({
        iconCreateFunction: function (cluster) {
            return L.divIcon({
                html: `<div style="background-color: #005fbf; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; justify-content: center; align-items: center; font-weight: bold;">${cluster.getChildCount()}</div>`,
                className: "cluster-icon",
                iconSize: [40, 40]
            });
        }
    });

    const locationsBar = document.getElementById("locations-bar");

    // تحميل البيانات من Google Sheets
    fetchDataFromSheet("MAPS", (data) => {
        const locations = {};

        // معالجة البيانات
        data.forEach(row => {
            const coordinates = row.coordinates.split(',').map(coord => parseFloat(coord.trim()));
            const location = row.Location || "غير محدد"; // اسم المدينة
            const stadium = row.Stadium; // اسم الملعب
            const tournament = row.Name;
            const year = row.Year;

            if (!locations[location]) {
                locations[location] = {
                    coordinates,
                    stadiums: []
                };
            }
            locations[location].stadiums.push({ stadium, tournament, year, coordinates });
        });

        // إضافة الأزرار بناءً على المواقع
        Object.keys(locations).forEach(location => {
            const { coordinates, stadiums } = locations[location];
            const tournamentDetails = stadiums.map(s => `
                <div style="margin-bottom: 5px;">
                    <span style="color: #005fbf; font-weight: bold;">${s.tournament}</span> - 
                    <span style="color: #FF4500;">${s.year}</span>
                </div>
            `).join("");

            // إنشاء العلامات
            stadiums.forEach(({ stadium, tournament, year, coordinates }) => {
                const popupContent = `
                    <div style="text-align: center; padding: 10px;">
                        <h3 style="margin-bottom: 10px; color: #005fbf; border-bottom: 1px solid #005fbf;">${stadium}</h3>
                        <p style="font-size: 1.2rem; color: #005fbf; font-weight: bold;">
                            البطولة: <span style="color: #FF4500;">${tournament}</span> (${year})
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

            // إضافة المدينة إلى الشريط السفلي
            const locationItem = document.createElement("div");
            locationItem.style = `
                display: inline-block;
                margin: 5px 10px;
                padding: 10px;
                background-color: #005fbf;
                color: white;
                border-radius: 5px;
                font-weight: bold;
                cursor: pointer;
                transition: transform 0.3s ease;
            `;
            locationItem.innerHTML = `
                <span style="color: white;">${location}</span>
                <span style="background-color: #FF4500; color: white; padding: 5px 10px; margin-left: 10px; border-radius: 5px;">
                    ${stadiums.length}
                </span>
            `;
            locationItem.addEventListener("click", () => {
                map.setView(coordinates, 8); // الانتقال إلى موقع المدينة
            });
            locationItem.addEventListener("mouseover", () => {
                locationItem.style.transform = "scale(1.1)";
            });
            locationItem.addEventListener("mouseout", () => {
                locationItem.style.transform = "scale(1)";
            });

            locationsBar.appendChild(locationItem);
        });

        map.addLayer(markers);

        // زر إعادة تعيين الخريطة
        document.getElementById('reset-map').addEventListener('click', () => {
            map.setView([24.774265, 46.738586], 6);
        });

        // تحديث أبعاد الخريطة بعد التحميل
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
        overflow: hidden;
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
