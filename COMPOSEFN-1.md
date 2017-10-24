Standart COMPOSEFN-1
==

## 1.1.1 Any functions passed to `concatenate` will be invoked in a chain for getting value

## 1.1.1.1 Function call erases the stack, but add one value on return

```
Current stack: [?, ?, ?]
Call Word
Next stack: [?]
```

## 1.1.1.2 Non-function values replace the stack

## 1.1.2.1 Stack never empty

Even if the _word_ returned `undefined` value, stack will contain `[undefined]`

## 1.1.4. Stack passes to args in reverse order

_Stack_: `['a', 'b', 'c']` to be _Args_: `['c', 'b', 'a']`

## 1.1.5. Arguments are stacked in reverse order

Due to the fact that additions to the stack must be pushed on top of existing values, and when it passes to the function, the top values became first arguments

_Args_: `['a', 'b', 'c']` to be _Stack_: `['c', 'b', 'a']`

## 1.1.6. An array will extends stack

If you pass an array to the `concatenate` function, each of its keys will add a new value to the stack

## 1.1.6.2 Any functions stored in passed array will be executed in a series for getting value

## 1.1.6.2.1 Any functions stored in passed array will be executed with arguments from the stack

## 1.1.6.2.2 Any functions stored in passed array will be executed with arguments from the stack, which formed by last unit

It means that array-unit has no effect on the stack til that array-unit will totally done
