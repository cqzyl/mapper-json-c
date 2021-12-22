"use strict";
exports.__esModule = true;
exports.JsonProperty = void 0;
/*
 * @Description: json枚举装饰器
 * @Author: ChenQiang
 * @Date: 2021-12-20 11:34:33
 * @LastEditors: ChenQiang
 * @LastEditTime: 2021-12-21 11:46:05
 * @FilePath: \src\decorators\JsonProperty.ts
 */
require("reflect-metadata");
/**
 * @description: 属性装饰器
 * @param {IJsonProperty} agu
 * @return {*}
 */
function JsonProperty(agu) {
    return function (target, propertyKey) {
        // TestEntity {}, 'test'
        return Reflect.defineMetadata(propertyKey, agu, target);
    };
}
exports.JsonProperty = JsonProperty;
//# sourceMappingURL=JsonProperty.js.map