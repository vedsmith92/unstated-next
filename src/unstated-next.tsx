import React from "react"

export interface ContainerProviderProps<State = void> {
	initialState?: State
	children: React.ReactNode
}

export interface Container<Value, State = void> {
	Context
	Consumer
	Provider: React.ComponentType<ContainerProviderProps<State>>
	useContainer: () => Value
	connect
}

export function createContainer<Value, State = void>(
	useHook: (initialState?: State) => Value,
): Container<Value, State> {
	let Context = React.createContext<Value | null>(null)
	let Consumer = Context.Consumer

	function Provider(props: ContainerProviderProps<State>) {
		let value = useHook(props.initialState)
		return <Context.Provider value={value}>{props.children}</Context.Provider>
	}

	function useContainer(): Value {
		let value = React.useContext(Context)
		if (value === null) {
			throw new Error("Component must be wrapped with <Container.Provider>")
		}
		return value
	}

	let connect = mapper => SuperComponent => {
		return props => (
			<Consumer>
				{context => <SuperComponent {...props} {...mapper(context)} />}
			</Consumer>
		)
	}

	return { Context, Consumer, Provider, useContainer, connect }
}

export function useContainer<Value, State = void>(
	container: Container<Value, State>,
): Value {
	return container.useContainer()
}
