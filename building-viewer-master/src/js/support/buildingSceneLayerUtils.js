define(["require", "exports", "tslib", "esri/layers/buildingSublayers/BuildingComponentSublayer", "./visualVariables"], function (require, exports, tslib_1, BuildingComponentSublayer_1, visualVariables_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getVisualVarsFromAppState = exports.goThroughSubLayers = exports.updateSubLayers = exports.updateSubLayersSymbolLayer = void 0;
    BuildingComponentSublayer_1 = tslib_1.__importDefault(BuildingComponentSublayer_1);
    function updateSubLayersSymbolLayer(buildingLayer, propertyPath, value) {
        buildingLayer.when(function () {
            buildingLayer.allSublayers.forEach(function (layer) {
                if (layer instanceof BuildingComponentSublayer_1.default && layer.renderer.clone) {
                    var renderer = layer.renderer.clone();
                    var parentProp_1 = renderer.symbol.symbolLayers.getItemAt(0);
                    propertyPath.forEach(function (prop, i) {
                        if (i === (propertyPath.length - 1)) {
                            parentProp_1[prop] = value;
                        }
                        else {
                            parentProp_1 = parentProp_1[prop];
                        }
                    });
                    layer.renderer = renderer;
                }
            });
        });
    }
    exports.updateSubLayersSymbolLayer = updateSubLayersSymbolLayer;
    function updateSubLayers(buildingLayer, propertyPath, value) {
        buildingLayer.when(function () {
            buildingLayer.allSublayers.forEach(function (layer) {
                var parentProp = layer;
                propertyPath.forEach(function (prop, i) {
                    if (i === (propertyPath.length - 1)) {
                        parentProp[prop] = value;
                    }
                    else {
                        parentProp = parentProp[prop];
                    }
                });
            });
        });
    }
    exports.updateSubLayers = updateSubLayers;
    function goThroughSubLayers(buildingLayer, callback) {
        buildingLayer.when(function () {
            buildingLayer.allSublayers.forEach(function (layer) {
                callback(layer);
            });
        });
    }
    exports.goThroughSubLayers = goThroughSubLayers;
    function getVisualVarsFromAppState(appState, layerName, propertyName) {
        var defaultProps = visualVariables_1.renderers[layerName]["default"][propertyName];
        var customPage = visualVariables_1.renderers[layerName][appState.pageLocation] ? visualVariables_1.renderers[layerName][appState.pageLocation][propertyName] : undefined;
        if (customPage !== undefined) {
            return customPage;
        }
        return defaultProps;
    }
    exports.getVisualVarsFromAppState = getVisualVarsFromAppState;
});
