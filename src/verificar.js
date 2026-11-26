const ventas = require("./datos.js");
const a = require("./analitica");

function verificar(nombre, condicion) {
    console.log(`${nombre}: ${condicion ? "OK" : "DIFERENTE"}`);
    if (!condicion) process.exitCode = 1;
}

function comparar(nombre, conCiclo, conMetodos) {
    verificar(
        `${nombre} (ciclo=${conCiclo}, métodos=${conMetodos})`,
        conCiclo === conMetodos
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
verificar("Orden original intacto", idsAntes === idsDespues);

const ventasBogota = [
    { ciudad: "Bogotá", cantidad: 1, precio: 1000 },
    { ciudad: "Bogotá ", cantidad: 2, precio: 1000 },
];
const bogotaAgrupada = a.totalPorCiudad(ventasBogota);
verificar(
    "Bogotá y Bogotá con espacio quedan en un grupo",
    Object.keys(bogotaAgrupada).length === 1 && bogotaAgrupada.bogotá === 3000
);

const diaConVentas = a.ventasDelDia(ventas, "2026-09-01");
verificar("ventasDelDia encuentra ventas", diaConVentas.length === 2);

const diaSinVentas = a.ventasDelDia(ventas, "2026-09-07");
verificar(
    "ticketPromedio de un día sin ventas es 0, no NaN",
    diaSinVentas.length === 0 &&
        a.ticketPromedio(diaSinVentas) === 0 &&
        !Number.isNaN(a.ticketPromedio(diaSinVentas))
);