/* =====================================================
   STUDENT DASHBOARD
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


        const enrollments =
            getEnrollments();


        const courses =
            getCourses();


        const userEnrollments =
            enrollments.filter(
                item =>
                    item.userId === user.id
            );


        // =================================================
        // DASHBOARD
        // =================================================

        const studentName =
            document.getElementById(
                "studentName"
            );


        if (studentName) {

            studentName.textContent =
                user.name;

        }


        const enrolledCount =
            document.getElementById(
                "enrolledCount"
            );


        if (enrolledCount) {

            enrolledCount.textContent =
                userEnrollments.length;

        }


        const completedCount =
            document.getElementById(
                "completedCount"
            );


        const completed =
            userEnrollments.filter(
                item =>
                    item.progress === 100 &&
                    item.quizPassed
            ).length;


        if (completedCount) {

            completedCount.textContent =
                completed;

        }


        const averageProgress =
            document.getElementById(
                "averageProgress"
            );


        const average =
            userEnrollments.length
                ? Math.round(
                    userEnrollments.reduce(
                        (total, item) =>
                            total + item.progress,
                        0
                    ) /
                    userEnrollments.length
                )
                : 0;


        if (averageProgress) {

            averageProgress.textContent =
                average + "%";

        }


        // =================================================
        // COURSE RENDERING
        // =================================================

        const dashboardCourses =
            document.getElementById(
                "dashboardCourses"
            );


        const myCourses =
            document.getElementById(
                "myCourses"
            );


        const empty =
            document.getElementById(
                "myCoursesEmpty"
            );


        const target =
            dashboardCourses || myCourses;


        if (!target) {
            return;
        }


        target.innerHTML = "";


        if (userEnrollments.length === 0) {

            if (empty) {

                empty.classList.remove(
                    "hidden"
                );

            }

            return;

        }


        userEnrollments.forEach(
            enrollment => {


                const course =
                    courses.find(
                        item =>
                            item.id ===
                            enrollment.courseId
                    );


                if (!course) {
                    return;
                }


                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "course-card";


                card.innerHTML = `

                    <div class="course-cover">
                        ${escapeHTML(course.icon)}
                    </div>

                    <div class="course-body">

                        <span class="eyebrow">
                            ${escapeHTML(course.category)}
                        </span>

                        <h3>
                            ${escapeHTML(course.title)}
                        </h3>

                        <p>
                            ${escapeHTML(course.description)}
                        </p>

                        <div class="progress">

                            <div
                                class="progress-bar"
                                style="width:${enrollment.progress}%">
                            </div>

                        </div>

                        <p>
                            Progress:
                            <strong>
                                ${enrollment.progress}%
                            </strong>
                        </p>

                        <br>

                        <a
                            href="lesson.html?id=${encodeURIComponent(course.id)}"
                            class="btn">

                            Continue Learning

                        </a>

                    </div>

                `;


                target.appendChild(card);

            }
        );


        // =================================================
        // PROFILE
        // =================================================

        const profileName =
            document.getElementById(
                "profileName"
            );


        const profileEmail =
            document.getElementById(
                "profileEmail"
            );


        const profileBio =
            document.getElementById(
                "profileBio"
            );


        if (profileName) {

            profileName.value =
                user.name;

        }


        if (profileEmail) {

            profileEmail.value =
                user.email;

        }


        if (profileBio) {

            profileBio.value =
                user.bio || "";

        }


        const profileForm =
            document.getElementById(
                "profileForm"
            );


        if (profileForm) {

            profileForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const users =
                        getUsers();


                    const index =
                        users.findIndex(
                            item =>
                                item.id === user.id
                        );


                    if (index === -1) {
                        return;
                    }


                    users[index].name =
                        profileName.value.trim();


                    users[index].bio =
                        profileBio.value.trim();


                    saveUsers(users);


                    setCurrentUser(
                        users[index]
                    );


                    showToast(
                        "Profile updated successfully."
                    );

                }
            );

        }

    }
);