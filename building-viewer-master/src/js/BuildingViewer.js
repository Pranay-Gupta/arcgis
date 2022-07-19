define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "./sections/Sections", "esri/widgets/Widget", "esri/core/promiseUtils", "./support/BuildingVisualisation", "./support/SurroundingsVisualisation", "./AppState", "./support/appUtils", "./widgets/Popup/Popup"], function (require, exports, tslib_1, decorators_1, widget_1, Sections_1, Widget_1, promiseUtils, BuildingVisualisation_1, SurroundingsVisualisation_1, AppState_1, appUtils, Popup_1) {
    Sections_1 = tslib_1.__importDefault(Sections_1);
    Widget_1 = tslib_1.__importDefault(Widget_1);
    promiseUtils = tslib_1.__importStar(promiseUtils);
    BuildingVisualisation_1 = tslib_1.__importDefault(BuildingVisualisation_1);
    SurroundingsVisualisation_1 = tslib_1.__importDefault(SurroundingsVisualisation_1);
    AppState_1 = tslib_1.__importDefault(AppState_1);
    appUtils = tslib_1.__importStar(appUtils);
    Popup_1 = tslib_1.__importDefault(Popup_1);
    var BuildingViewer = /** @class */ (function (_super) {
        tslib_1.__extends(BuildingViewer, _super);
        //--------------------------------------------------------------------------
        //
        //  Life circle
        //
        //--------------------------------------------------------------------------
        function BuildingViewer(args) {
            var _this = _super.call(this, args) || this;
            _this.appState = new AppState_1.default();
            _this.firstRendering = true;
            _this.view = appUtils.createViewFromWebScene({ websceneId: args.websceneId, mapContainer: args.mapContainer, portalUrl: args.portalUrl });
            if (args.floorMapping) {
                _this.floorMapping = args.floorMapping.bind(_this);
            }
            return _this;
        }
        BuildingViewer.prototype.normalizeCtorArgs = function (args) {
            this.rawSections = args.sections;
            delete args["sections"];
            return args;
        };
        BuildingViewer.prototype.initialize = function () {
            var _this = this;
            this.sections = new Sections_1.default(this.rawSections, this.appState);
            this.view.map.when(function () {
                // Save the initial layers:
                promiseUtils
                    .eachAlways(_this.view.map.layers.map(function (l) { return _this.appState.view.whenLayerView(l); }))
                    .then(function () {
                    ///////////////////////////////////
                    // Main building to present:
                    var BSL = _this.appState.view.map.layers.find(function (layer) { return layer.title.indexOf(appUtils.MAIN_LAYER_PREFIX) > -1; });
                    if (!BSL) {
                        throw new Error("Cannot find the main BuildingSceneLayer (" + appUtils.MAIN_LAYER_PREFIX + ") in the webscene " + _this.websceneId);
                    }
                    var visualisationArgs = {
                        appState: _this.appState,
                        layer: BSL
                    };
                    if (_this.floorMapping) {
                        visualisationArgs.floorMapping = _this.floorMapping;
                    }
                    if (_this.extraQuery) {
                        visualisationArgs.extraQuery = _this.extraQuery;
                    }
                    _this.buildingLayer = new BuildingVisualisation_1.default(visualisationArgs);
                    ///////////////////////////////////
                    // Optional surrounding's layer:
                    var surroundingsLayer = _this.appState.view.map.layers.find(function (layer) { return layer.title.toLowerCase().indexOf(appUtils.CITY_LAYER_PREFIX.toLowerCase()) > -1; });
                    if (surroundingsLayer) {
                        _this.surroundingsLayer = new SurroundingsVisualisation_1.default({
                            layer: surroundingsLayer,
                            appState: _this.appState
                        });
                    }
                });
                ///////////////////////////////////
                // Setup camera:
                _this.sections.forEach(function (section) {
                    var slide = _this.view.map.presentation.slides.find(function (slide) { return slide.title.text === section.title; });
                    if (slide) {
                        section.camera = slide.viewpoint.camera;
                        _this.view.map.presentation.slides.remove(slide);
                    }
                    else {
                        console.error("Could not find a slide for section " + section.title);
                    }
                });
            });
            this.view.when(function () {
                // Debug:
                window["view"] = _this.view;
                window["appState"] = _this.appState;
                // Active first section:
                if (_this.sections.length > 0) {
                    _this.sections.activateSection(_this.sections.getItemAt(0).id);
                }
            });
            this.watch("activeSection", function (activeSection) {
                _this.firstRendering = true;
                _this.renderNow();
                setTimeout(function () {
                    _this.firstRendering = false;
                    _this.renderNow();
                }, 10);
            });
        };
        BuildingViewer.prototype.render = function () {
            return ((0, widget_1.tsx)("div", null,
                (0, widget_1.tsx)("div", { class: "left side-container" }, this.sections.paneLeft(this.firstRendering)),
                (0, widget_1.tsx)("div", { class: "left menu" }, this.sections.menu()),
                (0, widget_1.tsx)("div", { class: "right side-container" }, this.sections.paneRight(this.firstRendering))));
        };
        BuildingViewer.prototype.postInitialize = function () {
            var _this = this;
            this.own(this.sections.on("go-to", function (camera) {
                _this.view.goTo(camera);
            }));
            new Popup_1.default({ appState: this.appState, container: "popup" });
        };
        BuildingViewer.prototype.floorMapping = function (num) { return num; };
        tslib_1.__decorate([
            (0, decorators_1.property)({ aliasOf: "appState.view" })
        ], BuildingViewer.prototype, "view", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)({ aliasOf: "sections.activeSection" })
        ], BuildingViewer.prototype, "activeSection", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], BuildingViewer.prototype, "sections", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], BuildingViewer.prototype, "appState", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], BuildingViewer.prototype, "websceneId", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], BuildingViewer.prototype, "extraQuery", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], BuildingViewer.prototype, "portalUrl", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)({ aliasOf: "appState.buildingLayer" })
        ], BuildingViewer.prototype, "buildingLayer", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)({ aliasOf: "appState.surroundingsLayer" })
        ], BuildingViewer.prototype, "surroundingsLayer", void 0);
        BuildingViewer = tslib_1.__decorate([
            (0, decorators_1.subclass)("webSceneViewer.widgets.LayersLoading.LayersLoadingProgressBar")
        ], BuildingViewer);
        return BuildingViewer;
    }(Widget_1.default));
    return BuildingViewer;
});
