import * as React from "react"
import { useState, useEffect } from "react"
import {
  Code,
  Texts,
  Title,
  Text,
  Answer,
  Images,
  Blank,
} from "../../component"
import { state } from "../../utils/data/index"
import pic1 from "../../public/image/usestate/ima1.png"

const problems = [
  {
    id: "1",
    text: "为什么setXXX后不能马上拿到最新的state的值？",
  },
  {
    id: "2",
    text: "多个setXXX是如何合并的？",
  },
  {
    id: "3",
    text: "setXXX到底是同步还是异步的？",
  },
  {
    id: "4",
    text: "为什么setXXX的值相同时，函数组件不更新？",
  },
  {
    id: "5",
    text: "setXXX是什么时候初始化又是什么时候开始更新的？",
  },
  {
    id: "6",
    text: "hook，不要在循环、条件判断或者子函数中调用？",
  },
]

const answers: any = [
  [
    {
      type: "text",
      text: "根本原因是setState并不是真正意义上的异步操作，它只是模拟了异步的行为。React中会去维护一个标识（isBatchingUpdates），判断是直接更新还是先暂存state进队列。",
    },
    {
      type: "text",
      text: "只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout, promise 中都是同步的",
    },
  ],
  [
    {
      type: "text",
      text: "这里就涉及到 react 的 batchUpdate 机制，合并更新",
    },
    {
      type: "text",
      text: "如果没有合并更新，在每次执行 useState 的时候，组件都要重新 render 一次，会造成无效渲染，浪费时间（因为最后一次渲染会覆盖掉前面所有的渲染效果）。所以 react 会把一些可以一起更新的 useState/setState 放在一起，进行合并更新。",
    },
  ],
  [
    {
      type: "text",
      text: "其实问题1和2了解了的话，3就很好了解了，因为react batchUpdate 机制，造成的所谓的异步",
    },
    {
      type: "text",
      text: "补充一点哪些能明中 batchUpdate机制： 生命周期，react的注册事件。  不能命中的事件：setTimeout/setInterval/Promise.then(fn)/fetch 回调/xhr 网络回调 ",
    },
  ],
  [
    {
      type: "text",
      text: "是进行判断上一次的值和当前的值是否一样",
    },
  ],
  [
    {
      type: "text",
      text: "如上面的模拟useState源码， isMount 为true的时候代表初始化， 为false的时候代表更新",
    },
  ],
  [
    {
      type: "text",
      text: "保存的数据是一个链式，如果是一个判断语句，第一次是true,但是后面变成了false,后面数据取到的值 取到的是上一个的值",
      code: "",
    },
  ],
]

const strangeProblem: any = [
  {
    id: 1,
    text: "useState更新相同的State,函数组件为什么执行2次",
  },
]

const strangeAnswers: any = [
  [
    {
      type: "text",
      text: "对于更新组件的方法函数组件 useState 和类组件的setState有一定区别，useState源码中如果遇到两次相同的state，会默认阻止组件再更新，但是类组件中setState如果没有设置 PureComponent，两次相同的state 也会更新",
    },
    {
      type: "text",
      text: "双缓冲树：React 用 workInProgress树(内存中构建的树) 和 current(渲染树) 来实现更新逻辑。我们console.log打印的fiber都是在内存中即将 workInProgress的fiber树。双缓存一个在内存中构建，在下一次渲染的时候，直接用缓存树做为下一次渲染树，上一次的渲染树又作为缓存树，这样可以防止只用一颗树更新状态的丢失的情况，又加快了dom节点的替换与更新",
    },
    {
      type: "text",
      text: "更新机制：在一次更新中，首先会获取current树的 alternate作为当前的 workInProgress，渲染完毕后，workInProgress 树变为 current 树。我们用如上的树A和树B和已经保存的baseState模型，来更形象的解释了更新机制",
    },
  ],
]

const picText = () => {
  return (
    <div>
      <p className="mgtb5">fiber 如何生成的链表</p>
      <p className="mgtb5">{"workInprogressHook ==> W"}</p>
      <p className="mgtb5">{"memoizedState ==> M"}</p>
      <p className="mgtb5">
        1, 2 表示第一次进入 isMount 为true的时候 fiber.workInprogressHook 和
        workInprogressHook 指向同一个地址堆
      </p>
      <p className="mgtb5">
        第二个useState进入 workInprogressHook.next = hook;
        就是图中标记的3的位置， workInprogressHook = hook;由2变成了4
      </p>
      <p className="mgtb5">
        第三个useState进入 workInprogressHook.next = hook;
        就是图中标记的5的位置， workInprogressHook = hook;由4变成了6
      </p>
      <p className="mgtb5">以此循环</p>
    </div>
  )
}

const HookUseState = () => {
  const [title, setTitle] = useState("思考")
  const [num, setNum] = useState(0)
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)

  console.log(num, num1, num2)
  const testClick = () => {
    setTimeout(() => {
      setNum((num) => num + 1)
      setNum1((num1) => num1 + 2)
      setNum2((num2) => num2 + 3)
    })
  }

  return (
    <main className="common-main">
      <Title title={"useState的使用"} />
      <Code lang="javascript">{state.useStateCase}</Code>
      <Texts title={title} texts={problems} />
      <Blank />
      <Title title={"模拟useState的源码解析"} />
      <Text text={"以下代码模拟了useState部分源码"} />
      <Code lang="javascript">{state.useStateSourceCode}</Code>
      <Blank />
      {/* <div onClick={() => testClick()}>1111</div> */}

      <Images render={picText} img={[pic1]} title="图一" />
      <Blank />
      <Blank />
      <Title title={"思考解答"} />
      <Answer problems={problems} answers={answers} />

      <Blank />
      <Blank />
      <Title title={"React‘灵异’现象"} />
      <Answer problems={strangeProblem} answers={strangeAnswers} />
    </main>
  )
}

export default HookUseState
