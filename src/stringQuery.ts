export type StringQuery<S, Q = {}> = S extends `${infer S1}&${infer S2}`
  ? StringQuery<S2, MergeStringQuery<S1, Q>>
  : S extends `${string}=${string}`
  ? MergeStringQuery<S, Q>
  : Q

type MergeStringQuery<T, U> = T extends `${infer K}=${infer V}`
  ? K extends keyof U
    ? MergeKVQuery<K, V, U>
    : AddKVQuery<K, V, U>
  : U

type MergeKVQuery<K, V, U> = {
  [K1 in keyof U]: K1 extends K ? ArrayQueryValue<U[K1], V> : U[K1]
}

type ArrayQueryValue<T, V> = T extends any[] ? [...T, V] : [T, V]

type AddKVQuery<K extends string, V, U> = Exact<U & { [K1 in K]: V }>

type Exact<T> = { [K in keyof T]: T[K] }

type Query = StringQuery<'a=1&b=2&b=3&b=4'>
