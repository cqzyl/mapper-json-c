"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapperJsonC = exports.LockNumber = exports.LockString = exports.ObjectEntriesProperty = exports.JsonProperty = void 0;
/*
 * @Description: 实例
 * @Author: ChenQiang
 * @Date: 2021-12-20 09:13:14
 * @LastEditors: ChenQiang
 * @LastEditTime: 2023-04-12 09:30:15
 */
var JsonProperty_1 = require("./decorators/JsonProperty");
Object.defineProperty(exports, "JsonProperty", { enumerable: true, get: function () { return JsonProperty_1.JsonProperty; } });
var LockNumber_1 = require("./decorators/LockNumber");
Object.defineProperty(exports, "LockNumber", { enumerable: true, get: function () { return LockNumber_1.LockNumber; } });
var LockString_1 = require("./decorators/LockString");
Object.defineProperty(exports, "LockString", { enumerable: true, get: function () { return LockString_1.LockString; } });
var ObjectEntriesProperty_1 = require("./decorators/ObjectEntriesProperty");
Object.defineProperty(exports, "ObjectEntriesProperty", { enumerable: true, get: function () { return ObjectEntriesProperty_1.ObjectEntriesProperty; } });
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
            switch (cMetadataItem.name) {
                case 'JsonProperty':
                    var _a = (0, JsonProperty_1.factoryJsonProperty)(cMetadataItem.value, json, jsonKey), key_1 = _a.key, value = _a.value;
                    jsonKey = key_1;
                    itemVal = value;
                    break;
                case 'ObjectEntriesProperty':
                    itemVal = (0, ObjectEntriesProperty_1.factoryObjectEntriesProperty)(cMetadataItem.value, itemVal);
                    break;
                case 'LockNumber':
                    itemVal = (0, LockNumber_1.factoryLockNumber)(cMetadataItem.value, itemVal);
                    break;
                case 'LockString':
                    itemVal = (0, LockString_1.factoryLockString)(cMetadataItem.value, itemVal);
                    break;
                default: ;
            }
            // if (cMetadataItem.name === 'JsonProperty') {
            //     const {
            //         key,
            //         value,
            //     } = factoryJsonProperty(cMetadataItem.value, json, jsonKey as never);
            //     jsonKey = key as never;
            //     itemVal = value as never;
            // } else if (cMetadataItem.name === 'ObjectEntriesProperty') {
            //     itemVal = factoryObjectEntriesProperty(cMetadataItem.value, itemVal) as never;
            // }
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