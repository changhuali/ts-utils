/** 以可读性更高的方式显示交叉类型 */
export type Exact<T> = { [K in keyof T]: T[K] }

// test cases
type BC = { b: number } & { c: string }
type ExactBC = Exact<{ b: number } & { c: string }>
