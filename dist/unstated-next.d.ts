import React from "react";
export interface ContainerProviderProps<State = void> {
    initialState?: State;
    children: React.ReactNode;
}
export interface Container<Value, State = void> {
    Context: any;
    Consumer: any;
    Provider: React.ComponentType<ContainerProviderProps<State>>;
    useContainer: () => Value;
    connect: any;
}
export declare function createContainer<Value, State = void>(useHook: (initialState?: State) => Value): Container<Value, State>;
export declare function useContainer<Value, State = void>(container: Container<Value, State>): Value;
//# sourceMappingURL=unstated-next.d.ts.map