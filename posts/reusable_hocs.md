---
title: Reusable Higher-Order Components
date: 2022-01-12
tags:
- Programming
- Functional programming
- React
- Recompose
- JavaScript
---
In this blog post I will talk about how to create reusable higher-order components in React on a practical example - working with an API.
---

## Intro

This is a third post about functional programming in React. In the previous posts I've demonstrated how FP applies to JavaScript and React, and explained the concept of higher-order components.

I believe that the main benefit of FP approach is reusability. If your business logic is separated from your render code, the later can be reused in different context or even application, given the interface for the render function is flexible enough. But the business logic itself can also be implemented as a higher-order function. You can take any piece of code that is present in multiple places in your project, give it a name and interface, and use functional composition to attach it to your components.

If you are not familiar with the concept of higher-order components, I recommend taking a look at [Higher-Order Components in React](/blog/react_hocs) first.

## Practical example

Let's take a simple practical example. You are developing a single-page application that needs to talk to an API to get any data in or out. Your application has a sign-in form, and a sign-up form, that both send POST requests to server. They also display request state and have to react to errors.

It's tempting to duplicate the calls to your API in both of those components. They use different API endpoints, they handle errors differently, the data that they send and receive is also different. But if you consider an SPA that has a hundred of API calls, repeated across tens of modules, you will get a different picture. The amount of boilerplate code to set request state, handle errors or pass the response will become the vast majority of the code you duplicate. This makes it error-prone, hard to test and messy.

We will refactor those forms to use a new higher-order component that handles talking to an API. This HOC will itself be composed of smaller HOCs, to demonstrate the idea once more.

### Form classes

Those are our two forms, implemented as classic React class components.

```jsx
class LoginForm extends React.Component {
    state = {
        submitting: false,
        error: null,
        success: null,
    }

    handleSubmit() {
        this.setState({ submitting: true })
        const data = {
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value,
        }
        api().post('/login', JSON.stringify(data)).then(
            (res) => {
                const error = res.error || this.state.error
                const success = res.code === 200 || this.state.success

                this.setState({ submitting: false, error, success })
            }
        )
    }

    render() {
        if (this.state.submitting) {
            return <span>Submitting...</span>
        }
        if (this.state.error) {
            return <span>An error has occured! Try again. More info: {this.state.error}</span>
        }
        if (this.state.success) {
            return <span>Logged in successfully, redirecting...</span>
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <input name="email" id="email" placeholder="Email" />
                <input name="password" id="password" type="password" />
                <button type="submit" value="Log in"/>
            </form>
        )
    }
}
```

```jsx
class RegisterForm extends React.Component {
    state = {
        submitting: false,
        error: null,
        success: null,
    }

    handleSubmit() {
        const email = document.querySelector('#email').value
        const username = document.querySelector('#username').value
        const password = document.querySelector('#password').value
        const password_confirm = document.querySelector('#password_confirm').value
        
        if (password !== password_confirm) {
            alert("Passowrds don't match!")
            return
        }

        this.setState({ submitting: true })
        const data = {
            username,
            email,
            password,
            password_confirm,
        }
        api().post('/signup', JSON.stringify(data)).then(
            (res) => {
                const error = res.error || this.state.error
                const success = res.code === 200 || this.state.success

                this.setState({ submitting: false, error, success })
            }
        )
    }

    render() {
        if (this.state.submitting) {
            return <span>Submitting...</span>
        }
        if (this.state.error) {
            return <span>An error has occured! Try again. More info: {this.state.error}</span>
        }
        if (this.state.success) {
            return <span>Account created successfully, redirecting...</span>
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <input name="username" id="username" placeholder="Username" />
                <input name="email" id="email" placeholder="Email" />
                <input name="password" id="password" type="password" />
                <input name="password_confirm" id="password_confirm" type="password" />
                <button type="submit" value="Sign up"/>
            </form>
        )
    }
}
```

Even with two forms, you can see how much of the code is duplicated. Most of it is boilerplate that you will duplicate every time you need to get something from the API.

### Creating a complex HOC

Let's refactor those components using functional programming techniques. We will create a higher-order component that injects request state, server response and a handler function into the component it will enhance.

To save time, we won't implement `compose`, `withState` or any other higher-order function. Instead, let's use [Recompose](https://github.com/acdlite/recompose) - a very well-made and well-documented library full of basic HOCs like that.

Let's move all API-related code into a higher-order component:

```javascript
const withApi = (endpoint, method) => compose(
    withState('apiState', 'setApiState', { pending: false, error: null, response: null }),
    withHandlers((props) => ({
        apiRequest: (data) => {
            const call = api()[method]

            props.setApiState({ pending: true })

            call(endpoint, data).then((res) => {
                const error = res.error || props.error
                const response = res.code === 200 ? res.body : props.response

                props.setApiState.setState({ pending: false, error, response })
            })
        }
    })),
    omitProps(['setApiState']),
)
```

As you see, we've moved all the API-related code into this reusable higher-order component. It uses other simple HOCs to create pretty complex behaviour.

### Using the HOC

Now, let's refactor our form components to use the `withApi` HOC. The goal is to remove all API implementation details, and use props that are passed down instead.

The results look like this:

```jsx
const LoginForm = withApi('/login', 'post')(
    (props) => {
        if (props.apiState.pending) {
            return <span>Submitting...</span>
        }
        if (props.apiState.error) {
            return <span>An error has occured! Try again. More info: {props.apiState.error}</span>
        }
        if (props.apiState.response) {
            return <span>Logged in successfully, redirecting...</span>
        }
        return (
            <form
                onSubmit={() => props.apiRequest({
                    email: document.querySelector('#email').value,
                    password: document.querySelector('#password').value,
                })}
            >
                <input name="email" id="email" placeholder="Email" />
                <input name="password" id="password" type="password" />
                <button type="submit" value="Log in"/>
            </form>
        )
    }
)

const RegisterForm = compose(
    withApi('/register', 'post'),
    withHandlers(props => ({
        handleSubmit: (data) => {
            if (data.password !== data.password_confirm) {
                alert("Passowrds don't match!")
                return
            }

            props.apiRequest(data)
        }
    }))
)(
    (props) => {
        if (props.apiState.pending) {
            return <span>Submitting...</span>
        }
        if (props.apiState.error) {
            return <span>An error has occured! Try again. More info: {props.apiState.error}</span>
        }
        if (props.apiState.response) {
            return <span>Account created successfully, redirecting...</span>
        }
        return (
            <form 
                onSubmit={() => props.handleSubmit({
                    username: document.querySelector('#username').value,
                    email: document.querySelector('#email').value,
                    password: document.querySelector('#password').value,
                    password_confirm: document.querySelector('#password_confirm').value,
                })}
            >
                <input name="username" id="username" placeholder="Username" />
                <input name="email" id="email" placeholder="Email" />
                <input name="password" id="password" type="password" />
                <input name="password_confirm" id="password_confirm" type="password" />
                <button type="submit" value="Sign up"/>
            </form>
        )
    }
)
```

As you can see, the usage of `withApi` is really simple - it only needs two parameters, and it passes down two new props - `apiState` and `apiRequest`. It's interface can be extended via optional arguments later. 

if we want to do something to the data before sending it to the server, like validate or transform it, we can use a higher-order component again. I've done it in `RegisterForm` to demonstrate how to implement non-standard cases while still reaping the beneifts of functional composition.

The code above can be further improved by moving code related to API request state into a separate component, but it's out of scope of this post.

## Conclussion

This post is meant to be the last in the series about functional programming in React. I wrote it to explain the concepts to a relatively inexperienced developer, or someone who is coming from an object-oriented language like Java. I believe that I gave a good overview - from showing how functional programming is native to JavaScript to creating a reusable higher-order component.

I don't think that FP is necessarily superior to object-oriented approach, but it makes a lot of sense to me in context of React. React [documentation](https://reactjs.org/docs/composition-vs-inheritance.html) mentions FP a lot, and core team members have [expressed preference for it](https://twitter.com/dan_abramov/status/752643494972383232). 

My experience tells me that functional programming works well in a very big codebase that is shared across different product teams. Working with the functional code was good developer experience, it fascilitated a lot of code reuse and encouraged engineers to have good test coverage of reused code. FP became my favorite paradigm, and I have learned to apply it in other languages like Python and Go.

## Useful links

- [SOLID: The next step is functional](https://blog.ploeh.dk/2014/03/10/solid-the-next-step-is-functional/) - an article about the virtues of functional programming.