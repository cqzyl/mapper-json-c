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
 * @description: ObjectEntriesProperty装饰器（对象转数组）逻辑
 * @param {IObjectEntriesProperty} cMetadataVal
 * @param {any} value
 * @return {Array}
 */
function factoryIObjectEntriesProperty(cMetadataVal, value) {
    if (cMetadataVal) {
        var key0_1 = cMetadataVal[0], key1_1 = cMetadataVal[1];
        return Object.entries(value || {}).map(function (item) {
            var _a;
            return (_a = {},
                _a[key0_1] = item[0],
                _a[key1_1] = item[1],
                _a);
        });
    }
    return Object.entries(value || {});
}
/**
 * @description: JsonProperty装饰器（赋值）逻辑
 * @param {IJsonProperty} cMetadataVal
 * @param {T} json
 * @param {keyof} jsonKey
 * @return {{ key: string; value: any }}
 */
function factoryJsonProperty(cMetadataVal, json, jsonKey) {
    var key = null;
    var value = null;
    switch (typeof cMetadataVal) {
        case 'string':
            key = cMetadataVal;
            value = json[key];
            break;
        case 'object':
            key = cMetadataVal.name || jsonKey;
            var nextJson = json[key];
            if (cMetadataVal.clazz && nextJson instanceof Array) {
                value = nextJson.map(function (ele) { return mapperJsonC(ele, cMetadataVal.clazz); });
            }
            else if (cMetadataVal.clazz && typeof nextJson === 'object') {
                value = mapperJsonC(nextJson, cMetadataVal.clazz);
            }
            else {
                value = nextJson;
            }
            break;
        default:
            key = jsonKey;
            value = json[jsonKey];
    }
    return { key: key, value: value };
}
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
        var cMetadata = Reflect.getMetadata(key, res);
        /** 当前对应json key */
        var jsonKey = key;
        /** 当前值 */
        var itemVal = json[jsonKey];
        for (var i = 0; i < cMetadata.length; i++) {
            var cMetadataItem = cMetadata[i];
            if (cMetadataItem.name === 'JsonProperty') {
                var _a = factoryJsonProperty(cMetadataItem.value, json, jsonKey), key_1 = _a.key, value = _a.value;
                jsonKey = key_1;
                itemVal = value;
            }
            else if (cMetadataItem.name === 'ObjectEntriesProperty') {
                itemVal = factoryIObjectEntriesProperty(cMetadataItem.value, itemVal);
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