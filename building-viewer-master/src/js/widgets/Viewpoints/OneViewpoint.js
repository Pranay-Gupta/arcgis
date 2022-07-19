define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/widgets/Widget"], function (require, exports, tslib_1, decorators_1, widget_1, Widget_1) {
    Widget_1 = tslib_1.__importDefault(Widget_1);
    var OneViewpoint = /** @class */ (function (_super) {
        tslib_1.__extends(OneViewpoint, _super);
        function OneViewpoint(args) {
            var _this = _super.call(this, args) || this;
            _this.active = false;
            return _this;
        }
        OneViewpoint.prototype.render = function () {
            var activeClass = {
                "active": this.active
            };
            return ((0, widget_1.tsx)("li", { bind: this, key: this, class: this.classes("viewpoint", activeClass), onclick: this.onClick.bind(this) }, this.slide.title.text));
        };
        OneViewpoint.prototype.onClick = function () {
            event.stopPropagation();
            this.active = true;
            this.appState.view.goTo(this.slide.viewpoint);
        };
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], OneViewpoint.prototype, "slide", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], OneViewpoint.prototype, "appState", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], OneViewpoint.prototype, "active", void 0);
        OneViewpoint = tslib_1.__decorate([
            (0, decorators_1.subclass)("widgets/Viewpoints/Viewpoint")
        ], OneViewpoint);
        return OneViewpoint;
    }(Widget_1.default));
    return OneViewpoint;
});
