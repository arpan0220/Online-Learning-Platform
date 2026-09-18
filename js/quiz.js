/* =====================================================
   QUIZ
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


        const params =
            new URLSearchParams(
                window.location.search
            );


        const courseId =
            params.get("id");


        const course =
            getCourses().find(
                item =>
                    item.id === courseId
            );


        const container =
            document.getElementById(
                "quizContainer"
            );


        if (!course || !container) {

            return;

        }


        const enrollments =
            getEnrollments();


        const enrollment =
            enrollments.find(
                item =>
                    item.userId === user.id &&
                    item.courseId === course.id
            );


        if (!enrollment) {

            container.innerHTML = `

                <div class="empty">

                    <h2>
                        You are not enrolled.
                    </h2>

                </div>

            `;

            return;

        }


        if (enrollment.progress < 100) {

            container.innerHTML = `

                <div class="empty">

                    <h2>
                        Complete all lessons first.
                    </h2>

                    <p>
                        Your current progress is
                        ${enrollment.progress}%.
                    </p>

                    <br>

                    <a
                        href="lesson.html?id=${course.id}"
                        class="btn">

                        Continue Lessons

                    </a>

                </div>

            `;

            return;

        }


        container.innerHTML = `

            <div class="quiz-card">

                <span class="eyebrow">
                    COURSE QUIZ
                </span>

                <h1>
                    ${escapeHTML(course.title)}
                </h1>

                <p>
                    Pass mark: 60%
                </p>

                <br>

                <form id="quizForm">

                    ${course.quiz.map(
                        (question, index) => `

                            <div
                                class="quiz-question">

                                <h3>
                                    ${index + 1}.
                                    ${escapeHTML(
                                        question.question
                                    )}
                                </h3>

                                <label class="quiz-option">

                                    <input
                                        type="radio"
                                        name="question${index}"
                                        value="${escapeHTML(
                                            question.answer
                                        )}"
                                        required>

                                    ${escapeHTML(
                                        question.answer
                                    )}

                                </label>

                                <label class="quiz-option">

                                    <input
                                        type="radio"
                                        name="question${index}"
                                        value="Other">

                                    Other

                                </label>

                            </div>

                    `
                    ).join("")}


                    <button
                        type="submit"
                        class="btn full">

                        Submit Quiz

                    </button>

                </form>

                <div
                    id="quizResult">
                </div>

            </div>

        `;


        const quizForm =
            document.getElementById(
                "quizForm"
            );


        quizForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                let score = 0;


                course.quiz.forEach(
                    (question, index) => {

                        const selected =
                            document.querySelector(
                                `input[name="question${index}"]:checked`
                            );


                        if (
                            selected &&
                            selected.value ===
                            question.answer
                        ) {

                            score++;

                        }

                    }
                );


                const percentage =
                    Math.round(
                        (
                            score /
                            course.quiz.length
                        ) * 100
                    );


                const passed =
                    percentage >= 60;


                enrollment.quizPassed =
                    passed;


                saveEnrollments(
                    enrollments
                );


                const result =
                    document.getElementById(
                        "quizResult"
                    );


                result.innerHTML = `

                    <div class="quiz-result">

                        <h2>
                            ${
                                passed
                                    ? "🎉 Quiz Passed!"
                                    : "❌ Quiz Not Passed"
                            }
                        </h2>

                        <p>
                            Score:
                            ${score}/${course.quiz.length}
                            (${percentage}%)
                        </p>

                        <br>

                        ${
                            passed

                            ? `

                                <a
                                    href="certificate.html?id=${course.id}"
                                    class="btn">

                                    View Certificate

                                </a>

                            `

                            : `

                                <button
                                    onclick="location.reload()"
                                    class="btn">

                                    Try Again

                                </button>

                            `
                        }

                    </div>

                `;

            }
        );

    }
);