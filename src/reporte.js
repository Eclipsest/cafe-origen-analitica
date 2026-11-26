const ventas = require("./datos");
const {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia,
} = require("./analitica");

function mostrarLinea(nombre, valor) {
    console.log(`${nombre.padEnd(32)} ${valor}`);
}

function mostrarPesos(valor) {
    return `$${Math.round(valor).toLocaleString("es-CO")}`;
}

function mostrarResumenDelDia(fecha) {
    const ventasDelDiaElegido = ventasDelDia(ventas, fecha);

    console.log(`\nFecha: ${fecha}`);
    if (ventasDelDiaElegido.length === 0) {
        console.log("  Sin ventas para esta fecha.");
    }

    mostrarLinea("Ventas registradas:", ventasDelDiaElegido.length.toLocaleString("es-CO"));
    mostrarLinea("Total vendido:", mostrarPesos(totalVendido(ventasDelDiaElegido)));
    mostrarLinea("Unidades vendidas:", unidadesVendidas(ventasDelDiaElegido).toLocaleString("es-CO"));
    mostrarLinea("Ticket promedio:", mostrarPesos(ticketPromedio(ventasDelDiaElegido)));
}

console.log("==============================================");
console.log("        REPORTE DE VENTAS - CAFÉ ORIGEN");
console.log("==============================================");

console.log("\nRESUMEN GENERAL");
console.log("----------------------------------------------");
mostrarLinea("Ventas registradas:", ventas.length.toLocaleString("es-CO"));
mostrarLinea("Total vendido:", mostrarPesos(totalVendido(ventas)));
mostrarLinea("Unidades vendidas:", unidadesVendidas(ventas).toLocaleString("es-CO"));
mostrarLinea("Ticket promedio:", mostrarPesos(ticketPromedio(ventas)));

const ventaMasAlta = ventaMayor(ventas);
if (ventaMasAlta !== null) {
    mostrarLinea("Venta de mayor valor:", mostrarPesos(valorVenta(ventaMasAlta)));
}

console.log("\nVENTAS POR CIUDAD");
console.log("----------------------------------------------");
const ventasPorCiudad = totalPorCiudad(ventas);
for (const [ciudad, total] of Object.entries(ventasPorCiudad)) {
    const nombreCiudad = ciudad.charAt(0).toUpperCase() + ciudad.slice(1);
    mostrarLinea(nombreCiudad, mostrarPesos(total));
}

console.log("\nUNIDADES POR PRODUCTO");
console.log("----------------------------------------------");
const productosConUnidades = unidadesPorProducto(ventas);
for (const [producto, unidades] of Object.entries(productosConUnidades)) {
    mostrarLinea(producto, unidades.toLocaleString("es-CO"));
}

console.log("\nTOP 3 DE PRODUCTOS POR VALOR");
console.log("----------------------------------------------");
const topProductos = topProductosPorValor(ventas, 3);
topProductos.forEach((producto, indice) => {
    const totalProducto = ventas
        .filter((v) => v.producto.trim() === producto)
        .reduce((total, v) => total + valorVenta(v), 0);
    mostrarLinea(`${indice + 1}. ${producto}`, mostrarPesos(totalProducto));
});

console.log("\nRESUMEN DE UN DÍA CON VENTAS");
mostrarResumenDelDia("2026-09-01");

console.log("\nRESUMEN DE UN DÍA SIN VENTAS");
mostrarResumenDelDia("2026-09-07");