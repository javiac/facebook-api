interface IEnv {
  FACEBOOK_GRAPH_URL?: string;
  FACEBOOK_GRAPH_API_VERION?: string;
  FACEBOOK_GRAPH_ACCESS_TOKEN?: string;
}

export const env = process.env as IEnv;
