/* =====================================================
   COURSE LIST
   ===================================================== */


const courseGrid =
    document.getElementById("courseGrid");

const searchInput =
    document.getElementById("courseSearch");

const categoryFilter =
    document.getElementById("categoryFilter");

const levelFilter =
    document.getElementById("levelFilter");

const emptyCourses =
    document.getElementById("emptyCourses");


function populateCategories() {

    if (!categoryFilter) {
        return;
    }


    const courses =
        getCourses();


    const categories =
        [
            ...new Set(
                courses.map(
                    course => course.category
                )
            )
        ];


    categories.forEach(category => {

        const option =
            document.createElement("option");

        option.value = category;

        option.textContent = category;

        categoryFilter.appendChild(option);

    });

}


function renderCourses() {

    if (!courseGrid) {
        return;
    }


    const courses =
        getCourses();


    const search =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const category =
        categoryFilter
            ? categoryFilter.value
            : "all";


    const level =
        levelFilter
            ? levelFilter.value
            : "all";


    const filtered =
        courses.filter(course => {

            const matchesSearch =
                course.title
                    .toLowerCase()
                    .includes(search) ||

                course.description
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                category === "all" ||
                course.category === category;


            const matchesLevel =
                level === "all" ||
                course.level === level;


            return (
                matchesSearch &&
                matchesCategory &&
                matchesLevel
            );

        });


    courseGrid.innerHTML = "";


    filtered.forEach(course => {

        const card =
            document.createElement("article");

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

                <div class="course-meta">

                    <span>
                        ${escapeHTML(course.level)}
                    </span>

                    <span>
                        ${escapeHTML(course.duration)}
                    </span>

                    <span class="price">
                        ${formatINR(course.price)}
                    </span>

                </div>

                <div class="course-actions">

                    <a
                        href="course-details.html?id=${encodeURIComponent(course.id)}"
                        class="btn">

                        View Course

                    </a>

                </div>

            </div>

        `;


        courseGrid.appendChild(card);

    });


    if (emptyCourses) {

        emptyCourses.classList.toggle(
            "hidden",
            filtered.length !== 0
        );

    }

}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        populateCategories();

        renderCourses();


        if (searchInput) {

            searchInput.addEventListener(
                "input",
                renderCourses
            );

        }


        if (categoryFilter) {

            categoryFilter.addEventListener(
                "change",
                renderCourses
            );

        }


        if (levelFilter) {

            levelFilter.addEventListener(
                "change",
                renderCourses
            );

        }

    }
);