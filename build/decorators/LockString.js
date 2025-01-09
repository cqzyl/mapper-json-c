"use strict";
exports.__esModule = true;
exports.factoryLockString = exports.LockString = void 0;
/*
 * @Description: 装饰器 - 锁定为字符串
 * @Author: ChenQiang
 * @Date: 2021-12-20 11:34:33
 * @LastEditors: ChenQiang
 * @LastEditTime: 2025-01-09 10:37:15
 * @FilePath: \src\decorators\LockString.ts
 */
require("reflect-metadata");
/**
 * @description: 属性装饰器
 */
function LockString(agu) {
    return function (target, propertyKey) {
        /** （获取）旧的装饰器内容 */
        var cMetadata = Reflect.getMetadata(propertyKey, target) || [];
        return Reflect.defineMetadata(propertyKey, cMetadata.concat([{
                name: 'LockString',
                value: agu
            }]), target);
    };
}
exports.LockString = LockString;
/**
 * @description: LockString 装饰器 (锁定字符串) 逻辑
 */
function factoryLockString(cMetadataVal, value) {
    if (typeof value === 'string') {
        return value;
    }
    if (cMetadataVal === 'force') {
        if (value === undefined || value === null) {
            return '';
        }
        return String(value);
    }
    if (cMetadataVal === 'forceAll') {
        return String(value);
    }
    if (cMetadataVal === 'json' && typeof value === 'object') {
        return JSON.stringify(value);
    }
    if (['number', 'boolean', 'bigint'].includes(typeof value)) {
        return String(value);
    }
    if (cMetadataVal === 'array' && value instanceof Array) {
        return value.map(function (e) {
            if (typeof e === 'string') {
                return e;
            }
            if (['number', 'boolean', 'bigint'].includes(typeof value)) {
                return String(value);
            }
            return '';
        });
    }
    // 非字符串类型
    return '';
}
exports.factoryLockString = factoryLockString;
//# sourceMappingURL=LockString.js.map