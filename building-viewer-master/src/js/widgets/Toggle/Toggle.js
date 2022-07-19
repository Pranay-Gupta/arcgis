define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/widgets/Widget"], function (require, exports, tslib_1, decorators_1, widget_1, Widget_1) {
    Widget_1 = tslib_1.__importDefault(Widget_1);
    var Toggle = /** @class */ (function (_super) {
        tslib_1.__extends(Toggle, _super);
        function Toggle() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.active = false;
            return _this;
        }
        Toggle.prototype.render = function () {
            var activeClass = {
                "active": this.active
            };
            var knob = ((0, widget_1.tsx)("div", { class: this.classes("knob") }));
            return ((0, widget_1.tsx)("div", { bind: this, key: this, class: this.classes("toggle", activeClass), onclick: this.onClick.bind(this) }, knob));
        };
        Toggle.prototype.onClick = function (event) {
            event.stopPropagation();
            this.active = (!this.active);
        };
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], Toggle.prototype, "active", void 0);
        Toggle = tslib_1.__decorate([
            (0, decorators_1.subclass)("widgets/Toggle")
        ], Toggle);
        return Toggle;
    }(Widget_1.default));
    return Toggle;
});
