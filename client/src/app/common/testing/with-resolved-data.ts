export interface ResolvedDataFake<T> {
  key: string
  data: T
}

export function withResolvedData<T>(key: string, data: T): ResolvedDataFake<T> {
  return Object.freeze({ key, data })
}
