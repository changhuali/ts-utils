type _ToArray<
  T extends number,
  P,
  Arr extends Array<P>,
> = Arr['length'] extends T ? Arr : _ToArray<T, P, [...Arr, P]>

export type ToArray<T extends number, P = any> = _ToArray<T, P, []>

type arr3 = ToArray<3>
type arr4 = ToArray<4, number>
