/*
 * @Description: 测试
 * @Author: ChenQiang
 * @Date: 2021-12-21 10:17:37
 * @LastEditors: ChenQiang
 * @LastEditTime: 2021-12-21 11:47:02
 * @FilePath: \test\test.test.ts
 */
import 'mocha'
import { expect } from 'chai';
import { IJsonProperty, JsonProperty, mapperJsonC } from '../src';

// test code

describe('mapperJsonC 测试', function () {
    it('去除未约定属性名称正常', function () {
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

    it('对于定义为基础类型的属性赋值正常', function () {
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

    it('对于定义为对象的属性赋值正常', function () {
        
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
    
    it('对于错误定义为对象的属性赋值正常', function () {
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

    
    it('综合测试正常', function () {
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
                meArr: undefined
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
                meArr: undefined
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
                meArr: undefined
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
                meArr: undefined
            }],
        });
    });
});
