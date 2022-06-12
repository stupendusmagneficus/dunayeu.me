---
title: Higher-Order Components in React
date: 2017-10-21
tags:
- Programming
- Functional programming
- React
- Inferno
- JavaScript
---
This post will talk about a key conecpt in functional programming, and demonstrate it on a more-or-less practical example. 
---

## Intro

Most React developers are using object-oriented approach to React components. They create classes that tightly couple business logic with JSX code. By using functional components and composition, you can split the code very much like MVC pattern suggests. This will ensure a greater degree of separation of concerns in your code, and will make your components easier to reuse and refactor. Moreover, you can combine multiple higher-order functions into one, reusable function. This is very useful for functionality that you repeat in multiple places, like working with a REST API or validating form input.

A small, but nevertheless cool thing about separating view code from business logic is that you, as a developer, can replace React with any other similar view library. The practical application of this is very limited, but I'm going to show you how it's done in the very end of this blog post.

If you're not familiar with functional programming, I'd recommend taking a look at [Funcitonal Programming in React](/blog/functional-react). 

## Functional composition

Functional composition is a way to use simple functions together to get a complex behaviour. Consider this example:

```javascript
const getCartTotal = (prices) => {
  const pricesWithTax = prices.map(p => p * 1.22)
  const priceTotal = pricesWithTax.reduce((p, acc) => acc += p, 0)
  const priceTotalRounded = Number(priceTotal.toFixed(2))

  return priceTotalRounded
}

getCartTotal([4, 8, 1]) // 15.86
```

This function works well to get total price for every item in cart. But if I need to implement a function that will calculate the cart total without tax, or a price of each item with tax, I'll be tempted to copy-and-paste the code from `getCartTotal` function. 

A better idea is to refactor `getCartTotal` into few functions that adhere to Single Responsibility Principle and use them together. This is how it can look like:

```javascript
const map = (fn) => (value) => value.map(fn)
const addTax = (value) => value * 1.22
const sum = (values) => values.reduce((acc, value) => acc += value, 0)
const round = (pos = 2) => (value) => Number(value.toFixed(pos))

const getCartTotal = (prices) => round(2)(sum(map(addTax)(prices)))

getCartTotal([4, 8, 1]) // 15.86
```

The result is the same, and the new `addTax`, `sum` and `round` functions look pretty generic and reusable. The only thing that is objectively bad here is `round(2)(sum(map(addTax)(prices)))`. It's just hard to read.

When JS is executing this line, it runs the innermost function, and passes it's return value to another function. We can write a function that will do exactly this, but with a more readable synthax:

```jsx
const compose = (...functors) => 
  functors.reduce(
      (s, c) => (...args) => c(s(...args))
  )

const getCartTotal = compose(
  round(2),
  sum,
)

const getCartTotalWithTax = compose(
  map(addTax),
  sum,
  round(2),
)

getCartTotal([4, 8, 1]) // 15.86
getCartTotalWithTax([4, 8, 1]) // 15.86
```

So what have we achieved? We have reduced the amount of code that gets copied around in the project. If I need to change the tax percent - I can change it in one place, and have the change propagate across my project. It's also very easy to change the amount of decimals when needed, without duplicating the conversion snippet. The new functions are simpler and therefore more testable.

## Higher-order components in React

Let's take a dive in functional React now. We will refactor a traditional class into functional component, write a few HOCs and glue them together. In the end, we'll try to replace React with Inferno - just for fun.

### Class component

We have a very basic React component - a shopping list. This shopping list calls an API when it’s mounted, has some basic performance optimization built in, and has a simple render method:

```jsx
class ShoppingList extends React.Component {
  state = {
    items: []
  }

  componentWillMount() {
    api().getList(this.props.name).then(
      items => this.setState({ items })
    );
  }

  shouldComponentUpdate(nextProps) {
    return !shallowEqual(props, nextProps);
  }

  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          {this.state.items.map(item => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}
```

### Refactoring

The obvious place to start is to take out the `render` method and make it a new function:

```jsx
const renderShoppingList = (props) => {
  return (
    <div className="shopping-list">
      <h1>Shopping List for {props.name}</h1>
      <ul>
        {props.items && props.items.map(item => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

Functions don't have state, so the shopping cart contents have to come from `props`. We'll talk about it in a moment.

Let's take a look at lifecycle methods now. This concept is a React specialty, really, so we need to heave a React-specific implementation. This new function is going to take some parameters - a lifecycle specification - and pass them on to React:

```jsx
const lifecycle = (spec) => (Enhanced) =>
    React.createClass({
        ...spec,
        render() {
            return <Enhanced {...this.props} />
        }
    })
```

You see that in the `render` method we just render `Enahnced`. That's the React component that is being wrapped in `lifecycle` HoC.


```jsx
const renderShoppingList = (props) => {
  const { name, items } = props;

  return (
    <div className="shopping-list">
      <h1>Shopping List for {this.props.name}</h1>
      <ul>
        {this.state.items.map(item => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
}

const lifecycleSpec = {
  componentDidMount() {
    api().getList(this.props.name).then(
      items => this.props.setItems(items)
    );
  }
}

const ShoppingList = lifecycle(lifecycleSpec)(renderShoppingList)
```

I think you understand the idea by now. We are still missing the code that will replace the component state behaviour. 

```jsx
const withState = (
  stateName,
  stateUpdaterName,
  initialState
) => Enhanced => {
  class WithState extends Component {
    state = {
      stateValue: initialState,
    }

    updateStateValue = (value) =>
      this.setState(
        ({ stateValue }) => ({
          stateValue: value
        })
      )

    render() {
      return (
        <Enhanced {{
          ...this.props,
          [stateName]: this.state.stateValue,
          [stateUpdaterName]: this.updateStateValue,
        }}
      />
    }
  }

  return WithState
}
```

This new HOC will render the `Enhanced` component, and add two new props to it. The props will manage state on the parent React component . Let's use it:

```jsx
const renderShoppingList = (props) => {
  const { name, items } = props;

  return (
    <div className="shopping-list">
      <h1>Shopping List for {this.props.name}</h1>
      <ul>
        {this.state.items.map(item => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
}

const lifecycleSpec = {
  componentDidMount() {
    api().getList(this.props.name).then(
      items => this.props.setItems(items)
    );
  }
}

const ShoppingList = withState('items', 'setItems', [])(lifecycle(lifecycleSpec)(renderShoppingList))
```

Damn, the last line is ugly. Luckily, we're just calling functions here. This means we can use `compose` function from the previous JS example.

### Refactoring result

We've successfully split a tightly-coupled React class component into a render function and a set of reusable higher-order components.

`react-fp.js` contains the HOCs:

```jsx
export const lifecycle = (spec) => (Enhanced) =>
    React.createClass({
        ...spec,
        render() {
            return <Enhanced {...this.props} />
        }
    })
export const withState = (
    stateName,
    stateUpdaterName,
    initialState
  ) => Enhanced => {
    class WithState extends Component {
      state = {
        stateValue: initialState,
      }

      updateStateValue = (value) =>
        this.setState(
          ({ stateValue }) => ({
            stateValue: value
          })
        )

      render() {
        return (
          <Enhanced {{
            ...this.props,
            [stateName]: this.state.stateValue,
            [stateUpdaterName]: this.updateStateValue,
          }} />
        )
      }
    }

    return WithState
  }

export const compose = (...functors) => 
    functors.reduce(
        (s, c) => (...args) => s(c(...args))
    )
```

`ShoppingList.jsx` makes use of those HOCs to abstract away all React specifics:

```jsx
const renderShoppingList = (props) => {
  const { name, items } = props;

  return (
    <div className="shopping-list">
      <h1>Shopping List for {this.props.name}</h1>
      <ul>
        {this.state.items.map(item => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
}

const lifecycleSpec = {
  componentDidMount() {
    api().getList().then(
      items => this.setState({ items })
    );
  }
}

const ShoppingList = compose(
  withState('items', 'setItems', []),
  lifecycle(lifecycleSpec),
)(renderShoppingList);

export default ShoppingList
```

### Experiment

So now that we have the React-specific code moved to a separate module, let's have some fun. I'm going to change the view library from React to Inferno, modify the `react-fp.js` to become `inferno-fp.js`. I don't have to modify my `ShoppingList.js` code at all, since I don't use React in it directly.

This is how `inferno-fp.js` looks like:

```jsx
import { Component } from 'inferno';

/**
 * Lazy implementation of lifecycle HoC 
 * TODO: Add more lifecycle methods
 */
const lifecycle = spec => Enhanced => (props = {}) => (
  <Enhanced
    {...props}
    onComponentDidMount={() => spec.componentDidMount(props)}
  />
);

const compose = (...functors) =>
  functors.reduce(
    (s, c) => (...args) => s(c(...args))
  );

const withState = (
  stateName,
  stateUpdaterName,
  initialState
) => Enhanced => {
  class WithState extends Component {
    state = {
      stateValue: initialState,
    }

    updateStateValue = (value) =>
      this.setState(
        ({ stateValue }) => ({
          stateValue: value
        })
      )

    render() {
      const extraProps = {
        [stateName]: this.state.stateValue,
        [stateUpdaterName]: this.updateStateValue,
      }

      return (
        <Enhanced {...this.props} {...extraProps} />
      )
    }
  }

  return WithState
}

export {
  compose,
  lifecycle,
  withState,
};
```

I'm really lazy and I didn't implement all the lifecycle methods - but you will forgive me this, won't you? Apart from this, the HOC interface is exactly the same. There is no need to do anything in `ShoppingList.js`, just replace the imported module. You can try the complete example on [GitHub](https://github.com/iakovmarkov/react-inferno-example) yourself.

As I've said in the beginning, the practical application of this is very limited. However, it's a great demonstration of why I prefer functional approach to programming complex applications now. Composing loosely coupled functions together enables you to replace them with relative ease. Refactoring such code is much easier as well, because modules are not dependant on one another and can be swapped out, given their APIs are compatible.

## Conclussion

When we have applied this for the first time in Ataccama, our junior developers and newcomers were really confused with the concept. However, after a few weeks of working with the project that uses higher-order components a lot, they've learned how to quickly compose HOCs to get the desired behavior. Separating the business logic from the render code allowed us to have a standard UI library that is shared across different web applications.

I hope reading this has been beneficial to you. Even if you won't rewrite your code into functional components immediately, you can apply certain ideas to other areas of programming. If you are interested in learning more about functional programming in React, check out [Reusable Higher-Order Components](/blog/reusable_hocs).

## Useful links

- [Recompose](https://github.com/acdlite/recompose) - a library that gives you a ton of reusable HoCs, making the transition easier.
- [Recompost](https://github.com/adam-stanek/recompost) - our colleague's version of Recompose, but with TypeScript capabilities. Just awesome.
