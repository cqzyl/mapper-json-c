"use strict";
exports.__esModule = true;
exports.factoryJsonFormat = exports.JsonFormat = void 0;
require("reflect-metadata");
var dayjs = require("dayjs");
/**
 * @description: 属性装饰器
 */
function JsonFormat(agu) {
    return function (target, propertyKey) {
        /** （获取）旧的装饰器内容 */
        var cMetadata = Reflect.getMetadata(propertyKey, target) || [];
        return Reflect.defineMetadata(propertyKey, cMetadata.concat([{
                name: 'JsonFormat',
                value: agu
            }]), target);
    };
}
exports.JsonFormat = JsonFormat;
/**
 * @description: JsonFormat 装饰器 date格式化，默认输出毫秒数
 */
function factoryJsonFormat(cMetadataVal, value) {
    var dayObj = dayjs(value);
    if (dayObj.isValid()) {
        if (cMetadataVal) {
            return dayObj.format(cMetadataVal);
        }
        // 是时间日期格式
        return dayObj.valueOf();
    }
    if (value instanceof Array) {
        return value.map(function (e) { return factoryJsonFormat(cMetadataVal, e); });
    }
    // 非日期类型，返回原值
    return value;
}
exports.factoryJsonFormat = factoryJsonFormat;
//# sourceMappingURL=JsonFormat.js.map