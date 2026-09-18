/* =====================================================
   LESSON MANAGEMENT
   ===================================================== */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        const user =
            currentUser();


        if (!user) {

            window.location.href =
                "../login.html";

            return;

        }


        if (user.role !== "student") {

            window.location.href =
                "../admin/dashboard.html";

            return;

        }


        const params =
            new URLSearchParams(
                window.location.search
            );


        const courseId =
            params.get("id");


        const courses =
            getCourses();


        const course =
            courses.find(
                item =>
                    item.id === courseId
            );


        const content =
            document.getElementById(
                "lessonContent"
            );


        const lessonList =
            document.getElementById(
                "lessonList"
            );


        if (!course || !content) {

            if (content) {

                content.innerHTML =
                    "<h2>Course not found.</h2>";

            }

            return;

        }


        let enrollments =
            getEnrollments();


        let enrollment =
            enrollments.find(
                item =>
                    item.userId === user.id &&
                    item.courseId === course.id
            );


        if (!enrollment) {

            content.innerHTML = `

                <div class="empty">

                    <h2>
                        You are not enrolled.
                    </h2>

                    <a
                        href="../course-details.html?id=${course.id}"
                        class="btn">

                        View Course

                    </a>

                </div>

            `;

            return;

        }


        let selectedLesson =
            0;


        function renderLessonList() {

            lessonList.innerHTML = "";


            course.lessons.forEach(
                (lesson, index) => {

                    const link =
                        document.createElement(
                            "a"
                        );


                    link.href = "#";

                    link.className =
                        "lesson-nav" +
                        (
                            index === selectedLesson
                                ? " active"
                                : ""
                        );


                    const completed =
                        enrollment
                            .completedLessons
                            .includes(index);


                    link.innerHTML = `

                        ${completed ? "✓ " : ""}

                        ${index + 1}.
                        ${escapeHTML(lesson)}

                    `;


                    link.addEventListener(
                        "click",
                        function (event) {

                            event.preventDefault();

                            selectedLesson =
                                index;

                            render();

                        }
                    );


                    lessonList.appendChild(
                        link
                    );

                }
            );

        }


        function render() {

            renderLessonList();


            const lesson =
                course.lessons[
                    selectedLesson
                ];


            const completed =
                enrollment
                    .completedLessons
                    .includes(selectedLesson);


            content.innerHTML = `

                <div class="lesson-content">

                    <span class="eyebrow">
                        LESSON ${selectedLesson + 1}
                    </span>

                    <h1>
                        ${escapeHTML(lesson)}
                    </h1>

                    <p>
                        This lesson is part of
                        the ${escapeHTML(course.title)}
                        course.
                    </p>

                    <p>
                        Study the lesson material,
                        practice the concepts and
                        complete the lesson when you
                        are ready.
                    </p>

                    <p>
                        In a real production platform,
                        this section could contain
                        videos, PDFs, assignments and
                        interactive exercises.
                    </p>

                    <br>

                    ${
                        completed

                        ? `

                            <div class="demo-box">
                                ✓ Lesson completed
                            </div>

                        `

                        : `

                            <button
                                id="completeLesson"
                                class="btn">

                                Mark Lesson Complete

                            </button>

                        `
                    }

                    ${
                        selectedLesson ===
                        course.lessons.length - 1

                        && enrollment.progress === 100

                        ? `

                            <br><br>

                            <a
                                href="quiz.html?id=${course.id}"
                                class="btn">

                                Take Course Quiz

                            </a>

                        `

                        : ""

                    }

                </div>

            `;


            const completeButton =
                document.getElementById(
                    "completeLesson"
                );


            if (completeButton) {

                completeButton.addEventListener(
                    "click",
                    function () {


                        if (
                            !enrollment
                                .completedLessons
                                .includes(
                                    selectedLesson
                                )
                        ) {

                            enrollment
                                .completedLessons
                                .push(
                                    selectedLesson
                                );

                        }


                        enrollment.progress =
                            Math.round(

                                (
                                    enrollment
                                        .completedLessons
                                        .length /

                                    course.lessons.length

                                ) * 100

                            );


                        saveEnrollments(
                            enrollments
                        );


                        showToast(
                            "Lesson completed!"
                        );


                        render();

                    }
                );

            }

        }


        render();

    }
);