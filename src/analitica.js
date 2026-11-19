const valorVenta = (venta) => venta.cantidad * venta.precio;

function totalVendido(ventas) {
    let total = 0;
    for (const v of ventas) total += valorVenta(v);
    return total;
}

function unidadesVendidas(ventas) {
    let unidades = 0;
    for (const v of ventas) unidades += v.cantidad;
    return unidades;
}

function ventaMayor(ventas) {
    if (ventas.length === 0) return null;
    let mayor = ventas[0];
    for (const v of ventas) {
        if (valorVenta(v) > valorVenta(mayor)) mayor = v;
    }
    return mayor;
}

function ticketPromedio(ventas) {
    let total = 0;
    let validas = 0;
    for (const v of ventas) {
        if (v.cantidad > 0) {
            total += valorVenta(v);
            validas++;
        }
    }
    return validas === 0 ? 0 : total / validas;
}

function ventasPorCiudad(ventas, ciudad) {
    const buscada = ciudad.trim().toLowerCase();
    let total = 0;
    for (const v of ventas) {
        if (v.ciudad.trim().toLowerCase() === buscada) total += valorVenta(v);
    }
    return total;
}

const totalVendidoM = (ventas) =>
    ventas.reduce((acc, v) => acc + valorVenta(v), 0);

const unidadesVendidasM = (ventas) =>
    ventas.map((v) => v.cantidad).reduce((acc, c) => acc + c, 0);

const ventasPorCiudadM = (ventas, ciudad) => {
    const buscada = ciudad.trim().toLowerCase();
    return ventas
        .filter((v) => v.ciudad.trim().toLowerCase() === buscada)
        .map(valorVenta)
        .reduce((acc, valor) => acc + valor, 0);
};

function totalPorCiudad(ventas) {
    return ventas.reduce((grupos, v) => {
        const clave = v.ciudad.trim().toLowerCase();
        grupos[clave] = (grupos[clave] || 0) + valorVenta(v);
        return grupos;
    }, {});
}

function unidadesPorProducto(ventas) {
    return ventas.reduce((grupos, v) => {
        const clave = v.producto.trim();
        grupos[clave] = (grupos[clave] || 0) + v.cantidad;
        return grupos;
    }, {});
}

function topProductosPorValor(ventas, k) {
    const totales = ventas.reduce((grupos, v) => {
        const clave = v.producto.trim();
        grupos[clave] = (grupos[clave] || 0) + valorVenta(v);
        return grupos;
    }, {});

    return [...Object.entries(totales)]
        .sort((a, b) => b[1] - a[1])
        .slice(0, k)
        .map(([producto]) => producto);
}

module.exports = {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
};

if (require.main === module) {
    const ventas = require("./datos"); // dentro del bloque: sin variables globales

    const muestra = ventas;
    const uno = [muestra[0]];
    const vacio = [];

    const casos = { "completo": muestra, "un elemento": uno, "vacío": vacio };
    for (const [nombre, datos] of Object.entries(casos)) {
        console.log(`\n--- ${nombre} ---`);
        console.log("totalVendido:    ", totalVendido(datos));
        console.log("unidadesVendidas:", unidadesVendidas(datos));
        console.log("ventaMayor:      ", ventaMayor(datos));
        console.log("ticketPromedio:  ", ticketPromedio(datos));
        console.log("ventasPorCiudad: ", ventasPorCiudad(datos, "Medellín"));
    }

    console.log("\n--- Agrupaciones y ranking ---");
    console.log(totalPorCiudad(ventas));
    console.log(unidadesPorProducto(ventas));
    console.log(topProductosPorValor(ventas, 3));
    console.log("primer id:", ventas[0].id); // debe seguir siendo 1
}