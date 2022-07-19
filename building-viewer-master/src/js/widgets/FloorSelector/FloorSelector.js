define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/widgets/Widget"], function (require, exports, tslib_1, decorators_1, widget_1, Widget_1) {
    Widget_1 = tslib_1.__importDefault(Widget_1);
    var FloorSelector = /** @class */ (function (_super) {
        tslib_1.__extends(FloorSelector, _super);
        function FloorSelector(args) {
            var _this = _super.call(this, args) || this;
            _this.maxFloor = 4;
            _this.minFloor = 0;
            return _this;
        }
        FloorSelector.prototype.render = function () {
            var _this = this;
            var levels = Array.from(Array(Math.abs(this.minFloor) + this.maxFloor + 1).keys()).reverse().map(function (rawLevel) {
                var level = rawLevel - _this.minFloor;
                var levelText = level === 0 ? "G" : level;
                var activeClass = {
                    "active": _this.activeFloor === level
                };
                return ((0, widget_1.tsx)("li", { class: _this.classes("level", activeClass), onclick: function () { return _this.activeLevel(level); } }, levelText));
            });
            return ((0, widget_1.tsx)("div", { bind: this, key: this, class: "floor-selector" },
                (0, widget_1.tsx)("h2", { class: "slash-title" }, "Select floor"),
                (0, widget_1.tsx)("ul", null, levels)));
        };
        FloorSelector.prototype.activeLevel = function (newLevel) {
            event.stopPropagation();
            this.activeFloor = newLevel;
        };
        tslib_1.__decorate([
            (0, decorators_1.property)({ aliasOf: "appState.floorNumber" })
        ], FloorSelector.prototype, "activeFloor", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], FloorSelector.prototype, "maxFloor", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], FloorSelector.prototype, "minFloor", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)({ constructOnly: true })
        ], FloorSelector.prototype, "appState", void 0);
        FloorSelector = tslib_1.__decorate([
            (0, decorators_1.subclass)("widgets/FloorSelector")
        ], FloorSelector);
        return FloorSelector;
    }(Widget_1.default));
    return FloorSelector;
});
