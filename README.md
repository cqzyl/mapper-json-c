# mapper-json-c

> 用于将json数据根据指定实例格式化 npm i mapper-json-c

## 装饰器
### @JsonProperty()
赋值装饰器，将json中的属性赋值给class中定义的对应属性
```typescript
class TestEntity {
    // str => str
    @JsonProperty()
    str: string = undefined;

    // str1 => str1
    @JsonProperty('str1')
    str1: string = undefined;
    
    // str1 => str2
    @JsonProperty('str1')
    str2: string = undefined;

    // obj = TestEntity => obj
    @JsonProperty({ name: 'obj', clazz: TestEntity })
    obj: TestEntity = void 0;
}
```

### @ObjectEntriesProperty()
转义装饰器，将json中的对象属性拆分key-value后赋值给class中定义的对应属性
```typescript
class TestEntity {
    // {key1:value1,key2:value2} => [{label:key1,value:value1},{label:key2,value:value2}]
    @ObjectEntriesProperty()
    objArr1: {label:string,value:string}[] = [];

    // {key1:value1,key2:value2} => [{myLabel:key1,myValue:value1},{myLabel:key2,myValue:value2}]
    @ObjectEntriesProperty(['myLabel','myValue'])
    objArr2: {label:string,value:string}[] = [];
}
```

### @LockString()
String类型锁装饰器，锁定属性类型为String
```typescript
class TestEntity {
    // 'number', 'boolean', 'bigint' 会被转为string
    // 其他的设置为空字符串
    @LockString()
    str: string = undefined;

    // 'number', 'boolean', 'bigint' 会被转为string
    // object,array 会被设置为JSON字符串
    // 其他的设置为空字符串
    @LockString('json')
    str1: string = undefined;
    

    // undefined, null 转为空字符串
    // 其他数据强制执行String()方法
    @LockString('force')
    str2: string = undefined;

    // 所有数据强制执行String()方法
    @LockString('forceAll')
    str3: string = void 0;
}
```
### @LockNumber()
Number类型锁装饰器，锁定属性类型为Number
```typescript
class TestEntity {
    // 'number', 'boolean'类型会转为数字，其他类型的会被设置为undefined
    @LockNumber()
    num: number = undefined;

    // 'number', 'boolean'类型会转为bigint，其他类型的会被设置为undefined
    @LockNumber('bigint')
    str2: string = undefined;
}
```

使用示例

### 创建自己的实例对象
```
class TestEntity {
    @JsonProperty('num')
        num: number = undefined;
    
        @JsonProperty()
        str: string = undefined;
    
        @JsonProperty()
        bool: boolean = false;
        
        @JsonProperty()
        arr: [] = undefined;
        
        @JsonProperty()
        obj: {} = undefined;
        
        @JsonProperty({ name: 'me', clazz: TestEntity })
        me: TestEntity = void 0;
    
        @JsonProperty({ clazz: TestEntity })
        me1: TestEntity = void 0;
        
        @JsonProperty({ name: 'me', clazz: TestEntity })
        me2: TestEntity = void 0;

        @LockNumber()
        num1: number = void 0;

        @LockString()
        str1: string = void 0;
        
        @JsonProperty({ name: 'meArr', clazz: TestEntity })
        meArr: TestEntity[] = [];

        @ObjectEntriesProperty()
        objArr1: {label:string,value:string}[] = [];

        @ObjectEntriesProperty(['label','value'])
        objArr2: {label:string,value:string}[] = [];

        // 先转换属性名称，再转格式
        @ObjectEntriesProperty(['label','value'])
        @JsonProperty('objArr0')
        objArr3: {label:string,value:string}[] = [];
}
```

### input :
```
const json = {
    num: 1,
    str: 'strin',
    bool: false,
    arr: [{test: 1}],
    obj: { a: 1 },
    me: { num: 0 },
    me1: { num: 1 },
    me2: { num: 2 },
    me3: { num: 3 },
    num1: '1',
    str1: 2,
    meArr: [{}],
    objArr1: {1:'v11',2:'v22'},
    objArr2: {1:'v11',2:'v22'},
    objArr0: {1:'v11',2:'v22'},
    undefindKey: '1',
}
```
### use :
```
mapperJsonC(json, TestEntity)
```
### output :
```
TestEntity {
    num: 1,
    str: 'strin',
    bool: false,
    arr: [{test: 1}],
    obj: { a: 1 },
    me: {
        num: 0,
        str: undefined,
        bool: undefined,
        arr: undefined,
        obj: undefined,
        me: undefined,
        me1: undefined,
        me2: undefined,
        num1: undefined,
        str1: '',
        meArr: [],
        objArr1: [],
        objArr2: [],
        objArr3: [],
    },
    me1: {
        num: 1,
        str: undefined,
        bool: undefined,
        arr: undefined,
        obj: undefined,
        me: undefined,
        me1: undefined,
        me2: undefined,
        num1: undefined,
        str1: '',
        meArr: [],
        objArr1: [],
        objArr2: [],
        objArr3: [],
    },
    me2: {
        num: 0,
        str: undefined,
        bool: undefined,
        arr: undefined,
        obj: undefined,
        me: undefined,
        me1: undefined,
        me2: undefined,
        num1: undefined,
        str1: '',
        meArr: [],
        objArr1: [],
        objArr2: [],
        objArr3: [],
    },
    num1: 1,
    str1: '2',
    meArr: [{
        num: undefined,
        str: undefined,
        bool: undefined,
        arr: undefined,
        obj: undefined,
        me: undefined,
        me1: undefined,
        me2: undefined,
        num1: undefined,
        str1: '',
        meArr: [],
        objArr1: [],
        objArr2: [],
        objArr3: [],
    }],
    objArr1: [['1','v11'],['2','v22']],
    objArr2: [{label:'1',value:'v11'},{label:'2',value:'v22'}],
    objArr3: [{label:'1',value:'v11'},{label:'2',value:'v22'}],
}

```

### 可参考单元测试用例
