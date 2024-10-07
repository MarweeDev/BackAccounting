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
        sum(pr.precio * odd.cantidad) as total,
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
        inner join detalleorden odd on od.codigo = odd.codigo_orden
        inner join producto pr on odd.id_producto = pr.id
      WHERE
        (od.id_estadoorden = ? OR ? = 0) AND
        TO_CHAR(od.fecha_creacion, 'YYYY-MM-DD') BETWEEN ? AND TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD')
      group by od.codigo, es.nombre, us.usuario, cl.nombre, od.fecha_creacion
      order by od.fecha_creacion desc;
      `,
      GetOrderFindExport:
      `
      select
        od.codigo as Consecutivo,
        cl.nit as Identificacion_tercero,
        cl.nombre as Nombre_o_razon_social,
        cl.correo as Correo_electronico,
        su.nit as Identificacion_vendedor,
        pr.referencia as Codigo_producto,
        pr.nombre as Descripcion_producto,
        odd.cantidad as Cantidad_producto,
        pr.precio as Valor_unitario,
        sum(pr.precio * odd.cantidad) as Valor_forma_de_pago,
        ti.referencia as Codigo_forma_de_pago,
        ti.nombre as Descripcion_forma_de_pago,
        TO_CHAR(od.fecha_creacion, 'DD-MM-YYYY HH24:MI:SS') as Fecha_de_elaboracion
      from orden od
      inner join cliente cl on od.id_client = cl.id
      inner join detalleorden odd on od.codigo = odd.codigo_orden
      inner join producto pr on odd.id_producto = pr.id
      inner join usuarios us on od.id_usuario = us.id
      inner join suscritos su on us.id_suscrito = su.id
      inner join tipopago ti on od.id_tipopago = ti.id
      where
        TO_CHAR(od.fecha_creacion, 'YYYY-MM-DD') BETWEEN ? AND ?
      GROUP BY 
        od.codigo, 
        cl.nit, 
        cl.nombre, 
        cl.correo, 
        su.nit, 
        pr.referencia, 
        pr.nombre, 
        odd.cantidad, 
        pr.precio, 
        ti.referencia, 
        ti.nombre, 
        od.fecha_creacion;
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
      GetLogin:
      `
      select
        au.token_publico as token
      from usuarios usu
        inner join suscritos sus on usu.id_suscrito = sus.id
        inner join authorizationtoken au on usu.id = au.id_usuario
      where
        (usu.usuario = ? or sus.correo = ?) and usu.contrasena = ?
      `,
      GetInfoUser:
      `
      select
        usu.id as id_usuario,
        usu.usuario,
        r.id as id_rol,
        r.rol,
        m.id as id_modulo,
        m.modulo,
        m.ruta,
        m.icono
      from usuarios usu
        inner join rol r on usu.id_rol = r.id
        inner join rol_modulo rm on r.id = rm.id_rol
        inner join modulo m on rm.id_modulo = m.id
        inner join authorizationtoken au on usu.id = au.id_usuario
      where
        au.token_publico = ?
      order by m.position_module asc
      `
    };
  }
}

module.exports = Constants;