define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/Widget"], function (require, exports, tslib_1, decorators_1, Widget_1) {
    Widget_1 = tslib_1.__importDefault(Widget_1);
    var Section = /** @class */ (function (_super) {
        tslib_1.__extends(Section, _super);
        function Section() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.active = false;
            return _this;
        }
        Section.prototype.onEnter = function () { };
        Section.prototype.onLeave = function () { };
        Section.prototype.postInitialize = function () {
            var _this = this;
            this.own(this.watch("camera", function (camera) {
                if (camera) {
                    _this.emit("go-to", camera);
                }
            }));
        };
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], Section.prototype, "appState", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], Section.prototype, "title", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], Section.prototype, "id", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], Section.prototype, "camera", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], Section.prototype, "active", void 0);
        Section = tslib_1.__decorate([
            (0, decorators_1.subclass)("sections/Section")
        ], Section);
        return Section;
    }(Widget_1.default));
    return Section;
});
