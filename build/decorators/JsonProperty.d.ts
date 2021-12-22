import 'reflect-metadata';
interface IJsonPropertyObj {
    clazz: new () => object;
    name?: string;
}
export declare type IJsonProperty = string | IJsonPropertyObj;
/**
 * @description: 属性装饰器
 * @param {IJsonProperty} agu
 * @return {*}
 */
export declare function JsonProperty(agu?: IJsonProperty): (target: any, propertyKey: string) => void;
export {};
