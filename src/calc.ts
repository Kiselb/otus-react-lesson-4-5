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

type OperandHelper<T extends any, L, U extends any[]> = 
    L extends T
        ? T extends L 
            ? U
            : never
        : OperandHelper<T, [...U, ...One][V], [...U, ...One]>;
type Operand<A extends any> = OperandHelper<A, Zero[V], Zero>

type Add<A extends any, B extends any> = 
    Operand<A> extends [...infer H]
        ? Operand<B> extends [number, ...infer J]
            ? J extends Zero
                ? Zero extends J
                    ? [...H, ...One][V]
                    : Add<[...H, ...One][V], J[V]>
                : Add<[...H, ...One][V], J[V]>
            : never
        : never;
type AddWrapper<A extends number, B extends number> = Add<A, B>

type Sub<A extends any, B extends any> = 
    Operand<A> extends [number, ...infer H]
        ? Operand<B> extends [number, ...infer J]
            ? J extends Zero
                ? Zero extends J
                    ? H[V]
                    : Sub<H[V], J[V]>
                : Sub<H[V], J[V]>
            : never
        : never;
type SubWrapper<A extends number, B extends number> = Sub<A, B>

type MulHelper<A extends any, B extends any, Q extends any> =
    Operand<A> extends [ ...infer H]
        ? Operand<B> extends [number, ...infer J]
            ? J extends Zero
                ? Zero extends J
                    ? Q
                    : never
                : MulHelper<A, J[V], [...Operand<Q>, ...H][V]>
            : never
        : never; 

type Mul<A extends any, B extends any> = MulHelper<A, B, A>
type MulWrapper<A extends number, B extends number> = Mul<A, B>

type DivHelper<A extends any, B extends any, Q extends any> =
    Operand<A> extends [ ...infer H]
        ? H extends Zero
            ? Zero extends H
                ? Q
                : DivHelper<Sub<A, B>, B, [...Operand<Q>, ...One][V]>
            : DivHelper<Sub<A, B>, B, [...Operand<Q>, ...One][V]>
        : never; 

type Div<A extends any, B extends any> = DivHelper<A, B, Zero[V]>
type DivWrapper<A extends number, B extends number> = Div<A, B>

type t1 = AddWrapper<4, 4>
type t2 = MulWrapper<3, 5>;
type t4 = DivWrapper<8, 4>

export type TestAdd = Equals<AddWrapper<4, 5>, 9>;
export type TestSub = Equals<SubWrapper<9, 5>, 4>;
export type TestMul1 = Equals<MulWrapper<4, 5>, 20>;
export type TestMul2 = Equals<MulWrapper<5, 4>, 20>;
export type TestDiv1 = Equals<DivWrapper<8, 4>, 2>;
