/** @__PURE__ */
export interface ResolvedDataFake<T> {
  key: string
  data: T
}

/** @__PURE__ */
export function withResolvedData<T>(key: string, data: T): ResolvedDataFake<T> {
  return Object.freeze({ key, data })
}
