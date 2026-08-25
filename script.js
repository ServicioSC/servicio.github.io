/* =================================
   DATOS DE DEMOSTRACIÓN
================================= */

const tasks = [
    {
        id: 1,
        title: "Proyecto de programación",
        description: "Desarrollar un programa utilizando Python y entregar el código junto con una breve documentación.",
        deadline: "15 de septiembre de 2026",
        status: "pending"
    },
    {
        id: 2,
        title: "Reporte de laboratorio",
        description: "Elaborar el reporte correspondiente a la práctica de laboratorio.",
        deadline: "20 de septiembre de 2026",
        status: "submitted"
    },
    {
        id: 3,
        title: "Análisis numérico",
        description: "Resolver el problema asignado utilizando MATLAB.",
        deadline: "25 de septiembre de 2026",
        status: "reviewed"
    },
    {
        id: 4,
        title: "Proyecto final",
        description: "Presentar el avance del proyecto final del semestre.",
        deadline: "30 de septiembre de 2026",
        status: "pending"
    }
];


/* =================================
   ELEMENTOS
================================= */

const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");
const modal = document.getElementById("submissionModal");
const closeModalButton = document.querySelector(".close-modal");
const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");
const submissionForm = document.getElementById("submissionForm");
const notification = document.getElementById("notification");


/* =================================
   NAVEGACIÓN
================================= */

navItems.forEach(item => {

    item.addEventListener("click", () => {

        const target = item.dataset.page;

        navItems.forEach(nav => {
            nav.classList.remove("active");
        });

        item.classList.add("active");

        pages.forEach(page => {
            page.classList.remove("active");
        });

        const targetPage = document.getElementById(target);

        if (targetPage) {
            targetPage.classList.add("active");
        }
    });

});


/* =================================
   MODAL DE ENTREGA
================================= */

function openSubmissionModal(taskName) {

    const taskInput = document.getElementById("taskName");

    if (taskInput) {
        taskInput.value = taskName;
    }

    modal.classList.add("show");
}


function closeSubmissionModal() {

    modal.classList.remove("show");

    if (submissionForm) {
        submissionForm.reset();
    }

    if (fileName) {
        fileName.textContent = "Ningún archivo seleccionado";
    }
}


/* =================================
   CERRAR MODAL
================================= */

if (closeModalButton) {

    closeModalButton.addEventListener("click", () => {
        closeSubmissionModal();
    });

}


if (modal) {

    modal.addEventListener("click", event => {

        if (event.target === modal) {
            closeSubmissionModal();
        }

    });

}


/* =================================
   ARCHIVO SELECCIONADO
================================= */

if (fileInput) {

    fileInput.addEventListener("change", () => {

        if (fileInput.files.length > 0) {

            const selectedFile = fileInput.files[0];

            fileName.textContent =
                "Archivo seleccionado: " + selectedFile.name;

        } else {

            fileName.textContent =
                "Ningún archivo seleccionado";

        }

    });

}


/* =================================
   ENVIAR TRABAJO
================================= */

if (submissionForm) {

    submissionForm.addEventListener("submit", event => {

        event.preventDefault();

        const studentName =
            document.getElementById("studentName").value;

        const taskName =
            document.getElementById("taskName").value;

        if (!studentName) {

            showNotification(
                "Escribe tu nombre antes de enviar el trabajo."
            );

            return;
        }

        if (!fileInput.files.length) {

            showNotification(
                "Selecciona un archivo antes de entregar."
            );

            return;
        }

        showNotification(
            "Trabajo enviado correctamente (modo demostración)."
        );

        closeSubmissionModal();

    });

}


/* =================================
   CAMBIAR ENTRE ALUMNO Y PROFESOR
================================= */

const roleSelector =
    document.getElementById("roleSelector");

if (roleSelector) {

    roleSelector.addEventListener("change", () => {

        const role = roleSelector.value;

        const studentContent =
            document.getElementById("studentContent");

        const teacherContent =
            document.getElementById("teacherContent");

        if (role === "teacher") {

            if (studentContent) {
                studentContent.style.display = "none";
            }

            if (teacherContent) {
                teacherContent.style.display = "block";
            }

        } else {

            if (studentContent) {
                studentContent.style.display = "block";
            }

            if (teacherContent) {
                teacherContent.style.display = "none";
            }

        }

    });

}


/* =================================
   REVISAR TRABAJO
================================= */

function reviewSubmission(studentName, taskName) {

    showNotification(
        "Abriendo revisión de " +
        studentName +
        " — " +
        taskName
    );

}


/* =================================
   NOTIFICACIONES
================================= */

function showNotification(message) {

    if (!notification) {
        return;
    }

    notification.textContent = message;

    notification.classList.add("show");

    setTimeout(() => {

        notification.classList.remove("show");

    }, 3000);

}


/* =================================
   BOTONES DE ENTREGA
================================= */

document.addEventListener("click", event => {

    const button =
        event.target.closest("[data-submit-task]");

    if (!button) {
        return;
    }

    const taskName =
        button.dataset.submitTask;

    openSubmissionModal(taskName);

});


/* =================================
   BOTONES DE REVISIÓN
================================= */

document.addEventListener("click", event => {

    const button =
        event.target.closest("[data-review]");

    if (!button) {
        return;
    }

    const student =
        button.dataset.student;

    const task =
        button.dataset.review;

    reviewSubmission(student, task);

});


/* =================================
   ESC PARA CERRAR MODAL
================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeSubmissionModal();
    }

});
