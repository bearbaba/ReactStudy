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

`event.target.value`即每次输入框中动态更新的内容（我们不能使用 HTML 的`value`属性，通过操作 DOM 来操作 HTML）。

现在我们已经能实时获取新的便笺的`content`了，那么我们需要解决如何保存一个完整的便笺，而不只是它的`content`问题。

```js
const addNote = (event) => {
  event.preventDefault();
  const noteObject = {
    content: newNote,
    data: new Date().toISOString(),
    import: false,
    id: notes.length + 1,
  };

  setNotes(notes.concat(noteObject));
  setNewNote("");

  console.log(notes);
};
```

`noteObject`即补充完整了便笺对象的全部内容。`content`的值即我们能动态获取的`newNote`，`data`是使用`new Date()`的实例化生成的。`id`的值即便笺列表中的个数。

`setNotes`用于保存便笺对象，每次保存完毕后，`setNewNote("")`将输入框的内容区给置空。

### 手动控制便笺的显示隐藏

现在我们再添加一个功能，即添加一个按钮，按钮点击时隐藏便笺对象中`important`值为`false`的对象。

```js
const [showAll, setShowAll] = useState(true);
```

现在多添加了一个对按钮进行状态管理的状态函数，按钮默认为`true`时，就会全部显示便笺内容，而按钮为`false`时，隐藏`important`值为`false`的便笺。

```js
const notesToShow = showAll
  ? notes
  : notes.filter((note) => note.important === true);
```

当`showAll`可以被控制布尔值时，我们就需要考虑怎样让它为`true`时显示全部便笺，而为`false`时隐藏`important`值为`false`的便笺。上述使用了一个非常巧妙的三目运算符。`showAll`为`false`时就会让`notes`过滤出`note.important !== true`的`note。

那么最后只需要在添加一个按钮，让这个按钮能够控制`showAll`的布尔值即可。

```js
<div>
  <button onClick={() => setShowAll(!showAll)}>
    show {showAll ? "all" : "important"}
  </button>
</div>
```

## 从服务器获取数据

现在我们希望数据能够存储在后端，并且能从后端获取，此时我们可以使用一个`json-server`工具作为我们的服务器。

首先把一个便笺内容保存为项目根目录下的`db.json`。

```json
{
  "notes": [
    {
      "id": 1,
      "content": "HTML is easy",
      "date": "2019-05-30T17:30:31.098Z",
      "important": true
    },
    {
      "id": 2,
      "content": "Browser can execute only JavaScript",
      "date": "2019-05-30T18:39:34.091Z",
      "important": false
    },
    {
      "id": 3,
      "content": "GET and POST are the most important methods of HTTP protocol",
      "date": "2019-05-30T19:20:14.298Z",
      "important": true
    }
  ]
}
```

先使用`yarn`全局安装`json-server`，命令为：

```shell
yarn global add json-server
```

安装完之后，可以使用如下命令运行`json-server`:

```shell
json-server --port 3001 --watch db.json
```

这里将端口设置为 3001 端口，在浏览器地址栏输入`http://localhost:3001`能访问到这个 json 文件，地址后再加`/notes`就是整个便笺列表的内容了。

这里涉及到了文件请求，前端凡是涉及到请求一类的，绕不过的便是异步请求方法，原生 JS 使用的是 XHR 请求方法，现在我们可以使用一个封装好的`axios`库。

使用`yarn`安装这个`axios`库。

```shell
yarn add axios
```

首先在`index.js`中尝试使用这个库，

```js
import axios from "axios";

const promise1 = axios.get("http://localhost:3001/notes");
console.log(promise1);

const promise2 = axios.get("http://localhost:3001/foorbar");
console.log(promise2);
```

这里使用的是一个异步请求的方法，我们向`http://localhost:3001/notes`与`http://localhost:3001/foorbar`发送了请求，虽然两个输出语句都能打印出来，但是在第二个网址输出时会报错，因为并不存在`/foorbar`。

实际上`get()`方法返回的是一个`promise`对象，这个对象具有三种状态：

1. The promise is pending 提交中: 这意味着最终值(下面两个中的一个)还不可用。
2. The promise is fulfilled 兑现: 这意味着操作已经完成，最终的值是可用的，这通常是一个成功的操作。 这种状态有时也被称为 resolve。
3. The promise is rejected 拒绝:它意味着一个错误阻止了最终值，这通常表示一个失败操作。

对于`promise1`而言显然它对应着操作已经完成，即状态 2，如果需要进行下一步处理就需要使用到`then()`方法。

```js
promise1.then((response) => {
  console.log(response.data);
});
```

`then`方法中注册一个回调函数，在请求操作成功完成时就会调用这个回调函数。

`response`对象包含与 HTTP GET 请求响应相关的所有基本数据，也包括返回的`data`、`status code`和`headers`。

在之前的内容中，我们对便笺内容使用了状态管理，以便动态更新便笺内容，在这里我们也需要使用`useState()`，显然我们会把它放入`promise1.then()`中来加载初始的`notes`，但是如果我们真的这么做了就会发现数据会一直会被请求加载，组件也会不停地被渲染。

原因在于我们每次请求数据都会导致状态被更新，状态更新会导致组件更新，组件更新又会导致`useState()`被执行，所以数据会一直被请求，组件也会一直被不停渲染。

为了解决上述的问题，我们需要使用一个新的状态管理`useEffect()`，它含有第二个参数，当我们只想在组件 mount 时请求数据时，我们可以传递一个空数组作为`useEffect`的第二个参数，这样就能避免在组件更新执行`useEffect`，只会在组件`mount`时执行。

```js
useEffect(() => {
  axios.get("http://localhost:3001/notes").then((res) => {
    console.log(res.data);
    setNotes(res.data);
  });
}, []);
```

有了`useEffect()`就可以正常获取`notes`了。

## 在服务端输出数据

### 上传到服务器


