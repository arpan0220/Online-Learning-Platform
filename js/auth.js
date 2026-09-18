/* =====================================================
   AUTHENTICATION
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // =================================================
        // LOGIN
        // =================================================

        const loginForm =
            document.getElementById("loginForm");


        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const email =
                        document
                            .getElementById("loginEmail")
                            .value
                            .trim()
                            .toLowerCase();


                    const password =
                        document
                            .getElementById("loginPassword")
                            .value;


                    const users =
                        getUsers();


                    const user =
                        users.find(
                            u =>
                                u.email.toLowerCase() === email &&
                                u.password === password
                        );


                    if (!user) {

                        alert(
                            "Invalid email or password."
                        );

                        return;

                    }


                    setCurrentUser(user);


                    if (user.role === "admin") {

                        window.location.href =
                            "admin/dashboard.html";

                    } else {

                        window.location.href =
                            "student/dashboard.html";

                    }

                }
            );

        }


        // =================================================
        // REGISTER
        // =================================================

        const registerForm =
            document.getElementById("registerForm");


        if (registerForm) {

            registerForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const name =
                        document
                            .getElementById("registerName")
                            .value
                            .trim();


                    const email =
                        document
                            .getElementById("registerEmail")
                            .value
                            .trim()
                            .toLowerCase();


                    const password =
                        document
                            .getElementById("registerPassword")
                            .value;


                    const confirmPassword =
                        document
                            .getElementById("confirmPassword")
                            .value;


                    if (password !== confirmPassword) {

                        alert(
                            "Passwords do not match."
                        );

                        return;

                    }


                    if (password.length < 6) {

                        alert(
                            "Password must contain at least 6 characters."
                        );

                        return;

                    }


                    const users =
                        getUsers();


                    const exists =
                        users.some(
                            user =>
                                user.email.toLowerCase() === email
                        );


                    if (exists) {

                        alert(
                            "An account with this email already exists."
                        );

                        return;

                    }


                    const newUser = {

                        id:
                            "u" +
                            Date.now(),

                        name: name,

                        email: email,

                        password: password,

                        role: "student",

                        bio: "",

                        joined:
                            new Date()
                                .toISOString()
                                .split("T")[0]

                    };


                    users.push(newUser);

                    saveUsers(users);

                    setCurrentUser(newUser);


                    alert(
                        "Account created successfully!"
                    );


                    window.location.href =
                        "student/dashboard.html";

                }
            );

        }

    }
);