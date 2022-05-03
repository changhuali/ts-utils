import { ToArray } from './toArray'

export type Add<T1 extends number, T2 extends number> = [
  ...ToArray<T1>,
  ...ToArray<T2>
]['length']

// test cases
type T2 = Add<1, 1>
type T200 = Add<100, 100>
