"use strict";
exports.__esModule = true;
exports.mapperJsonC = exports.ObjectEntriesProperty = exports.JsonProperty = void 0;
/*
 * @Description: 实例
 * @Author: ChenQiang
 * @Date: 2021-12-20 09:13:14
 * @LastEditors: ChenQiang
 * @LastEditTime: 2021-12-22 14:52:36
 */
var JsonProperty_1 = require("./decorators/JsonProperty");
exports.JsonProperty = JsonProperty_1.JsonProperty;
var ObjectEntriesProperty_1 = require("./decorators/ObjectEntriesProperty");
exports.ObjectEntriesProperty = ObjectEntriesProperty_1.ObjectEntriesProperty;
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
    Object.keys(res).forEach(function (k) {
        var key = k;
        var cMetadata = Reflect.getMetadata(key, res) || [];
        /** 当前对应json key */
        var jsonKey = key;
        /** 当前值 */
        var itemVal = json[jsonKey];
        if (!cMetadata.length) {
            // 未增加装饰器的类属性
            // 设置为res中的默认值(不进行操作)
            // itemVal = res[key] as never
            return false;
        }
        for (var i = 0; i < cMetadata.length; i++) {
            var cMetadataItem = cMetadata[i];
            if (cMetadataItem.name === 'JsonProperty') {
                var _a = (0, JsonProperty_1.factoryJsonProperty)(cMetadataItem.value, json, jsonKey), key_1 = _a.key, value = _a.value;
                jsonKey = key_1;
                itemVal = value;
            }
            else if (cMetadataItem.name === 'ObjectEntriesProperty') {
                itemVal = (0, ObjectEntriesProperty_1.factoryIObjectEntriesProperty)(cMetadataItem.value, itemVal);
            }
        }
        res[key] = itemVal;
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