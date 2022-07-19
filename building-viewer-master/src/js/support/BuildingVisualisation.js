define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/core/watchUtils", "./visualVariables", "./buildingSceneLayerUtils"], function (require, exports, tslib_1, decorators_1, Accessor_1, watchUtils, visualVariables_1, buildingSceneLayerUtils) {
    Accessor_1 = tslib_1.__importDefault(Accessor_1);
    watchUtils = tslib_1.__importStar(watchUtils);
    buildingSceneLayerUtils = tslib_1.__importStar(buildingSceneLayerUtils);
    var BuildingVisualisation = /** @class */ (function (_super) {
        tslib_1.__extends(BuildingVisualisation, _super);
        //--------------------------------------------------------------------------
        //
        //  Life circle
        //
        //--------------------------------------------------------------------------
        function BuildingVisualisation(args) {
            var _this = _super.call(this) || this;
            _this.initialRenderer = {};
            _this.appState = args.appState;
            _this.layer = args.layer;
            if (args.floorMapping) {
                _this.floorMapping = args.floorMapping;
            }
            if (args.extraQuery) {
                _this.extraQuery = args.extraQuery;
            }
            // Save the initial renderers, so that we can set it back:
            buildingSceneLayerUtils.goThroughSubLayers(args.layer, function (sublayer) {
                if (sublayer.type === "building-component") {
                    _this.initialRenderer[sublayer.title] = sublayer.renderer;
                }
            });
            // To improve performance, we will set a definition expression that will
            // force the api to load the data for floor attribute:
            buildingSceneLayerUtils.goThroughSubLayers(args.layer, function (sublayer) {
                if (sublayer.type === "building-component") {
                    sublayer.definitionExpression = visualVariables_1.definitionExpressions.basic;
                }
            });
            watchUtils.init(_this, "layerRenderer", _this._updateBaseRenderer);
            watchUtils.init(_this, "customBaseRenderer", _this._updateBaseRenderer);
            // Set the building filters when necessary:
            watchUtils.init(_this, "buildingFilters", function (buildingFilters) {
                if (!_this.appState.pageLocation || _this.appState.pageLocation !== "floors") {
                    _this.layer.activeFilterId = null;
                }
                else {
                    var currentFilter = _this.layer.filters.find(function (filter) { return filter.name === visualVariables_1.FLOOR_FILTER_NAME; });
                    if (currentFilter) {
                        _this.layer.filters.remove(currentFilter);
                    }
                    _this.layer.filters.push(buildingFilters);
                    _this.layer.activeFilterId = _this.layer.filters.find(function (filter) { return filter.name === visualVariables_1.FLOOR_FILTER_NAME; }).id;
                }
            });
            return _this;
        }
        Object.defineProperty(BuildingVisualisation.prototype, "layerRenderer", {
            get: function () {
                return buildingSceneLayerUtils
                    .getVisualVarsFromAppState(this.appState, "mainBuilding", "renderer");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BuildingVisualisation.prototype, "buildingFilters", {
            get: function () {
                if (this.appState.pageLocation === "floors") {
                    return (0, visualVariables_1.createFilterFor)(this.floorMapping(this.appState.floorNumber), this.extraQuery);
                }
                return null;
            },
            enumerable: false,
            configurable: true
        });
        BuildingVisualisation.prototype.normalizeCtorArgs = function (args) {
            return {
                appState: args.appState
            };
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        BuildingVisualisation.prototype._updateBaseRenderer = function () {
            var _this = this;
            if (this.customBaseRenderer) {
                buildingSceneLayerUtils.updateSubLayers(this.layer, ["renderer"], this.customBaseRenderer);
            }
            else if (!this.appState.pageLocation || this.appState.pageLocation === "home" || this.appState.pageLocation === "custom") {
                buildingSceneLayerUtils.goThroughSubLayers(this.layer, function (sublayer) {
                    if (sublayer.type === "building-component") {
                        sublayer.renderer = _this.initialRenderer[sublayer.title] && _this.initialRenderer[sublayer.title].clone();
                    }
                });
            }
            else {
                buildingSceneLayerUtils.updateSubLayers(this.layer, ["renderer"], this.layerRenderer);
            }
        };
        BuildingVisualisation.prototype.floorMapping = function (originalFloor) {
            return originalFloor;
        };
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], BuildingVisualisation.prototype, "layer", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)({
                readOnly: true,
                dependsOn: [
                    "appState.pageLocation",
                    "appState.floorNumber"
                ]
            })
        ], BuildingVisualisation.prototype, "layerRenderer", null);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], BuildingVisualisation.prototype, "customBaseRenderer", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)({
                readOnly: true,
                dependsOn: [
                    "appState.pageLocation",
                    "appState.floorNumber"
                ]
            })
        ], BuildingVisualisation.prototype, "buildingFilters", null);
        tslib_1.__decorate([
            (0, decorators_1.property)({ constructOnly: true })
        ], BuildingVisualisation.prototype, "appState", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], BuildingVisualisation.prototype, "extraQuery", void 0);
        BuildingVisualisation = tslib_1.__decorate([
            (0, decorators_1.subclass)("support/BuildingVisualisation")
        ], BuildingVisualisation);
        return BuildingVisualisation;
    }(Accessor_1.default));
    return BuildingVisualisation;
});
