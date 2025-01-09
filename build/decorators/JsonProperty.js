"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factoryJsonProperty = exports.JsonProperty = void 0;
/*
 * @Description: json枚举装饰器
 * @Author: ChenQiang
 * @Date: 2021-12-20 11:34:33
 * @LastEditors: ChenQiang
 * @LastEditTime: 2023-04-12 08:34:09
 * @FilePath: \src\decorators\JsonProperty.ts
 */
require("reflect-metadata");
var __1 = require("..");
/**
 * @description: 属性装饰器
 */
function JsonProperty(agu) {
    return function (target, propertyKey) {
        /** （获取）旧的装饰器内容 */
        var cMetadata = Reflect.getMetadata(propertyKey, target) || [];
        // TestEntity {}, 'test'
        return Reflect.defineMetadata(propertyKey, cMetadata.concat([{
                name: 'JsonProperty',
                value: agu
            }]), target);
    };
}
exports.JsonProperty = JsonProperty;
/**
 * @description: JsonProperty装饰器（赋值）逻辑
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
            if (nextJson === undefined) {
                // 设置默认值
                if (cMetadataVal.clazz) {
                    // 未定义的值以class中的初始值为默认值
                    var a = new cMetadataVal.clazz();
                    value = a[key];
                }
                else {
                    value = nextJson;
                }
            }
            else {
                if (cMetadataVal.clazz && nextJson instanceof Array) {
                    value = nextJson.map(function (ele) { return (0, __1.mapperJsonC)(ele, cMetadataVal.clazz); });
                }
                else if (cMetadataVal.clazz && typeof nextJson === 'object') {
                    value = (0, __1.mapperJsonC)(nextJson, cMetadataVal.clazz);
                }
                else {
                    value = nextJson;
                }
            }
            break;
        default:
            key = jsonKey;
            value = json[jsonKey];
    }
    return { key: key, value: value };
}
exports.factoryJsonProperty = factoryJsonProperty;
//# sourceMappingURL=JsonProperty.js.map