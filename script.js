// Esperar a que el DOM este completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const formOrden = document.getElementById('form-orden');
    const listaCuerpo = document.getElementById('lista-cuerpo');
    const totalOrdenesSpan = document.getElementById('total-ordenes');
    const buscarInput = document.getElementById('buscar');

    let contadorId = 104;

    // 1. Agregar nueva orden a la tabla
    formOrden.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener valores de los campos
        const cliente = document.getElementById('cliente').value;
        const servicio = document.getElementById('servicio').value;
        const cantidad = document.getElementById('cantidad').value;
        const estado = document.getElementById('estado').value;

        // Determinar la clase CSS de la etiqueta segun el estado
        let badgeClass = 'pendiente';
        if (estado === 'En Proceso') badgeClass = 'proceso';
        if (estado === 'Completado') badgeClass = 'completado';

        // Crear la nueva fila HTML
        const nuevaFila = document.createElement('tr');
        nuevaFila.innerHTML = `
            <td>#${contadorId++}</td>
            <td>${cliente}</td>
            <td>${servicio}</td>
            <td>${cantidad}</td>
            <td><span class="badge ${badgeClass}">${estado}</span></td>
            <td><button class="btn-delete" onclick="eliminarFila(this)">Eliminar</button></td>
        `;

        // Agregar fila a la tabla
        listaCuerpo.appendChild(nuevaFila);

        // Limpiar formulario y actualizar total
        formOrden.reset();
        actualizarContador();
    });

    // 2. Filtro de busqueda en tiempo real
    buscarInput.addEventListener('keyup', () => {
        const filtro = buscarInput.value.toLowerCase();
        const filas = listaCuerpo.getElementsByTagName('tr');

        Array.from(filas).forEach((fila) => {
            const textoFila = fila.textContent.toLowerCase();
            if (textoFila.includes(filtro)) {
                fila.style.display = '';
            } else {
                fila.style.display = 'none';
            }
        });
    });
});

// 3. Funcion global para eliminar una fila de la tabla
function eliminarFila(boton) {
    const fila = boton.parentElement.parentElement;
    fila.remove();
    actualizarContador();
}

// 4. Funcion para recalcular el numero total de ordenes
function actualizarContador() {
    const totalFilas = document.querySelectorAll('#lista-cuerpo tr').length;
    document.getElementById('total-ordenes').textContent = totalFilas;
}