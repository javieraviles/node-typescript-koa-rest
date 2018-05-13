export interface IConfig {
    port: number;
    debugLogging: boolean;
}

const config = {
    port: process.env.NODE_PORT || 3000,
    debugLogging: process.env.NODE_ENV == 'development',
};

export { config };