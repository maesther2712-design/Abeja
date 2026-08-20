document.addEventListener("DOMContentLoaded", () => {

    const escena = document.querySelector("a-scene");
    const modeloAbeja = document.querySelector("#modeloAbeja");
    const statusEl = document.getElementById("status");

    function setStatus(message, isError = false) {
        if (!statusEl) return;
        statusEl.textContent = message;
        statusEl.classList.toggle("error", isError);
    }

    if (!window.isSecureContext) {
        setStatus("Abre la app en http://localhost o https:// para acceder a la cámara.", true);
        console.warn("La cámara solo funciona en contexto seguro (localhost o HTTPS).");
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setStatus("Tu navegador no soporta acceso a la cámara.", true);
        console.error("navigator.mediaDevices.getUserMedia no está disponible.");
    }

    // Esperar a que MindAR esté listo
    escena.addEventListener("arReady", () => {
        console.log("Realidad aumentada iniciada");
        setStatus("Cámara lista. Muestra el objetivo delante de la cámara.");
    });

    // Mostrar mensaje si ocurre algún error
    escena.addEventListener("arError", (event) => {
        console.error("Error al iniciar la realidad aumentada", event);
        setStatus("No se pudo iniciar la cámara. Revisa permisos y que la página esté en localhost/HTTPS.", true);
    });

    if (modeloAbeja) {
        // Confirmar carga del modelo 3D
        modeloAbeja.addEventListener("model-loaded", () => {
            console.log("Modelo 3D de la abeja cargado correctamente");
        });

        modeloAbeja.addEventListener("model-error", (event) => {
            console.error("Error cargando la abeja", event);
        });
    }

});