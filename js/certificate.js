// =====================================================
// LEARNHUB CERTIFICATE
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    // Get logged-in user
    const user = currentUser();

    // Get course ID from URL
    const params =
        new URLSearchParams(window.location.search);

    const courseId =
        params.get("id");


    // =================================================
    // CHECK LOGIN
    // =================================================

    if (!user) {

        window.location.href =
            "../login.html";

        return;
    }


    // =================================================
    // GET COURSE
    // =================================================

    const courses =
        getCourses();

    const course =
        courses.find(function (item) {

            return String(item.id) ===
                   String(courseId);

        });


    if (!course) {

        document.getElementById("certCourse").textContent =
            "Course Not Found";

        return;
    }


    // =================================================
    // GET ENROLLMENT
    // =================================================

    const enrollments =
        getEnrollments();

    const enrollment =
        enrollments.find(function (item) {

            return (
                item.userId === user.id &&
                item.courseId === course.id
            );

        });


    // =================================================
    // CHECK COURSE COMPLETION
    // =================================================

    if (!enrollment) {

        alert(
            "You are not enrolled in this course."
        );

        window.location.href =
            "my-courses.html";

        return;
    }


    // Course should be completed
    if (Number(enrollment.progress) < 100) {

        alert(
            "Complete the course before generating your certificate."
        );

        window.location.href =
            "my-courses.html";

        return;
    }


    // =================================================
    // DISPLAY CERTIFICATE INFORMATION
    // =================================================

    const certName =
        document.getElementById("certName");

    const certCourse =
        document.getElementById("certCourse");

    const certDate =
        document.getElementById("certDate");


    if (certName) {

        certName.textContent =
            user.name;

    }


    if (certCourse) {

        certCourse.textContent =
            course.title;

    }


    if (certDate) {

        const completionDate =
            enrollment.completedAt ||
            new Date().toISOString();


        const date =
            new Date(completionDate);


        certDate.textContent =
            date.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                }
            );

    }

});