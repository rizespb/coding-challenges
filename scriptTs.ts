type Compute<T> = {
  [key in keyof T]: T[key];
};

// type PartialByKeys<Obj extends object, Keys extends keyof Obj = keyof Obj> = Compute<
//   {
//     [key in keyof Obj as key extends Keys ? key : never]?: Obj[key];
//   } & {
//     [key in keyof Obj as key extends Keys ? never : key]: Obj[key];
//   }
// >;

// type PartialByKeys<Obj extends object, Keys extends keyof Obj = keyof Obj> = Compute<
//   Partial<Pick<Obj, Keys>> & Omit<Obj, Keys>
// >;

type PartialByKeys<Obj extends object, Keys extends keyof Obj = keyof Obj> = Compute<
  {
    [key in Keys]?: Obj[key];
  } & {
    [key in Exclude<keyof Obj, Keys>]: Obj[key];
  }
>;

interface User {
  name: string;
  age: number;
  address: string;
}

type UserPartialName = PartialByKeys<User, 'name'>; // { name?:string; age:number; address:string }

const a: UserPartialName = {
  address: '1',
  age: 1,
  name: '1',
};
