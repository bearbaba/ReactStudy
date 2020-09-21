# React 学习笔记（再一次）

## 项目创建

使用 `yarn` ，首先全局安装 `create-react-app` ：

```shell
yarn add create-react-app -g
```

如果没有 `yarn` ，可以先用 `npm` 全局安装 `yarn` ：

```shell
npm install yarn -g
```

使用 `create-react-app` 创建名为 `app1` 的 React 项目：

```shell
create-react-app app1
```

创建后会生成以下文档：

```*
├─node_modules
├─public
├─package.json
├─.gitignore
├─README.md
├─yarn.lock
└─src

```

`src` 文件夹内存放的是我们项目的代码。

可以先进入到本项目：

```shell
cd app1
```

然后使用 `yarn start` 命令生成网页页面。

## React 初体验

### 组件创建

现在我们开始尝试创建属于我们自己的页面。

将 `src` 文件夹下除 `index.js` 保留外的全部文件删除。清空 `index.js` 的内容。

为了能够使用 `React` 框架，首先需要导入 `React` ：

```js
import React from "react";
import ReactDOM from "react-dom";
```

`ReactDOM` 将在之后渲染组件时用上。

现在我们开始考虑创建一个能够以大号字体显示 `Hello world!` 标题字样的组件。

```js
const App = () => {
  return (
    <div>
      <h1> Hello World </h1>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
```

这里巧妙地利用了箭头函数的方式，将一个 `html` 标签作为返回值的函数赋值给了 `App` 。如果需要渲染这个 `App` 标签的内容，就不得不需要使用 `ReactDOM.render()` 方法了。渲染是将整个 `App` 函数的返回值的 `html` 标签内容放入了一个 `id` 值为 `root` 的 `<div></div>` 标签内，这个标签位于`public`文件夹下的`index.html`内，实际 React 的渲染就是将组件内容放进`index.html`内。

React 要求组件内的 HTML 内容都需要一个标签作为根标签，所以像以下这样写是不行的：

```js
const App = () => {
    return (

        <h1> Hello World </h1>
        <h2> Hello World </h2>

    )
}
```

但是我们可以将作为根的标签使用 fragments 语法来写，即用空标签来包裹组件的内容。

```js
const App = () => {
  return (
    <>
      <h1> Hello World </h1>
    </>
  );
};
```

### 在组件内使用变量

在创建组件函数内的返回值外初始化变量，只需要使用花括号语法就能在组件内容使用这个变量了。例：

```js
const App = () => {
  const world = "World";

  return (
    <div>
      <p> Hello {world} </p>
    </div>
  );
};
```

花括号语法还能够进行简单的数据运算，例：

```js
const App = () => {
  const world = "World";
  const num1 = 12;
  const num2 = 13;

  return (
    <div>
      <p> Hello {world} </p>
      <p>{num1 + num2}</p>
    </div>
  );
};
```

### 父子组件

可以在组件外重新构建一个组件，然后再组件内部使用。

```js
import React from "react";
import ReactDOM from "react-dom";

const Hello = (props) => {
  const { name, color } = props;
  return (
    <div>
      <h1>Hello {name}</h1>
      <h2>color: {color}</h2>
    </div>
  );
};

const App = () => {
  const num1 = 12;
  const num2 = 13;
  return (
    <div>
      <p>Hello World</p>
      <Hello name="Gerro" color="red" />
      <p>{num1 + num2}</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
```

此时`<App>`组件就是`<Hello>`组件的父组件了，`<Hello>`组件可以多次在父组件中使用。

上述代码还存在一个父组件向子组件传递数据的内容。

### 父子数据传递 父传子

如上所示，如果父组件需要向相应的子组件传递数据，只需要将相应的子组件的属性写在引用它的地方即可，传递的数据会被一并打包进`props`对象属性内。

上述代码使用了对象的解构语法，

```js
const { name, color } = props;
```

实际上也可以用访问对象的方式。

```js
const name = props.name;
const color = props.color;
```

## 状态管理 Hook

如果我们希望创建一个每秒增加数值 1 的组件需要怎么处理？

如果一个组件每秒都增加数值 1 ，这意味着它不得不重新渲染一遍，但如果为了局部的内容就要渲染整个页面就显得太浪费了。好在 React 提供状态管理的方法，能够局部更新内容。

`useState()`能够返回一个`state`，以及更新`state`的函数，如果需要使用`useState()`方法就不得不从 React 库内导入了。

```js
import React, { useState } from "react"; //将 useState 方法与 React 一起从 react 内导入
```

现在这个能够自行更新的组件内容就是：

```js
const Clock = () => {
  const [state, setState] = useState(0);

  setTimeout(() => {
    setState(state + 1);
  }, 1000);

  return (
    <div>
      <p>{state}</p>
    </div>
  );
};
```

`setState()`就是一个能够用来更新`state`的方法，需要注意的是这个方法的名字实际上是我们自定义的，它可以叫做`setState`也可以叫做别的名字，`state`也是这样，名字只是代号。

```js
setTimeout(() => {
  setState(state + 1);
}, 1000);
```

上述定时器中的`setState(state + 1)`用于更新`state`，需要注意的是更新状态的函数（比如这里的`setState()`）不要直接对状态操作，而是操作状态的副本，更新的内容最终还是会返回给`state`的。

## 渲染集合到模块学习

现在我们有一个便笺，我们将从`App`组件外部导入进去，然后分别渲染数组中每个对象里面的不同内容。

```js
const notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];
```

整个代码可以写为：

```js
import React from "react";
import ReactDOM from "react-dom";

const notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

const App = (props) => {
  const { notes } = props;

  return (
    <div>
      {notes.map((prop) => {
        return <li key={prop.id}>{prop.content}</li>;
      })}
    </div>
  );
};

ReactDOM.render(<App notes={notes} />, document.getElementById("root"));
```

这里使用了`map`方法，需要注意的是`map`需要绑定一个唯一的键值`key`，用来确定重新渲染时更新组件的视图。

### 重构模块

我们希望将`ul`中的每一项独立出来作为一个新的组件。

组件通常放在`src`文件夹下的`components`文件夹内。

```js
import React from "react";

const Note = ({ note }) => {
  return <li>{note.content}</li>;
};

export default Note;
```

这里就是一个名为`Note.js`的组件，它在当前这个组件里无需`render`，所以没有导入`ReactDOM`。

注意这里的`const Note = ({note}) => (<li>{note.content}</li>)`中的解构写法，我们需要注意的是所有从外部导入进来的数据都会被封装进`props`对象中，即使这个外部导入的数据原本就是一个对象了。

这也是为什么之前使用`const {notes} = props`的原因。

那么`index.js`中需要使用外部组件就需要`import`了。

```js
import Note from "./components/Note";
```

那么`App`组件中使用`Note`组件就会写为：

```js
const App = (props) => {
  const { notes } = props;

  return (
    <div>
      {notes.map((note) => {
        return <Note note={note} key={note.id} />;
      })}
    </div>
  );
};
```

### 添加新便笺

现在考虑在增加新便笺时可以实时渲染页面内容，那么这里我们就会使用上`useState`状态管理函数。

```js
const [notes, setNotes] = useState(props.notes);
```

很明显，`setNotes`用于更新`notes`状态，`notes`的初值就是`props.notes`。

这里使用一个表单标签用于控制新的便笺内容。

```js
<form onSubmit={addNote}>
  <input />
  <button type="submit">save</button>
</form>
```

`onSubmit`函数用于提交时更新整个便笺，在`<input />`内输入新的便笺内容。

在写`addNote`函数时应当考虑如何更新便笺，便笺中不止有`content`属性，因而还需要要考虑如何生成便笺的其它属性值，还应当考虑到如何把输入框的内容保存到`js`内的变量上。

```js
const addNote = (event) => {
  event.preventDefault();
  console.log("button clicked", event.target);
};
```

目前的`addNote`函数如上所示，这个函数会在表单提交时被调用，函数调用同时还会生成一个`event`，`event`表示这个表单被提交的事件。

`event.preventDefault()`用于阻止表单被提交时重新渲染整个页面。

`event.target`则会在`addNote`函数被调用时显示表单元素内容。

现在我们解决如何保存输入框内容的问题。

在`input`标签内有一个`value`属性，它会保存输入框的内容，我们只需将我们想要保存的新便笺内容与该属性绑定，输入框的内容自然会成为新便笺的内容。

考虑到需要保存一个新便笺，所以我们需要再使用一个状态管理函数用来管理新便笺的内容状态。

```js
const [newNote, setNewNote] = useState("a new note...");
```

`newNote`的初值是`"a new note..."`，它也会作为输入框默认值。

但是仅仅这么做还不足够，我们无法将输入框的内容动态更新成新便笺的内容，好在 React 为输入框提供了一个`onChange`属性，将它与一个方法进行绑定，输入框每次内容动态更新时就会调用被绑定的方法。

```js
<form onSubmit={addNote}>
  <input value={newNote} onChange={handleNewNote} />
  <button type="submit">save</button>
</form>
```

现在只需要在`handleNewNote`函数中更新`newNote`状态即可。

```js
const handleNewNote = (event) => {
  console.log(event.target.value);
  setNewNote(event.target.value);
};
```

`event.target.value`即每次输入框中动态更新的内容（我们不能使用 HTML 的`value`属性，React 通过操作虚拟 DOM 来操作 HTML）。

