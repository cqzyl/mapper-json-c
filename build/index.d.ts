import { IJsonProperty, JsonProperty } from "./decorators/JsonProperty";
import { ILockNumber, LockNumber } from "./decorators/LockNumber";
import { ILockString, LockString } from "./decorators/LockString";
import { IObjectEntriesProperty, ObjectEntriesProperty } from "./decorators/ObjectEntriesProperty";
/**
 * @description: 实例
 * @param {Object} json json数据，也许来源于后端
 * @param {new} clazz 数据实例
 * @return {T}
 */
declare function mapperJsonC<T>(json: Object, clazz: new () => T): T;
export { IJsonProperty, JsonProperty, IObjectEntriesProperty, ObjectEntriesProperty, ILockString, LockString, ILockNumber, LockNumber, mapperJsonC, };
