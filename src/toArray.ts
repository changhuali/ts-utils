type _ToArray<
  T extends number,
  P,
  Arr extends Array<P>,
> = Arr['length'] extends T ? Arr : _ToArray<T, P, [...Arr, P]>

/** 生成一个指定长度的数组类型, P用于指定数组元素的类型 */
export type ToArray<T extends number, P = any> = _ToArray<T, P, []>

// test cases
type arr3 = ToArray<3>
type arr4 = ToArray<4, number>
