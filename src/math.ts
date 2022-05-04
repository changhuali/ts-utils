import { ToArray } from './toArray'

export type Add<T1 extends number, T2 extends number> = [
  ...ToArray<T1>,
  ...ToArray<T2>
]['length']

// test cases
type Sum2 = Add<1, 1>
type Sum200 = Add<100, 100>

export type Sub<T1 extends number, T2 extends number> = ToArray<T1> extends [
  ...ToArray<T2>,
  ...infer Remain
]
  ? Remain['length']
  : 0

// test cases
type Diff2 = Sub<3, 1>
type Diff200 = Sub<300, 100>
