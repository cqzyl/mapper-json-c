/*
 * @Description: 测试
 * @Author: ChenQiang
 * @Date: 2021-12-21 10:17:37
 * @LastEditors: ChenQiang
 * @LastEditTime: 2021-12-22 14:58:03
 * @FilePath: \test\test.test.ts
 */
import 'mocha'
import { expect } from 'chai';
import { JsonProperty, ObjectEntriesProperty, mapperJsonC } from '../build';

// test code

describe('mapperJsonC 测试', function () {
    it('去除未约定属性名称', function () {
        class TestEntity {
            @JsonProperty()
            str: string = undefined;
        }
        const endVal = mapperJsonC({
            num: 1,
            str: 'strin'
        }, TestEntity);

        expect(endVal).to.deep.equal({
            str: 'strin'
        });
    });

    it('对于定义为基础类型的属性赋值', function () {
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
            
            @JsonProperty()
            symb: Symbol = undefined;
        }

        const sm = Symbol('a');

        const endVal = mapperJsonC({
            num: 1,
            str: 'strin',
            bool: false,
            arr: [{test: 1}],
            obj: { a: 1 },
            symb: sm
        }, TestEntity);

        expect(endVal).to.deep.equal({
            num: 1,
            str: 'strin',
            bool: false,
            arr: [{test: 1}],
            obj: { a: 1 },
            symb: sm
        });
    });

    it('对于定义为对象的属性赋值', function () {
        
        class TestEntity {
            @JsonProperty('test')
            test: string = undefined;

            @JsonProperty({ name: 'me', clazz: TestEntity })
            me: TestEntity = void 0;
        }
        const endVal = mapperJsonC({
            test: 1,
            me: {
            }
        }, TestEntity);

        expect(endVal).to.deep.equal({
            test: 1,
            me: {
                test: undefined,
                me: undefined
            }
        });
    });
    
    it('对于错误定义为对象的属性赋值', function () {
        class TestEntity {
            @JsonProperty('test')
            test: string = undefined;

            @JsonProperty({ name: 'me', clazz: TestEntity })
            me: TestEntity = void 0;
        }
        const endVal = mapperJsonC({
            test: 1,
            me: 'str'
        }, TestEntity);

        expect(endVal).to.deep.equal({
            test: 1,
            me: 'str'
        });
    });
    
    it('对于定义为对象或数组,已设置初始化值,但json对应的属性为undefind的赋值', function () {
        class TestEntity {
            @JsonProperty('test')
            test: string = undefined;

            @JsonProperty({ name: 'me', clazz: TestEntity })
            me: TestEntity = void 0;

            @JsonProperty({ name: 'me1', clazz: TestEntity })
            me1: TestEntity[] = [];
            
            @JsonProperty({ name: 'me2', clazz: TestEntity })
            me2?: TestEntity[] = void 0;
        }
        const endVal = mapperJsonC({
            test: 1,
        }, TestEntity);

        expect(endVal).to.deep.equal({
            test: 1,
            me: undefined,
            me1: [],
            me2: undefined,
        });
    });

    
    it('对象key-value转换', function () {
        class TestEntity {
            @ObjectEntriesProperty()
            objArr1: {label:string,value:string}[] = [];

            @ObjectEntriesProperty(['label','value'])
            objArr2: {label:string,value:string}[] = [];

            // 先转换属性名称，再转格式
            @ObjectEntriesProperty(['label','value'])
            @JsonProperty('objArr0')
            objArr3: {label:string,value:string}[] = [];
        }
        const endVal = mapperJsonC({
            objArr1: {1:'v11',2:'v22'},
            objArr2: {1:'v11',2:'v22'},
            objArr0: {1:'v11',2:'v22'}
        }, TestEntity);

        expect(endVal).to.deep.equal({
            objArr1: [['1','v11'],['2','v22']],
            objArr2: [{label:'1',value:'v11'},{label:'2',value:'v22'}],
            objArr3: [{label:'1',value:'v11'},{label:'2',value:'v22'}]
        });
    });

    
    it('综合测试', function () {
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
        const endVal = mapperJsonC({
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
        }, TestEntity);

        expect(endVal).to.deep.equal({
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
                meArr: [],
                objArr1: [],
                objArr2: [],
                objArr3: [],
            },
            meArr: [{
                num: undefined,
                str: undefined,
                bool: undefined,
                arr: undefined,
                obj: undefined,
                me: undefined,
                me1: undefined,
                me2: undefined,
                meArr: [],
                objArr1: [],
                objArr2: [],
                objArr3: [],
            }],
            objArr1: [['1','v11'],['2','v22']],
            objArr2: [{label:'1',value:'v11'},{label:'2',value:'v22'}],
            objArr3: [{label:'1',value:'v11'},{label:'2',value:'v22'}]
        });
    });
});
