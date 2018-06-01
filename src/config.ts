import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export interface IConfig {
    port: number;
    debugLogging: boolean;
    DbSslConn: boolean;
    jwtSecret: string;
    databaseUrl: string;
}

const config = {
    port: process.env.PORT || 3000,
    debugLogging: process.env.NODE_ENV == 'development',
    dbsslconn: process.env.NODE_ENV != 'development',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-whatever',
    databaseUrl: process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/apidb'
};

export { config };