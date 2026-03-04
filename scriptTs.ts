type MyExclude<T, U> = T extends U ? never : T;

type T1 = MyExclude<'a' | 'b' | 'c', 'a'>;
type T2 = MyExclude<'a' | 'b' | 'c', 'a' | 'b'>;
type T3 = MyExclude<string | number | (() => void), Function>;
