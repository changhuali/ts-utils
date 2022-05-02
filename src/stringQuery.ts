import { Exact } from './exact'

type _StringQuery<Str, Result = {}> = Str extends `${infer Str1}&${infer Str2}`
  ? _StringQuery<Str2, MergeStringQuery<Str1, Result>>
  : Str extends `${string}=${string}`
  ? MergeStringQuery<Str, Result>
  : Result

type MergeStringQuery<T, Result> = T extends `${infer K}=${infer V}`
  ? K extends keyof Result
    ? MergeExistKV<K, V, Result>
    : MergeNonExistKV<K, V, Result>
  : Result

type MergeExistKV<K, V, Result> = {
  [K1 in keyof Result]: K1 extends K ? MergeArr<Result[K1], V> : Result[K1]
}

type MergeArr<T, V> = T extends any[] ? [...T, V] : [T, V]

type MergeNonExistKV<K extends string, V, Result> = Exact<
  Result & { [K1 in K]: V }
>

/** 为查询字符串生成类型信息 */
export type StringQuery<S extends String> = _StringQuery<S, {}>

// test cases
type Query = StringQuery<'a=1&b=2&b=3&b=4&d=5'>
