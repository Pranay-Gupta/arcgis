define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "./Section", "../widgets/Viewpoints/Viewpoints", "esri/core/watchUtils", "esri/core/Handles", "../support/appUtils", "esri/core/Collection"], function (require, exports, tslib_1, decorators_1, widget_1, Section_1, Viewpoints_1, watchUtils, Handles_1, appUtils, Collection_1) {
    Section_1 = tslib_1.__importDefault(Section_1);
    Viewpoints_1 = tslib_1.__importDefault(Viewpoints_1);
    watchUtils = tslib_1.__importStar(watchUtils);
    Handles_1 = tslib_1.__importDefault(Handles_1);
    appUtils = tslib_1.__importStar(appUtils);
    Collection_1 = tslib_1.__importDefault(Collection_1);
    var HomeSection = /** @class */ (function (_super) {
        tslib_1.__extends(HomeSection, _super);
        function HomeSection(args) {
            var _this = _super.call(this, args) || this;
            _this.title = "Overview";
            _this.id = "home";
            _this.showExternalPoints = false;
            _this.handles = new Handles_1.default();
            _this.content = function (that) { return _this.appState.view.map.portalItem.snippet; };
            return _this;
        }
        Object.defineProperty(HomeSection.prototype, "viewpoints", {
            get: function () {
                return new Viewpoints_1.default({ appState: this.appState });
            },
            enumerable: false,
            configurable: true
        });
        HomeSection.prototype.render = function () {
            var timetable = this.timetable ? ((0, widget_1.tsx)("section", { class: "Hours" },
                (0, widget_1.tsx)("h2", { class: "slash-title" }, "Opening hours"),
                (0, widget_1.tsx)("div", null, this.timetable.render()))) : null;
            var title = this.textTitle ? ((0, widget_1.tsx)("h1", null, this.textTitle)) : null;
            return ((0, widget_1.tsx)("div", { id: this.id },
                (0, widget_1.tsx)("div", { bind: this, key: this },
                    title,
                    this.content(this)),
                timetable));
        };
        HomeSection.prototype.paneRight = function () {
            var viewpoints = this.viewpoints ? this.viewpoints.render() : null;
            return ((0, widget_1.tsx)("div", null, viewpoints));
        };
        HomeSection.prototype.postInitialize = function () {
            var _this = this;
            // Optionally add the external info points to display pictures:
            watchUtils.whenOnce(this, "appState", function () {
                watchUtils.on(_this, "appState.view.map.layers", "change", function () {
                    if (_this.appState && _this.appState.view.map.layers.length > 0) {
                        _this.infoPointsLayer = _this.appState.view.map.layers.find(function (layer) { return layer.title.indexOf(appUtils.EXTERNAL_INFOPOINT_LAYER_PREFIX) > -1; });
                        if (_this.infoPointsLayer) {
                            _this.infoPointsLayer.visible = false;
                            _this.infoPointsLayer.outFields = ["*"];
                            _this.infoPointsLayer.visible = false;
                            _this.infoPointsLayer.popupTemplate.overwriteActions = true;
                            _this.infoPointsLayer.popupTemplate.actions = new Collection_1.default();
                        }
                    }
                });
            });
            // Get the title to display in the text:
            watchUtils.whenOnce(this, "appState.view.map.portalItem.title", function () {
                _this.textTitle = _this.appState.view.map.portalItem.title;
            });
            // Enabling external point if we are in the home section:
            watchUtils.init(this, "appState.pageLocation", function (l) {
                if (_this.infoPointsLayer) {
                    _this.infoPointsLayer.visible = _this.showExternalPoints && l === "home";
                }
            });
        };
        HomeSection.prototype.onEnter = function () {
            var _this = this;
            // reset the active viewpoint each time we go in home section:
            this.viewpoints.activeViewpoint = null;
            // check if we click on an external point and display a popup if that is the case:
            this.handles.add(this.appState.view.on("click", function (event) {
                _this.appState.view.hitTest(event)
                    .then(function (response) {
                    var filtered = response.results.filter(function (result) {
                        return result.graphic.layer === _this.infoPointsLayer;
                    })[0];
                    if (filtered) {
                        // this.appState.popupInfo = new PopupInfo({
                        //   image: filtered.graphic.attributes.url,
                        //   credit: filtered.graphic.attributes.title
                        // })
                    }
                });
            }), "click");
        };
        HomeSection.prototype.onLeave = function () {
            // when not in home, remove the click listener:
            this.handles.remove("click");
        };
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], HomeSection.prototype, "title", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], HomeSection.prototype, "id", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)({ constructOnly: true })
        ], HomeSection.prototype, "timetable", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], HomeSection.prototype, "textTitle", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], HomeSection.prototype, "appState", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], HomeSection.prototype, "infoPointsLayer", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)({ constructOnly: true })
        ], HomeSection.prototype, "showExternalPoints", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], HomeSection.prototype, "content", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)({ dependsOn: ["appState"], readOnly: true })
        ], HomeSection.prototype, "viewpoints", null);
        HomeSection = tslib_1.__decorate([
            (0, decorators_1.subclass)("sections/HomeSection")
        ], HomeSection);
        return HomeSection;
    }(Section_1.default));
    return HomeSection;
});
