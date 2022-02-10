// eslint-disable-next-line @typescript-eslint/no-explicit-any

// Это сложное (если не супер сложное) задание
// Задача состоит в том что написать калькулято для натуральных чисел, но только на типах!
// Ниже приведена заготовка
// Хочется поддержки сложения и вычитания, если хочется еще челленджа, то деление и умножение
// Из-за ограничений глубины вычислений поддержать все натуральные числа не получится, это нормально

type Equals<A, B> = A extends B ? (B extends A ? "success" : never) : never;

type V = "length";
type Zero = [];
type One = [1];
type Operand<T extends number, L, U extends number[]> = 
    L extends T
        ? (T extends L 
            ? U
            : Operand<T, [...U, ...One][V], [...U, ...One]>)
        : Operand<T, [...U, ...One][V], [...U, ...One]>;
type Add<A extends number, B extends number> = [ ...Operand<A, Zero[V], Zero>, ...Operand<B, Zero[V], Zero>][V]
type Sub<A extends number, B extends number> = 
    Operand<A, Zero[V], Zero> extends [number, ...infer H]
        ? Operand<B, Zero[V], Zero> extends [number, ...infer J]
            ? (J extends Zero ? (Zero extends J ? H[V] : Sub<H[V], J[V]>) : Sub<H[V], J[V]>)
            : never
        : never;

export type OnePlusOneTest = Equals<Add<1, 1>, 2>;
export type TwoMinusOneTest = Equals<Sub<2, 1>, 1>;
