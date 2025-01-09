"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factoryObjectEntriesProperty = exports.ObjectEntriesProperty = void 0;
/*
 * @Description: 装饰器 将 { key: value } 转化为数组 entries
 * @Author: ChenQiang
 * @Date: 2022-07-27 17:12:03
 * @LastEditors: ChenQiang
 * @LastEditTime: 2023-04-12 08:33:58
 * @FilePath: \src\decorators\ObjectEntriesProperty.ts
 */
require("reflect-metadata");
/**
 * @description: 属性装饰器
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
/**
 * @description: ObjectEntriesProperty装饰器（对象转数组）逻辑
 */
function factoryObjectEntriesProperty(cMetadataVal, value) {
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
exports.factoryObjectEntriesProperty = factoryObjectEntriesProperty;
//# sourceMappingURL=ObjectEntriesProperty.js.map