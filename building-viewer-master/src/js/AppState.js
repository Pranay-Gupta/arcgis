define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor"], function (require, exports, tslib_1, decorators_1, Accessor_1) {
    Accessor_1 = tslib_1.__importDefault(Accessor_1);
    var AppState = /** @class */ (function (_super) {
        tslib_1.__extends(AppState, _super);
        function AppState() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.floorNumber = 0;
            return _this;
        }
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], AppState.prototype, "pageLocation", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], AppState.prototype, "floorNumber", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], AppState.prototype, "view", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], AppState.prototype, "buildingLayer", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], AppState.prototype, "popupInfo", void 0);
        AppState = tslib_1.__decorate([
            (0, decorators_1.subclass)("AppState")
        ], AppState);
        return AppState;
    }(Accessor_1.default));
    return AppState;
});
