"use strict";
exports.__esModule = true;
exports.mapperJsonC = void 0;
function mapperJsonC(json, clazz) {
    var res = new clazz();
    if (!json) {
        return res;
    }
    Object.keys(res).forEach(function (key) {
        var cMetadata = Reflect.getMetadata(key, res);
        switch (typeof cMetadata) {
            case 'string':
                res[key] = json[cMetadata];
                break;
            case 'object':
                var nextJson = json[cMetadata.name];
                if (cMetadata.clazz && nextJson instanceof Array) {
                    res[key] = nextJson.map(function (ele) { return mapperJsonC(ele, cMetadata.clazz); });
                }
                else if (cMetadata.clazz && typeof nextJson === 'object') {
                    res[key] = mapperJsonC(nextJson, cMetadata.clazz);
                }
                else {
                    res[key] = nextJson;
                }
                break;
            default:
                res[key] = json[key];
        }
    });
    return res;
}
exports.mapperJsonC = mapperJsonC;
//# sourceMappingURL=index.js.map