--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: auditoria_evento; Type: TABLE; Schema: public; Owner: UsersDev
--

CREATE TABLE public.auditoria_evento (
    id integer NOT NULL,
    id_usuario integer,
    id_suscrito integer,
    id_modulo integer,
    entidad character varying(120) NOT NULL,
    id_entidad character varying(80),
    accion character varying(60) NOT NULL,
    descripcion text,
    valor_anterior jsonb,
    valor_nuevo jsonb,
    ip character varying(80),
    user_agent text,
    id_estado integer DEFAULT 1 NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.auditoria_evento OWNER TO "UsersDev";

--
-- Name: auditoria_evento_id_seq; Type: SEQUENCE; Schema: public; Owner: UsersDev
--

CREATE SEQUENCE public.auditoria_evento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.auditoria_evento_id_seq OWNER TO "UsersDev";

--
-- Name: auditoria_evento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: UsersDev
--

ALTER SEQUENCE public.auditoria_evento_id_seq OWNED BY public.auditoria_evento.id;


--
-- Name: authorizationtoken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.authorizationtoken (
    token_privado character varying NOT NULL,
    token_publico character varying NOT NULL,
    id_usuario integer NOT NULL,
    id_estado integer NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_actualizacion timestamp without time zone
);


ALTER TABLE public.authorizationtoken OWNER TO postgres;

--
-- Name: categoriaproducto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categoriaproducto (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    descripcion text,
    id_estado integer NOT NULL
);


ALTER TABLE public.categoriaproducto OWNER TO postgres;

--
-- Name: categoriaproducto_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categoriaproducto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categoriaproducto_id_seq OWNER TO postgres;

--
-- Name: categoriaproducto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categoriaproducto_id_seq OWNED BY public.categoriaproducto.id;


--
-- Name: cliente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cliente (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    id_estado integer,
    nit character varying(50),
    correo character varying(100)
);


ALTER TABLE public.cliente OWNER TO postgres;

--
-- Name: cliente_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cliente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cliente_id_seq OWNER TO postgres;

--
-- Name: cliente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cliente_id_seq OWNED BY public.cliente.id;


--
-- Name: colaborador; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.colaborador (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    cargo character varying NOT NULL,
    id_estado integer NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_actualizacion timestamp without time zone,
    cedula integer DEFAULT 1024563320 NOT NULL
);


ALTER TABLE public.colaborador OWNER TO postgres;

--
-- Name: COLUMN colaborador.cedula; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.colaborador.cedula IS '1024563320';


--
-- Name: colaborador_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.colaborador_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.colaborador_id_seq OWNER TO postgres;

--
-- Name: colaborador_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.colaborador_id_seq OWNED BY public.colaborador.id;


--
-- Name: componente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.componente (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    descripcion text,
    ruta character varying,
    id_modulo integer NOT NULL,
    id_estado integer NOT NULL
);


ALTER TABLE public.componente OWNER TO postgres;

--
-- Name: componente_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.componente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.componente_id_seq OWNER TO postgres;

--
-- Name: componente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.componente_id_seq OWNED BY public.componente.id;


--
-- Name: compras; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.compras (
    id integer NOT NULL,
    codigo character varying NOT NULL,
    total_compra integer NOT NULL,
    id_proveedor integer NOT NULL,
    id_estado integer NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.compras OWNER TO postgres;

--
-- Name: compras_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.compras_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.compras_id_seq OWNER TO postgres;

--
-- Name: compras_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.compras_id_seq OWNED BY public.compras.id;


--
-- Name: detallecompra; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detallecompra (
    id integer NOT NULL,
    id_compra integer NOT NULL,
    id_producto integer NOT NULL,
    cantidad integer NOT NULL,
    valor_unitario integer NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.detallecompra OWNER TO postgres;

--
-- Name: detallecompra_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detallecompra_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detallecompra_id_seq OWNER TO postgres;

--
-- Name: detallecompra_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detallecompra_id_seq OWNED BY public.detallecompra.id;


--
-- Name: detalleorden; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalleorden (
    id integer NOT NULL,
    codigo_orden character varying NOT NULL,
    id_producto integer NOT NULL,
    cantidad integer NOT NULL
);


ALTER TABLE public.detalleorden OWNER TO postgres;

--
-- Name: detalleorden_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalleorden_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detalleorden_id_seq OWNER TO postgres;

--
-- Name: detalleorden_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalleorden_id_seq OWNED BY public.detalleorden.id;


--
-- Name: estado; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estado (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    descripcion text,
    codigogrupo character varying NOT NULL,
    estado character varying NOT NULL
);


ALTER TABLE public.estado OWNER TO postgres;

--
-- Name: estado_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.estado_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.estado_id_seq OWNER TO postgres;

--
-- Name: estado_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estado_id_seq OWNED BY public.estado.id;


--
-- Name: mesa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mesa (
    id integer NOT NULL,
    numero integer NOT NULL,
    nombre character varying,
    capacidad integer NOT NULL,
    id_estado integer NOT NULL,
    estado_mesa integer NOT NULL
);


ALTER TABLE public.mesa OWNER TO postgres;

--
-- Name: mesa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mesa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mesa_id_seq OWNER TO postgres;

--
-- Name: mesa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mesa_id_seq OWNED BY public.mesa.id;


--
-- Name: modulo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modulo (
    id integer NOT NULL,
    modulo character varying NOT NULL,
    descripcion text,
    ruta character varying,
    id_estado integer NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_actualizacion timestamp without time zone,
    icono character varying,
    position_module integer
);


ALTER TABLE public.modulo OWNER TO postgres;

--
-- Name: modulo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.modulo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.modulo_id_seq OWNER TO postgres;

--
-- Name: modulo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.modulo_id_seq OWNED BY public.modulo.id;


--
-- Name: orden; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orden (
    id integer NOT NULL,
    codigo character varying NOT NULL,
    id_usuario integer NOT NULL,
    id_client integer NOT NULL,
    id_tipopago integer,
    id_subtipopago integer,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id_estadoorden integer NOT NULL,
    observacion character varying(4000)
);


ALTER TABLE public.orden OWNER TO postgres;

--
-- Name: orden_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orden_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orden_id_seq OWNER TO postgres;

--
-- Name: orden_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orden_id_seq OWNED BY public.orden.id;


--
-- Name: paises; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.paises (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    id_estado integer NOT NULL
);


ALTER TABLE public.paises OWNER TO postgres;

--
-- Name: paises_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.paises_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.paises_id_seq OWNER TO postgres;

--
-- Name: paises_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.paises_id_seq OWNED BY public.paises.id;


--
-- Name: parametro_suscrito; Type: TABLE; Schema: public; Owner: UsersDev
--

CREATE TABLE public.parametro_suscrito (
    id integer NOT NULL,
    id_suscrito integer NOT NULL,
    grupo character varying(80) NOT NULL,
    clave character varying(120) NOT NULL,
    valor text,
    tipo_dato character varying(30) DEFAULT 'texto'::character varying NOT NULL,
    descripcion text,
    id_estado integer DEFAULT 1 NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_actualizacion timestamp without time zone
);


ALTER TABLE public.parametro_suscrito OWNER TO "UsersDev";

--
-- Name: parametro_suscrito_id_seq; Type: SEQUENCE; Schema: public; Owner: UsersDev
--

CREATE SEQUENCE public.parametro_suscrito_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.parametro_suscrito_id_seq OWNER TO "UsersDev";

--
-- Name: parametro_suscrito_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: UsersDev
--

ALTER SEQUENCE public.parametro_suscrito_id_seq OWNED BY public.parametro_suscrito.id;


--
-- Name: payment_method_config; Type: TABLE; Schema: public; Owner: UsersDev
--

CREATE TABLE public.payment_method_config (
    id integer NOT NULL,
    id_suscrito integer NOT NULL,
    id_caja integer,
    name character varying(120) NOT NULL,
    method_type character varying(60) NOT NULL,
    icon character varying(120),
    color character varying(40),
    priority integer DEFAULT 99 NOT NULL,
    requires_reference boolean DEFAULT false NOT NULL,
    requires_confirmation boolean DEFAULT false NOT NULL,
    allows_qr boolean DEFAULT false NOT NULL,
    account_label character varying(120),
    account_value character varying(255),
    qr_value text,
    instructions text,
    id_tipopago_legacy integer,
    id_subtipopago_legacy integer,
    auto_print_after_payment boolean DEFAULT false NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    id_estado integer DEFAULT 1 NOT NULL,
    fecha_creacion timestamp with time zone NOT NULL,
    fecha_actualizacion timestamp with time zone
);


ALTER TABLE public.payment_method_config OWNER TO "UsersDev";

--
-- Name: payment_method_config_id_seq; Type: SEQUENCE; Schema: public; Owner: UsersDev
--

CREATE SEQUENCE public.payment_method_config_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payment_method_config_id_seq OWNER TO "UsersDev";

--
-- Name: payment_method_config_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: UsersDev
--

ALTER SEQUENCE public.payment_method_config_id_seq OWNED BY public.payment_method_config.id;


--
-- Name: payment_transaction_detail; Type: TABLE; Schema: public; Owner: UsersDev
--

CREATE TABLE public.payment_transaction_detail (
    id integer NOT NULL,
    id_suscrito integer NOT NULL,
    id_order integer,
    codigo_orden character varying(80) NOT NULL,
    id_payment_method_config integer,
    method_name character varying(120) NOT NULL,
    method_type character varying(60) NOT NULL,
    reference character varying(180),
    account_value character varying(255),
    confirmation_status character varying(40) DEFAULT 'confirmed'::character varying NOT NULL,
    amount numeric(14,2),
    payload jsonb,
    id_usuario integer,
    id_estado integer DEFAULT 1 NOT NULL,
    fecha_creacion timestamp with time zone NOT NULL
);


ALTER TABLE public.payment_transaction_detail OWNER TO "UsersDev";

--
-- Name: payment_transaction_detail_id_seq; Type: SEQUENCE; Schema: public; Owner: UsersDev
--

CREATE SEQUENCE public.payment_transaction_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payment_transaction_detail_id_seq OWNER TO "UsersDev";

--
-- Name: payment_transaction_detail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: UsersDev
--

ALTER SEQUENCE public.payment_transaction_detail_id_seq OWNED BY public.payment_transaction_detail.id;


--
-- Name: peripheral_config; Type: TABLE; Schema: public; Owner: UsersDev
--

CREATE TABLE public.peripheral_config (
    id integer NOT NULL,
    id_suscrito integer NOT NULL,
    id_caja integer,
    modo character varying(40) DEFAULT 'local-agent'::character varying NOT NULL,
    agent_url character varying(255),
    printer_name character varying(120),
    printer_type character varying(60),
    payment_terminal_enabled boolean DEFAULT false NOT NULL,
    payment_provider character varying(80),
    auto_print_after_payment boolean DEFAULT false NOT NULL,
    print_copies integer DEFAULT 1 NOT NULL,
    id_estado integer DEFAULT 1 NOT NULL,
    fecha_creacion timestamp with time zone NOT NULL,
    fecha_actualizacion timestamp with time zone
);


ALTER TABLE public.peripheral_config OWNER TO "UsersDev";

--
-- Name: peripheral_config_id_seq; Type: SEQUENCE; Schema: public; Owner: UsersDev
--

CREATE SEQUENCE public.peripheral_config_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.peripheral_config_id_seq OWNER TO "UsersDev";

--
-- Name: peripheral_config_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: UsersDev
--

ALTER SEQUENCE public.peripheral_config_id_seq OWNED BY public.peripheral_config.id;


--
-- Name: peripheral_event; Type: TABLE; Schema: public; Owner: UsersDev
--

CREATE TABLE public.peripheral_event (
    id integer NOT NULL,
    id_peripheral_config integer,
    id_order integer,
    codigo_orden character varying(80),
    event_type character varying(40) NOT NULL,
    event_status character varying(40) NOT NULL,
    device_type character varying(60),
    device_name character varying(120),
    device_mode character varying(40),
    external_reference character varying(160),
    message text,
    payload jsonb,
    id_usuario integer,
    id_suscrito integer,
    id_estado integer DEFAULT 1 NOT NULL,
    fecha_creacion timestamp with time zone NOT NULL
);


ALTER TABLE public.peripheral_event OWNER TO "UsersDev";

--
-- Name: peripheral_event_id_seq; Type: SEQUENCE; Schema: public; Owner: UsersDev
--

CREATE SEQUENCE public.peripheral_event_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.peripheral_event_id_seq OWNER TO "UsersDev";

--
-- Name: peripheral_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: UsersDev
--

ALTER SEQUENCE public.peripheral_event_id_seq OWNED BY public.peripheral_event.id;


--
-- Name: permiso_componente; Type: TABLE; Schema: public; Owner: UsersDev
--

CREATE TABLE public.permiso_componente (
    id integer NOT NULL,
    id_rol integer NOT NULL,
    id_modulo integer NOT NULL,
    id_componente integer,
    accion character varying(40) NOT NULL,
    permitido boolean DEFAULT true NOT NULL,
    id_estado integer DEFAULT 1 NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_actualizacion timestamp without time zone
);


ALTER TABLE public.permiso_componente OWNER TO "UsersDev";

--
-- Name: permiso_componente_id_seq; Type: SEQUENCE; Schema: public; Owner: UsersDev
--

CREATE SEQUENCE public.permiso_componente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permiso_componente_id_seq OWNER TO "UsersDev";

--
-- Name: permiso_componente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: UsersDev
--

ALTER SEQUENCE public.permiso_componente_id_seq OWNED BY public.permiso_componente.id;


--
-- Name: planes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.planes (
    id integer NOT NULL,
    tipo character varying NOT NULL,
    duracion integer NOT NULL,
    precio integer NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    descripcion character varying,
    unidad character varying
);


ALTER TABLE public.planes OWNER TO postgres;

--
-- Name: planes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.planes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.planes_id_seq OWNER TO postgres;

--
-- Name: planes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.planes_id_seq OWNED BY public.planes.id;


--
-- Name: producto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.producto (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    descripcion text,
    precio numeric(10,0) NOT NULL,
    id_categoria integer,
    id_estado integer NOT NULL,
    referencia character varying(50),
    image text
);


ALTER TABLE public.producto OWNER TO postgres;

--
-- Name: producto_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.producto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.producto_id_seq OWNER TO postgres;

--
-- Name: producto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.producto_id_seq OWNED BY public.producto.id;


--
-- Name: proveedores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proveedores (
    id integer NOT NULL,
    proveedor character varying(50) NOT NULL,
    descripcion character varying(255) NOT NULL,
    nit character varying(50) NOT NULL,
    contacto character varying(50) NOT NULL,
    fecha timestamp without time zone NOT NULL,
    id_estado integer
);


ALTER TABLE public.proveedores OWNER TO postgres;

--
-- Name: proveedores_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.proveedores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.proveedores_id_seq OWNER TO postgres;

--
-- Name: proveedores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.proveedores_id_seq OWNED BY public.proveedores.id;


--
-- Name: recurso_desarrollo; Type: TABLE; Schema: public; Owner: UsersDev
--

CREATE TABLE public.recurso_desarrollo (
    id integer NOT NULL,
    titulo character varying(160) NOT NULL,
    descripcion text,
    tipo_recurso character varying(40) NOT NULL,
    ruta character varying(500),
    version character varying(50),
    id_modulo integer,
    visible boolean DEFAULT true NOT NULL,
    id_estado integer DEFAULT 1 NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_actualizacion timestamp without time zone
);


ALTER TABLE public.recurso_desarrollo OWNER TO "UsersDev";

--
-- Name: recurso_desarrollo_id_seq; Type: SEQUENCE; Schema: public; Owner: UsersDev
--

CREATE SEQUENCE public.recurso_desarrollo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.recurso_desarrollo_id_seq OWNER TO "UsersDev";

--
-- Name: recurso_desarrollo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: UsersDev
--

ALTER SEQUENCE public.recurso_desarrollo_id_seq OWNED BY public.recurso_desarrollo.id;


--
-- Name: reportes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reportes (
    id integer NOT NULL,
    codigo_reporte character varying(50) NOT NULL,
    consulta character varying(255) NOT NULL,
    fecha timestamp without time zone NOT NULL,
    id_estado integer
);


ALTER TABLE public.reportes OWNER TO postgres;

--
-- Name: reportes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reportes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reportes_id_seq OWNER TO postgres;

--
-- Name: reportes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reportes_id_seq OWNED BY public.reportes.id;


--
-- Name: reservamesa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservamesa (
    id integer NOT NULL,
    id_mesa integer NOT NULL,
    fecha date NOT NULL,
    nombrecliente character varying,
    contactocliente character varying,
    id_estado integer NOT NULL,
    hora time without time zone NOT NULL
);


ALTER TABLE public.reservamesa OWNER TO postgres;

--
-- Name: reservamesa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservamesa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reservamesa_id_seq OWNER TO postgres;

--
-- Name: reservamesa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservamesa_id_seq OWNED BY public.reservamesa.id;


--
-- Name: rol; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rol (
    id integer NOT NULL,
    rol character varying NOT NULL,
    descripcion text,
    id_estado integer NOT NULL
);


ALTER TABLE public.rol OWNER TO postgres;

--
-- Name: rol_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rol_id_seq OWNER TO postgres;

--
-- Name: rol_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rol_id_seq OWNED BY public.rol.id;


--
-- Name: rol_modulo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rol_modulo (
    id_rol integer NOT NULL,
    id_modulo integer NOT NULL,
    id_estado integer DEFAULT 1 NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_actualizacion timestamp without time zone
);


ALTER TABLE public.rol_modulo OWNER TO postgres;

--
-- Name: stock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stock (
    id integer NOT NULL,
    id_producto integer NOT NULL,
    cantidad integer NOT NULL,
    unidad_medida character varying(244)
);


ALTER TABLE public.stock OWNER TO postgres;

--
-- Name: stock_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stock_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.stock_id_seq OWNER TO postgres;

--
-- Name: stock_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stock_id_seq OWNED BY public.stock.id;


--
-- Name: subtipopago; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subtipopago (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    id_tipopago integer NOT NULL,
    id_estado integer
);


ALTER TABLE public.subtipopago OWNER TO postgres;

--
-- Name: subtipopago_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subtipopago_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subtipopago_id_seq OWNER TO postgres;

--
-- Name: subtipopago_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subtipopago_id_seq OWNED BY public.subtipopago.id;


--
-- Name: suscritos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.suscritos (
    id integer NOT NULL,
    responsable character varying NOT NULL,
    contacto_n character varying NOT NULL,
    correo character varying NOT NULL,
    codigo character varying NOT NULL,
    id_plan integer NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_actualizacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_finalizacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id_estado integer NOT NULL,
    nit character varying(50),
    imagen text
);


ALTER TABLE public.suscritos OWNER TO postgres;

--
-- Name: suscritos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.suscritos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.suscritos_id_seq OWNER TO postgres;

--
-- Name: suscritos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.suscritos_id_seq OWNED BY public.suscritos.id;


--
-- Name: tipopago; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipopago (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    id_estado integer NOT NULL,
    referencia character varying(50)
);


ALTER TABLE public.tipopago OWNER TO postgres;

--
-- Name: tipopago_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipopago_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipopago_id_seq OWNER TO postgres;

--
-- Name: tipopago_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipopago_id_seq OWNED BY public.tipopago.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    usuario character varying NOT NULL,
    contrasena character varying NOT NULL,
    id_colaborador integer NOT NULL,
    id_rol integer NOT NULL,
    id_estado integer NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_actualizacion timestamp without time zone,
    id_suscrito integer,
    id_pais integer
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: auditoria_evento id; Type: DEFAULT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.auditoria_evento ALTER COLUMN id SET DEFAULT nextval('public.auditoria_evento_id_seq'::regclass);


--
-- Name: categoriaproducto id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoriaproducto ALTER COLUMN id SET DEFAULT nextval('public.categoriaproducto_id_seq'::regclass);


--
-- Name: cliente id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente ALTER COLUMN id SET DEFAULT nextval('public.cliente_id_seq'::regclass);


--
-- Name: colaborador id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colaborador ALTER COLUMN id SET DEFAULT nextval('public.colaborador_id_seq'::regclass);


--
-- Name: componente id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.componente ALTER COLUMN id SET DEFAULT nextval('public.componente_id_seq'::regclass);


--
-- Name: compras id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compras ALTER COLUMN id SET DEFAULT nextval('public.compras_id_seq'::regclass);


--
-- Name: detallecompra id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallecompra ALTER COLUMN id SET DEFAULT nextval('public.detallecompra_id_seq'::regclass);


--
-- Name: detalleorden id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalleorden ALTER COLUMN id SET DEFAULT nextval('public.detalleorden_id_seq'::regclass);


--
-- Name: estado id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estado ALTER COLUMN id SET DEFAULT nextval('public.estado_id_seq'::regclass);


--
-- Name: mesa id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mesa ALTER COLUMN id SET DEFAULT nextval('public.mesa_id_seq'::regclass);


--
-- Name: modulo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modulo ALTER COLUMN id SET DEFAULT nextval('public.modulo_id_seq'::regclass);


--
-- Name: orden id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orden ALTER COLUMN id SET DEFAULT nextval('public.orden_id_seq'::regclass);


--
-- Name: paises id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paises ALTER COLUMN id SET DEFAULT nextval('public.paises_id_seq'::regclass);


--
-- Name: parametro_suscrito id; Type: DEFAULT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.parametro_suscrito ALTER COLUMN id SET DEFAULT nextval('public.parametro_suscrito_id_seq'::regclass);


--
-- Name: payment_method_config id; Type: DEFAULT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.payment_method_config ALTER COLUMN id SET DEFAULT nextval('public.payment_method_config_id_seq'::regclass);


--
-- Name: payment_transaction_detail id; Type: DEFAULT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.payment_transaction_detail ALTER COLUMN id SET DEFAULT nextval('public.payment_transaction_detail_id_seq'::regclass);


--
-- Name: peripheral_config id; Type: DEFAULT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.peripheral_config ALTER COLUMN id SET DEFAULT nextval('public.peripheral_config_id_seq'::regclass);


--
-- Name: peripheral_event id; Type: DEFAULT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.peripheral_event ALTER COLUMN id SET DEFAULT nextval('public.peripheral_event_id_seq'::regclass);


--
-- Name: permiso_componente id; Type: DEFAULT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.permiso_componente ALTER COLUMN id SET DEFAULT nextval('public.permiso_componente_id_seq'::regclass);


--
-- Name: planes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planes ALTER COLUMN id SET DEFAULT nextval('public.planes_id_seq'::regclass);


--
-- Name: producto id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto ALTER COLUMN id SET DEFAULT nextval('public.producto_id_seq'::regclass);


--
-- Name: proveedores id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedores ALTER COLUMN id SET DEFAULT nextval('public.proveedores_id_seq'::regclass);


--
-- Name: recurso_desarrollo id; Type: DEFAULT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.recurso_desarrollo ALTER COLUMN id SET DEFAULT nextval('public.recurso_desarrollo_id_seq'::regclass);


--
-- Name: reportes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reportes ALTER COLUMN id SET DEFAULT nextval('public.reportes_id_seq'::regclass);


--
-- Name: reservamesa id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservamesa ALTER COLUMN id SET DEFAULT nextval('public.reservamesa_id_seq'::regclass);


--
-- Name: rol id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol ALTER COLUMN id SET DEFAULT nextval('public.rol_id_seq'::regclass);


--
-- Name: stock id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock ALTER COLUMN id SET DEFAULT nextval('public.stock_id_seq'::regclass);


--
-- Name: subtipopago id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtipopago ALTER COLUMN id SET DEFAULT nextval('public.subtipopago_id_seq'::regclass);


--
-- Name: suscritos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscritos ALTER COLUMN id SET DEFAULT nextval('public.suscritos_id_seq'::regclass);


--
-- Name: tipopago id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipopago ALTER COLUMN id SET DEFAULT nextval('public.tipopago_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: auditoria_evento; Type: TABLE DATA; Schema: public; Owner: UsersDev
--

INSERT INTO public.auditoria_evento VALUES (1, 1, 2, 7, 'validacion_fase6', 'test-1', 'crear', 'Registro temporal de validacion fase 6', '{"estado": "antes"}', '{"estado": "despues"}', '127.0.0.1', 'codex-validation', 2, '2026-05-07 11:31:00.63868');
INSERT INTO public.auditoria_evento VALUES (2, NULL, NULL, NULL, 'validacion_fase6', 'test-1', 'crear', 'Registro temporal de validacion fase 6', '{"estado": "antes"}', '{"estado": "despues"}', '127.0.0.1', 'codex-validation', 2, '2026-05-07 11:31:30.174196');
INSERT INTO public.auditoria_evento VALUES (3, 1, 2, 7, 'validacion_backend_auditoria', 'service-test-1', 'crear', 'Validacion controlada del servicio de auditoria', NULL, '{"ok": true}', '127.0.0.1', 'codex-audit-service-validation', 2, '2026-05-07 16:44:43.702');
INSERT INTO public.auditoria_evento VALUES (4, 1, 2, 7, 'usuarios', '6', 'actualizar', 'Usuario actualizado desde Control de Acceso', '{"id": 6, "id_rol": 7, "usuario": "admin", "id_estado": 1, "id_suscrito": 1}', '{"id": 6, "rol": "DEMO", "cargo": "QA", "cedula": 51994090, "id_rol": 7, "id_pais": 1, "usuario": "admin", "suscrito": "Marwee", "id_estado": 1, "colaborador": "Martha", "id_suscrito": 1, "fecha_creacion": "2023-09-26T05:04:33.858Z", "id_colaborador": 3}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36', 1, '2026-05-07 17:10:54.141');
INSERT INTO public.auditoria_evento VALUES (5, 1, 2, 7, 'modulo', '8', 'crear', 'Modulo registrado desde Control de Acceso', NULL, '{"id": 8, "ruta": "temp/auditoria", "icono": "fa-solid fa-vial", "modulo": "TEMP AUDITORIA", "id_estado": 1, "descripcion": "Modulo temporal validacion auditoria", "fecha_creacion": "2026-05-07T19:13:14.679Z", "position_module": 99, "fecha_actualizacion": null}', '::1', 'Mozilla/5.0 (Windows NT; Windows NT 10.0; es-CO) WindowsPowerShell/5.1.19041.6456', 2, '2026-05-07 19:13:14.732');
INSERT INTO public.auditoria_evento VALUES (6, 1, 2, 7, 'modulo', '8', 'actualizar', 'Modulo actualizado desde Control de Acceso', '{"id": 8, "ruta": "temp/auditoria", "icono": "fa-solid fa-vial", "modulo": "TEMP AUDITORIA", "id_estado": 1, "descripcion": "Modulo temporal validacion auditoria", "fecha_creacion": "2026-05-07T19:13:14.679Z", "position_module": 99, "fecha_actualizacion": null}', '{"id": 8, "ruta": "temp/auditoria-edit", "icono": "fa-solid fa-vial", "modulo": "TEMP AUDITORIA EDIT", "id_estado": 1, "descripcion": "Modulo temporal validacion auditoria editado", "fecha_creacion": "2026-05-07T19:13:14.679Z", "position_module": 99, "fecha_actualizacion": "2026-05-07T19:13:14.825Z"}', '::1', 'Mozilla/5.0 (Windows NT; Windows NT 10.0; es-CO) WindowsPowerShell/5.1.19041.6456', 2, '2026-05-07 19:13:14.851');
INSERT INTO public.auditoria_evento VALUES (7, 1, 2, 7, 'modulo', '8', 'deshabilitar', 'Modulo deshabilitado desde Control de Acceso', '{"id": 8, "ruta": "temp/auditoria-edit", "icono": "fa-solid fa-vial", "modulo": "TEMP AUDITORIA EDIT", "id_estado": 1, "descripcion": "Modulo temporal validacion auditoria editado", "fecha_creacion": "2026-05-07T19:13:14.679Z", "position_module": 99, "fecha_actualizacion": "2026-05-07T19:13:14.825Z"}', '{"id": 8, "ruta": "temp/auditoria-edit", "icono": "fa-solid fa-vial", "modulo": "TEMP AUDITORIA EDIT", "id_estado": 2, "descripcion": "Modulo temporal validacion auditoria editado", "fecha_creacion": "2026-05-07T19:13:14.679Z", "position_module": 99, "fecha_actualizacion": "2026-05-07T19:13:14.876Z"}', '::1', 'Mozilla/5.0 (Windows NT; Windows NT 10.0; es-CO) WindowsPowerShell/5.1.19041.6456', 2, '2026-05-07 19:13:14.892');
INSERT INTO public.auditoria_evento VALUES (8, 1, 2, 7, 'permiso_componente', '1', 'crear', 'Permiso de componente registrado', NULL, '{"id": 1, "accion": "validacion_auditoria", "id_rol": 1, "id_estado": 1, "id_modulo": 1, "permitido": true, "id_componente": null, "fecha_creacion": "2026-05-07T19:15:36.679Z", "fecha_actualizacion": null}', '::1', 'node', 2, '2026-05-07 19:15:36.846');
INSERT INTO public.auditoria_evento VALUES (9, 1, 2, 7, 'permiso_componente', '1', 'actualizar', 'Permiso de componente actualizado', '{"id": 1, "accion": "validacion_auditoria", "id_rol": 1, "id_estado": 1, "id_modulo": 1, "permitido": true, "id_componente": null, "fecha_creacion": "2026-05-07T19:15:36.679Z", "fecha_actualizacion": null}', '{"id": 1, "accion": "validacion_auditoria", "id_rol": 1, "id_estado": 1, "id_modulo": 1, "permitido": false, "id_componente": null, "fecha_creacion": "2026-05-07T19:15:36.679Z", "fecha_actualizacion": "2026-05-07T19:15:36.900Z"}', '::1', 'node', 2, '2026-05-07 19:15:36.915');
INSERT INTO public.auditoria_evento VALUES (10, 1, 2, 7, 'permiso_componente', '1', 'deshabilitar', 'Permiso de componente deshabilitado', '{"id": 1, "accion": "validacion_auditoria", "id_rol": 1, "id_estado": 1, "id_modulo": 1, "permitido": false, "id_componente": null, "fecha_creacion": "2026-05-07T19:15:36.679Z", "fecha_actualizacion": "2026-05-07T19:15:36.900Z"}', '{"id": 1, "accion": "validacion_auditoria", "id_rol": 1, "id_estado": 2, "id_modulo": 1, "permitido": false, "id_componente": null, "fecha_creacion": "2026-05-07T19:15:36.679Z", "fecha_actualizacion": "2026-05-07T19:15:36.942Z"}', '::1', 'node', 2, '2026-05-07 19:15:36.957');
INSERT INTO public.auditoria_evento VALUES (11, 1, 2, 7, 'suscritos', '4', 'crear', 'Empresa registrada desde Control de Acceso', NULL, '{"id": 4, "nit": "1024522840", "codigo": "MONOGRAPH-56973", "correo": "jorgeovallea23@gmail.com", "imagen": null, "id_plan": 3, "id_estado": 1, "contacto_n": "3153409078", "responsable": "Monograph", "fecha_creacion": "2026-05-09T01:04:16.972Z", "fecha_finalizacion": "2026-05-09T05:00:00.000Z", "fecha_actualizacion": "2026-05-09T01:04:16.972Z"}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36', 1, '2026-05-09 01:04:17.399');
INSERT INTO public.auditoria_evento VALUES (12, 1, 2, 7, 'usuarios', '7', 'crear', 'Usuario registrado desde Control de Acceso', NULL, '{"id": 7, "rol": "MANAGER", "cargo": "Diseñador", "cedula": 1024522840, "id_rol": 3, "id_pais": null, "usuario": "jorova", "suscrito": "Monograph", "id_estado": 1, "colaborador": "Jorge Ovalle", "id_suscrito": 4, "fecha_creacion": "2026-05-09T01:05:43.999Z", "id_colaborador": 4}', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36', 1, '2026-05-09 01:05:45.73');
INSERT INTO public.auditoria_evento VALUES (13, 1, 2, 7, 'rol_modulo', '1', 'actualizar_permisos', 'Permisos de modulos por rol actualizados desde Control de Acceso', '[{"id_rol": 1, "id_estado": 1, "id_modulo": 1}, {"id_rol": 1, "id_estado": 1, "id_modulo": 2}, {"id_rol": 1, "id_estado": 1, "id_modulo": 3}, {"id_rol": 1, "id_estado": 1, "id_modulo": 5}]', '[{"id_rol": 1, "id_estado": 2, "id_modulo": 2}, {"id_rol": 1, "id_estado": 1, "id_modulo": 3}, {"id_rol": 1, "id_estado": 1, "id_modulo": 1}, {"id_rol": 1, "id_estado": 1, "id_modulo": 5}]', '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36', 1, '2026-05-11 23:49:26.437');


--
-- Data for Name: authorizationtoken; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.authorizationtoken VALUES ('fW5Gx0odzCfWI0mlu7uiHBBvWCqdOA', 'o7HdcRyLB1purJhC3iVPIH153CGKqW', 1, 1, '2024-09-25 00:04:33.858', NULL);
INSERT INTO public.authorizationtoken VALUES ('Ixy541FdJB4bM9fCSKVXWIpoyv0wB9', 'IQL3816zgKkHuMvbeYIuq385xtdlcY', 6, 1, '2024-09-25 00:04:33.858', NULL);
INSERT INTO public.authorizationtoken VALUES ('xKos6IuhXu1S0pyla8x6EcRFOHTyeQ', 'LHUCTFafZvKW-VUvSuxiusVLGGZdbA', 2, 1, '2026-05-07 01:51:14.070966', NULL);
INSERT INTO public.authorizationtoken VALUES ('Hj2DUK-vjUMqmJABsIqogWgOu6LvPQ', 'xIKH8hx17-bCbebbBqlcGC3FwDbDgA', 7, 1, '2026-05-08 20:05:45.32', NULL);


--
-- Data for Name: categoriaproducto; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categoriaproducto VALUES (2, 'Entradas', 'Muestras productos tipo entrada', 1);
INSERT INTO public.categoriaproducto VALUES (3, 'Plato fuerte', 'Muestra productos tipo plato fuerte', 1);
INSERT INTO public.categoriaproducto VALUES (4, 'Bebidas', 'Muestra productos tipo bebidas', 1);
INSERT INTO public.categoriaproducto VALUES (5, 'Sopas', 'Muestra productos tipo sopas', 1);
INSERT INTO public.categoriaproducto VALUES (6, 'Postres', 'Muestra productos tipo postre', 1);
INSERT INTO public.categoriaproducto VALUES (1, 'Todos', 'Muestras todos los producto', 2);
INSERT INTO public.categoriaproducto VALUES (7, 'Materias primas', 'compras de insumos', 2);


--
-- Data for Name: cliente; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.cliente VALUES (1, 'Consumidor final', 1, '5215454222', NULL);
INSERT INTO public.cliente VALUES (2, 'Proveedor', 1, '154555', 'proveedor@example.com');
INSERT INTO public.cliente VALUES (11, 'Ivan Gomez', 1, '1024563320', 'ifga_0002@hotmail.com');
INSERT INTO public.cliente VALUES (12, 'Nestor Gomez', 1, '1024563322', 'nega_0002@hotmail.com');
INSERT INTO public.cliente VALUES (13, 'Mesa prueba', 1, '51994090', '');
INSERT INTO public.cliente VALUES (14, 'dobby', 1, '123456789', 'dobby@patis.com');
INSERT INTO public.cliente VALUES (15, 'Stiven Ovalle', 1, '1024522840', 'jorgeovallea23@gmail.com');
INSERT INTO public.cliente VALUES (16, 'Daniela Patiño', 1, '1016594007', 'mdvanegasp@gmail.com');


--
-- Data for Name: colaborador; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.colaborador VALUES (1, 'Ivan', 'Chief Technology Officer - CTO', 1, '2023-09-25 00:00:00', NULL, 1024563320);
INSERT INTO public.colaborador VALUES (2, 'Nestor', 'Chief Executive Officer - CEO', 1, '2023-09-26 00:14:14.168', '2026-05-07 01:41:43.818', 1024563330);
INSERT INTO public.colaborador VALUES (3, 'Martha', 'QA', 1, '2025-02-20 00:00:00', '2026-05-07 12:10:53.904', 51994090);
INSERT INTO public.colaborador VALUES (4, 'Jorge Ovalle', 'Diseñador', 1, '2026-05-08 20:05:43.999', NULL, 1024522840);


--
-- Data for Name: componente; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: compras; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.compras VALUES (1, 'FC-1778112714084', 76500, 1, 1, '2026-05-06 19:13:43.818');
INSERT INTO public.compras VALUES (2, 'FC-1778121169092', 102000, 1, 1, '2026-05-06 21:33:15.272');
INSERT INTO public.compras VALUES (3, 'FC-1778637520599', 229500, 1, 1, '2026-05-12 21:05:46.94');


--
-- Data for Name: detallecompra; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.detallecompra VALUES (1, 1, 1, 3, 25500, '2026-05-06 19:13:43.818');
INSERT INTO public.detallecompra VALUES (2, 2, 2, 12, 8500, '2026-05-06 21:33:15.272');
INSERT INTO public.detallecompra VALUES (3, 3, 1, 9, 25500, '2026-05-12 21:05:46.94');


--
-- Data for Name: detalleorden; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.detalleorden VALUES (200, 'FA-JuR68-90', 11, 1);
INSERT INTO public.detalleorden VALUES (202, 'FA-wOP27-91', 4, 1);
INSERT INTO public.detalleorden VALUES (203, 'FA-lTR27-92', 4, 1);
INSERT INTO public.detalleorden VALUES (204, 'FA-EZQ76-93', 4, 1);
INSERT INTO public.detalleorden VALUES (205, 'FA-szx73-94', 4, 1);
INSERT INTO public.detalleorden VALUES (206, 'FA-PJe82-95', 4, 1);
INSERT INTO public.detalleorden VALUES (207, 'FA-VDE62-96', 4, 1);
INSERT INTO public.detalleorden VALUES (208, 'FA-Tbi67-97', 4, 2);
INSERT INTO public.detalleorden VALUES (211, 'FA-JIl40-99', 1, 1);
INSERT INTO public.detalleorden VALUES (212, 'FA-xLl28-100', 1, 1);
INSERT INTO public.detalleorden VALUES (213, 'FA-xLl28-100', 2, 3);
INSERT INTO public.detalleorden VALUES (214, 'FA-clT69-101', 11, 1);
INSERT INTO public.detalleorden VALUES (215, 'FA-clT69-101', 9, 1);
INSERT INTO public.detalleorden VALUES (195, 'FA-YQc17-88', 2, 1);
INSERT INTO public.detalleorden VALUES (89, 'FA-uWg55-42', 6, 1);
INSERT INTO public.detalleorden VALUES (196, 'FA-YQc17-88', 1, 1);
INSERT INTO public.detalleorden VALUES (92, 'FA-uWg55-42', 7, 1);
INSERT INTO public.detalleorden VALUES (103, 'FA-vaM40-46', 8, 1);
INSERT INTO public.detalleorden VALUES (191, 'FA-Oto84-87', 5, 1);
INSERT INTO public.detalleorden VALUES (108, 'FA-SXd63-48', 8, 1);
INSERT INTO public.detalleorden VALUES (109, 'FA-CBm98-49', 6, 1);
INSERT INTO public.detalleorden VALUES (91, 'FA-uWg55-42', 5, 1);
INSERT INTO public.detalleorden VALUES (102, 'FA-vaM40-46', 5, 1);
INSERT INTO public.detalleorden VALUES (107, 'FA-SXd63-48', 5, 1);
INSERT INTO public.detalleorden VALUES (110, 'FA-nsJ34-50', 5, 1);
INSERT INTO public.detalleorden VALUES (116, 'FA-iXc16-53', 5, 1);
INSERT INTO public.detalleorden VALUES (119, 'FA-xNT47-55', 5, 1);
INSERT INTO public.detalleorden VALUES (131, 'FA-AKh80-61', 5, 1);
INSERT INTO public.detalleorden VALUES (134, 'FA-WOj28-63', 5, 1);
INSERT INTO public.detalleorden VALUES (140, 'FA-Zfe35-65', 5, 1);
INSERT INTO public.detalleorden VALUES (127, 'FA-fvk99-59', 6, 1);
INSERT INTO public.detalleorden VALUES (147, 'FA-ztE95-67', 5, 1);
INSERT INTO public.detalleorden VALUES (152, 'FA-eVX03-71', 5, 1);
INSERT INTO public.detalleorden VALUES (135, 'FA-Apz63-64', 6, 1);
INSERT INTO public.detalleorden VALUES (157, 'FA-Mwz69-73', 5, 1);
INSERT INTO public.detalleorden VALUES (198, 'FA-JuR68-90', 5, 1);
INSERT INTO public.detalleorden VALUES (141, 'FA-Zfe35-65', 6, 1);
INSERT INTO public.detalleorden VALUES (142, 'FA-Zfe35-65', 7, 1);
INSERT INTO public.detalleorden VALUES (143, 'FA-Zfe35-65', 8, 1);
INSERT INTO public.detalleorden VALUES (188, 'FA-GWB92-85', 4, 1);
INSERT INTO public.detalleorden VALUES (194, 'FA-YQc17-88', 4, 1);
INSERT INTO public.detalleorden VALUES (164, 'FA-lLL56-77', 4, 1);
INSERT INTO public.detalleorden VALUES (171, 'FA-rWF42-80', 4, 1);
INSERT INTO public.detalleorden VALUES (182, 'FA-DrT92-83', 4, 1);
INSERT INTO public.detalleorden VALUES (184, 'FA-sbt73-84', 4, 1);
INSERT INTO public.detalleorden VALUES (199, 'FA-JuR68-90', 4, 1);
INSERT INTO public.detalleorden VALUES (12, 'FA-ozc40-3', 1, 3);
INSERT INTO public.detalleorden VALUES (22, 'FA-diC43-9', 1, 3);
INSERT INTO public.detalleorden VALUES (25, 'FA-XMc84-12', 1, 3);
INSERT INTO public.detalleorden VALUES (28, 'FA-VHT31-13', 1, 3);
INSERT INTO public.detalleorden VALUES (37, 'FA-SEV90-16', 1, 3);
INSERT INTO public.detalleorden VALUES (45, 'FA-YGk17-20', 1, 3);
INSERT INTO public.detalleorden VALUES (46, 'FA-Lbu31-21', 1, 3);
INSERT INTO public.detalleorden VALUES (50, 'FA-iFm69-23', 1, 3);
INSERT INTO public.detalleorden VALUES (55, 'FA-OSa74-26', 1, 3);
INSERT INTO public.detalleorden VALUES (59, 'FA-KeC21-27', 1, 3);
INSERT INTO public.detalleorden VALUES (66, 'FA-YPT20-28', 1, 3);
INSERT INTO public.detalleorden VALUES (67, 'FA-Dab50-29', 1, 3);
INSERT INTO public.detalleorden VALUES (74, 'FA-UkO69-32', 1, 3);
INSERT INTO public.detalleorden VALUES (76, 'FA-rqs95-33', 1, 3);
INSERT INTO public.detalleorden VALUES (79, 'FA-IBm70-34', 1, 3);
INSERT INTO public.detalleorden VALUES (82, 'FA-oMS44-37', 1, 3);
INSERT INTO public.detalleorden VALUES (95, 'FA-uWg55-42', 1, 3);
INSERT INTO public.detalleorden VALUES (106, 'FA-NFf89-47', 1, 3);
INSERT INTO public.detalleorden VALUES (120, 'FA-nuS80-56', 1, 3);
INSERT INTO public.detalleorden VALUES (126, 'FA-fvk99-59', 1, 3);
INSERT INTO public.detalleorden VALUES (129, 'FA-AKh80-61', 1, 3);
INSERT INTO public.detalleorden VALUES (136, 'FA-Zfe35-65', 1, 3);
INSERT INTO public.detalleorden VALUES (146, 'FA-ztE95-67', 1, 3);
INSERT INTO public.detalleorden VALUES (1, 'FA-Dty34-0', 2, 2);
INSERT INTO public.detalleorden VALUES (3, 'FA-Dty34-0', 2, 2);
INSERT INTO public.detalleorden VALUES (7, 'FA-XAb17-1', 2, 2);
INSERT INTO public.detalleorden VALUES (10, 'FA-Ulk71-2', 2, 2);
INSERT INTO public.detalleorden VALUES (13, 'FA-LKz79-4', 2, 2);
INSERT INTO public.detalleorden VALUES (16, 'FA-gEG14-5', 2, 2);
INSERT INTO public.detalleorden VALUES (18, 'FA-vKI59-6', 2, 2);
INSERT INTO public.detalleorden VALUES (24, 'FA-dKP84-11', 2, 2);
INSERT INTO public.detalleorden VALUES (26, 'FA-XMc84-12', 2, 2);
INSERT INTO public.detalleorden VALUES (29, 'FA-VHT31-13', 2, 2);
INSERT INTO public.detalleorden VALUES (32, 'FA-WID63-14', 2, 2);
INSERT INTO public.detalleorden VALUES (34, 'FA-GoM63-15', 2, 2);
INSERT INTO public.detalleorden VALUES (38, 'FA-SEV90-16', 2, 2);
INSERT INTO public.detalleorden VALUES (40, 'FA-KFT38-17', 2, 2);
INSERT INTO public.detalleorden VALUES (44, 'FA-XQD43-19', 2, 2);
INSERT INTO public.detalleorden VALUES (47, 'FA-Lbu31-21', 2, 2);
INSERT INTO public.detalleorden VALUES (53, 'FA-hyx02-25', 2, 2);
INSERT INTO public.detalleorden VALUES (56, 'FA-OSa74-26', 2, 2);
INSERT INTO public.detalleorden VALUES (60, 'FA-KeC21-27', 2, 2);
INSERT INTO public.detalleorden VALUES (63, 'FA-YPT20-28', 2, 2);
INSERT INTO public.detalleorden VALUES (68, 'FA-Dab50-29', 2, 2);
INSERT INTO public.detalleorden VALUES (75, 'FA-UkO69-32', 2, 2);
INSERT INTO public.detalleorden VALUES (77, 'FA-rqs95-33', 2, 2);
INSERT INTO public.detalleorden VALUES (78, 'FA-IBm70-34', 2, 2);
INSERT INTO public.detalleorden VALUES (80, 'FA-pqT11-35', 2, 2);
INSERT INTO public.detalleorden VALUES (84, 'FA-qYI36-39', 2, 2);
INSERT INTO public.detalleorden VALUES (87, 'FA-eMM14-41', 2, 2);
INSERT INTO public.detalleorden VALUES (94, 'FA-uWg55-42', 2, 2);
INSERT INTO public.detalleorden VALUES (96, 'FA-nEe66-43', 2, 2);
INSERT INTO public.detalleorden VALUES (99, 'FA-bCq86-45', 2, 2);
INSERT INTO public.detalleorden VALUES (201, 'FA-JuR68-90', 1, 1);
INSERT INTO public.detalleorden VALUES (216, 'FA-clT69-101', 7, 1);
INSERT INTO public.detalleorden VALUES (217, 'FA-pWs62-102', 7, 3);
INSERT INTO public.detalleorden VALUES (218, 'FA-pWs62-102', 6, 1);
INSERT INTO public.detalleorden VALUES (219, 'FA-uQU86-103', 4, 1);
INSERT INTO public.detalleorden VALUES (221, 'FA-UkQ86-104', 1, 1);
INSERT INTO public.detalleorden VALUES (222, 'FA-UkQ86-104', 2, 1);
INSERT INTO public.detalleorden VALUES (159, 'FA-nQX65-74', 7, 1);
INSERT INTO public.detalleorden VALUES (161, 'FA-HTM91-75', 7, 1);
INSERT INTO public.detalleorden VALUES (169, 'FA-dPL44-79', 7, 1);
INSERT INTO public.detalleorden VALUES (173, 'FA-IWD80-81', 6, 1);
INSERT INTO public.detalleorden VALUES (174, 'FA-IWD80-81', 7, 1);
INSERT INTO public.detalleorden VALUES (178, 'FA-Izb67-82', 6, 2);
INSERT INTO public.detalleorden VALUES (189, 'FA-mWG24-86', 1, 1);
INSERT INTO public.detalleorden VALUES (190, 'FA-mWG24-86', 2, 1);
INSERT INTO public.detalleorden VALUES (163, 'FA-pcg35-76', 3, 1);
INSERT INTO public.detalleorden VALUES (165, 'FA-iDW52-78', 3, 1);
INSERT INTO public.detalleorden VALUES (168, 'FA-dPL44-79', 3, 1);
INSERT INTO public.detalleorden VALUES (172, 'FA-rWF42-80', 3, 1);
INSERT INTO public.detalleorden VALUES (175, 'FA-IWD80-81', 3, 1);
INSERT INTO public.detalleorden VALUES (187, 'FA-sbt73-84', 3, 1);
INSERT INTO public.detalleorden VALUES (192, 'FA-Oto84-87', 3, 1);
INSERT INTO public.detalleorden VALUES (160, 'FA-HTM91-75', 1, 3);
INSERT INTO public.detalleorden VALUES (167, 'FA-iDW52-78', 1, 3);
INSERT INTO public.detalleorden VALUES (177, 'FA-Izb67-82', 1, 3);
INSERT INTO public.detalleorden VALUES (185, 'FA-sbt73-84', 1, 3);
INSERT INTO public.detalleorden VALUES (104, 'FA-NFf89-47', 2, 2);
INSERT INTO public.detalleorden VALUES (112, 'FA-QMf53-51', 2, 2);
INSERT INTO public.detalleorden VALUES (115, 'FA-iXc16-53', 2, 2);
INSERT INTO public.detalleorden VALUES (121, 'FA-qBC30-57', 2, 2);
INSERT INTO public.detalleorden VALUES (124, 'FA-BkM50-58', 2, 2);
INSERT INTO public.detalleorden VALUES (128, 'FA-frC42-60', 2, 2);
INSERT INTO public.detalleorden VALUES (137, 'FA-Zfe35-65', 2, 2);
INSERT INTO public.detalleorden VALUES (154, 'FA-Mwz69-73', 2, 2);
INSERT INTO public.detalleorden VALUES (166, 'FA-iDW52-78', 2, 2);
INSERT INTO public.detalleorden VALUES (176, 'FA-Izb67-82', 2, 2);
INSERT INTO public.detalleorden VALUES (183, 'FA-DrT92-83', 2, 2);
INSERT INTO public.detalleorden VALUES (186, 'FA-sbt73-84', 2, 2);
INSERT INTO public.detalleorden VALUES (193, 'FA-Oto84-87', 2, 4);
INSERT INTO public.detalleorden VALUES (197, 'FA-xKO40-89', 1, 3);
INSERT INTO public.detalleorden VALUES (170, 'FA-dPL44-79', 5, 1);
INSERT INTO public.detalleorden VALUES (6, 'FA-VQP71-0', 4, 1);
INSERT INTO public.detalleorden VALUES (8, 'FA-XAb17-1', 4, 1);
INSERT INTO public.detalleorden VALUES (15, 'FA-LKz79-4', 4, 1);
INSERT INTO public.detalleorden VALUES (30, 'FA-VHT31-13', 4, 1);
INSERT INTO public.detalleorden VALUES (36, 'FA-GoM63-15', 4, 1);
INSERT INTO public.detalleorden VALUES (41, 'FA-KFT38-17', 4, 1);
INSERT INTO public.detalleorden VALUES (42, 'FA-iPH36-18', 4, 1);
INSERT INTO public.detalleorden VALUES (43, 'FA-XQD43-19', 4, 1);
INSERT INTO public.detalleorden VALUES (49, 'FA-Vlb89-22', 4, 1);
INSERT INTO public.detalleorden VALUES (51, 'FA-iFm69-23', 4, 1);
INSERT INTO public.detalleorden VALUES (52, 'FA-pLP64-24', 4, 1);
INSERT INTO public.detalleorden VALUES (58, 'FA-OSa74-26', 4, 1);
INSERT INTO public.detalleorden VALUES (62, 'FA-KeC21-27', 4, 1);
INSERT INTO public.detalleorden VALUES (65, 'FA-YPT20-28', 4, 1);
INSERT INTO public.detalleorden VALUES (70, 'FA-Dab50-29', 4, 1);
INSERT INTO public.detalleorden VALUES (73, 'FA-RnJ49-31', 4, 1);
INSERT INTO public.detalleorden VALUES (81, 'FA-qrp14-36', 4, 1);
INSERT INTO public.detalleorden VALUES (85, 'FA-Dub53-40', 4, 1);
INSERT INTO public.detalleorden VALUES (88, 'FA-eMM14-41', 4, 1);
INSERT INTO public.detalleorden VALUES (90, 'FA-uWg55-42', 4, 1);
INSERT INTO public.detalleorden VALUES (98, 'FA-Oew71-44', 4, 1);
INSERT INTO public.detalleorden VALUES (101, 'FA-vaM40-46', 4, 1);
INSERT INTO public.detalleorden VALUES (113, 'FA-ral11-52', 4, 1);
INSERT INTO public.detalleorden VALUES (114, 'FA-iXc16-53', 4, 1);
INSERT INTO public.detalleorden VALUES (117, 'FA-hgN41-54', 4, 1);
INSERT INTO public.detalleorden VALUES (122, 'FA-qBC30-57', 4, 1);
INSERT INTO public.detalleorden VALUES (123, 'FA-BkM50-58', 4, 1);
INSERT INTO public.detalleorden VALUES (130, 'FA-AKh80-61', 4, 1);
INSERT INTO public.detalleorden VALUES (139, 'FA-Zfe35-65', 4, 1);
INSERT INTO public.detalleorden VALUES (144, 'FA-Wgv12-66', 4, 1);
INSERT INTO public.detalleorden VALUES (148, 'FA-JRs38-68', 4, 1);
INSERT INTO public.detalleorden VALUES (149, 'FA-XYR28-69', 4, 1);
INSERT INTO public.detalleorden VALUES (150, 'FA-koC27-70', 4, 1);
INSERT INTO public.detalleorden VALUES (153, 'FA-TvG83-72', 4, 1);
INSERT INTO public.detalleorden VALUES (156, 'FA-Mwz69-73', 4, 1);
INSERT INTO public.detalleorden VALUES (158, 'FA-nQX65-74', 4, 1);
INSERT INTO public.detalleorden VALUES (162, 'FA-pcg35-76', 4, 1);
INSERT INTO public.detalleorden VALUES (224, 'FA-TxQ62-106', 2, 2);
INSERT INTO public.detalleorden VALUES (225, 'FA-yhi61-107', 2, 1);
INSERT INTO public.detalleorden VALUES (226, 'FA-yhi61-107', 1, 2);
INSERT INTO public.detalleorden VALUES (227, 'FA-zVT39-108', 9, 1);
INSERT INTO public.detalleorden VALUES (228, 'FA-zVT39-108', 10, 1);
INSERT INTO public.detalleorden VALUES (229, 'FA-RMm60-109', 2, 2);
INSERT INTO public.detalleorden VALUES (230, 'FA-RMm60-109', 5, 1);
INSERT INTO public.detalleorden VALUES (232, 'FA-IRw69-110', 5, 1);
INSERT INTO public.detalleorden VALUES (233, 'FA-lyG85-111', 1, 1);
INSERT INTO public.detalleorden VALUES (234, 'FA-GOv51-112', 1, 1);
INSERT INTO public.detalleorden VALUES (235, 'FA-KvA31-113', 2, 1);
INSERT INTO public.detalleorden VALUES (236, 'FA-usr11-114', 2, 1);
INSERT INTO public.detalleorden VALUES (237, 'FA-VYy87-115', 5, 1);
INSERT INTO public.detalleorden VALUES (240, 'FA-UsL78-116', 2, 1);
INSERT INTO public.detalleorden VALUES (242, 'FA-SDR22-117', 5, 1);
INSERT INTO public.detalleorden VALUES (2, 'FA-Dty34-0', 3, 1);
INSERT INTO public.detalleorden VALUES (4, 'FA-Dty34-0', 3, 1);
INSERT INTO public.detalleorden VALUES (5, 'FA-VQP71-0', 3, 1);
INSERT INTO public.detalleorden VALUES (9, 'FA-XAb17-1', 3, 1);
INSERT INTO public.detalleorden VALUES (11, 'FA-Ulk71-2', 3, 1);
INSERT INTO public.detalleorden VALUES (14, 'FA-LKz79-4', 3, 1);
INSERT INTO public.detalleorden VALUES (17, 'FA-gEG14-5', 3, 1);
INSERT INTO public.detalleorden VALUES (19, 'FA-vKI59-6', 3, 1);
INSERT INTO public.detalleorden VALUES (20, 'FA-qWZ26-7', 3, 1);
INSERT INTO public.detalleorden VALUES (21, 'FA-uoH98-8', 3, 1);
INSERT INTO public.detalleorden VALUES (23, 'FA-ydU34-10', 3, 1);
INSERT INTO public.detalleorden VALUES (27, 'FA-XMc84-12', 3, 1);
INSERT INTO public.detalleorden VALUES (31, 'FA-VHT31-13', 3, 1);
INSERT INTO public.detalleorden VALUES (33, 'FA-WID63-14', 3, 1);
INSERT INTO public.detalleorden VALUES (35, 'FA-GoM63-15', 3, 1);
INSERT INTO public.detalleorden VALUES (39, 'FA-SEV90-16', 3, 1);
INSERT INTO public.detalleorden VALUES (48, 'FA-Vlb89-22', 3, 1);
INSERT INTO public.detalleorden VALUES (209, 'FA-Tbi67-97', 3, 1);
INSERT INTO public.detalleorden VALUES (54, 'FA-hyx02-25', 3, 1);
INSERT INTO public.detalleorden VALUES (57, 'FA-OSa74-26', 3, 1);
INSERT INTO public.detalleorden VALUES (210, 'FA-vuP99-98', 3, 1);
INSERT INTO public.detalleorden VALUES (61, 'FA-KeC21-27', 3, 1);
INSERT INTO public.detalleorden VALUES (64, 'FA-YPT20-28', 3, 1);
INSERT INTO public.detalleorden VALUES (69, 'FA-Dab50-29', 3, 1);
INSERT INTO public.detalleorden VALUES (71, 'FA-zvo20-30', 3, 1);
INSERT INTO public.detalleorden VALUES (72, 'FA-RnJ49-31', 3, 1);
INSERT INTO public.detalleorden VALUES (83, 'FA-Iax55-38', 3, 1);
INSERT INTO public.detalleorden VALUES (86, 'FA-Dub53-40', 3, 1);
INSERT INTO public.detalleorden VALUES (93, 'FA-uWg55-42', 3, 1);
INSERT INTO public.detalleorden VALUES (97, 'FA-Oew71-44', 3, 1);
INSERT INTO public.detalleorden VALUES (100, 'FA-bCq86-45', 3, 1);
INSERT INTO public.detalleorden VALUES (105, 'FA-NFf89-47', 3, 1);
INSERT INTO public.detalleorden VALUES (111, 'FA-nsJ34-50', 3, 1);
INSERT INTO public.detalleorden VALUES (118, 'FA-hgN41-54', 3, 1);
INSERT INTO public.detalleorden VALUES (125, 'FA-BkM50-58', 3, 1);
INSERT INTO public.detalleorden VALUES (132, 'FA-AKh80-61', 3, 1);
INSERT INTO public.detalleorden VALUES (133, 'FA-HMG23-62', 3, 1);
INSERT INTO public.detalleorden VALUES (138, 'FA-Zfe35-65', 3, 1);
INSERT INTO public.detalleorden VALUES (145, 'FA-ztE95-67', 3, 1);
INSERT INTO public.detalleorden VALUES (151, 'FA-koC27-70', 3, 1);
INSERT INTO public.detalleorden VALUES (155, 'FA-Mwz69-73', 3, 1);
INSERT INTO public.detalleorden VALUES (220, 'FA-uQU86-103', 3, 1);
INSERT INTO public.detalleorden VALUES (223, 'FA-EPE67-105', 3, 1);
INSERT INTO public.detalleorden VALUES (231, 'FA-RMm60-109', 3, 1);
INSERT INTO public.detalleorden VALUES (238, 'FA-VYy87-115', 3, 1);
INSERT INTO public.detalleorden VALUES (239, 'FA-UsL78-116', 3, 1);
INSERT INTO public.detalleorden VALUES (241, 'FA-SDR22-117', 3, 1);


--
-- Data for Name: estado; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.estado VALUES (2, 'Inactivo', 'L: constante login', 'L', 'S');
INSERT INTO public.estado VALUES (1, 'Activo', 'L: constante login', 'L', 'S');
INSERT INTO public.estado VALUES (3, 'Retirado', 'L: constante login', 'L', 'S');
INSERT INTO public.estado VALUES (4, 'Disponible', 'M: constante mesas', 'M', 'S');
INSERT INTO public.estado VALUES (5, 'Reservado', 'M: constante mesas', 'M', 'S');
INSERT INTO public.estado VALUES (6, 'Descartado', 'M: constante mesas', 'M', 'S');
INSERT INTO public.estado VALUES (7, 'Pendiente', 'O: constante ordenes', 'O', 'S');
INSERT INTO public.estado VALUES (8, 'Pagada', 'O: constante ordenes', 'O', 'S');
INSERT INTO public.estado VALUES (9, 'Anulada', 'O:constante ordenes', 'O', 'S');
INSERT INTO public.estado VALUES (10, 'Credito', 'O:constante ordenes', 'O', 'S');


--
-- Data for Name: mesa; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.mesa VALUES (3, 13, 'Mesa barra', 4, 1, 4);
INSERT INTO public.mesa VALUES (1, 1, 'Mesa familiar - d', 3, 1, 4);
INSERT INTO public.mesa VALUES (6, 9, 'Balcon ', 4, 1, 4);
INSERT INTO public.mesa VALUES (4, 55, 'Mesa prueba', 6, 2, 4);
INSERT INTO public.mesa VALUES (7, 10, 'Caja', 1, 1, 4);
INSERT INTO public.mesa VALUES (5, 6, 'Balcon 2', 2, 1, 4);
INSERT INTO public.mesa VALUES (2, 2, 'Mesa doble g', 3, 1, 4);


--
-- Data for Name: modulo; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.modulo VALUES (8, 'TEMP AUDITORIA EDIT', 'Modulo temporal validacion auditoria editado', 'temp/auditoria-edit', 2, '2026-05-07 14:13:14.679', '2026-05-07 14:13:14.876', 'fa-solid fa-vial', 99);
INSERT INTO public.modulo VALUES (2, 'Reportes', 'Modulo para generación de reportes ', 'reports/general', 1, '2024-04-25 22:32:22.620542', NULL, 'fa-solid fa-chart-simple', 4);
INSERT INTO public.modulo VALUES (3, 'Compras', 'Modulo de compras, registro de proveedores y control de inventario', 'shopping/register', 1, '2024-04-25 22:47:48.316938', NULL, 'fa-solid fa-bag-shopping', 2);
INSERT INTO public.modulo VALUES (1, 'Ventas', 'Modulo de control de ventas, generar ordenes, controlar y gestionar estas ordenes, pagos y reportes.', 'sales/register', 1, '2024-04-25 22:30:30.146044', NULL, 'fa-solid fa-store', 1);
INSERT INTO public.modulo VALUES (4, 'Ajustes', 'Modulo para parametrizar ambientes con sus requisitos empresariales.', 'settings/dashboard', 1, '2024-05-26 00:00:00', '2026-05-06 23:18:51.131766', 'fa-solid fa-sliders', 5);
INSERT INTO public.modulo VALUES (6, 'Desarrollo', 'Modulo de recursos para desarrolladores (Apis-documentos-versionamientos)', 'dev/resources', 1, '2024-04-25 22:30:30.146044', '2026-05-06 23:18:51.131766', 'fa-solid fa-code', 6);
INSERT INTO public.modulo VALUES (5, 'Inventario', 'Modulo de control de inventarios, productos y insumos', 'inventory/register', 1, '2024-04-25 22:30:30.146044', '2026-05-06 21:14:05.254622', 'fa-solid fa-clipboard-list', 3);
INSERT INTO public.modulo VALUES (7, 'Control de Acceso', 'Administracion centralizada de empresas, suscripciones, usuarios, roles y permisos por modulo.', 'access-control/dashboard', 1, '2026-05-07 00:12:44.038678', '2026-05-07 00:12:44.038678', 'fa-solid fa-user-shield', 7);


--
-- Data for Name: orden; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.orden VALUES (1, 'FA-VQP71-0', 1, 1, 1, 1, '2024-08-23 02:44:40.849', 7, NULL);
INSERT INTO public.orden VALUES (4, 'FA-ozc40-3', 1, 1, 2, 1, '2024-08-23 02:58:59.26', 8, NULL);
INSERT INTO public.orden VALUES (3, 'FA-Ulk71-2', 1, 1, 3, 6, '2024-08-23 02:57:20.598', 8, NULL);
INSERT INTO public.orden VALUES (2, 'FA-XAb17-1', 1, 1, 5, 1, '2024-08-23 02:45:06.232', 10, NULL);
INSERT INTO public.orden VALUES (5, 'FA-LKz79-4', 1, 2, 1, 1, '2024-08-23 06:18:35.59', 7, NULL);
INSERT INTO public.orden VALUES (6, 'FA-gEG14-5', 1, 1, 1, 1, '2024-08-23 14:50:10.999', 7, NULL);
INSERT INTO public.orden VALUES (7, 'FA-vKI59-6', 1, 2, 1, 1, '2024-08-23 15:35:54.316', 7, NULL);
INSERT INTO public.orden VALUES (9, 'FA-uoH98-8', 1, 1, 3, 6, '2024-08-23 15:48:42.255', 8, NULL);
INSERT INTO public.orden VALUES (10, 'FA-diC43-9', 1, 1, 4, 2, '2024-08-23 16:15:25.215', 8, NULL);
INSERT INTO public.orden VALUES (11, 'FA-ydU34-10', 1, 1, 1, 1, '2024-08-25 12:17:19.794', 7, NULL);
INSERT INTO public.orden VALUES (12, 'FA-dKP84-11', 1, 2, 5, 1, '2024-09-19 19:48:01.35', 10, NULL);
INSERT INTO public.orden VALUES (8, 'FA-qWZ26-7', 1, 1, 5, 1, '2024-08-23 15:43:48.563', 10, NULL);
INSERT INTO public.orden VALUES (13, 'FA-XMc84-12', 1, 1, 2, 1, '2024-09-22 20:25:45.309', 8, NULL);
INSERT INTO public.orden VALUES (14, 'FA-VHT31-13', 1, 1, 1, 1, '2024-10-05 00:26:32.91', 7, NULL);
INSERT INTO public.orden VALUES (16, 'FA-GoM63-15', 1, 1, 5, 1, '2024-10-05 19:45:04.43', 10, NULL);
INSERT INTO public.orden VALUES (15, 'FA-WID63-14', 1, 1, 3, 6, '2024-10-05 19:44:48.73', 8, NULL);
INSERT INTO public.orden VALUES (17, 'FA-SEV90-16', 1, 11, 1, 1, '2024-10-08 01:24:28.385', 7, NULL);
INSERT INTO public.orden VALUES (18, 'FA-KFT38-17', 1, 12, 1, 1, '2024-10-08 01:40:21.94', 7, NULL);
INSERT INTO public.orden VALUES (20, 'FA-XQD43-19', 1, 12, 1, 1, '2024-10-15 01:12:25.65', 7, NULL);
INSERT INTO public.orden VALUES (24, 'FA-iFm69-23', 1, 13, 3, 6, '2024-10-15 01:47:42.406', 8, NULL);
INSERT INTO public.orden VALUES (25, 'FA-pLP64-24', 1, 1, 2, 1, '2024-10-15 02:40:34.66', 8, NULL);
INSERT INTO public.orden VALUES (23, 'FA-Vlb89-22', 1, 1, 2, 1, '2024-10-15 01:37:17.531', 8, NULL);
INSERT INTO public.orden VALUES (22, 'FA-Lbu31-21', 1, 1, 2, 1, '2024-10-15 01:37:05.97', 8, NULL);
INSERT INTO public.orden VALUES (21, 'FA-YGk17-20', 1, 1, 2, 1, '2024-10-15 01:15:42.943', 8, NULL);
INSERT INTO public.orden VALUES (26, 'FA-hyx02-25', 1, 2, 4, 3, '2024-10-15 16:12:02.34', 8, NULL);
INSERT INTO public.orden VALUES (27, 'FA-OSa74-26', 1, 11, 2, 1, '2024-10-15 20:27:02.99', 8, NULL);
INSERT INTO public.orden VALUES (28, 'FA-KeC21-27', 1, 12, 4, 2, '2024-10-15 20:29:16.349', 8, NULL);
INSERT INTO public.orden VALUES (29, 'FA-YPT20-28', 1, 1, 5, 1, '2024-10-15 21:06:39.388', 10, NULL);
INSERT INTO public.orden VALUES (30, 'FA-Dab50-29', 1, 12, 1, 1, '2024-10-15 21:12:55.347', 7, NULL);
INSERT INTO public.orden VALUES (31, 'FA-zvo20-30', 1, 1, 1, 1, '2024-10-18 01:37:00.448', 7, NULL);
INSERT INTO public.orden VALUES (57, 'FA-nuS80-56', 1, 11, 5, 1, '2025-06-07 14:39:25.946', 9, 'Porque ya se pago en efectivo con otro aplicativo');
INSERT INTO public.orden VALUES (32, 'FA-RnJ49-31', 1, 11, 4, 2, '2024-10-18 11:27:58.805', 8, NULL);
INSERT INTO public.orden VALUES (33, 'FA-UkO69-32', 1, 13, 1, 1, '2024-10-18 11:32:10.52', 7, NULL);
INSERT INTO public.orden VALUES (35, 'FA-IBm70-34', 1, 11, 4, 4, '2024-10-18 23:56:53.45', 8, NULL);
INSERT INTO public.orden VALUES (59, 'FA-BkM50-58', 6, 15, 1, 1, '2025-06-07 16:04:02.967', 7, NULL);
INSERT INTO public.orden VALUES (34, 'FA-rqs95-33', 1, 14, 1, 1, '2024-10-18 23:55:38.5', 9, NULL);
INSERT INTO public.orden VALUES (36, 'FA-pqT11-35', 1, 1, 1, 1, '2024-10-20 22:05:57.996', 7, NULL);
INSERT INTO public.orden VALUES (60, 'FA-fvk99-59', 6, 16, 5, 1, '2025-06-07 16:19:01.709', 10, NULL);
INSERT INTO public.orden VALUES (38, 'FA-oMS44-37', 1, 11, 2, 1, '2024-10-28 11:44:31.82', 8, NULL);
INSERT INTO public.orden VALUES (42, 'FA-eMM14-41', 1, 1, 5, 1, '2025-01-18 00:22:05.273', 10, NULL);
INSERT INTO public.orden VALUES (43, 'FA-uWg55-42', 1, 1, 1, 1, '2025-02-06 15:27:23.988', 7, NULL);
INSERT INTO public.orden VALUES (61, 'FA-frC42-60', 6, 1, 2, 1, '2025-06-07 16:30:22.954', 8, NULL);
INSERT INTO public.orden VALUES (41, 'FA-Dub53-40', 1, 1, 1, 1, '2025-01-10 21:40:12.273', 9, 'Prueba anulación');
INSERT INTO public.orden VALUES (40, 'FA-qYI36-39', 1, 12, 1, 1, '2025-01-10 21:38:47.678', 9, 'Anular');
INSERT INTO public.orden VALUES (39, 'FA-Iax55-38', 1, 1, 1, 1, '2025-01-08 20:44:12.42', 9, 'Eliminar');
INSERT INTO public.orden VALUES (37, 'FA-qrp14-36', 1, 1, 5, 1, '2024-10-20 22:06:05.875', 9, 'Pruebas');
INSERT INTO public.orden VALUES (19, 'FA-iPH36-18', 1, 11, 1, 1, '2024-10-12 00:39:23.105', 9, 'hghghg');
INSERT INTO public.orden VALUES (44, 'FA-nEe66-43', 1, 1, 1, 1, '2025-02-25 12:28:18.851', 7, NULL);
INSERT INTO public.orden VALUES (45, 'FA-Oew71-44', 1, 1, 1, 1, '2025-02-25 12:29:54.487', 7, NULL);
INSERT INTO public.orden VALUES (46, 'FA-bCq86-45', 6, 1, 1, 1, '2025-02-25 12:35:32.347', 7, NULL);
INSERT INTO public.orden VALUES (47, 'FA-vaM40-46', 6, 11, 1, 1, '2025-02-27 15:19:53.357', 7, NULL);
INSERT INTO public.orden VALUES (48, 'FA-NFf89-47', 6, 12, 1, 1, '2025-03-02 22:51:37.238', 7, NULL);
INSERT INTO public.orden VALUES (49, 'FA-SXd63-48', 6, 1, 1, 1, '2025-03-02 22:54:43.61', 7, NULL);
INSERT INTO public.orden VALUES (50, 'FA-CBm98-49', 6, 1, 1, 1, '2025-03-02 23:16:42.161', 7, NULL);
INSERT INTO public.orden VALUES (51, 'FA-nsJ34-50', 6, 1, 1, 1, '2025-03-02 23:43:07.144', 7, NULL);
INSERT INTO public.orden VALUES (52, 'FA-QMf53-51', 6, 1, 1, 1, '2025-03-02 23:44:42.615', 7, NULL);
INSERT INTO public.orden VALUES (53, 'FA-ral11-52', 6, 1, 1, 1, '2025-03-02 23:56:59.633', 7, NULL);
INSERT INTO public.orden VALUES (54, 'FA-iXc16-53', 6, 1, 1, 1, '2025-03-04 11:46:19.757', 7, NULL);
INSERT INTO public.orden VALUES (55, 'FA-hgN41-54', 6, 1, 1, 1, '2025-03-04 12:15:43.673', 7, NULL);
INSERT INTO public.orden VALUES (56, 'FA-xNT47-55', 6, 1, 1, 1, '2025-03-04 12:25:42.959', 7, NULL);
INSERT INTO public.orden VALUES (82, 'FA-IWD80-81', 6, 1, 1, 1, '2026-01-21 11:13:52.302', 7, NULL);
INSERT INTO public.orden VALUES (58, 'FA-qBC30-57', 1, 15, 1, 1, '2025-06-07 14:42:49.586', 7, NULL);
INSERT INTO public.orden VALUES (62, 'FA-AKh80-61', 6, 1, 1, 1, '2025-06-22 18:53:31.393', 7, NULL);
INSERT INTO public.orden VALUES (63, 'FA-HMG23-62', 6, 1, 1, 1, '2025-06-22 20:45:48.97', 7, NULL);
INSERT INTO public.orden VALUES (64, 'FA-WOj28-63', 6, 1, 1, 1, '2025-06-22 20:54:38.324', 7, NULL);
INSERT INTO public.orden VALUES (65, 'FA-Apz63-64', 6, 1, 1, 1, '2025-06-22 20:59:38.875', 7, NULL);
INSERT INTO public.orden VALUES (66, 'FA-Zfe35-65', 6, 1, 1, 1, '2025-06-22 22:47:22.96', 7, NULL);
INSERT INTO public.orden VALUES (67, 'FA-Wgv12-66', 6, 1, 1, 1, '2025-06-22 23:55:14.65', 7, NULL);
INSERT INTO public.orden VALUES (68, 'FA-ztE95-67', 6, 1, 1, 1, '2025-06-22 23:57:09.107', 7, NULL);
INSERT INTO public.orden VALUES (69, 'FA-JRs38-68', 6, 16, 1, 1, '2025-06-23 02:50:49.1', 7, NULL);
INSERT INTO public.orden VALUES (70, 'FA-XYR28-69', 6, 1, 1, 1, '2025-06-23 03:09:03.53', 7, NULL);
INSERT INTO public.orden VALUES (72, 'FA-eVX03-71', 6, 1, 2, 1, '2025-06-23 17:42:05.841', 8, NULL);
INSERT INTO public.orden VALUES (71, 'FA-koC27-70', 6, 11, 5, 1, '2025-06-23 03:36:59.669', 10, NULL);
INSERT INTO public.orden VALUES (73, 'FA-TvG83-72', 6, 1, 1, 1, '2025-07-17 10:48:07.554', 9, 'Puebas');
INSERT INTO public.orden VALUES (74, 'FA-Mwz69-73', 6, 11, 1, 1, '2025-08-04 13:00:37.987', 7, NULL);
INSERT INTO public.orden VALUES (75, 'FA-nQX65-74', 6, 15, 2, 1, '2025-08-09 18:00:35.305', 8, NULL);
INSERT INTO public.orden VALUES (76, 'FA-HTM91-75', 6, 1, 2, 1, '2025-11-03 09:30:40.273', 8, NULL);
INSERT INTO public.orden VALUES (77, 'FA-pcg35-76', 6, 1, 1, 1, '2026-01-13 23:36:36.776', 7, NULL);
INSERT INTO public.orden VALUES (78, 'FA-lLL56-77', 6, 1, 1, 1, '2026-01-14 00:04:19.545', 7, NULL);
INSERT INTO public.orden VALUES (79, 'FA-iDW52-78', 6, 14, 5, 1, '2026-01-14 00:04:30.965', 10, NULL);
INSERT INTO public.orden VALUES (80, 'FA-dPL44-79', 6, 1, 1, 1, '2026-01-14 00:14:29.937', 7, NULL);
INSERT INTO public.orden VALUES (81, 'FA-rWF42-80', 6, 2, 1, 1, '2026-01-21 10:45:51.803', 7, NULL);
INSERT INTO public.orden VALUES (83, 'FA-Izb67-82', 6, 11, 1, 1, '2026-01-21 20:01:02.325', 7, NULL);
INSERT INTO public.orden VALUES (86, 'FA-sbt73-84', 6, 16, 1, 1, '2026-01-25 20:35:28.326', 7, NULL);
INSERT INTO public.orden VALUES (85, 'FA-DrT92-83', 6, 14, 1, 1, '2026-01-25 20:35:01.601', 9, 'Se anula porque no sirve');
INSERT INTO public.orden VALUES (87, 'FA-GWB92-85', 6, 1, 1, 1, '2026-01-25 20:58:34.886', 7, NULL);
INSERT INTO public.orden VALUES (88, 'FA-mWG24-86', 6, 13, 1, 1, '2026-01-25 21:02:09.426', 7, NULL);
INSERT INTO public.orden VALUES (89, 'FA-Oto84-87', 6, 1, 1, 1, '2026-01-25 21:03:12.297', 7, NULL);
INSERT INTO public.orden VALUES (90, 'FA-YQc17-88', 6, 1, 1, 1, '2026-01-25 21:55:47.677', 7, NULL);
INSERT INTO public.orden VALUES (91, 'FA-xKO40-89', 6, 1, 2, 1, '2026-01-25 21:56:48.759', 8, NULL);
INSERT INTO public.orden VALUES (92, 'FA-JuR68-90', 6, 1, 1, 1, '2026-01-28 14:51:52.664', 7, NULL);
INSERT INTO public.orden VALUES (93, 'FA-wOP27-91', 6, 1, 1, 1, '2026-03-07 23:20:42.914', 7, NULL);
INSERT INTO public.orden VALUES (94, 'FA-lTR27-92', 6, 1, 1, 1, '2026-03-07 23:22:10.588', 7, NULL);
INSERT INTO public.orden VALUES (95, 'FA-EZQ76-93', 6, 1, 1, 1, '2026-03-07 23:22:50.259', 7, NULL);
INSERT INTO public.orden VALUES (96, 'FA-szx73-94', 6, 1, 1, 1, '2026-03-07 23:25:08.593', 7, NULL);
INSERT INTO public.orden VALUES (97, 'FA-PJe82-95', 6, 1, 1, 1, '2026-03-07 23:30:56.359', 7, NULL);
INSERT INTO public.orden VALUES (98, 'FA-VDE62-96', 6, 1, 1, 1, '2026-03-07 23:32:37.39', 7, NULL);
INSERT INTO public.orden VALUES (99, 'FA-Tbi67-97', 6, 1, 1, 1, '2026-03-07 23:32:47.241', 7, NULL);
INSERT INTO public.orden VALUES (100, 'FA-vuP99-98', 6, 1, 1, 1, '2026-03-07 23:41:12.196', 7, NULL);
INSERT INTO public.orden VALUES (101, 'FA-JIl40-99', 6, 1, 1, 1, '2026-03-07 23:41:47.422', 7, NULL);
INSERT INTO public.orden VALUES (102, 'FA-xLl28-100', 6, 14, 1, 1, '2026-03-07 23:53:26.209', 7, NULL);
INSERT INTO public.orden VALUES (103, 'FA-clT69-101', 6, 1, 1, 1, '2026-03-08 00:09:43.589', 7, NULL);
INSERT INTO public.orden VALUES (104, 'FA-pWs62-102', 6, 1, 1, 1, '2026-03-08 00:41:03.225', 7, NULL);
INSERT INTO public.orden VALUES (105, 'FA-uQU86-103', 6, 1, 1, 1, '2026-05-06 17:46:41.78', 7, NULL);
INSERT INTO public.orden VALUES (106, 'FA-UkQ86-104', 6, 1, 1, 1, '2026-05-06 17:47:16.348', 7, NULL);
INSERT INTO public.orden VALUES (107, 'FA-EPE67-105', 1, 1, 1, 1, '2026-05-06 19:54:02.21', 7, NULL);
INSERT INTO public.orden VALUES (108, 'FA-TxQ62-106', 1, 1, 2, 1, '2026-05-06 21:44:30.279', 8, NULL);
INSERT INTO public.orden VALUES (109, 'FA-yhi61-107', 1, 14, 3, 6, '2026-05-07 18:30:23.697', 8, 'Stock insuficiente registrado para: Hamburguesa doble carne 250g''.');
INSERT INTO public.orden VALUES (110, 'FA-zVT39-108', 1, 2, 3, 6, '2026-05-11 15:45:13.74', 8, 'Stock insuficiente registrado para: Arroz, Hambuerguesa doble carne.');
INSERT INTO public.orden VALUES (112, 'FA-IRw69-110', 1, 1, 2, 1, '2026-05-11 16:25:29.439', 8, 'Stock insuficiente registrado para: Empanadas.');
INSERT INTO public.orden VALUES (113, 'FA-lyG85-111', 1, 1, 3, 6, '2026-05-11 16:26:55.176', 8, 'Stock insuficiente registrado para: Hamburguesa doble carne 250g''.');
INSERT INTO public.orden VALUES (114, 'FA-GOv51-112', 1, 1, 2, 1, '2026-05-11 16:30:54.124', 8, 'Stock insuficiente registrado para: Hamburguesa doble carne 250g''.');
INSERT INTO public.orden VALUES (111, 'FA-RMm60-109', 1, 1, 3, 6, '2026-05-11 16:13:31.121', 8, 'Stock insuficiente registrado para: Empanadas, New Yort premium.');
INSERT INTO public.orden VALUES (115, 'FA-KvA31-113', 1, 1, 3, 6, '2026-05-11 16:49:06.266', 8, NULL);
INSERT INTO public.orden VALUES (116, 'FA-usr11-114', 1, 1, 3, 6, '2026-05-11 16:50:01.468', 8, NULL);
INSERT INTO public.orden VALUES (117, 'FA-VYy87-115', 1, 1, 3, 6, '2026-05-11 19:27:54.824', 8, 'Stock insuficiente registrado para: Empanadas, New Yort premium.');
INSERT INTO public.orden VALUES (118, 'FA-UsL78-116', 1, 1, 1, 1, '2026-05-12 20:53:52.742', 7, NULL);
INSERT INTO public.orden VALUES (119, 'FA-SDR22-117', 1, 1, 3, 6, '2026-05-12 20:55:52.474', 8, 'Stock insuficiente registrado para: Empanadas, New Yort premium.');


--
-- Data for Name: paises; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.paises VALUES (1, 'Colombia', 1);


--
-- Data for Name: parametro_suscrito; Type: TABLE DATA; Schema: public; Owner: UsersDev
--

INSERT INTO public.parametro_suscrito VALUES (1, 2, 'empresa', 'nombre_comercial', 'Marwee', 'texto', 'Nombre visible en pantallas, reportes y documentos.', 1, '2026-05-06 23:54:35.631', NULL);
INSERT INTO public.parametro_suscrito VALUES (2, 2, 'empresa', 'nit', '901919319-1', 'texto', 'NIT o documento fiscal del negocio.', 1, '2026-05-06 23:55:05.459', NULL);
INSERT INTO public.parametro_suscrito VALUES (3, 2, 'empresa', 'telefono', '3177555798', 'texto', 'Numero principal para atencion o soporte.', 1, '2026-05-06 23:55:06.823', '2026-05-06 23:55:20.567');
INSERT INTO public.parametro_suscrito VALUES (4, 2, 'perifericos', 'habilitar_perifericos', 'true', 'booleano', 'Muestra y habilita impresora, datáfono, agente local y bitácoras de periféricos.', 1, '2026-05-11 21:09:23.625', '2026-05-12 22:03:38.945');


--
-- Data for Name: payment_method_config; Type: TABLE DATA; Schema: public; Owner: UsersDev
--

INSERT INTO public.payment_method_config VALUES (1, 2, NULL, 'Efectivo', 'cash', 'fa-solid fa-money-bill-wave', '#2c8e84', 1, false, false, false, NULL, NULL, NULL, NULL, 2, 1, false, true, 1, '2026-05-11 12:36:15.447-05', NULL);
INSERT INTO public.payment_method_config VALUES (2, 2, NULL, 'Tarjeta / Datáfono', 'terminal', 'fa-solid fa-credit-card', '#2c8e84', 2, false, false, false, NULL, NULL, NULL, NULL, 3, 1, false, true, 1, '2026-05-11 12:36:15.447-05', NULL);
INSERT INTO public.payment_method_config VALUES (3, 2, NULL, 'Transferencia', 'transfer', 'fa-solid fa-building-columns', '#2c8e84', 3, true, true, false, NULL, NULL, NULL, NULL, 4, 1, false, true, 1, '2026-05-11 12:36:15.447-05', NULL);
INSERT INTO public.payment_method_config VALUES (4, 2, NULL, 'Credito', 'credit', 'fa-solid fa-handshake', '#2c8e84', 4, false, false, false, NULL, NULL, NULL, NULL, 5, 1, false, true, 1, '2026-05-11 12:36:15.447-05', NULL);
INSERT INTO public.payment_method_config VALUES (5, 2, NULL, 'Bre-B / Llave', 'breb', 'fa-solid fa-bolt', '#2c8e84', 30, true, true, true, 'Llave Bre-B', NULL, NULL, 'Pide al cliente transferir desde el boton Bre-B de su entidad y confirma cuando recibas la notificacion.', 2, 1, false, true, 1, '2026-05-11 12:36:15.447-05', NULL);
INSERT INTO public.payment_method_config VALUES (6, 2, NULL, 'QR de pago', 'qr', 'fa-solid fa-qrcode', '#2c8e84', 31, true, true, true, 'QR comercio', NULL, NULL, 'Muestra el QR y confirma manualmente cuando el pago sea recibido.', 2, 1, false, true, 1, '2026-05-11 12:36:15.447-05', NULL);
INSERT INTO public.payment_method_config VALUES (7, 2, NULL, 'Nequi', 'wallet', 'fa-solid fa-mobile-screen-button', '#2c8e84', 32, true, true, false, 'Numero Nequi', NULL, NULL, 'Confirma en la app o notificacion antes de cerrar la orden.', 2, 1, false, true, 1, '2026-05-11 12:36:15.447-05', NULL);
INSERT INTO public.payment_method_config VALUES (8, 2, NULL, 'Daviplata', 'wallet', 'fa-solid fa-mobile-screen-button', '#2c8e84', 33, true, true, false, 'Numero Daviplata', NULL, NULL, 'Confirma en la app o notificacion antes de cerrar la orden.', 2, 1, false, true, 1, '2026-05-11 12:36:15.447-05', NULL);
INSERT INTO public.payment_method_config VALUES (10, 2, NULL, 'Pago mixto', 'mixed', 'fa-solid fa-layer-group', '#2c8e84', 90, false, true, false, NULL, NULL, NULL, 'Preparado para dividir pagos en una fase posterior.', 2, 1, false, false, 1, '2026-05-11 12:36:15.447-05', NULL);
INSERT INTO public.payment_method_config VALUES (9, 2, NULL, 'PSE / Link de pago', 'link', 'fa-solid fa-link', '#2c8e84', 34, true, true, false, 'Link de pago', NULL, NULL, 'Comparte el link y confirma manualmente cuando el proveedor reporte aprobado.', 2, 1, false, false, 1, '2026-05-11 12:36:15.447-05', '2026-05-11 12:54:45.447-05');


--
-- Data for Name: payment_transaction_detail; Type: TABLE DATA; Schema: public; Owner: UsersDev
--

INSERT INTO public.payment_transaction_detail VALUES (1, 2, 116, 'FA-usr11-114', 2, 'Tarjeta / Datáfono', 'terminal', NULL, NULL, 'confirmed', 8500.00, '{"qr_value": null, "instructions": null, "account_label": null}', 1, 1, '2026-05-11 13:54:52.817-05');
INSERT INTO public.payment_transaction_detail VALUES (2, 2, 117, 'FA-VYy87-115', 2, 'Tarjeta / Datáfono', 'terminal', NULL, NULL, 'confirmed', 160000.00, '{"qr_value": null, "instructions": null, "account_label": null}', 1, 1, '2026-05-11 16:12:07.193-05');
INSERT INTO public.payment_transaction_detail VALUES (3, 2, 119, 'FA-SDR22-117', 2, 'Tarjeta / Datáfono', 'terminal', NULL, NULL, 'confirmed', 160000.00, '{"qr_value": null, "instructions": null, "account_label": null}', 1, 1, '2026-05-12 17:00:23.224-05');


--
-- Data for Name: peripheral_config; Type: TABLE DATA; Schema: public; Owner: UsersDev
--

INSERT INTO public.peripheral_config VALUES (1, 2, NULL, 'local-agent', 'http://localhost:8765', 'POS-58', 'thermal', true, 'pending-provider', false, 1, 1, '2026-05-11 11:15:17.02-05', '2026-05-12 17:04:49.263-05');


--
-- Data for Name: peripheral_event; Type: TABLE DATA; Schema: public; Owner: UsersDev
--

INSERT INTO public.peripheral_event VALUES (1, NULL, 112, 'FA-IRw69-110', 'payment', 'approved', NULL, NULL, 'web', NULL, 'Pago registrado en la plataforma despues de respuesta del datáfono.', NULL, 1, 2, 1, '2026-05-11 11:26:00.449-05');
INSERT INTO public.peripheral_event VALUES (2, NULL, 112, 'FA-IRw69-110', 'print', 'failed', NULL, NULL, 'web', NULL, 'Agente local no disponible. Se usará impresión del navegador.', '{"mode": "web", "message": "Agente local no disponible. Se usará impresión del navegador.", "success": false}', 1, 2, 1, '2026-05-11 11:26:03.196-05');
INSERT INTO public.peripheral_event VALUES (3, NULL, 113, 'FA-lyG85-111', 'payment', 'approved', NULL, NULL, 'simulation', NULL, 'Datáfono simulado aprobo la transaccion.', NULL, 1, 2, 1, '2026-05-11 11:27:41.932-05');
INSERT INTO public.peripheral_event VALUES (4, NULL, 113, 'FA-lyG85-111', 'payment', 'approved', NULL, NULL, 'simulation', NULL, 'Pago registrado en la plataforma despues de respuesta del datáfono.', NULL, 1, 2, 1, '2026-05-11 11:27:48.16-05');
INSERT INTO public.peripheral_event VALUES (5, NULL, 113, 'FA-lyG85-111', 'print', 'success', NULL, NULL, 'simulation', NULL, 'Comprobante FA-lyG85-111 recibido por impresora simulada.', '{"mode": "simulation", "message": "Comprobante FA-lyG85-111 recibido por impresora simulada.", "success": true}', 1, 2, 1, '2026-05-11 11:27:48.358-05');
INSERT INTO public.peripheral_event VALUES (6, NULL, 114, 'FA-GOv51-112', 'payment', 'rejected', NULL, NULL, 'simulation', NULL, 'Datáfono simulado rechazo la transaccion.', NULL, 1, 2, 1, '2026-05-11 11:31:03.77-05');
INSERT INTO public.peripheral_event VALUES (7, NULL, 114, 'FA-GOv51-112', 'payment', 'rejected', NULL, NULL, 'simulation', NULL, 'Datáfono simulado rechazo la transaccion.', NULL, 1, 2, 1, '2026-05-11 11:32:03.222-05');
INSERT INTO public.peripheral_event VALUES (8, NULL, 114, 'FA-GOv51-112', 'payment', 'cancelled', NULL, NULL, 'simulation', NULL, 'Transaccion cancelada en datáfono simulado.', NULL, 1, 2, 1, '2026-05-11 11:33:07.731-05');
INSERT INTO public.peripheral_event VALUES (9, NULL, 112, 'FA-IRw69-110', 'print', 'success', NULL, NULL, 'local-agent', NULL, 'Comprobante FA-IRw69-110 recibido por impresora simulada.', '{"mode": "local-agent", "message": "Comprobante FA-IRw69-110 recibido por impresora simulada.", "success": true}', 1, 2, 1, '2026-05-11 11:37:55.762-05');
INSERT INTO public.peripheral_event VALUES (10, NULL, 114, 'FA-GOv51-112', 'payment', 'approved', NULL, NULL, 'local-agent', NULL, 'Pago registrado en la plataforma despues de respuesta del datáfono.', NULL, 1, 2, 1, '2026-05-11 11:40:53.919-05');
INSERT INTO public.peripheral_event VALUES (11, NULL, 114, 'FA-GOv51-112', 'print', 'success', NULL, NULL, 'local-agent', NULL, 'Comprobante FA-GOv51-112 recibido por impresora simulada.', '{"mode": "local-agent", "message": "Comprobante FA-GOv51-112 recibido por impresora simulada.", "success": true}', 1, 2, 1, '2026-05-11 11:40:54.175-05');
INSERT INTO public.peripheral_event VALUES (12, NULL, 111, 'FA-RMm60-109', 'payment', 'approved', NULL, NULL, 'local-agent', NULL, 'Pago registrado en la plataforma despues de respuesta del datáfono.', NULL, 1, 2, 1, '2026-05-11 11:48:40.959-05');
INSERT INTO public.peripheral_event VALUES (13, NULL, 111, 'FA-RMm60-109', 'print', 'success', NULL, NULL, 'local-agent', NULL, 'Comprobante FA-RMm60-109 recibido por impresora simulada.', '{"mode": "local-agent", "message": "Comprobante FA-RMm60-109 recibido por impresora simulada.", "success": true}', 1, 2, 1, '2026-05-11 11:48:41.231-05');
INSERT INTO public.peripheral_event VALUES (14, NULL, 115, 'FA-KvA31-113', 'payment', 'approved', NULL, NULL, 'web', NULL, 'Pago registrado en la plataforma despues de respuesta del datáfono.', NULL, 1, 2, 1, '2026-05-11 11:49:36.647-05');
INSERT INTO public.peripheral_event VALUES (15, NULL, 115, 'FA-KvA31-113', 'print', 'failed', NULL, NULL, 'web', NULL, 'Agente local no disponible. Se usará impresión del navegador.', '{"mode": "web", "message": "Agente local no disponible. Se usará impresión del navegador.", "success": false}', 1, 2, 1, '2026-05-11 11:49:39.504-05');
INSERT INTO public.peripheral_event VALUES (16, NULL, 116, 'FA-usr11-114', 'payment', 'cancelled', NULL, NULL, 'simulation', NULL, 'Transaccion cancelada en datáfono simulado.', NULL, 1, 2, 1, '2026-05-11 11:50:09.534-05');
INSERT INTO public.peripheral_event VALUES (17, NULL, 116, 'FA-usr11-114', 'payment', 'cancelled', NULL, NULL, 'simulation', NULL, 'Transaccion cancelada en datáfono simulado.', NULL, 1, 2, 1, '2026-05-11 12:57:54.609-05');
INSERT INTO public.peripheral_event VALUES (18, NULL, 116, 'FA-usr11-114', 'payment', 'approved', NULL, NULL, 'simulation', NULL, 'Datáfono simulado aprobo la transaccion.', NULL, 1, 2, 1, '2026-05-11 13:54:45.892-05');
INSERT INTO public.peripheral_event VALUES (19, NULL, 116, 'FA-usr11-114', 'payment', 'approved', NULL, NULL, 'simulation', NULL, 'Pago registrado en la plataforma despues de respuesta del datáfono.', NULL, 1, 2, 1, '2026-05-11 13:54:52.319-05');
INSERT INTO public.peripheral_event VALUES (20, NULL, 116, 'FA-usr11-114', 'print', 'success', NULL, NULL, 'simulation', NULL, 'Comprobante FA-usr11-114 recibido por impresora simulada.', '{"mode": "simulation", "message": "Comprobante FA-usr11-114 recibido por impresora simulada.", "success": true}', 1, 2, 1, '2026-05-11 13:54:52.974-05');
INSERT INTO public.peripheral_event VALUES (21, NULL, 116, 'FA-usr11-114', 'print', 'success', NULL, NULL, 'simulation', NULL, 'Comprobante FA-usr11-114 recibido por impresora simulada.', '{"mode": "simulation", "message": "Comprobante FA-usr11-114 recibido por impresora simulada.", "success": true}', 1, 2, 1, '2026-05-11 14:16:50.86-05');
INSERT INTO public.peripheral_event VALUES (22, NULL, 117, 'FA-VYy87-115', 'payment', 'approved', NULL, NULL, NULL, NULL, 'Pago registrado en la plataforma despues de respuesta del datáfono.', NULL, 1, 2, 1, '2026-05-11 16:12:06.728-05');
INSERT INTO public.peripheral_event VALUES (23, NULL, 119, 'FA-SDR22-117', 'payment', 'approved', NULL, NULL, 'simulation', NULL, 'Datáfono simulado aprobo la transaccion.', NULL, 1, 2, 1, '2026-05-12 17:00:15.771-05');
INSERT INTO public.peripheral_event VALUES (24, NULL, 119, 'FA-SDR22-117', 'payment', 'approved', NULL, NULL, 'simulation', NULL, 'Pago registrado en la plataforma despues de respuesta del datáfono.', NULL, 1, 2, 1, '2026-05-12 17:00:22.636-05');
INSERT INTO public.peripheral_event VALUES (25, NULL, 119, 'FA-SDR22-117', 'print', 'success', NULL, NULL, 'simulation', NULL, 'Comprobante FA-SDR22-117 recibido por impresora simulada.', '{"mode": "simulation", "message": "Comprobante FA-SDR22-117 recibido por impresora simulada.", "success": true}', 1, 2, 1, '2026-05-12 17:00:23.233-05');
INSERT INTO public.peripheral_event VALUES (26, NULL, 119, 'FA-SDR22-117', 'print', 'success', NULL, NULL, 'simulation', NULL, 'Comprobante FA-SDR22-117 recibido por impresora simulada.', '{"mode": "simulation", "message": "Comprobante FA-SDR22-117 recibido por impresora simulada.", "success": true}', 1, 2, 1, '2026-05-12 17:04:18.769-05');
INSERT INTO public.peripheral_event VALUES (27, NULL, 119, 'FA-SDR22-117', 'print', 'failed', NULL, NULL, 'web', NULL, 'Agente local no disponible. Se usará impresión del navegador.', '{"mode": "web", "message": "Agente local no disponible. Se usará impresión del navegador.", "success": false}', 1, 2, 1, '2026-05-12 17:05:10.717-05');
INSERT INTO public.peripheral_event VALUES (28, NULL, NULL, 'FC-1778637520599', 'print', 'failed', NULL, NULL, 'web', NULL, 'Agente local no disponible. Se usará impresión del navegador.', '{"mode": "web", "message": "Agente local no disponible. Se usará impresión del navegador.", "success": false}', 1, 2, 1, '2026-05-12 17:10:00.863-05');


--
-- Data for Name: permiso_componente; Type: TABLE DATA; Schema: public; Owner: UsersDev
--

INSERT INTO public.permiso_componente VALUES (1, 1, 1, NULL, 'validacion_auditoria', false, 2, '2026-05-07 14:15:36.679', '2026-05-07 14:15:36.942');


--
-- Data for Name: planes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.planes VALUES (3, 'Basico', 1, 600000, '2024-07-14 00:00:00', 'Plan basico: Incluye los modulos generales de  control de ventas y gastos.', 'Año');


--
-- Data for Name: producto; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.producto VALUES (1, 'Hamburguesa doble carne 250g''', 'Carne 100% de res, tocineta y salsa de la casa.', 25500, 3, 1, 'fb-152', NULL);
INSERT INTO public.producto VALUES (2, 'Palitos de queso', '6 palitos rellenos de queso con salsa agridulce.', 8500, 2, 1, 'fb-153', NULL);
INSERT INTO public.producto VALUES (3, 'New Yort premium', 'Corte de carne premium 250g de res.', 150000, 3, 1, 'fb-154', NULL);
INSERT INTO public.producto VALUES (5, 'Empanadas', 'Empanadas de pollo - 5 unidades', 10000, 2, 1, '1-2-42025', NULL);
INSERT INTO public.producto VALUES (6, 'Carne asada', '250gr de carne de res', 23000, 3, 1, '1-3-52025', NULL);
INSERT INTO public.producto VALUES (7, 'Gaseosa Pepsi 350ml', 'Gaseo personal', 5000, 4, 1, '1-4-62025', NULL);
INSERT INTO public.producto VALUES (8, 'Manzana', '2 libras', 5000, 2, 1, '1-2-72025', NULL);
INSERT INTO public.producto VALUES (11, 'sss', 'sdsd sddsf fdfd gfg f', 10000, 3, 1, '1-3-102026', 'http://localhost:3000/uploads/products/1769412989009-679397760.jfif');
INSERT INTO public.producto VALUES (9, 'Arroz', 'Arroz de pollo', 12000, 3, 1, '1-3-82026', 'http://localhost:3000/uploads/products/1769412443923-170789572.png');
INSERT INTO public.producto VALUES (10, 'Hambuerguesa doble carne', 'Hamburguesa de carne de res y pollo', 41000, 3, 1, '1-3-92026', 'http://localhost:3000/uploads/products/1769412905723-259210692.jfif');
INSERT INTO public.producto VALUES (12, 'Pan', 'Pan con ques', 5000, 2, 1, '1-2-112026', 'http://localhost:3000/uploads/products/1769629879081-703035177.jfif');
INSERT INTO public.producto VALUES (13, 'test', 'Producto test', 100, 2, 1, '1-2-122026', 'http://localhost:3000/uploads/products/1778115877181-63197731.jpg');
INSERT INTO public.producto VALUES (4, 'Wayu', 'Corte de carne premium 250g de res japon.', 600000, 3, 1, 'fb-155', NULL);


--
-- Data for Name: proveedores; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.proveedores VALUES (1, 'Marwee', 'Empresa de tecnologia', '901919319', '3177555798', '2026-05-06 18:52:26.13', 1);


--
-- Data for Name: recurso_desarrollo; Type: TABLE DATA; Schema: public; Owner: UsersDev
--



--
-- Data for Name: reportes; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: reservamesa; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: rol; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.rol VALUES (1, 'ADMIN', 'Administrador', 1);
INSERT INTO public.rol VALUES (2, 'DEV', 'Desarrollador', 1);
INSERT INTO public.rol VALUES (3, 'MANAGER', 'Gerencial', 1);
INSERT INTO public.rol VALUES (4, 'OPERATOR', 'Operaciones', 1);
INSERT INTO public.rol VALUES (6, 'SUPPORT', 'Soporte', 1);
INSERT INTO public.rol VALUES (7, 'DEMO', 'Usuario beta', 1);
INSERT INTO public.rol VALUES (8, 'SUPER ADMIN', 'Acceso total a administracion centralizada, empresas, usuarios, roles, permisos y modulos.', 1);
INSERT INTO public.rol VALUES (5, 'ACCOUNTANT', 'Contabilidad', 2);


--
-- Data for Name: rol_modulo; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.rol_modulo VALUES (4, 1, 1, '2026-05-07 00:12:44.038678', NULL);
INSERT INTO public.rol_modulo VALUES (4, 3, 1, '2026-05-07 00:12:44.038678', NULL);
INSERT INTO public.rol_modulo VALUES (4, 5, 1, '2026-05-07 00:12:44.038678', NULL);
INSERT INTO public.rol_modulo VALUES (2, 1, 1, '2026-05-07 00:12:44.038678', NULL);
INSERT INTO public.rol_modulo VALUES (2, 2, 1, '2026-05-07 00:12:44.038678', NULL);
INSERT INTO public.rol_modulo VALUES (2, 3, 1, '2026-05-07 00:12:44.038678', NULL);
INSERT INTO public.rol_modulo VALUES (2, 4, 1, '2026-05-07 00:12:44.038678', NULL);
INSERT INTO public.rol_modulo VALUES (2, 5, 1, '2026-05-07 00:12:44.038678', NULL);
INSERT INTO public.rol_modulo VALUES (2, 6, 1, '2026-05-07 00:12:44.038678', NULL);
INSERT INTO public.rol_modulo VALUES (8, 2, 1, '2026-05-07 00:22:10.457287', NULL);
INSERT INTO public.rol_modulo VALUES (8, 3, 1, '2026-05-07 00:22:10.457287', NULL);
INSERT INTO public.rol_modulo VALUES (8, 1, 1, '2026-05-07 00:22:10.457287', NULL);
INSERT INTO public.rol_modulo VALUES (8, 4, 1, '2026-05-07 00:22:10.457287', NULL);
INSERT INTO public.rol_modulo VALUES (8, 6, 1, '2026-05-07 00:22:10.457287', NULL);
INSERT INTO public.rol_modulo VALUES (8, 5, 1, '2026-05-07 00:22:10.457287', NULL);
INSERT INTO public.rol_modulo VALUES (8, 7, 1, '2026-05-07 00:22:10.457287', NULL);
INSERT INTO public.rol_modulo VALUES (3, 3, 1, '2026-05-07 01:42:42.514', NULL);
INSERT INTO public.rol_modulo VALUES (3, 1, 1, '2026-05-07 01:42:42.514', NULL);
INSERT INTO public.rol_modulo VALUES (3, 4, 1, '2026-05-07 01:42:42.514', NULL);
INSERT INTO public.rol_modulo VALUES (3, 5, 1, '2026-05-07 01:42:42.514', NULL);
INSERT INTO public.rol_modulo VALUES (7, 3, 1, '2026-05-07 00:12:44.038678', '2026-05-07 02:04:20.42');
INSERT INTO public.rol_modulo VALUES (7, 1, 1, '2026-05-07 00:12:44.038678', '2026-05-07 02:04:20.42');
INSERT INTO public.rol_modulo VALUES (7, 4, 2, '2026-05-07 00:36:55.526', '2026-05-07 02:04:20.42');
INSERT INTO public.rol_modulo VALUES (7, 5, 2, '2026-05-07 00:36:55.526', '2026-05-07 02:04:20.42');
INSERT INTO public.rol_modulo VALUES (1, 2, 2, '2026-05-07 00:12:44.038678', '2026-05-11 18:49:24.944');
INSERT INTO public.rol_modulo VALUES (1, 3, 1, '2026-05-07 00:12:44.038678', '2026-05-11 18:49:24.944');
INSERT INTO public.rol_modulo VALUES (1, 1, 1, '2026-05-07 00:12:44.038678', '2026-05-11 18:49:24.944');
INSERT INTO public.rol_modulo VALUES (1, 5, 1, '2026-05-07 00:12:44.038678', '2026-05-11 18:49:24.944');


--
-- Data for Name: stock; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.stock VALUES (5, 6, 0, NULL);
INSERT INTO public.stock VALUES (6, 7, 0, NULL);
INSERT INTO public.stock VALUES (7, 8, 0, NULL);
INSERT INTO public.stock VALUES (8, 11, 0, NULL);
INSERT INTO public.stock VALUES (11, 12, 0, NULL);
INSERT INTO public.stock VALUES (13, 4, 1, NULL);
INSERT INTO public.stock VALUES (12, 13, 2, NULL);
INSERT INTO public.stock VALUES (9, 9, -1, NULL);
INSERT INTO public.stock VALUES (10, 10, -1, NULL);
INSERT INTO public.stock VALUES (2, 2, 5, NULL);
INSERT INTO public.stock VALUES (1, 1, 5, NULL);
INSERT INTO public.stock VALUES (4, 5, -4, NULL);
INSERT INTO public.stock VALUES (3, 3, -3, NULL);


--
-- Data for Name: subtipopago; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.subtipopago VALUES (1, 'No definido', 1, 0);
INSERT INTO public.subtipopago VALUES (2, 'Nequi', 4, 1);
INSERT INTO public.subtipopago VALUES (3, 'Daviplata', 4, 1);
INSERT INTO public.subtipopago VALUES (6, 'Débito', 3, 1);
INSERT INTO public.subtipopago VALUES (4, 'Banco', 4, 1);
INSERT INTO public.subtipopago VALUES (5, 'Otro', 4, 1);
INSERT INTO public.subtipopago VALUES (7, 'Crédito', 3, 1);


--
-- Data for Name: suscritos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.suscritos VALUES (1, 'Marwee', '3177555798', 'marwee@hotmail.com', 'mar', 3, '2024-07-14 00:00:00', '2024-07-14 13:01:23.363522', '2025-07-14 00:00:00', 1, '1024563320', 'assets/img/client/marw_logo_home.png');
INSERT INTO public.suscritos VALUES (3, 'Fundación puente digital', '3177555798', 'nega_0002@hotmail.com', 'FUNDACINPUEN-31155', 3, '2026-05-07 01:02:11.155', '2026-05-07 01:02:11.155', '2026-05-07 00:00:00', 1, '1016594007', 'assets/img/client/puenteicono.png');
INSERT INTO public.suscritos VALUES (4, 'Monograph', '3153409078', 'jorgeovallea23@gmail.com', 'MONOGRAPH-56973', 3, '2026-05-08 20:04:16.972', '2026-05-08 20:04:16.972', '2026-05-09 00:00:00', 1, '1024522840', NULL);
INSERT INTO public.suscritos VALUES (2, 'DevMarwee', '3177555798', 'ifga_0002@hotmail.com', 'test', 3, '2024-07-14 00:00:00', '2024-10-05 03:42:20.136611', '2025-07-14 00:00:00', 1, '1024563320', 'assets/img/client/logotipofondo.jpg');


--
-- Data for Name: tipopago; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tipopago VALUES (1, 'No definido', 0, 'ND');
INSERT INTO public.tipopago VALUES (2, 'Efectivo', 1, 'EF');
INSERT INTO public.tipopago VALUES (3, 'Tarjeta / Datáfono', 1, 'TJ');
INSERT INTO public.tipopago VALUES (4, 'Transferencia', 1, 'TF');
INSERT INTO public.tipopago VALUES (5, 'Credito', 1, 'CR');


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.usuarios VALUES (1, 'ivagomal', '$2b$12$DeaelQWWLrFKwYu7tsM8s.bT/Mxs9n.x2TQcXHcy1iKQ8rjHuD2ay', 1, 8, 1, '2023-09-25 20:33:11.798', '2026-05-07 00:22:10.457287', 2, 1);
INSERT INTO public.usuarios VALUES (2, 'negomeza', '$2b$12$4wonaoe5h5uwGSn4qBB7Ru05GAXt2kN.rzE4yP7dLFjnqxeXKT4We', 2, 3, 1, '2023-09-25 20:34:31.264', '2026-05-07 01:41:42.962', 3, 1);
INSERT INTO public.usuarios VALUES (6, 'admin', '$2b$12$hhMQEQqdGqs64L1TAAgfVeKYq7.JYurstGjI4L9iKcnWUNU4pYaf.', 3, 7, 1, '2023-09-26 00:04:33.858', '2026-05-07 12:10:53.781', 1, 1);
INSERT INTO public.usuarios VALUES (7, 'jorova', '$2b$12$NwZE1JyWIMdkS1RRlwwW5.2BX6rSCZ6UARJpyu76Z8OTfmrIxJxQ2', 4, 3, 1, '2026-05-08 20:05:43.999', NULL, 4, NULL);


--
-- Name: auditoria_evento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: UsersDev
--

SELECT pg_catalog.setval('public.auditoria_evento_id_seq', 13, true);


--
-- Name: categoriaproducto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categoriaproducto_id_seq', 7, true);


--
-- Name: cliente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cliente_id_seq', 16, true);


--
-- Name: colaborador_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.colaborador_id_seq', 4, true);


--
-- Name: componente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.componente_id_seq', 1, false);


--
-- Name: compras_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.compras_id_seq', 3, true);


--
-- Name: detallecompra_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detallecompra_id_seq', 3, true);


--
-- Name: detalleorden_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalleorden_id_seq', 242, true);


--
-- Name: estado_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.estado_id_seq', 10, true);


--
-- Name: mesa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mesa_id_seq', 7, true);


--
-- Name: modulo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.modulo_id_seq', 8, true);


--
-- Name: orden_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orden_id_seq', 119, true);


--
-- Name: paises_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.paises_id_seq', 1, true);


--
-- Name: parametro_suscrito_id_seq; Type: SEQUENCE SET; Schema: public; Owner: UsersDev
--

SELECT pg_catalog.setval('public.parametro_suscrito_id_seq', 4, true);


--
-- Name: payment_method_config_id_seq; Type: SEQUENCE SET; Schema: public; Owner: UsersDev
--

SELECT pg_catalog.setval('public.payment_method_config_id_seq', 10, true);


--
-- Name: payment_transaction_detail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: UsersDev
--

SELECT pg_catalog.setval('public.payment_transaction_detail_id_seq', 3, true);


--
-- Name: peripheral_config_id_seq; Type: SEQUENCE SET; Schema: public; Owner: UsersDev
--

SELECT pg_catalog.setval('public.peripheral_config_id_seq', 1, true);


--
-- Name: peripheral_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: UsersDev
--

SELECT pg_catalog.setval('public.peripheral_event_id_seq', 28, true);


--
-- Name: permiso_componente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: UsersDev
--

SELECT pg_catalog.setval('public.permiso_componente_id_seq', 1, true);


--
-- Name: planes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.planes_id_seq', 3, true);


--
-- Name: producto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.producto_id_seq', 13, true);


--
-- Name: proveedores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proveedores_id_seq', 1, true);


--
-- Name: recurso_desarrollo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: UsersDev
--

SELECT pg_catalog.setval('public.recurso_desarrollo_id_seq', 1, false);


--
-- Name: reportes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reportes_id_seq', 1, false);


--
-- Name: reservamesa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservamesa_id_seq', 1, true);


--
-- Name: rol_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rol_id_seq', 8, true);


--
-- Name: stock_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stock_id_seq', 13, true);


--
-- Name: subtipopago_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subtipopago_id_seq', 7, true);


--
-- Name: suscritos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.suscritos_id_seq', 4, true);


--
-- Name: tipopago_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipopago_id_seq', 5, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 7, true);


--
-- Name: auditoria_evento auditoria_evento_pkey; Type: CONSTRAINT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.auditoria_evento
    ADD CONSTRAINT auditoria_evento_pkey PRIMARY KEY (id);


--
-- Name: authorizationtoken authorizationtoken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authorizationtoken
    ADD CONSTRAINT authorizationtoken_pkey PRIMARY KEY (token_privado);


--
-- Name: categoriaproducto categoriaproducto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoriaproducto
    ADD CONSTRAINT categoriaproducto_pkey PRIMARY KEY (id);


--
-- Name: cliente cliente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id);


--
-- Name: colaborador colaborador_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colaborador
    ADD CONSTRAINT colaborador_pkey PRIMARY KEY (id);


--
-- Name: componente componente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.componente
    ADD CONSTRAINT componente_pkey PRIMARY KEY (id);


--
-- Name: compras compras_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compras
    ADD CONSTRAINT compras_pkey PRIMARY KEY (id);


--
-- Name: detallecompra detallecompra_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallecompra
    ADD CONSTRAINT detallecompra_pkey PRIMARY KEY (id);


--
-- Name: detalleorden detalleorden_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalleorden
    ADD CONSTRAINT detalleorden_pkey PRIMARY KEY (id);


--
-- Name: estado estado_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estado
    ADD CONSTRAINT estado_pkey PRIMARY KEY (id);


--
-- Name: mesa mesa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mesa
    ADD CONSTRAINT mesa_pkey PRIMARY KEY (id);


--
-- Name: modulo modulo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modulo
    ADD CONSTRAINT modulo_pkey PRIMARY KEY (id);


--
-- Name: orden orden_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orden
    ADD CONSTRAINT orden_pkey PRIMARY KEY (id);


--
-- Name: paises paises_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paises
    ADD CONSTRAINT paises_pkey PRIMARY KEY (id);


--
-- Name: parametro_suscrito parametro_suscrito_pkey; Type: CONSTRAINT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.parametro_suscrito
    ADD CONSTRAINT parametro_suscrito_pkey PRIMARY KEY (id);


--
-- Name: payment_method_config payment_method_config_pkey; Type: CONSTRAINT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.payment_method_config
    ADD CONSTRAINT payment_method_config_pkey PRIMARY KEY (id);


--
-- Name: payment_transaction_detail payment_transaction_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.payment_transaction_detail
    ADD CONSTRAINT payment_transaction_detail_pkey PRIMARY KEY (id);


--
-- Name: peripheral_config peripheral_config_pkey; Type: CONSTRAINT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.peripheral_config
    ADD CONSTRAINT peripheral_config_pkey PRIMARY KEY (id);


--
-- Name: peripheral_event peripheral_event_pkey; Type: CONSTRAINT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.peripheral_event
    ADD CONSTRAINT peripheral_event_pkey PRIMARY KEY (id);


--
-- Name: permiso_componente permiso_componente_pkey; Type: CONSTRAINT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.permiso_componente
    ADD CONSTRAINT permiso_componente_pkey PRIMARY KEY (id);


--
-- Name: planes planes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planes
    ADD CONSTRAINT planes_pkey PRIMARY KEY (id);


--
-- Name: producto producto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (id);


--
-- Name: proveedores proveedores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedores
    ADD CONSTRAINT proveedores_pkey PRIMARY KEY (id);


--
-- Name: recurso_desarrollo recurso_desarrollo_pkey; Type: CONSTRAINT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.recurso_desarrollo
    ADD CONSTRAINT recurso_desarrollo_pkey PRIMARY KEY (id);


--
-- Name: reportes reportes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reportes
    ADD CONSTRAINT reportes_pkey PRIMARY KEY (id);


--
-- Name: reservamesa reservamesa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservamesa
    ADD CONSTRAINT reservamesa_pkey PRIMARY KEY (id);


--
-- Name: rol_modulo rol_modulo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_modulo
    ADD CONSTRAINT rol_modulo_pkey PRIMARY KEY (id_rol, id_modulo);


--
-- Name: rol rol_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY (id);


--
-- Name: stock stock_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock
    ADD CONSTRAINT stock_pkey PRIMARY KEY (id);


--
-- Name: subtipopago subtipopago_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtipopago
    ADD CONSTRAINT subtipopago_pkey PRIMARY KEY (id);


--
-- Name: suscritos suscritos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscritos
    ADD CONSTRAINT suscritos_pkey PRIMARY KEY (id);


--
-- Name: tipopago tipopago_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipopago
    ADD CONSTRAINT tipopago_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: parametro_suscrito ux_parametro_suscrito_grupo_clave; Type: CONSTRAINT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.parametro_suscrito
    ADD CONSTRAINT ux_parametro_suscrito_grupo_clave UNIQUE (id_suscrito, grupo, clave);


--
-- Name: idx_auditoria_evento_accion; Type: INDEX; Schema: public; Owner: UsersDev
--

CREATE INDEX idx_auditoria_evento_accion ON public.auditoria_evento USING btree (accion);


--
-- Name: idx_auditoria_evento_entidad; Type: INDEX; Schema: public; Owner: UsersDev
--

CREATE INDEX idx_auditoria_evento_entidad ON public.auditoria_evento USING btree (entidad);


--
-- Name: idx_auditoria_evento_fecha_creacion; Type: INDEX; Schema: public; Owner: UsersDev
--

CREATE INDEX idx_auditoria_evento_fecha_creacion ON public.auditoria_evento USING btree (fecha_creacion);


--
-- Name: idx_auditoria_evento_suscrito; Type: INDEX; Schema: public; Owner: UsersDev
--

CREATE INDEX idx_auditoria_evento_suscrito ON public.auditoria_evento USING btree (id_suscrito);


--
-- Name: idx_auditoria_evento_usuario; Type: INDEX; Schema: public; Owner: UsersDev
--

CREATE INDEX idx_auditoria_evento_usuario ON public.auditoria_evento USING btree (id_usuario);


--
-- Name: ux_permiso_componente_accion; Type: INDEX; Schema: public; Owner: UsersDev
--

CREATE UNIQUE INDEX ux_permiso_componente_accion ON public.permiso_componente USING btree (id_rol, id_modulo, COALESCE(id_componente, 0), accion);


--
-- Name: ux_stock_id_producto; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ux_stock_id_producto ON public.stock USING btree (id_producto);


--
-- Name: auditoria_evento auditoria_evento_id_estado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.auditoria_evento
    ADD CONSTRAINT auditoria_evento_id_estado_fkey FOREIGN KEY (id_estado) REFERENCES public.estado(id);


--
-- Name: auditoria_evento auditoria_evento_id_modulo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.auditoria_evento
    ADD CONSTRAINT auditoria_evento_id_modulo_fkey FOREIGN KEY (id_modulo) REFERENCES public.modulo(id);


--
-- Name: auditoria_evento auditoria_evento_id_suscrito_fkey; Type: FK CONSTRAINT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.auditoria_evento
    ADD CONSTRAINT auditoria_evento_id_suscrito_fkey FOREIGN KEY (id_suscrito) REFERENCES public.suscritos(id);


--
-- Name: auditoria_evento auditoria_evento_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.auditoria_evento
    ADD CONSTRAINT auditoria_evento_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id);


--
-- Name: colaborador colaborador_id_estado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colaborador
    ADD CONSTRAINT colaborador_id_estado_fkey FOREIGN KEY (id_estado) REFERENCES public.estado(id);


--
-- Name: colaborador colaborador_id_estado_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colaborador
    ADD CONSTRAINT colaborador_id_estado_fkey1 FOREIGN KEY (id_estado) REFERENCES public.estado(id);


--
-- Name: componente componente_id_modulo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.componente
    ADD CONSTRAINT componente_id_modulo_fkey FOREIGN KEY (id_modulo) REFERENCES public.modulo(id);


--
-- Name: compras compras_id_proveedor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compras
    ADD CONSTRAINT compras_id_proveedor_fkey FOREIGN KEY (id_proveedor) REFERENCES public.proveedores(id);


--
-- Name: detallecompra detallecompra_id_compra_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallecompra
    ADD CONSTRAINT detallecompra_id_compra_fkey FOREIGN KEY (id_compra) REFERENCES public.compras(id);


--
-- Name: detallecompra detallecompra_id_producto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detallecompra
    ADD CONSTRAINT detallecompra_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.producto(id);


--
-- Name: parametro_suscrito parametro_suscrito_id_estado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.parametro_suscrito
    ADD CONSTRAINT parametro_suscrito_id_estado_fkey FOREIGN KEY (id_estado) REFERENCES public.estado(id);


--
-- Name: parametro_suscrito parametro_suscrito_id_suscrito_fkey; Type: FK CONSTRAINT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.parametro_suscrito
    ADD CONSTRAINT parametro_suscrito_id_suscrito_fkey FOREIGN KEY (id_suscrito) REFERENCES public.suscritos(id);


--
-- Name: permiso_componente permiso_componente_id_componente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.permiso_componente
    ADD CONSTRAINT permiso_componente_id_componente_fkey FOREIGN KEY (id_componente) REFERENCES public.componente(id);


--
-- Name: permiso_componente permiso_componente_id_estado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.permiso_componente
    ADD CONSTRAINT permiso_componente_id_estado_fkey FOREIGN KEY (id_estado) REFERENCES public.estado(id);


--
-- Name: permiso_componente permiso_componente_id_modulo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.permiso_componente
    ADD CONSTRAINT permiso_componente_id_modulo_fkey FOREIGN KEY (id_modulo) REFERENCES public.modulo(id);


--
-- Name: permiso_componente permiso_componente_id_rol_fkey; Type: FK CONSTRAINT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.permiso_componente
    ADD CONSTRAINT permiso_componente_id_rol_fkey FOREIGN KEY (id_rol) REFERENCES public.rol(id);


--
-- Name: producto producto_id_categoria_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categoriaproducto(id);


--
-- Name: recurso_desarrollo recurso_desarrollo_id_estado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.recurso_desarrollo
    ADD CONSTRAINT recurso_desarrollo_id_estado_fkey FOREIGN KEY (id_estado) REFERENCES public.estado(id);


--
-- Name: recurso_desarrollo recurso_desarrollo_id_modulo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: UsersDev
--

ALTER TABLE ONLY public.recurso_desarrollo
    ADD CONSTRAINT recurso_desarrollo_id_modulo_fkey FOREIGN KEY (id_modulo) REFERENCES public.modulo(id);


--
-- Name: reservamesa reservamesa_id_mesa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservamesa
    ADD CONSTRAINT reservamesa_id_mesa_fkey FOREIGN KEY (id_mesa) REFERENCES public.mesa(id);


--
-- Name: rol rol_id_estado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_id_estado_fkey FOREIGN KEY (id_estado) REFERENCES public.estado(id);


--
-- Name: rol rol_id_estado_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_id_estado_fkey1 FOREIGN KEY (id_estado) REFERENCES public.estado(id);


--
-- Name: rol_modulo rol_modulo_id_estado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_modulo
    ADD CONSTRAINT rol_modulo_id_estado_fkey FOREIGN KEY (id_estado) REFERENCES public.estado(id);


--
-- Name: rol_modulo rol_modulo_id_modulo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_modulo
    ADD CONSTRAINT rol_modulo_id_modulo_fkey FOREIGN KEY (id_modulo) REFERENCES public.modulo(id);


--
-- Name: rol_modulo rol_modulo_id_rol_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_modulo
    ADD CONSTRAINT rol_modulo_id_rol_fkey FOREIGN KEY (id_rol) REFERENCES public.rol(id);


--
-- Name: stock stock_id_producto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock
    ADD CONSTRAINT stock_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.producto(id);


--
-- Name: suscritos suscritos_id_plan_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscritos
    ADD CONSTRAINT suscritos_id_plan_fkey FOREIGN KEY (id_plan) REFERENCES public.planes(id);


--
-- Name: usuarios usuarios_id_colaborador_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_id_colaborador_fkey FOREIGN KEY (id_colaborador) REFERENCES public.colaborador(id);


--
-- Name: usuarios usuarios_id_estado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_id_estado_fkey FOREIGN KEY (id_estado) REFERENCES public.estado(id);


--
-- Name: usuarios usuarios_id_rol_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_id_rol_fkey FOREIGN KEY (id_rol) REFERENCES public.rol(id);


--
-- PostgreSQL database dump complete
--

