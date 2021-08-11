import NodeCache from "node-cache";

export enum CachePrefixEnum {
  USERS = 'USER-'
}

export const cache = new NodeCache();
