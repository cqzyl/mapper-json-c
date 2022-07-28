import 'reflect-metadata';
/** 参数1的key，参数2的key */
export declare type IObjectEntriesProperty = [string, string] | undefined;
/**
 * @description: 属性装饰器
 * @param {IJsonProperty} agu
 * @return {*}
 */
export declare function ObjectEntriesProperty(agu?: IObjectEntriesProperty): (target: any, propertyKey: string) => void;
