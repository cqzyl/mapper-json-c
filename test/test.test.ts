/*
 * @Description: 测试
 * @Author: ChenQiang
 * @Date: 2021-12-21 10:17:37
 * @LastEditors: ChenQiang
 * @LastEditTime: 2023-04-12 13:48:34
 * @FilePath: \test\test.test.ts
 */
import 'mocha'
import { expect } from 'chai';
import { JsonProperty, LockNumber, LockString, ObjectEntriesProperty, mapperJsonC } from '../build';

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

    it('锁定数据类型为数字', function () {
        class TestEntity {
            @LockNumber()
            num: number = undefined;
            @LockNumber()
            isNum: number = undefined;
            @LockNumber()
            canBeNum: number = undefined;
            @LockNumber()
            float: number = undefined;
            @LockNumber('bigint')
            bigint: number = undefined;
            @LockNumber()
            notNum: number = undefined;
            @LockNumber()
            notNum1: number = undefined;
            @LockNumber()
            notNum2: number = undefined;
            @LockNumber()
            notNum3: number = undefined;
            @LockNumber()
            notNum4: number = undefined;
            @LockNumber()
            notNum5: number = undefined;
            @LockNumber()
            notNum6: number = undefined;
        }
        const endVal = mapperJsonC({
            num: 1,
            isNum: '2',
            canBeNum: '3test',
            float: '4.0001',
            bigint: '123456789123456789',
            notNum: 'test',
            notNum1: ['test'],
            notNum2: {test: 2},
            notNum3: () => 3,
            notNum4: false,
            notNum5: Symbol(),
            notNum6: class{}
        }, TestEntity);

        expect(endVal).to.deep.equal({
            num: 1,
            isNum: 2,
            canBeNum: 3,
            float: 4.0001,
            bigint: 123456789123456789n,
            notNum: undefined,
            notNum1: undefined,
            notNum2: undefined,
            notNum3: undefined,
            notNum4: undefined,
            notNum5: undefined,
            notNum6: undefined,
        });
    });
    
    it('锁定数据类型为字符串', function () {
        class TestEntity {
            @LockString()
            str: string = undefined;
            @LockString()
            canBeStr: string = undefined;
            @LockString()
            canBeStr1: string = undefined;
            @LockString()
            canBeStr2: string = undefined;
            @LockString()
            canBeStr3: string = undefined;
            @LockString()
            canBeStr4: string = undefined;
            @LockString('json')
            jsonStr: string = undefined;
            @LockString()
            notStr1: string = undefined;
            @LockString()
            notStr2: string = undefined;
            @LockString()
            notStr3: string = undefined;
            @LockString()
            notStr4: string = undefined;
            @LockString()
            notStr5: string = undefined;
            @LockString('force')
            forceStr1: string = undefined;
            @LockString('force')
            forceStr2: string = undefined;
            @LockString('force')
            forceStr3: string = undefined;
            @LockString('force')
            forceStr4: string = undefined;
            @LockString('force')
            forceStr5: string = undefined;
            @LockString('force')
            forceStr6: string = undefined;
            @LockString('forceAll')
            forceAllStr1: string = undefined;
            @LockString('forceAll')
            forceAllStr2: string = undefined;
        }
        const endVal = mapperJsonC({
            str: 'str',
            canBeStr: 123,
            canBeStr1: undefined,
            canBeStr2: null,
            canBeStr3: false,
            canBeStr4: 123456789123456789n,
            jsonStr: {test: 2},
            notStr1: ['test'],
            notStr2: {test: 2},
            notStr3: () => 3,
            notStr4: Symbol(),
            notStr5: class{},
            forceStr1: ['test'],
            forceStr2: {test: 2},
            forceStr3: false,
            forceStr4: Symbol(),
            forceStr5: undefined,
            forceStr6: null,
            forceAllStr1: undefined,
            forceAllStr2: null,
        }, TestEntity);

        expect(endVal).to.deep.equal({
            str: 'str',
            canBeStr: '123',
            canBeStr1: '',
            canBeStr2: '',
            canBeStr3: 'false',
            canBeStr4: '123456789123456789',
            jsonStr: '{\"test\":2}',
            notStr1: '',
            notStr2: '',
            notStr3: '',
            notStr4: '',
            notStr5: '',
            forceStr1: 'test',
            forceStr2: '[object Object]',
            forceStr3: 'false',
            forceStr4: 'Symbol()',
            forceStr5: '',
            forceStr6: '',
            forceAllStr1: 'undefined',
            forceAllStr2: 'null',
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
            num1: '1',
            str1: 2,
            meArr: [{}],
            objArr1: {1:'v11',2:'v22'},
            objArr2: {1:'v11',2:'v22'},
            objArr0: {1:'v11',2:'v22'},
            undefindKey: '1',
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
        });
    });
});
