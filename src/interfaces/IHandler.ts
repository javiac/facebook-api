export interface IHandler {
  handle(...params: unknown[]): Promise<unknown>;
}
