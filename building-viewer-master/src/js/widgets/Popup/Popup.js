define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/widgets/Widget"], function (require, exports, tslib_1, decorators_1, widget_1, Widget_1) {
    Widget_1 = tslib_1.__importDefault(Widget_1);
    var Popup = /** @class */ (function (_super) {
        tslib_1.__extends(Popup, _super);
        function Popup(args) {
            var _this = _super.call(this, args) || this;
            _this.active = false;
            return _this;
        }
        Popup.prototype.render = function () {
            var activeClass = {
                "active": this.active
            };
            var image = this.image ? ((0, widget_1.tsx)("img", { src: this.image })) : null;
            var credit = this.credit ? ((0, widget_1.tsx)("div", { class: "credit" },
                (0, widget_1.tsx)("div", null, this.credit))) : null;
            return ((0, widget_1.tsx)("div", { bind: this, key: this, class: this.classes("popup", activeClass), onclick: this.onClick.bind(this) },
                image,
                credit));
        };
        Popup.prototype.onClick = function (event) {
            event.stopPropagation();
            this.active = false;
        };
        tslib_1.__decorate([
            (0, decorators_1.property)({ aliasOf: "appState.popupInfo.active" })
        ], Popup.prototype, "active", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)({ aliasOf: "appState.popupInfo.image" })
        ], Popup.prototype, "image", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)({ aliasOf: "appState.popupInfo.credit" })
        ], Popup.prototype, "credit", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], Popup.prototype, "appState", void 0);
        Popup = tslib_1.__decorate([
            (0, decorators_1.subclass)("widgets/Popup")
        ], Popup);
        return Popup;
    }(Widget_1.default));
    return Popup;
});
