define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "./buildingSceneLayerUtils", "esri/core/watchUtils"], function (require, exports, tslib_1, decorators_1, Accessor_1, buildingSceneLayerUtils, watchUtils) {
    Accessor_1 = tslib_1.__importDefault(Accessor_1);
    buildingSceneLayerUtils = tslib_1.__importStar(buildingSceneLayerUtils);
    watchUtils = tslib_1.__importStar(watchUtils);
    var SurroundingsVisualisation = /** @class */ (function (_super) {
        tslib_1.__extends(SurroundingsVisualisation, _super);
        //--------------------------------------------------------------------------
        //
        //  Life circle
        //
        //--------------------------------------------------------------------------
        function SurroundingsVisualisation(args) {
            var _this = _super.call(this) || this;
            _this.appState = args.appState;
            _this.layer = args.layer;
            _this.layer.when(function () {
                watchUtils.init(_this, "surroundingsRenderer", _this._updateBaseRenderer);
                watchUtils.init(_this, "customRenderer", _this._updateBaseRenderer);
                watchUtils.init(_this, "surroundingsOpacity", function (surroundingsOpacity) {
                    _this.layer.opacity = surroundingsOpacity;
                });
            });
            return _this;
        }
        Object.defineProperty(SurroundingsVisualisation.prototype, "surroundingsRenderer", {
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            get: function () {
                return buildingSceneLayerUtils
                    .getVisualVarsFromAppState(this.appState, "surroundings", "renderer");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SurroundingsVisualisation.prototype, "surroundingsOpacity", {
            get: function () {
                return buildingSceneLayerUtils
                    .getVisualVarsFromAppState(this.appState, "surroundings", "opacity");
            },
            enumerable: false,
            configurable: true
        });
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        SurroundingsVisualisation.prototype._updateBaseRenderer = function () {
            if (this.customRenderer) {
                this.layer.renderer = this.customRenderer;
            }
            else {
                this.layer.renderer = this.surroundingsRenderer;
            }
        };
        tslib_1.__decorate([
            (0, decorators_1.property)({
                readOnly: true,
                dependsOn: [
                    "appState.pageLocation",
                    "appState.floorNumber"
                ]
            })
        ], SurroundingsVisualisation.prototype, "surroundingsRenderer", null);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], SurroundingsVisualisation.prototype, "customRenderer", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)({
                readOnly: true,
                dependsOn: [
                    "appState.pageLocation",
                    "appState.floorNumber"
                ]
            })
        ], SurroundingsVisualisation.prototype, "surroundingsOpacity", null);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], SurroundingsVisualisation.prototype, "layer", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)({ constructOnly: true })
        ], SurroundingsVisualisation.prototype, "appState", void 0);
        SurroundingsVisualisation = tslib_1.__decorate([
            (0, decorators_1.subclass)("support/SurroundingsVisualisation")
        ], SurroundingsVisualisation);
        return SurroundingsVisualisation;
    }(Accessor_1.default));
    return SurroundingsVisualisation;
});
