/*
 * @Description: json枚举装饰器
 * @Author: ChenQiang
 * @Date: 2021-12-20 11:34:33
 * @LastEditors: ChenQiang
 * @LastEditTime: 2021-12-21 11:46:05
 * @FilePath: \src\decorators\JsonProperty.ts
 */
import 'reflect-metadata';

interface IJsonPropertyObj {
    clazz: new () => object;
    name?: string;
}

export type IJsonProperty = string | IJsonPropertyObj;

/**
 * @description: 属性装饰器
 * @param {IJsonProperty} agu
 * @return {*}
 */
export function JsonProperty(agu?: IJsonProperty) {
    return function(target: any, propertyKey: string) {
        // TestEntity {}, 'test'
        return Reflect.defineMetadata(propertyKey, agu, target)
    }
}
