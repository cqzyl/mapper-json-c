"use strict";
exports.__esModule = true;
exports.factoryLockNumber = exports.LockNumber = void 0;
/*
 * @Description: 装饰器 - 锁定为数字
 * @Author: ChenQiang
 * @Date: 2021-12-20 11:34:33
 * @LastEditors: ChenQiang
 * @LastEditTime: 2025-01-09 10:42:16
 * @FilePath: \src\decorators\LockNumber.ts
 */
require("reflect-metadata");
/**
 * @description: 属性装饰器
 */
function LockNumber(agu) {
    return function (target, propertyKey) {
        /** （获取）旧的装饰器内容 */
        var cMetadata = Reflect.getMetadata(propertyKey, target) || [];
        return Reflect.defineMetadata(propertyKey, cMetadata.concat([{
                name: 'LockNumber',
                value: agu
            }]), target);
    };
}
exports.LockNumber = LockNumber;
/**
 * @description: LockNumber 装饰器 (锁定数字) 逻辑
 */
function factoryLockNumber(cMetadataVal, value) {
    if (typeof value === 'number') {
        return value;
    }
    if (typeof value === 'string') {
        if (isNaN(parseInt(value))) {
            // 非数字类型
            return undefined;
        }
        if (cMetadataVal === 'bigint') {
            // bigint
            return BigInt(value);
        }
        var pointIndex = value.lastIndexOf('.');
        if (pointIndex !== -1) {
            // 带小数
            return parseFloat(value);
        }
        else {
            // 整数
            return parseInt(value);
        }
    }
    if (cMetadataVal === 'array' && value instanceof Array) {
        return value.map(function (e) { return factoryLockNumber(undefined, e); });
    }
    // 非数字类型
    return undefined;
}
exports.factoryLockNumber = factoryLockNumber;
//# sourceMappingURL=LockNumber.js.map