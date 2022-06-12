---
title: Funcitonal Programming in React
date: 2022-03-12
tags:
- Programming
- Functional programming
- React
- JavaScript
---
In this blog I will briefly describe the basics of functional programming, and how you might already use it without knowing.
---

## Intro

You have probably heard about Functional Programming as a concept, and that it applies well to React applications. Indeed, recent development in React seems to push people towards using functional components more. I have learned about the concept from my colleague, and it took me a bit to wrap my head around it. 

The main idea of functional programming is that functions should be first-class citizens. It means that you can work with them just like you work with other data types. You can pass them as object, you can assign them to variables, you can return them from other functions.

Sounds familiar? Of course it does. If you've programmed in JavaScript, you've probably done it a thousand times already. Let's take a look at a few applications of functional programming in JavaScript.

## Examples of FP in JS

A lot of common JavaScript patterns make use of functional programming. Let's take a look.

### `map` and `reduce`

Take, for example, following code:

```javascript
const array = [1, 2, 3, 4, 5]

const double = array.map(value => value * 2)
console.log(double) // [2, 4, 6, 8, 10]

const sum = array.reduce((value, acc) => acc += val, 0)
console.log(sum) // 15
```

Both of those array methods take a function as an argument. You pass a function as an argument, and it gets called for each element of `array`. That's a good example of function being treated the same as any other data type that you can pass around.

### A jQuery example

I suppose everybody knows this snippet:

```javascript
$('document').ready(function() {
  console.log('ready');
  $('body').css('opacity', 1);
})
```

The callback function you pass to jQuery is another demonstration of that.

## Examples of FP in React

React is built with functional programming as a preferred paradigm. React core team reference it a lot throughout [documentation](https://reactjs.org/docs/composition-vs-inheritance.html) and their [personal blogs](https://twitter.com/dan_abramov/status/752643494972383232). Let's take a look.

### Event handlers

Every time you need to handle events on DOM elements, you pass a handler function:

```jsx
const Button = (props) => (
  <button 
    type="button"
    onClick={(event) => { 
      if (typeof props.onClick === 'function') { 
        props.onClick(event) } 
      }
    }
  >
    {props.children}
  </button>
)
```

A `onClick` function can be passed to this component as a prop. The constant `Button` is being assigned a function as a value.

### Local component state

You can pass a callback function to `setState` on a React component. This function will receive a current state value as it's argument:

```jsx

class ClickCounter extends React.Component {
  state = {
    value: 0
  }

  handleClick() {
    this.setState(
      ({ value }) => ({ value: value += 1 })
    );
  }

  render() {
    return (
      <React.Fragment>
        <div>You clicked {this.state.value} times.</div>
        <button type="button" onClick={this.handleClick}>Click me</button>
      </React.Fragment>
    )
  }
}
```

### React-Redux

If you have used Redux, you're probably familiar with `connect` function from it's sister library React-Redux. It is used to get global Redux state into a component:

```jsx
@connect((state) => ({ name: state.name }))
class Greeter extends React.Components {
  render () {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

The `connect` decorator takes two parameters - both of them are functions that add new props to the enhanced components. Moreover, the `connect` decorator itself is a function - feel free to take a look at [source code on GitHub](https://github.com/reduxjs/react-redux/blob/master/src/connect/connect.js) to see how it works!

## Conclussion

I think by now you get the idea. I believe that treating functions as first-class citizens in language is the main idea of functional programming. Many JavaScript developers have applied it without really knowing that they're using a functional programming technique.

This is not the only aspect of functional programming though. There are many other good ideas like composition, immutability, pure functions and the like. Even though JavaScript is a multi-paradigm language, and it doesn't force you into doing things in a strictly FP way, it's very useful to know more about the FP techniques you can use in JS and React. You can read about one of them in [Higher-Order Components in React](/blog/react_hocs).

## Useful links

- [SOLID: The next step is functional](https://blog.ploeh.dk/2014/03/10/solid-the-next-step-is-functional/) - an article about the virtues of functional programming.