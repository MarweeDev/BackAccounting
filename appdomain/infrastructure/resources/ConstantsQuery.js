class Constants {
  static get ServicesMethod() {
    return {
      GetMesaKeyOrder: 
      `
      SELECT
        ms.id, 
        ms.numero, 
        ms.nombre, 
        ms.capacidad, 
        ms.id_estado,
        ms.estado_mesa
      FROM
        mesa ms
        LEFT JOIN orden od ON ms.id = od.id_mesa
          AND od.fecha = (
            SELECT MAX(fecha) FROM orden od_inner WHERE od_inner.id_mesa = ms.id
          )
      WHERE
        (ms.id_estado = 1 AND ms.estado_mesa = 4)
        AND (od.id_estadoorden IS NULL OR od.id_estadoorden != 7)
      GROUP BY
        ms.id
      `,
      GetOrderAll: 
      `
      SELECT
        sum(od.cantidad) as cantidad,
        od.codigo,
        es.nombre,
        us.usuario,
		    cl.nombre as cliente,
        TO_CHAR(od.fecha, 'DD-MM-YYYY HH24:MI:SS') AS fecha
      FROM 
        orden od
        inner join estado es on od.id_estadoorden = es.id
        inner join usuarios us on od.id_usuario = us.id
		    inner join cliente cl on od.id_client = cl.id
      group by od.codigo, es.nombre, us.usuario, cl.nombre, od.fecha
      order by od.fecha desc;
      `,
      GetOrderFind:
      `
      SELECT
		    (select sum(cantidad) from detalleorden where codigo_orden = od.codigo) as cantidad,
        od.codigo,
        es.nombre,
        us.usuario,
        cl.nombre as cliente,
        TO_CHAR(od.fecha_creacion, 'DD-MM-YYYY HH24:MI:SS') AS fecha
      FROM 
        orden od
        inner join estado es on od.id_estadoorden = es.id
        inner join usuarios us on od.id_usuario = us.id
        inner join cliente cl on od.id_client = cl.id
      WHERE
        od.id_estadoorden = ? AND
        TO_CHAR(od.fecha_creacion, 'YYYY-MM-DD') BETWEEN ? AND TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD')
      group by od.codigo, es.nombre, us.usuario, cl.nombre, od.fecha_creacion
      order by od.fecha_creacion desc;
      `,
      GetOrderID: 
      `
      SELECT
        od.codigo,
        es.nombre as estado,
        us.usuario,
        pr.nombre as producto,
        pr.precio,
        odd.cantidad,
        cp.nombre as categoria,
        cl.nombre as cliente,
        TO_CHAR(od.fecha_creacion, 'DD-MM-YYYY HH24:MI:SS') AS fecha
      FROM 
        orden od
        inner join estado es on od.id_estadoorden = es.id
        inner join usuarios us on od.id_usuario = us.id
		    inner join cliente cl on od.id_client = cl.id
		    inner join detalleorden odd on od.codigo = odd.codigo_orden
        inner join producto pr on odd.id_producto = pr.id
        inner join categoriaproducto cp on pr.id_categoria = cp.id
      where od.codigo = ? order by od.fecha_creacion desc;
      `,
    };
  }
}

module.exports = Constants;