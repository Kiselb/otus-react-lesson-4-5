// eslint-disable-next-line @typescript-eslint/no-explicit-any

// Первоначальный вариант
//
// const NotUserOrderStates = [
//   "buyingSupplies",
//   "producing",
// ] as const
// const UserOrderStates = [
//   "initial",
//   "inWork",
//   "fullfilled",
// ] as const;

// type TNotUserOrderStates = typeof NotUserOrderStates[number]
// type TUserOrderStates = typeof UserOrderStates[number]
// type OrderState =  TNotUserOrderStates | TUserOrderStates;
// type FIXME = TUserOrderStates[];

// // Hint: type guards
// //export const getUserOrderStates = (orderStates: OrderState[]): FIXME =>
// //  orderStates.filter(
// //    (state) => state !== "buyingSupplies" && state !== "producing"
// //  );

// function isUserOrderState(state: string): state is TUserOrderStates  {
//   return UserOrderStates.includes(state as TUserOrderStates)
// }
// export const getUserOrderStates = (orderStates: OrderState[]): FIXME =>
//   orderStates.filter(
//     (state): state is TUserOrderStates => isUserOrderState(state)
// );

const orderStates = [
  "initial",
  "inWork",
  "buyingSupplies",
  "producing",
  "fullfilled",
] as const;

type OrderState = typeof orderStates[number];
type FIXME = Exclude<OrderState, "buyingSupplies" | "producing">;

// Hint: type guards
export const getUserOrderStates = (orderStates: OrderState[]): FIXME[] =>
  orderStates.filter(
    (state): state is FIXME=> state !== "buyingSupplies" && state !== "producing"
  );
