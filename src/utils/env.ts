interface IEnv {
    FACEBOOK_GRAPH_URL?: string;
    FACEBOOK_GRAPH_API_VERION?: string;
    FACEBOOK_GRAPH_ACCESS_TOKEN?: string;
    NODE_ENV?: 'test' | 'development' | 'staging' | 'production';
    PORT?: number;
}

export const env = process.env as IEnv;
