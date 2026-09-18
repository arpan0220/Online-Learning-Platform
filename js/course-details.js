// =====================================================
// COURSE DETAILS
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    const courseDetails = document.getElementById("courseDetails");

    if (!courseDetails) {
        console.error("courseDetails element not found.");
        return;
    }

    // Get course ID from URL
    const params = new URLSearchParams(window.location.search);

    const courseId = params.get("id");

    console.log("Course ID:", courseId);

    // Check whether ID exists
    if (!courseId) {

        courseDetails.innerHTML = `
            <div class="empty-state">
                <h2>Course Not Found</h2>
                <p>No course ID was provided.</p>

                <a href="courses.html" class="btn btn-primary">
                    Back to Courses
                </a>
            </div>
        `;

        return;
    }


    // Get all courses from localStorage/default data
    const courses = getCourses();

    console.log("Available Courses:", courses);


    // Find selected course
    const course = courses.find(function (item) {

        return String(item.id) === String(courseId);

    });


    // Course does not exist
    if (!course) {

        courseDetails.innerHTML = `
            <div class="empty-state">

                <h2>Course Not Found</h2>

                <p>
                    The course you are looking for does not exist.
                </p>

                <a href="courses.html" class="btn btn-primary">
                    Back to Courses
                </a>

            </div>
        `;

        return;
    }


    // Display course
    renderCourse(course);


    // =================================================
    // RENDER COURSE
    // =================================================

    function renderCourse(course) {

        const lessons = Array.isArray(course.lessons)
            ? course.lessons
            : [];


        const quizQuestions = Array.isArray(course.quiz)
            ? course.quiz
            : [];


        courseDetails.innerHTML = `

            <div class="course-detail-layout">

                <!-- LEFT SIDE -->
                <div class="course-detail-main">

                    <div class="course-detail-icon">
                        ${course.icon || "📚"}
                    </div>

                    <span class="course-category">
                        ${esc(course.category || "General")}
                    </span>

                    <h1>
                        ${esc(course.title)}
                    </h1>

                    <p class="course-description">
                        ${esc(
                            course.description ||
                            "Learn practical skills through structured lessons and exercises."
                        )}
                    </p>


                    <!-- COURSE INFORMATION -->

                    <div class="course-info-grid">

                        <div class="info-box">

                            <strong>Level</strong>

                            <span>
                                ${esc(course.level || "Beginner")}
                            </span>

                        </div>


                        <div class="info-box">

                            <strong>Duration</strong>

                            <span>
                                ${esc(course.duration || "Self-paced")}
                            </span>

                        </div>


                        <div class="info-box">

                            <strong>Lessons</strong>

                            <span>
                                ${lessons.length}
                            </span>

                        </div>


                        <div class="info-box">

                            <strong>Quiz</strong>

                            <span>
                                ${quizQuestions.length} Questions
                            </span>

                        </div>

                    </div>


                    <!-- CURRICULUM -->

                    <div class="curriculum">

                        <h2>Course Curriculum</h2>

                        ${
                            lessons.length > 0

                            ? lessons.map(function (lesson, index) {

                                return `

                                    <div class="curriculum-item">

                                        <span class="lesson-number">
                                            ${index + 1}
                                        </span>

                                        <span>
                                            ${esc(lesson)}
                                        </span>

                                    </div>

                                `;

                            }).join("")

                            : `
                                <p>
                                    Course curriculum will be available soon.
                                </p>
                            `
                        }

                    </div>

                </div>


                <!-- RIGHT SIDE -->

                <aside class="course-detail-sidebar">

                    <div class="price-box">

                        <div class="course-large-icon">
                            ${course.icon || "📚"}
                        </div>


                        <h2>
                            ${formatINR(course.price || 0)}
                        </h2>


                        <p>
                            Lifetime access
                        </p>


                        <button
                            id="enrollBtn"
                            class="btn btn-primary btn-full"
                            data-course-id="${esc(course.id)}"
                        >
                            Enroll Now
                        </button>


                        <ul class="course-benefits">

                            <li>✓ Full course access</li>

                            <li>✓ Practical lessons</li>

                            <li>✓ Course quiz</li>

                            <li>✓ Progress tracking</li>

                            <li>✓ Certificate after completion</li>

                        </ul>

                    </div>

                </aside>

            </div>

        `;


        // Enrollment button
        const enrollBtn = document.getElementById("enrollBtn");

        if (enrollBtn) {

            enrollBtn.addEventListener("click", function () {

                enrollCourse(course);

            });

        }

    }


    // =================================================
    // ENROLL COURSE
    // =================================================

    function enrollCourse(course) {

        const user = currentUser();


        // User is not logged in
        if (!user) {

            showToast(
                "Please login before enrolling.",
                "error"
            );

            setTimeout(function () {

                window.location.href =
                    "login.html";

            }, 800);

            return;
        }


        // Admin should not enroll
        if (user.role === "admin") {

            showToast(
                "Admin accounts cannot enroll in courses.",
                "error"
            );

            return;
        }


        let enrollments = getEnrollments();


        // Check if already enrolled
        const alreadyEnrolled = enrollments.find(function (item) {

            return (
                item.userId === user.id &&
                item.courseId === course.id
            );

        });


        if (alreadyEnrolled) {

            showToast(
                "You are already enrolled in this course.",
                "info"
            );

            setTimeout(function () {

                window.location.href =
                    "student/my-courses.html";

            }, 800);

            return;
        }


        // Create enrollment
        const enrollment = {

            id:
                "enr_" +
                Date.now(),

            userId:
                user.id,

            courseId:
                course.id,

            enrolledAt:
                new Date().toISOString(),

            progress:
                0,

            completedLessons:
                [],

            quizPassed:
                false

        };


        enrollments.push(enrollment);

        saveEnrollments(enrollments);


        // Create simulated payment record
        if (Number(course.price) > 0) {

            const payments =
                getPayments();

            payments.push({

                id:
                    "pay_" +
                    Date.now(),

                userId:
                    user.id,

                courseId:
                    course.id,

                amount:
                    Number(course.price),

                status:
                    "Paid",

                date:
                    new Date().toISOString()

            });

            savePayments(payments);

        }


        showToast(
            "Course enrolled successfully!",
            "success"
        );


        setTimeout(function () {

            window.location.href =
                "student/my-courses.html";

        }, 800);

    }

});