# mapper-json-c

> 用于将json数据根据指定实例格式化 npm i mapper-json-c

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
    meArr: [{}],
    
    objArr1: {1:'v11',2:'v22'},
    objArr2: {1:'v11',2:'v22'},
    objArr0: {1:'v11',2:'v22'},
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
    me: TestEntity {
        num: 0
        str: undefined,
        bool: undefined,
        arr: undefined,
        obj: undefined,
        me: undefined,
        me1: undefined,
        me2: undefined,
        meArr: undefined,
        objArr1: [],
        objArr2: [],
        objArr3: [],
    },
    me1: TestEntity {
        num: 1
        str: undefined,
        bool: undefined,
        arr: undefined,
        obj: undefined,
        me: undefined,
        me1: undefined,
        me2: undefined,
        meArr: undefined,
        objArr1: [],
        objArr2: [],
        objArr3: [],
    },
    me2: TestEntity {
        num: 0
        str: undefined,
        bool: undefined,
        arr: undefined,
        obj: undefined,
        me: undefined,
        me1: undefined,
        me2: undefined,
        meArr: undefined,
        objArr1: [],
        objArr2: [],
        objArr3: [],
    },
    meArr: [TestEntity {
        num: undefined,
        str: undefined,
        bool: undefined,
        arr: undefined,
        obj: undefined,
        me: undefined,
        me1: undefined,
        me2: undefined,
        meArr: undefined,
        objArr1: [],
        objArr2: [],
        objArr3: [],
    }],
    objArr1: [['1','v11'],['2','v22']],
    objArr2: [{label:'1',value:'v11'},{label:'2',value:'v22'}],
    objArr3: [{label:'1',value:'v11'},{label:'2',value:'v22'}]
}

```

### 可参考单元测试用例
