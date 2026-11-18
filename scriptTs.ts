// type ObjType<Key extends PropertyKey, Value> = {
//   [key in Key]: Value;
// };

// type DeepPretty<T> = T extends object
//   ? {
//       [key in keyof T]: DeepPretty<T[key]>;
//     }
//   : T;

// // type TupleToNestedObject<Keys extends PropertyKey[], Value> = Keys extends [
// //   ...infer Head extends PropertyKey[],
// //   infer Tail extends PropertyKey
// // ]
// //   ? TupleToNestedObject<Head, DeepPretty<ObjType<Tail, Value>>>
// //   : Value;

// type TupleToNestedObject<Keys extends PropertyKey[], Value> = Keys extends [
//   ...infer Head extends PropertyKey[],
//   infer Tail extends PropertyKey
// ]
//   ? TupleToNestedObject<
//       Head,
//       {
//         [key in Tail]: Value;
//       }
//     >
//   : Value;

// type a = TupleToNestedObject<['a'], string>; // {a: string}
// type b = TupleToNestedObject<['a', 'b'], number>; // {a: {b: number}}
// type c = TupleToNestedObject<[], boolean>; // boolean. if the tuple is empty, just return the U type

type Reverse<Arr extends unknown[], T extends unknown[] = []> = Arr extends [...infer Head, infer Tail]
  ? Reverse<Head, [...T, Tail]>
  : T;

type a = Reverse<['a', 'b']>; // ['b', 'a']
type b = Reverse<['a', 'b', 'c']>; // ['c', 'b', 'a']
