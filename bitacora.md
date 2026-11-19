## Diccionario de datos

* **id**: `Number` — Identificador único de cada registro de venta.
* **cliente**: `String` — Código o identificador del cliente (ej. "C01", "C02").
* **producto**: `String` — Nombre, variedad, origen y presentación del producto o accesorio.
* **ciudad**: `String` — Ciudad de destino o ubicación de la transacción.
* **cantidad**: `Number` — Número de unidades del producto adquiridas.
* **precio**: `Number` — Valor monetario unitario o total del producto en pesos colombianos.[cite: 1]

## Casos borde detectados

* **Inconsistencia de formato en ciudades (`Medellín` en minúscula y/o sin tilde):**
  * **Decisión:** Normalizar todos los nombres de ciudades aplicando formato título (primera letra en mayúscula) y ortografía correcta (ej. `"medellin"` $\rightarrow$ `"Medellín"`), asegurando que las agrupaciones o filtros por ciudad no las cuenten como ubicaciones distintas.

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