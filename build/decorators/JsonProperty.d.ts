import 'reflect-metadata';
interface IJsonPropertyObj {
    clazz: new () => object;
    name?: string;
}
export declare type IJsonProperty = string | IJsonPropertyObj;
/**
 * @description: 属性装饰器
 */
export declare function JsonProperty(agu?: IJsonProperty): (target: any, propertyKey: string) => void;
/**
 * @description: JsonProperty装饰器（赋值）逻辑
 */
export declare function factoryJsonProperty<T>(cMetadataVal: IJsonProperty, json: T, jsonKey: keyof T): {
    key: keyof T;
    value: any;
};
export {};
