/*
 * @Description: 实例
 * @Author: ChenQiang
 * @Date: 2021-12-20 09:13:14
 * @LastEditors: ChenQiang
 * @LastEditTime: 2021-12-21 11:33:22
 */
import { IJsonProperty, JsonProperty } from "./decorators/JsonProperty";

/**
 * @description: 实例
 * @param {Object} json json数据，也许来源于后端
 * @param {new} clazz 数据实例
 * @return {T}
 */
export function mapperJsonC<T>(json: Object, clazz: new () => T): T {
    const res = new clazz();
    if (!json) {
        return res;
    }
    Object.keys(res).forEach((key: keyof typeof clazz) => {
        const cMetadata: IJsonProperty = Reflect.getMetadata(key, res);

        switch (typeof cMetadata) {
            case 'string':
                res[key] = json[cMetadata as keyof typeof json] as never;
                break;
            case 'object':
                const nextJson = json[cMetadata.name as keyof typeof json || key];
                if (cMetadata.clazz && nextJson instanceof Array) {
                    res[key] = nextJson.map(ele => mapperJsonC(ele, cMetadata.clazz)) as never;
                } else if (cMetadata.clazz && typeof nextJson === 'object') {
                    res[key] = mapperJsonC(nextJson, cMetadata.clazz) as never;
                } else {
                    res[key] = nextJson as never;
                }
                break;
            default:
                res[key] = json[key];
        }
    });
    return res;
}

export { IJsonProperty , JsonProperty }
// test code
// class TestEntity {
//     @JsonProperty('test')
//     test: string = undefined;

//     @JsonProperty({ name: 'me', clazz: TestEntity })
//     me: TestEntity = void 0;
// }

// console.log(mapperJson({
//     test: 1,
//     me: {
//         me: 'str'
//     }
// }, TestEntity))

