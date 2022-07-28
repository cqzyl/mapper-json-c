"use strict";
exports.__esModule = true;
exports.ObjectEntriesProperty = void 0;
/*
 * @Description: 装饰器 将 { key: value } 转化为数组 entries
 * @Author: ChenQiang
 * @Date: 2022-07-27 17:12:03
 * @LastEditors: ChenQiang
 * @LastEditTime: 2022-07-27 17:12:04
 * @FilePath: \src\decorators\ObjectEntriesProperty.ts
 */
require("reflect-metadata");
/**
 * @description: 属性装饰器
 * @param {IJsonProperty} agu
 * @return {*}
 */
function ObjectEntriesProperty(agu) {
    return function (target, propertyKey) {
        /** （获取）旧的装饰器内容 */
        var cMetadata = Reflect.getMetadata(propertyKey, target) || [];
        return Reflect.defineMetadata(propertyKey, cMetadata.concat([{
                name: 'ObjectEntriesProperty',
                value: agu
            }]), target);
    };
}
exports.ObjectEntriesProperty = ObjectEntriesProperty;
//# sourceMappingURL=ObjectEntriesProperty.js.map