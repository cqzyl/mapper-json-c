import 'reflect-metadata';
export declare type ILockNumber = 'bigint' | 'array' | void;
/**
 * @description: 属性装饰器
 */
export declare function LockNumber(agu?: ILockNumber): (target: any, propertyKey: string) => void;
declare type INumberType = number | BigInt | void;
/**
 * @description: LockNumber 装饰器 (锁定数字) 逻辑
 */
export declare function factoryLockNumber(cMetadataVal: ILockNumber, value: any): INumberType | Array<INumberType>;
export {};
