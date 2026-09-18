/* =====================================================
   LEARNHUB - MAIN JAVASCRIPT
   ===================================================== */


// =====================================================
// DEFAULT COURSES
// =====================================================

const defaultCourses = [

    {
        id: "python",
        title: "Python Programming",
        category: "Programming",
        level: "Beginner",
        price: 999,
        duration: "8 weeks",
        icon: "🐍",

        description:
            "Learn Python programming from fundamentals to object-oriented programming.",

        lessons: [
            "Introduction to Python",
            "Variables and Data Types",
            "Conditions and Loops",
            "Functions",
            "Object-Oriented Programming",
            "Mini Project"
        ],

        quiz: [
            {
                question: "Which keyword is used to define a function in Python?",
                answer: "def"
            },
            {
                question: "Which data type stores True or False?",
                answer: "bool"
            },
            {
                question: "Which symbol is used for comments in Python?",
                answer: "#"
            }
        ]
    },


    {
        id: "web",
        title: "Modern Web Development",
        category: "Web Development",
        level: "Beginner",
        price: 799,
        duration: "6 weeks",
        icon: "🌐",

        description:
            "Learn HTML5, CSS3 and the fundamentals of modern frontend development.",

        lessons: [
            "Introduction to Web Development",
            "HTML5 Fundamentals",
            "CSS3 Fundamentals",
            "Responsive Design",
            "Forms and Validation",
            "Frontend Mini Project"
        ],

        quiz: [
            {
                question: "What does HTML stand for?",
                answer: "HyperText Markup Language"
            },
            {
                question: "Which language is used for styling web pages?",
                answer: "CSS"
            },
            {
                question: "Which HTML tag creates a hyperlink?",
                answer: "<a>"
            }
        ]
    },


    {
        id: "javascript",
        title: "JavaScript Essentials",
        category: "Programming",
        level: "Intermediate",
        price: 1199,
        duration: "8 weeks",
        icon: "⚡",

        description:
            "Learn JavaScript programming, DOM manipulation, events and browser APIs.",

        lessons: [
            "JavaScript Introduction",
            "Variables and Functions",
            "Arrays and Objects",
            "DOM Manipulation",
            "Events",
            "JavaScript Project"
        ],

        quiz: [
            {
                question: "Which keyword declares a constant in JavaScript?",
                answer: "const"
            },
            {
                question: "Which method selects an element by ID?",
                answer: "getElementById"
            },
            {
                question: "Which symbol is used for strict equality?",
                answer: "==="
            }
        ]
    },


    {
        id: "mysql",
        title: "SQL & MySQL",
        category: "Database",
        level: "Intermediate",
        price: 1099,
        duration: "7 weeks",
        icon: "🗄️",

        description:
            "Learn SQL queries, joins, constraints, procedures, triggers and database design.",

        lessons: [
            "Introduction to Databases",
            "SQL CRUD Operations",
            "Joins",
            "Subqueries",
            "Constraints",
            "Stored Procedures and Triggers"
        ],

        quiz: [
            {
                question: "Which SQL command is used to retrieve data?",
                answer: "SELECT"
            },
            {
                question: "Which key uniquely identifies a row?",
                answer: "PRIMARY KEY"
            },
            {
                question: "Which SQL command removes a table?",
                answer: "DROP"
            }
        ]
    },


    {
        id: "frontend",
        title: "Frontend Project Mastery",
        category: "Web Development",
        level: "Advanced",
        price: 1499,
        duration: "10 weeks",
        icon: "🎨",

        description:
            "Build professional frontend projects using HTML, CSS and JavaScript.",

        lessons: [
            "Project Planning",
            "Advanced CSS",
            "Responsive Layouts",
            "JavaScript Architecture",
            "LocalStorage",
            "Final Portfolio Project"
        ],

        quiz: [
            {
                question: "Which technology is responsible for webpage structure?",
                answer: "HTML"
            },
            {
                question: "Which technology handles webpage styling?",
                answer: "CSS"
            },
            {
                question: "Which language adds interactivity?",
                answer: "JavaScript"
            }
        ]
    }

];


// =====================================================
// LOCAL STORAGE HELPERS
// =====================================================

function getCourses() {

    return JSON.parse(
        localStorage.getItem("learnhub_courses")
    ) || defaultCourses;

}


function saveCourses(courses) {

    localStorage.setItem(
        "learnhub_courses",
        JSON.stringify(courses)
    );

}


function getUsers() {

    return JSON.parse(
        localStorage.getItem("learnhub_users")
    ) || [

        {
            id: "u1",
            name: "Demo Student",
            email: "student@learnhub.com",
            password: "student123",
            role: "student",
            bio: "LearnHub demo student",
            joined: "2026-01-10"
        },

        {
            id: "u2",
            name: "Admin",
            email: "admin@learnhub.com",
            password: "admin123",
            role: "admin",
            bio: "LearnHub administrator",
            joined: "2026-01-01"
        }

    ];

}


function saveUsers(users) {

    localStorage.setItem(
        "learnhub_users",
        JSON.stringify(users)
    );

}


function getEnrollments() {

    return JSON.parse(
        localStorage.getItem("learnhub_enrollments")
    ) || [];

}


function saveEnrollments(data) {

    localStorage.setItem(
        "learnhub_enrollments",
        JSON.stringify(data)
    );

}


function getPayments() {

    return JSON.parse(
        localStorage.getItem("learnhub_payments")
    ) || [];

}


function savePayments(data) {

    localStorage.setItem(
        "learnhub_payments",
        JSON.stringify(data)
    );

}


function currentUser() {

    return JSON.parse(
        localStorage.getItem("learnhub_current_user")
    );

}


function setCurrentUser(user) {

    localStorage.setItem(
        "learnhub_current_user",
        JSON.stringify(user)
    );

}


function logout() {

    localStorage.removeItem(
        "learnhub_current_user"
    );

    window.location.href = "../login.html";

}


// // =====================================================
// // HELPERS
// // =====================================================

// function formatINR(amount) {

//     return "₹" + Number(amount).toLocaleString("en-IN");

// }


// function escapeHTML(value) {

//     return String(value ?? "")
//         .replaceAll("&", "&amp;")
//         .replaceAll("<", "&lt;")
//         .replaceAll(">", "&gt;")
//         .replaceAll('"', "&quot;")
//         .replaceAll("'", "&#039;");

// }


// function showToast(message) {

//     const oldToast =
//         document.querySelector(".toast");

//     if (oldToast) {
//         oldToast.remove();
//     }


//     const toast =
//         document.createElement("div");

//     toast.className = "toast";

//     toast.textContent = message;

//     document.body.appendChild(toast);


//     setTimeout(() => {

//         toast.remove();

//     }, 2500);

// }

// =====================================================
// HELPERS
// =====================================================

function formatINR(amount) {

    return "₹" + Number(amount).toLocaleString("en-IN");

}


// =====================================================
// HTML ESCAPE FUNCTION
// =====================================================

function esc(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


// =====================================================
// BACKWARD COMPATIBILITY
// =====================================================

function escapeHTML(value) {

    return esc(value);

}


// =====================================================
// TOAST MESSAGE
// =====================================================

function showToast(message) {

    const oldToast =
        document.querySelector(".toast");

    if (oldToast) {
        oldToast.remove();
    }


    const toast =
        document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;

    document.body.appendChild(toast);


    setTimeout(() => {

        toast.remove();

    }, 2500);

}

// =====================================================
// INITIALIZATION
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        // Initialize courses
        if (!localStorage.getItem("learnhub_courses")) {

            saveCourses(defaultCourses);

        }


        // Initialize users
        if (!localStorage.getItem("learnhub_users")) {

            saveUsers(getUsers());

        }


        // Year
        const year =
            document.getElementById("year");

        if (year) {

            year.textContent =
                new Date().getFullYear();

        }


        // Course count
        const courseCount =
            document.getElementById("courseCount");

        if (courseCount) {

            courseCount.textContent =
                getCourses().length;

        }


        // Mobile menu
        const menuToggle =
            document.getElementById("menuToggle");

        const navLinks =
            document.getElementById("navLinks");

        if (menuToggle && navLinks) {

            menuToggle.addEventListener(
                "click",
                () => {

                    navLinks.classList.toggle("show");

                }
            );

        }


        // Theme
        const themeToggle =
            document.getElementById("themeToggle");

        const savedTheme =
            localStorage.getItem("learnhub_theme");


        if (savedTheme === "dark") {

            document.body.classList.add("dark");

        }


        if (themeToggle) {

            themeToggle.addEventListener(
                "click",
                () => {

                    document.body.classList.toggle("dark");

                    const dark =
                        document.body.classList.contains("dark");

                    localStorage.setItem(
                        "learnhub_theme",
                        dark ? "dark" : "light"
                    );

                    themeToggle.textContent =
                        dark ? "☀️" : "🌙";

                }
            );

        }


        // Logout
        const logoutBtn =
            document.getElementById("logoutBtn");

        if (logoutBtn) {

            logoutBtn.addEventListener(
                "click",
                logout
            );

        }

    }
);