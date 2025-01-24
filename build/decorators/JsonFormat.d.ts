import 'reflect-metadata';
export declare type IJsonFormat = string | void;
/**
 * @description: 属性装饰器
 */
export declare function JsonFormat(agu?: IJsonFormat): (target: any, propertyKey: string) => void;
declare type INumberType = number | string | void;
/**
 * @description: JsonFormat 装饰器 date格式化，默认输出毫秒数
 */
export declare function factoryLockNumber(cMetadataVal: IJsonFormat, value: any): INumberType | Array<INumberType>;
export {};
