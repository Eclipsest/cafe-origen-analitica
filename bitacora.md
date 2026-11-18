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