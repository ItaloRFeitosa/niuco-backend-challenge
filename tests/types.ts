// type utilities para ajudar na tipagem dos mocks

type InterfaceLike<T> = {
  [P in keyof T]: T[P];
};

export type Mock<T extends InterfaceLike<T>> = {
  [P in keyof T]: jest.Mock<ReturnType<T[P]>, Parameters<T[P]>>;
};
