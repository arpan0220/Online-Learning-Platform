/* =====================================================
   ADMIN PANEL
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


        if (user.role !== "admin") {

            window.location.href =
                "../student/dashboard.html";

            return;

        }


        // =================================================
        // DASHBOARD STATISTICS
        // =================================================

        const courses =
            getCourses();


        const users =
            getUsers();


        const enrollments =
            getEnrollments();


        const payments =
            getPayments();


        const students =
            users.filter(
                item =>
                    item.role === "student"
            );


        const revenue =
            payments.reduce(
                (total, payment) =>
                    total +
                    Number(payment.amount || 0),
                0
            );


        const adminCourses =
            document.getElementById(
                "adminCourses"
            );


        const adminStudents =
            document.getElementById(
                "adminStudents"
            );


        const adminEnrollments =
            document.getElementById(
                "adminEnrollments"
            );


        const adminRevenue =
            document.getElementById(
                "adminRevenue"
            );


        if (adminCourses) {

            adminCourses.textContent =
                courses.length;

        }


        if (adminStudents) {

            adminStudents.textContent =
                students.length;

        }


        if (adminEnrollments) {

            adminEnrollments.textContent =
                enrollments.length;

        }


        if (adminRevenue) {

            adminRevenue.textContent =
                formatINR(revenue);

        }


        // =================================================
        // COURSE MANAGEMENT
        // =================================================

        const courseTable =
            document.getElementById(
                "courseTable"
            );


        const modal =
            document.getElementById(
                "courseModal"
            );


        const courseForm =
            document.getElementById(
                "courseForm"
            );


        const addCourseBtn =
            document.getElementById(
                "addCourseBtn"
            );


        const closeModal =
            document.getElementById(
                "closeCourseModal"
            );


        function renderCourseTable() {

            if (!courseTable) {
                return;
            }


            const currentCourses =
                getCourses();


            courseTable.innerHTML = "";


            currentCourses.forEach(
                course => {

                    const row =
                        document.createElement(
                            "tr"
                        );


                    row.innerHTML = `

                        <td>
                            ${escapeHTML(course.icon)}
                            ${escapeHTML(course.title)}
                        </td>

                        <td>
                            ${escapeHTML(course.category)}
                        </td>

                        <td>
                            ${escapeHTML(course.level)}
                        </td>

                        <td>
                            ${formatINR(course.price)}
                        </td>

                        <td>

                            <div
                                class="action-buttons">

                                <button
                                    class="btn btn-small btn-edit"
                                    data-edit="${course.id}">

                                    Edit

                                </button>

                                <button
                                    class="btn btn-small btn-delete"
                                    data-delete="${course.id}">

                                    Delete

                                </button>

                            </div>

                        </td>

                    `;


                    courseTable.appendChild(row);

                }
            );

        }


        function openAddModal() {

            if (!modal || !courseForm) {
                return;
            }


            courseForm.reset();


            document.getElementById(
                "courseId"
            ).value = "";


            document.getElementById(
                "modalTitle"
            ).textContent =
                "Add Course";


            modal.classList.remove(
                "hidden"
            );

        }


        function openEditModal(courseId) {

            const currentCourses =
                getCourses();


            const course =
                currentCourses.find(
                    item =>
                        item.id === courseId
                );


            if (!course) {
                return;
            }


            document.getElementById(
                "courseId"
            ).value =
                course.id;


            document.getElementById(
                "courseTitle"
            ).value =
                course.title;


            document.getElementById(
                "courseCategory"
            ).value =
                course.category;


            document.getElementById(
                "courseLevel"
            ).value =
                course.level;


            document.getElementById(
                "coursePrice"
            ).value =
                course.price;


            document.getElementById(
                "courseDuration"
            ).value =
                course.duration;


            document.getElementById(
                "courseDescription"
            ).value =
                course.description;


            document.getElementById(
                "modalTitle"
            ).textContent =
                "Edit Course";


            modal.classList.remove(
                "hidden"
            );

        }


        if (addCourseBtn) {

            addCourseBtn.addEventListener(
                "click",
                openAddModal
            );

        }


        if (closeModal) {

            closeModal.addEventListener(
                "click",
                function () {

                    modal.classList.add(
                        "hidden"
                    );

                }
            );

        }


        if (courseTable) {

            courseTable.addEventListener(
                "click",
                function (event) {

                    const editId =
                        event.target
                            .dataset
                            .edit;


                    const deleteId =
                        event.target
                            .dataset
                            .delete;


                    if (editId) {

                        openEditModal(
                            editId
                        );

                    }


                    if (deleteId) {

                        if (
                            !confirm(
                                "Delete this course?"
                            )
                        ) {

                            return;

                        }


                        const currentCourses =
                            getCourses();


                        const updated =
                            currentCourses.filter(
                                course =>
                                    course.id !==
                                    deleteId
                            );


                        saveCourses(
                            updated
                        );


                        showToast(
                            "Course deleted."
                        );


                        renderCourseTable();

                    }

                }
            );

        }


        if (courseForm) {

            courseForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const id =
                        document
                            .getElementById(
                                "courseId"
                            )
                            .value;


                    const title =
                        document
                            .getElementById(
                                "courseTitle"
                            )
                            .value
                            .trim();


                    const category =
                        document
                            .getElementById(
                                "courseCategory"
                            )
                            .value;


                    const level =
                        document
                            .getElementById(
                                "courseLevel"
                            )
                            .value;


                    const price =
                        Number(
                            document
                                .getElementById(
                                    "coursePrice"
                                )
                                .value
                        );


                    const duration =
                        document
                            .getElementById(
                                "courseDuration"
                            )
                            .value
                            .trim();


                    const description =
                        document
                            .getElementById(
                                "courseDescription"
                            )
                            .value
                            .trim();


                    let currentCourses =
                        getCourses();


                    if (id) {

                        const index =
                            currentCourses.findIndex(
                                course =>
                                    course.id === id
                            );


                        if (index !== -1) {

                            currentCourses[index] = {

                                ...currentCourses[index],

                                title,

                                category,

                                level,

                                price,

                                duration,

                                description

                            };

                        }

                    } else {

                        const newCourse = {

                            id:
                                "course_" +
                                Date.now(),

                            title,

                            category,

                            level,

                            price,

                            duration,

                            description,

                            icon: "📘",

                            lessons: [

                                "Introduction",

                                "Core Concepts",

                                "Practical Exercise",

                                "Project"

                            ],

                            quiz: [

                                {
                                    question:
                                        "Is this course useful for practice?",

                                    answer:
                                        "Yes"

                                }

                            ]

                        };


                        currentCourses.push(
                            newCourse
                        );

                    }


                    saveCourses(
                        currentCourses
                    );


                    modal.classList.add(
                        "hidden"
                    );


                    showToast(
                        "Course saved successfully."
                    );


                    renderCourseTable();

                }
            );

        }


        renderCourseTable();


        // =================================================
        // STUDENT TABLE
        // =================================================

        const studentTable =
            document.getElementById(
                "studentTable"
            );


        if (studentTable) {

            studentTable.innerHTML = "";


            students.forEach(
                student => {

                    const row =
                        document.createElement(
                            "tr"
                        );


                    row.innerHTML = `

                        <td>
                            ${escapeHTML(student.name)}
                        </td>

                        <td>
                            ${escapeHTML(student.email)}
                        </td>

                        <td>
                            ${escapeHTML(student.joined)}
                        </td>

                        <td>
                            ${escapeHTML(student.role)}
                        </td>

                    `;


                    studentTable.appendChild(
                        row
                    );

                }
            );

        }


        // =================================================
        // PAYMENT TABLE
        // =================================================

        const paymentTable =
            document.getElementById(
                "paymentTable"
            );


        const paymentTotal =
            document.getElementById(
                "paymentTotal"
            );


        if (paymentTable) {

            const currentPayments =
                getPayments();


            const currentCourses =
                getCourses();


            const currentUsers =
                getUsers();


            let total = 0;


            paymentTable.innerHTML = "";


            currentPayments.forEach(
                payment => {


                    const student =
                        currentUsers.find(
                            item =>
                                item.id ===
                                payment.userId
                        );


                    const course =
                        currentCourses.find(
                            item =>
                                item.id ===
                                payment.courseId
                        );


                    total +=
                        Number(
                            payment.amount || 0
                        );


                    const row =
                        document.createElement(
                            "tr"
                        );


                    row.innerHTML = `

                        <td>
                            ${
                                escapeHTML(
                                    student
                                        ? student.name
                                        : "Unknown"
                                )
                            }
                        </td>

                        <td>
                            ${
                                escapeHTML(
                                    course
                                        ? course.title
                                        : "Deleted Course"
                                )
                            }
                        </td>

                        <td>
                            ${formatINR(payment.amount)}
                        </td>

                        <td>
                            ${
                                new Date(
                                    payment.date
                                ).toLocaleDateString(
                                    "en-IN"
                                )
                            }
                        </td>

                        <td>
                            <strong>
                                ${escapeHTML(payment.status)}
                            </strong>
                        </td>

                    `;


                    paymentTable.appendChild(
                        row
                    );

                }
            );


            if (paymentTotal) {

                paymentTotal.textContent =
                    formatINR(total);

            }

        }

    }
);