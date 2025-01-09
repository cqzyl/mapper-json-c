import 'reflect-metadata';
export type ILockNumber = 'bigint' | undefined;
/**
 * @description: 属性装饰器
 */
export declare function LockNumber(agu?: ILockNumber): (target: any, propertyKey: string) => any;
/**
 * @description: LockNumber 装饰器 (锁定数字) 逻辑
 */
export declare function factoryLockNumber(cMetadataVal: ILockNumber, value: any): number | bigint;
