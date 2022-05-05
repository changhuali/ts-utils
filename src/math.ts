import { ToArray } from './toArray'

/** 加法 */
export type Add<T1 extends number, T2 extends number> = [
  ...ToArray<T1>,
  ...ToArray<T2>
]['length']

// test cases
type Sum2 = Add<1, 1>
type Sum200 = Add<100, 100>

/** 减法 */
export type Sub<T1 extends number, T2 extends number> = ToArray<T1> extends [
  ...ToArray<T2>,
  ...infer Remain
]
  ? Remain['length']
  : 0

// test cases
type Diff2 = Sub<3, 1>
type Diff200 = Sub<300, 100>

type _Mul<
  T1 extends number,
  T2 extends number,
  T1Arr extends Array<any> = [],
  ProductArr extends Array<any> = [],
> = T1Arr['length'] extends T1
  ? ProductArr['length']
  : _Mul<T1, T2, [...T1Arr, any], [...ProductArr, ...ToArray<T2>]>
/** 乘法 */
export type Mul<T1 extends number, T2 extends number> = _Mul<T1, T2>

// test cases
type Product2 = Mul<2, 1>
type Product200 = Mul<20, 10>

type _Div<
  T1 extends number,
  T2 extends number,
  QuotientArr extends Array<any> = [],
> = ToArray<T1> extends [...ToArray<T2>, ...infer Remain]
  ? _Div<Remain['length'], T2, [...QuotientArr, any]>
  : QuotientArr['length']
/** 除法 */
export type Div<T1 extends number, T2 extends number> = _Div<T1, T2, []>

// test cases
type Quotient2 = Div<4, 2>
type Quotient200 = Div<400, 2>

type _Mode<
  T1 extends number,
  T2 extends number,
  Flag = false,
  Remainder = 0,
> = ToArray<T1> extends [...ToArray<T2>, ...infer Remain]
  ? _Mode<Remain['length'], T2, true, Remain['length']>
  : Flag extends true
  ? Remainder
  : T1
/** 取模 */
export type Mode<T1 extends number, T2 extends number> = _Mode<T1, T2>

// test cases
type Remainder2 = Mode<6, 4>
type Remainder200 = Mode<600, 700>
