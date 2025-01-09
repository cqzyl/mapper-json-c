import 'reflect-metadata';
export declare type ILockString = 'force' | 'forceAll' | 'json' | 'array' | undefined;
/**
 * @description: 属性装饰器
 */
export declare function LockString(agu?: ILockString): (target: any, propertyKey: string) => void;
/**
 * @description: LockString 装饰器 (锁定字符串) 逻辑
 */
export declare function factoryLockString(cMetadataVal: ILockString, value: any): string | string[];
