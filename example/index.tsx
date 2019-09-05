import React, { Component, useState } from "react"
import { createContainer } from "../src/unstated-next"
import { render } from "react-dom"

function useCounter(initialState = 0) {
	let [count, setCount] = useState(initialState)
	let decrement = () => setCount(count - 1)
	let increment = () => setCount(count + 1)
	return { count, decrement, increment }
}

let Counter = createContainer(useCounter)

function CounterDisplay() {
	let counter = Counter.useContainer()
	return (
		<div>
			<button onClick={counter.decrement}>-</button>
			<span>{counter.count}</span>
			<button onClick={counter.increment}>+</button>
		</div>
	)
}

class CounterDisplay2 extends Component {
	render() {
		return (
			<Counter.Consumer>
				{({ count, decrement, increment }) => (
					<div>
						<button onClick={decrement}>-</button>
						{count}
						<button onClick={increment}>+</button>
					</div>
				)}
			</Counter.Consumer>
		)
	}
}

class CounterDisplay3 extends Component {
	render() {
		return (
			<div>
				<button onClick={this.props.counter.decrement}>-</button>
				{this.props.counter.count}
				<button onClick={this.props.counter.increment}>+</button>
			</div>
		)
	}
}

const mapContextToProps = counter => ({
	counter: {
		count: counter.count,
		decrement: counter.decrement,
		increment: counter.increment,
	},
})

const WrappedCounterDisplay3 = Counter.connect(mapContextToProps)(
	CounterDisplay3,
)

function App() {
	return (
		<React.Fragment>
			<Counter.Provider>
				useContainer
				<CounterDisplay />
				Consumer
				<CounterDisplay2 />
				HOC connect
				<WrappedCounterDisplay3 />
			</Counter.Provider>
			Other Provider
			<Counter.Provider initialState={2}>
				<CounterDisplay />
			</Counter.Provider>
		</React.Fragment>
	)
}

render(<App />, document.getElementById("root"))
