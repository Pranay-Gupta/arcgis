define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/widgets/Widget", "esri/core/Collection", "esri/core/watchUtils", "esri/core/Handles", "./OneViewpoint"], function (require, exports, tslib_1, decorators_1, widget_1, Widget_1, Collection_1, watchUtils, Handles_1, OneViewpoint_1) {
    Widget_1 = tslib_1.__importDefault(Widget_1);
    Collection_1 = tslib_1.__importDefault(Collection_1);
    watchUtils = tslib_1.__importStar(watchUtils);
    Handles_1 = tslib_1.__importDefault(Handles_1);
    OneViewpoint_1 = tslib_1.__importDefault(OneViewpoint_1);
    var Viewpoints = /** @class */ (function (_super) {
        tslib_1.__extends(Viewpoints, _super);
        function Viewpoints(args) {
            var _this = _super.call(this, args) || this;
            _this.handles = new Handles_1.default();
            return _this;
        }
        Object.defineProperty(Viewpoints.prototype, "activeViewpoint", {
            set: function (viewpointToActivate) {
                this.slides.forEach(function (viewpoint) {
                    if (viewpoint !== viewpointToActivate) {
                        viewpoint.active = false;
                    }
                    else {
                        viewpoint.active = true;
                    }
                });
                this._set("activeViewpoint", viewpointToActivate);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Viewpoints.prototype, "slides", {
            get: function () {
                var _this = this;
                return this.appState ?
                    this.appState.view.map.presentation.slides
                        .map(function (s) { return new OneViewpoint_1.default({ slide: s, appState: _this.appState }); })
                    : new Collection_1.default();
            },
            enumerable: false,
            configurable: true
        });
        Viewpoints.prototype.render = function () {
            var items = this.slides.length > 0 ? this.slides.map(function (s) { return s.render(); }).toArray() : null;
            return this.slides.length > 0 ? ((0, widget_1.tsx)("div", { bind: this, key: this, class: "viewpoints" },
                (0, widget_1.tsx)("h2", { class: "slash-title" }, "Point of view"),
                (0, widget_1.tsx)("ul", null, items))) : null;
        };
        Viewpoints.prototype.postInitialize = function () {
            var _this = this;
            this.appState.view.map.presentation.slides.on("change", function () { return _this.notifyChange("slides"); });
            this.slides.on("change", this.watchActiveSlide.bind(this));
            this.watchActiveSlide();
        };
        Viewpoints.prototype.watchActiveSlide = function () {
            var _this = this;
            this.handles.removeAll();
            this.slides.forEach(function (s) {
                _this.handles.add(watchUtils.init(s, "active", function (active) {
                    if (active) {
                        _this.activeViewpoint = s;
                    }
                }), "active");
            });
        };
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], Viewpoints.prototype, "appState", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], Viewpoints.prototype, "activeViewpoint", null);
        tslib_1.__decorate([
            (0, decorators_1.property)({ readOnly: true, dependsOn: ["appState.view.map.presentation.slides"] })
        ], Viewpoints.prototype, "slides", null);
        Viewpoints = tslib_1.__decorate([
            (0, decorators_1.subclass)("widgets/Viewpoints")
        ], Viewpoints);
        return Viewpoints;
    }(Widget_1.default));
    return Viewpoints;
});
