const areasMedicas = {
      "medicina general": {
        descripcion: "Atención médica básica, diagnósticos comunes y prevención.",
        servicios: ["Consulta médica", "Chequeo general", "Control de presión"],
        examenes: ["Presión arterial", "Glicemia", "Peso y talla"]
      },
      "pediatria": {
        descripcion: "Cuidado integral a niños desde el nacimiento.",
        servicios: ["Controles de crecimiento", "Vacunas", "Tratamiento de infecciones comunes"],
        examenes: ["Peso", "Talla", "Vacunación"]
      },
      "ginecologia": {
        descripcion: "Salud reproductiva de la mujer, control prenatal y atención del parto.",
        servicios: ["Papanicolaou", "Ultrasonido", "Controles prenatales"],
        examenes: ["Exámenes ginecológicos", "Ultrasonido", "Exámenes hormonales"]
      }
    };

    document.addEventListener("DOMContentLoaded", () => {
  // Crear botón para abrir el formulario
  const btnAbrir = document.createElement("button");
  btnAbrir.textContent = "Agendar Cita";
  btnAbrir.style.padding = "10px 20px";
  btnAbrir.style.fontSize = "16px";
  btnAbrir.style.cursor = "pointer";
  btnAbrir.style.border = "none";
  btnAbrir.style.borderRadius = "6px";
  btnAbrir.style.backgroundColor = "#007bff";
  btnAbrir.style.color = "#fff";
  btnAbrir.style.margin = "20px";
  document.body.appendChild(btnAbrir);

  // Crear modal
  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0,0,0,0.5)";
  modal.style.display = "none";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.zIndex = "9999";
  document.body.appendChild(modal);

  // Crear contenido del modal
  const modalContent = document.createElement("div");
  modalContent.style.backgroundColor = "#fff";
  modalContent.style.padding = "25px 30px";
  modalContent.style.borderRadius = "10px";
  modalContent.style.width = "350px";
  modalContent.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";
  modalContent.style.position = "relative";
  modal.appendChild(modalContent);

  // Botón cerrar
  const btnCerrar = document.createElement("span");
  btnCerrar.textContent = "×";
  btnCerrar.style.position = "absolute";
  btnCerrar.style.top = "10px";
  btnCerrar.style.right = "15px";
  btnCerrar.style.fontSize = "28px";
  btnCerrar.style.fontWeight = "bold";
  btnCerrar.style.cursor = "pointer";
  modalContent.appendChild(btnCerrar);

  // Título
  const titulo = document.createElement("h2");
  titulo.textContent = "Agendar Cita Médica";
  titulo.style.marginBottom = "15px";
  titulo.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  modalContent.appendChild(titulo);

  // Crear formulario
  const form = document.createElement("form");
  modalContent.appendChild(form);

  // Función para crear label + input o textarea
  function crearCampo(labelText, tipo, nombre, placeholder, atributos = {}) {
    const label = document.createElement("label");
    label.textContent = labelText;
    label.style.display = "block";
    label.style.marginTop = "12px";
    label.style.fontWeight = "600";
    form.appendChild(label);

    let input;
    if (tipo === "textarea") {
      input = document.createElement("textarea");
      input.rows = 3;
    } else {
      input = document.createElement("input");
      input.type = tipo;
    }
    input.name = nombre;
    input.id = nombre;
    input.placeholder = placeholder;
    input.required = true;
    input.style.width = "100%";
    input.style.padding = "8px 10px";
    input.style.marginTop = "6px";
    input.style.borderRadius = "6px";
    input.style.border = "1px solid #ccc";
    input.style.fontSize = "14px";
    input.style.fontFamily = "inherit";
    input.style.boxSizing = "border-box";
    Object.entries(atributos).forEach(([key, value]) => {
      input.setAttribute(key, value);
    });

    form.appendChild(input);
  }

  const hoy = new Date().toISOString().split("T")[0];

  crearCampo("Nombre completo:", "text", "nombre", "Tu nombre completo");
  crearCampo("Teléfono:", "tel", "telefono", "Tu teléfono", { pattern: "\\d{8,15}", title: "Solo números, 8 a 15 dígitos" });
  crearCampo("Fecha de la cita:", "date", "fecha", "", { min: hoy });
  crearCampo("Hora de la cita:", "time", "hora", "");
  crearCampo("Motivo:", "textarea", "motivo", "Describe el motivo de la cita");

  // Botón enviar
  const btnEnviar = document.createElement("button");
  btnEnviar.type = "submit";
  btnEnviar.textContent = "Enviar";
  btnEnviar.style.marginTop = "20px";
  btnEnviar.style.backgroundColor = "#28a745";
  btnEnviar.style.color = "white";
  btnEnviar.style.border = "none";
  btnEnviar.style.padding = "12px";
  btnEnviar.style.borderRadius = "6px";
  btnEnviar.style.fontWeight = "700";
  btnEnviar.style.cursor = "pointer";
  btnEnviar.style.width = "100%";
  btnEnviar.style.fontSize = "16px";
  btnEnviar.style.transition = "background-color 0.3s ease";
  btnEnviar.onmouseover = () => (btnEnviar.style.backgroundColor = "#1e7e34");
  btnEnviar.onmouseout = () => (btnEnviar.style.backgroundColor = "#28a745");
  form.appendChild(btnEnviar);

  // Mensaje de estado
  const mensaje = document.createElement("div");
  mensaje.style.marginTop = "15px";
  mensaje.style.fontWeight = "600";
  mensaje.style.textAlign = "center";
  modalContent.appendChild(mensaje);

  // Eventos
  btnAbrir.onclick = () => {
    modal.style.display = "flex";
    mensaje.textContent = "";
    form.reset();
  };

  btnCerrar.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const telefono = form.telefono.value.trim();
    const fecha = form.fecha.value;
    const hora = form.hora.value;
    const motivo = form.motivo.value.trim();

    if (!nombre || !telefono || !fecha || !hora || !motivo) {
      mensaje.style.color = "red";
      mensaje.textContent = "Por favor, completa todos los campos.";
      return;
    }

    if (!/^\d{8,15}$/.test(telefono)) {
      mensaje.style.color = "red";
      mensaje.textContent = "El teléfono debe tener entre 8 y 15 dígitos numéricos.";
      return;
    }

    mensaje.style.color = "#28a745";
    mensaje.textContent = "¡Cita agendada exitosamente!";

    setTimeout(() => {
      modal.style.display = "none";
    }, 2500);
  });
});


    function buscarArea() {
      const input = document.getElementById("input-busqueda").value.trim().toLowerCase();
      const resultado = document.getElementById("resultado-busqueda");
      const area = areasMedicas[input];

      if (area) {
        resultado.innerHTML = `
          <h3>${input.charAt(0).toUpperCase() + input.slice(1)}</h3>
          <p><strong>Descripción:</strong> ${area.descripcion}</p>
          <p><strong>Servicios:</strong></p>
          <ul>${area.servicios.map(s => `<li>${s}</li>`).join('')}</ul>
          <p><strong>Exámenes:</strong></p>
          <ul>${area.examenes.map(e => `<li>${e}</li>`).join('')}</ul>
        `;
      } else {
        resultado.innerHTML = `<p style="color:red;">Área no encontrada. Intenta con otro nombre.</p>`;
      }
    }

    document.getElementById('formulario')?.addEventListener('submit', function(e) {
      e.preventDefault();
      document.getElementById('confirmacion').style.display = 'block';
      this.reset();
    });

    function toggleMenu() {
    const menu = document.getElementById('menuHospitales');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
  }





  // Script exclusivo del menú hamburguesa TUCIAPI
document.getElementById('hamb-menu-toggle').addEventListener('click', function () {
  document.getElementById('hamb-nav-menu').classList.toggle('active');
});


// ...existing code...
document.addEventListener('DOMContentLoaded', function() {
  // Diccionario de especialidades
  const especialidades = {
    'Nefrologia': 'Salud y tratamiento de los riñones.',
    'Dermatologia': 'Salud y tratamiento de problemas de piel, cabello y uñas.',
    'Psicologia': 'Salud mental y emocional.',
    'Nutricion': 'Tratamiento para una vida saludable.',
    'Oftalmologia': 'Tratamientos y cirugías oftalmológicas.',
    'Endocrinologia': 'Trastornos hormonales y glándulas endocrinas.',
    'Neurologia': 'Tratamiento de enfermedades cerebrales.',
    'Geriatria': 'Prevención y tratamiento para adultos mayores.'
  };

  // Evento para cada botón Info
  document.querySelectorAll('.card').forEach(card => {
    const btn = card.querySelector('button');
    const tooltip = card.querySelector('.card-tooltip');
    const title = card.querySelector('h3')?.textContent.trim();

    btn?.addEventListener('click', function(e) {
      // Cierra todos los tooltips antes de abrir el actual
      document.querySelectorAll('.card-tooltip').forEach(t => t.classList.remove('active'));
      // Muestra el tooltip de esta tarjeta
      tooltip.textContent = especialidades[title] || 'Información no disponible.';
      tooltip.classList.add('active');
      // Evita que el click se propague y cierre el tooltip inmediatamente
      e.stopPropagation();
    });

    // Evita que el tooltip se cierre si se hace clic dentro de él
    tooltip.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });

  // Cierra el tooltip si se hace clic fuera de cualquier tarjeta
  document.addEventListener('click', function() {
    document.querySelectorAll('.card-tooltip').forEach(t => t.classList.remove('active'));
  });
});
// ...existing code...

// ...MENU HAMBURGUESA...
document.getElementById('hamb-menu-toggle').addEventListener('click', function () {
  document.getElementById('hamb-nav-menu').classList.toggle('active');
});
