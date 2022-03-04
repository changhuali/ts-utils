/**
 * Get sub type of Array or Record by path
 */

type DeepNonNullable<T> = T extends undefined | null
  ? Obj<Exclude<T, undefined | null>>
  : Obj<T>
type Obj<T> = T extends object
  ? { [K in keyof T]-?: DeepNonNullable<T[K]> }
  : T extends Array<infer E>
  ? DeepNonNullable<E>[]
  : T

type S<T> = (string | number) & T

type O<T, K> = K extends keyof T ? T[K] : never

type KV<T, K> = K extends 'number'
  ? T extends any[]
    ? T[number]
    : O<T, K>
  : O<T, K>

type Sub<T, K> = NonNullable<KV<NonNullable<Required<T>>, K>>

export type Path<T, P = ''> = NonNullable<T> extends Array<infer E>
  ? -1 extends NonNullable<T>['length']
    ? `${S<P>}number` | Path<E, `${S<P>}number.`>
    : ConstArr<T, P>
  : {
      [K in keyof T]:
        | `${S<P>}${S<K>}`
        | (Sub<T, K> extends object
            ? Path<Sub<T, K>, `${S<P>}${S<K>}.`>
            : never)
    } extends Record<any, infer V>
  ? unknown extends V
    ? never
    : V
  : never

export type Get<T, P extends Path<T>> = P extends `${infer K}.${infer R}`
  ? R extends Path<NonNullable<KV<T, K>>>
    ? Get<NonNullable<KV<T, K>>, R>
    : never
  : KV<T, P>

type ConstArr<
  T,
  P = '',
  I extends any[] = [],
  U = never,
> = NonNullable<T> extends [infer E, ...infer R]
  ? ConstArr<
      R,
      P,
      [...I, null],
      U | `${S<P>}${I['length']}` | Path<E, `${S<P>}${I['length']}.`>
    >
  : U

type Data = {
  a?: number | null
  b?: {
    c?: number | null
    d?: {
      e?: number | null
      f?: number | null
      g?: {
        h?: (
          | {
              test: string
            }
          | {}
        )[]
        number?: number | null
      }
    } | null
  } | null
}

type P = Path<Data>

type V = Get<Data, 'b.d.g.h.number'>
