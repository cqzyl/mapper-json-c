"use strict";
exports.__esModule = true;
exports.mapperJsonC = exports.JsonProperty = void 0;
/*
 * @Description: 实例
 * @Author: ChenQiang
 * @Date: 2021-12-20 09:13:14
 * @LastEditors: ChenQiang
 * @LastEditTime: 2021-12-22 14:52:36
 */
var JsonProperty_1 = require("./decorators/JsonProperty");
exports.JsonProperty = JsonProperty_1.JsonProperty;
/**
 * @description: 实例
 * @param {Object} json json数据，也许来源于后端
 * @param {new} clazz 数据实例
 * @return {T}
 */
function mapperJsonC(json, clazz) {
    var res = new clazz();
    if (!json) {
        return res;
    }
    Object.keys(res).forEach(function (key) {
        var cMetadata = Reflect.getMetadata(key, res);
        switch (typeof cMetadata) {
            case 'string':
                res[key] = json[cMetadata];
                break;
            case 'object':
                var nextJson = json[cMetadata.name || key];
                if (cMetadata.clazz && nextJson instanceof Array) {
                    res[key] = nextJson.map(function (ele) { return mapperJsonC(ele, cMetadata.clazz); });
                }
                else if (cMetadata.clazz && typeof nextJson === 'object') {
                    res[key] = mapperJsonC(nextJson, cMetadata.clazz);
                }
                else {
                    res[key] = nextJson;
                }
                break;
            default:
                res[key] = json[key];
        }
    });
    return res;
}
exports.mapperJsonC = mapperJsonC;
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
//# sourceMappingURL=index.js.map