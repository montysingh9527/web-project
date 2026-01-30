# React + TypeScript + Vite

## TypeScript 学习
```javascript
export interface RMBRes {
  amount: number;
  price: number | string;
  types: {
    code: string,
    id: number,
    name: string,
  }[];
}
```

等价于

```javascript
export interface RMBTypes {
    code: string,
    id: number,
    name: string,
}

export interface RMBRes {
  amount: number,
  price: number | string,
  types: RMBTypes[],
}
```

### type
```js
export type MerchIdItem {
  amount: number,
  IdList: number[],
}
```

### enum
```js
export enum ProtoMap {
  ERC20 = 'ERC20',
  TRC20 = 'TRC20',
}

export enum DisplayStatus {
  FAILED = 1, // 失败
  SUCCESS = 2, // 成功
}
```