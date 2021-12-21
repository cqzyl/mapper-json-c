import 'reflect-metadata';
interface IJsonPropertyObj {
    clazz: new () => object;
    name: string;
}
export declare type IJsonProperty = string | IJsonPropertyObj;
export declare function JsonProperty(agu?: IJsonProperty): (target: any, propertyKey: string) => void;
export {};
