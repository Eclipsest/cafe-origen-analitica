## Diccionario de datos

* **id**: `Number` — Identificador único de cada registro de venta.
* **cliente**: `String` — Código o identificador del cliente (ej. "C01", "C02").
* **producto**: `String` — Nombre, variedad, origen y presentación del producto o accesorio.
* **ciudad**: `String` — Ciudad de destino o ubicación de la transacción.
* **cantidad**: `Number` — Número de unidades del producto adquiridas.
* **precio**: `Number` — Valor monetario unitario o total del producto en pesos colombianos.[cite: 1]

## Casos borde detectados

* **Inconsistencia de formato en ciudades (mayúsculas y espacios sobrantes):**
  * **Decisión:** Quitar espacios al inicio y al final, y convertir los nombres a minúsculas antes de comparar o agrupar. Así, `"Bogotá"` y `"Bogotá "` quedan en el mismo grupo. Esta normalización no corrige diferencias de ortografía ni agrega tildes.

* **Repetición de códigos de cliente (`C01`, `C02`, `C03`):**
  * **Decisión:** Mantener los registros porque un mismo cliente puede realizar múltiples compras en distintos momentos (no es un error de clave primaria, ya que cada venta tiene su propio `id`). Se utilizará este campo para agrupar compras y calcular la frecuencia o el valor total por cliente.

* **Registro con cantidad en cero (`id: 8`, `cantidad: 0`):**
  * **Decisión:** Excluir el registro del cálculo de ingresos y unidades vendidas (o filtrarlo como venta nula/cancelada), ya que una transacción de 0 unidades no representa una venta efectiva y distorsionaría el promedio de ventas.

## Verificación manual (Tablas de traza)

### 1. Traza para totalVendido

| Venta (id) | Operación (Cantidad por Precio) | Total acumulado |
| :--- | :--- | :--- |
| Inicio | Sin operaciones previas | 0 |
| 1 | 2 por 42000 | 84000 |
| 2 | 1 por 26000 | 110000 |
| 3 | 1 por 95000 | 205000 |

* **Resultado manual:** 205000 (con los primeros 3 registros).
* **Resultado del programa:** Coincide exactamente.

---

### 2. Traza para ticketPromedio

| Venta (id) | Es cantidad mayor a 0? | Total acumulado | Ventas válidas |
| :--- | :---: | :--- | :---: |
| Inicio | Sin evaluar | 0 | 0 |
| 1 | Sí | 84000 | 1 |
| 2 | Sí | 110000 | 2 |
| 3 | Sí | 205000 | 3 |

* **Cálculo final:** 205000 dividido entre 3, que da 68333.
* **Resultado del programa:** Coincide exactamente.

### 3. Pseudocodigo

Función unidadesVendidas(ventas):
    inicializar unidades en 0
    Para cada venta v en ventas:
        unidades = unidades + v.cantidad
    Fin Para
    Retornar unidades
Fin Función
## ----- ##
Función ventaMayor(ventas):
    Si ventas está vacío (longitud == 0):
        Retornar nulo (null)

    asignar ventas[0] a la variable 'mayor'
    Para cada venta v en ventas:
        Si (v.cantidad * v.precio) > (mayor.cantidad * mayor.precio):
            mayor = v
        Fin Si
    Fin Para
    Retornar mayor
Fin Función
## ----- ##
Función ticketPromedio(ventas):
    inicializar total en 0
    inicializar validas en 0
    Para cada venta v en ventas:
        Si v.cantidad > 0:
            total = total + (v.cantidad * v.precio)
            validas = validas + 1
        Fin Si
    Fin Para
    Si validas == 0:
        Retornar 0
    Sino:
        Retornar total / validas
    Fin Si
Fin Función
## ----- ##
Función ventasPorCiudad(ventas, ciudadBuscada):
    convertir ciudadBuscada a minúsculas y quitar espacios sobrantes
    inicializar total en 0
    Para cada venta v en ventas:
        convertir v.ciudad a minúsculas y quitar espacios sobrantes
        Si la ciudad de v coincide con la ciudadBuscada:
            total = total + (v.cantidad * v.precio)
        Fin Si
    Fin Para
    Retornar total
Fin Función

## Preguntas de la sesión: métodos de arreglo y agrupaciones

### 1. totalVendidoM

* **¿Qué recorro?** Recorro todas las ventas con `reduce`.
* **¿Qué filtro?** No filtro ventas.
* **¿Qué transformo?** Cada venta se transforma en su valor: cantidad por precio.
* **¿Qué acumulo?** Acumulo el valor de cada venta en el total.
* **¿Cómo agrupo?** No agrupo; calculo un único total general.

### 2. unidadesVendidasM

* **¿Qué recorro?** Recorro todas las ventas con `map` y luego sus cantidades con `reduce`.
* **¿Qué filtro?** No filtro ventas.
* **¿Qué transformo?** Transformo cada venta en su cantidad.
* **¿Qué acumulo?** Sumo las cantidades para obtener las unidades vendidas.
* **¿Cómo agrupo?** No agrupo; calculo un único total de unidades.

### 3. ventasPorCiudadM

* **¿Qué recorro?** Recorro las ventas para buscar las de la ciudad indicada.
* **¿Qué filtro?** Con `filter`, dejo solo las ventas cuya ciudad coincide con la ciudad buscada, después de quitar espacios sobrantes y convertir ambas a minúsculas.
* **¿Qué transformo?** Transformo cada venta que pasó el filtro en su valor: cantidad por precio.
* **¿Qué acumulo?** Sumo los valores de las ventas filtradas.
* **¿Cómo agrupo?** No creo grupos; calculo el total de una ciudad específica.

### 4. totalPorCiudad(ventas)

* **¿Qué recorro?** Recorro todas las ventas con `reduce`.
* **¿Qué filtro?** No filtro ventas.
* **¿Qué transformo?** Normalizo la ciudad quitando espacios sobrantes y convirtiéndola a minúsculas; también calculo el valor de cada venta.
* **¿Qué acumulo?** Sumo el valor de la venta en el total que ya corresponde a su ciudad.
* **¿Cómo agrupo?** Uso la ciudad normalizada como clave de un objeto. Las ventas con la misma clave quedan en el mismo grupo.

### 5. unidadesPorProducto(ventas)

* **¿Qué recorro?** Recorro todas las ventas con `reduce`.
* **¿Qué filtro?** No filtro ventas.
* **¿Qué transformo?** Quito espacios sobrantes del nombre del producto para usarlo como clave y tomo la cantidad de la venta.
* **¿Qué acumulo?** Sumo las cantidades de cada producto.
* **¿Cómo agrupo?** Uso el nombre del producto como clave de un objeto y acumulo allí sus unidades.

### 6. topProductosPorValor(ventas, k)

* **¿Qué recorro?** Recorro todas las ventas con `reduce` y luego las entradas de los totales por producto para ordenarlas.
* **¿Qué filtro?** No filtro ventas al calcular los totales; después de ordenar, selecciono los primeros `k` productos con `slice`.
* **¿Qué transformo?** Normalizo el nombre quitando espacios sobrantes y calculo el valor de cada venta (cantidad por precio). Al final, devuelvo los nombres de los productos seleccionados.
* **¿Qué acumulo?** Sumo el valor generado por cada producto.
* **¿Cómo agrupo?** Agrupo por nombre de producto en un objeto. Para ordenar, creo una copia de sus entradas, así no modifico el arreglo original de ventas.

## Depuración de errores reportados

### 1. Bogotá aparece dos veces

* **Síntoma:** La ciudad Bogotá puede aparecer como dos grupos si algunas ventas tienen espacios sobrantes.
* **Entrada que lo produce:** Dos ventas, una con `ciudad: "Bogotá"` y otra con `ciudad: "Bogotá "`.
* **Hipótesis:** Si se usa el texto original como clave, los espacios hacen que los nombres sean diferentes.
* **Prueba realizada:** Se pasaron esas dos ventas a `totalPorCiudad` y se comprobó que devuelve un solo grupo (`bogotá`) con el total de ambas ventas. La prueba está en `src/verificar.js`.
* **Causa:** Agrupar usando el nombre de ciudad sin limpiarlo separa `"Bogotá"` de `"Bogotá "`.
* **Corrección:** `totalPorCiudad` aplica `trim()` y `toLowerCase()` antes de usar la ciudad como clave.

### 2. El ticket promedio da NaN en un día sin ventas

* **Síntoma:** Al calcular el promedio de un día sin ventas puede aparecer `NaN`.
* **Entrada que lo produce:** Un arreglo vacío, como el resultado de buscar ventas para la fecha `"2026-09-07"`.
* **Hipótesis:** Si se divide el total entre la cantidad de ventas sin revisar que haya ventas, se calcula `0 / 0`, que da `NaN`.
* **Prueba realizada:** `src/verificar.js` busca las ventas del `"2026-09-07"` y comprueba que `ticketPromedio` devuelve `0`, no `NaN`.
* **Causa:** No hay ventas válidas para usar como divisor.
* **Corrección:** `ticketPromedio` devuelve `0` cuando no encuentra ventas válidas; solo divide cuando el contador es mayor que cero.