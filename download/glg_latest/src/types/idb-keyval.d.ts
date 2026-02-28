declare module "idb-keyval" {
  export function get<T = unknown>(key: string): Promise<T | undefined>;
  export function set<T = unknown>(key: string, value: T): Promise<void>;
}
