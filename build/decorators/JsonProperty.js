"use strict";
exports.__esModule = true;
exports.JsonProperty = void 0;
require("reflect-metadata");
function JsonProperty(agu) {
    return function (target, propertyKey) {
        return Reflect.defineMetadata(propertyKey, agu, target);
    };
}
exports.JsonProperty = JsonProperty;
//# sourceMappingURL=JsonProperty.js.map