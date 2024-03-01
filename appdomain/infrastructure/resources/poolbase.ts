const { Pool } = require('pg');

class PoolBase {
    pool : any;
    constructor() {
        this.pool = new Pool({
        user: 'tu_usuario',
        host: 'localhost',
        database: 'tu_base_de_datos',
        password: 'tu_contraseña',
        port: 5432,
        });
    }

    async query(query, params) {
        try {
        const result = await this.pool.query(query, params);
        return result.rows;
        } catch (error) {
        console.error('Error en la consulta:', error);
        throw error;
        }
    }

    async close() {
        await this.pool.end();
    }
}

module.exports = PoolBase;