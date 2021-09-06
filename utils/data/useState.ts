const useStateSourceCode = `// useState 是通过2部分来实现的 
// 通过isMount 来区分这2部分 
// isMount 为true  代表初次进入
// isMount 为false 代表update

let isMount = true;

let workInprogressHook = null;

const App = () => {
    const [num, updateNum] = useState(0)
    console.log('num', num)
    return {
        onclick() {
            updateNum(num => num + 1)
            console.log('isUpdatedNum', num)
        }
    }
}

const fiber = {
  stateNode: App,
  memoizedState: null
}

const useState = (init) => {
  let hook;

  if (isMount) {
    // isMount 为true  准备缓存所有数据
    hook = {
        memoizedState: init,
        next: null,
        queun: {
            pending: null
        }
    }
    if (!fiber.memoizedState) {
        fiber.memoizedState = hook;
      } else {
        workInprogressHook.next = hook;
      }
      workInprogressHook = hook;

      // 数据存储在 fiber.memoizedState 这个链表上 如下面图1（详解链表过程）
  } else {
      // 进入了update阶段 当前的workInprogressHook 指向的fiber.memoizedState的链表 
      // hook 也指向了 iber.memoizedState的链表 的地址
      hook = workInprogressHook
      // workInprogressHook 获取下一个链路的数据
      workInprogressHook = workInprogressHook.next
  }

  // isMount true: 得到第一次init
  // isMount fasle: 拿到的是hook.memoizedState（指向的当前链表的memoizedState的值（不一定是是最新的值））
  // 如： 上一次更新了，拿到的是上一次更新前的值，没有更新拿到的就是最新的值
  let baseState = hook.memoizedState;

  // setState 当前函数不会更新值，会保存跟新的值在 queun.pending（fiber） 里面
  // 再次进入函数的时候，hook.queun.pending有值，代表上一次更新了这个值
  if (hook.queun.pending) {
      let firstUpdate = hook.queun.pending.next;

      do {
          const action = firstUpdate.action
          // 如果action 是一个函数,执行
          baseState = typeof action === 'function' ? action(baseState) : action

          firstUpdate = firstUpdate.next

          //firstUpdate !== hook.queun.pending.next  跳出循环
      } while (firstUpdate !== hook.queun.pending.next)

      hook.queun.pending = null;
  }

  // 这个时候baseState  是最新的值
  hook.memoizedState = baseState;

  return [baseState, dispatchAction.bind(null, hook.queun)]

}

const dispatchAction = (queun, action) => {
    const update = {
        action,
        next: null,
    }
    // 值形成一个环状
    if (queun.pending === null) {
        update.next = update
    } else {
        // 什么时候走else 更新的 使用setTimeOut(schedule(), 0)
        update.next = queun.pending.next
        queun.pending.next = update
    }

    // 值被保存在queun.pending  指向的是fiber 这个链路
    queun.pending = update
    // 再次render
    schedule();
}

// 1 触发更新
const schedule = () => {
    // fiber.memoizedState 和 workInprogressHook 指向同一个链表
    workInprogressHook = fiber.memoizedState
    const app = fiber.stateNode()
    isMount = false;
    return app
}

window.app = schedule();
// app.onclick()`

const useStateCase = `const App: React.FC = () => {
  const [count, setCount] = useState<number>(0)
  return (
      <>
          <p>You clicked {count} times</p>
          <button onClick={() => {
              setCount(count + 1)
          }}>
              Click me
          </button>
      </>
  )
}`

export { useStateSourceCode, useStateCase }
