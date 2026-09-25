type Foo = {
  name: string;
  age: string;
  test: boolean;
};
type Bar = {
  name: string;
  age: string;
  gender: number;
};

type Diff<A, B> = {
  [key in Exclude<keyof A | keyof B, keyof A & keyof B>]: key extends keyof A
    ? A[key]
    : key extends keyof B
    ? B[key]
    : never;
};

type T = Diff<Foo, Bar>; // "name" | "age"
