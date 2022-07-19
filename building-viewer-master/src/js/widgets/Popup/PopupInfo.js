define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor"], function (require, exports, tslib_1, decorators_1, Accessor_1) {
    Accessor_1 = tslib_1.__importDefault(Accessor_1);
    var PopupInfo = /** @class */ (function (_super) {
        tslib_1.__extends(PopupInfo, _super);
        function PopupInfo() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.active = true;
            return _this;
        }
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], PopupInfo.prototype, "image", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], PopupInfo.prototype, "credit", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], PopupInfo.prototype, "active", void 0);
        PopupInfo = tslib_1.__decorate([
            (0, decorators_1.subclass)("PopupInfo")
        ], PopupInfo);
        return PopupInfo;
    }(Accessor_1.default));
    return PopupInfo;
});
