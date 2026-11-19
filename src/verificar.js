const ventas = require("./datos.js");
const a = require("./analitica");

function comparar(nombre, conCiclo, conMetodos) {
    console.log(
        `${nombre}: ${conCiclo === conMetodos ? "OK" : "DIFERENTE"}`,
        `(ciclo=${conCiclo}, métodos=${conMetodos})`
    );
}

const casos = {
    "completo": ventas,
    "un elemento": [ventas[0]],
    "vacío": [],
};

for (const [nombre, datos] of Object.entries(casos)) {
    console.log(`\n--- ${nombre} ---`);
    comparar("totalVendido", a.totalVendido(datos), a.totalVendidoM(datos));
    comparar("unidadesVendidas", a.unidadesVendidas(datos), a.unidadesVendidasM(datos));
    comparar("ventasPorCiudad", a.ventasPorCiudad(datos, "Medellín"), a.ventasPorCiudadM(datos, "Medellín"));
}

const idsAntes = ventas.map((v) => v.id).join(",");
a.topProductosPorValor(ventas, 3);
a.totalPorCiudad(ventas);
a.unidadesPorProducto(ventas);
const idsDespues = ventas.map((v) => v.id).join(",");
console.log("\nOrden original intacto:", idsAntes === idsDespues ? "OK" : "DIFERENTE");