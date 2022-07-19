define(["require", "exports", "tslib", "esri/renderers/SimpleRenderer"], function (require, exports, tslib_1, SimpleRenderer_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createFilterFor = exports.FLOOR_FILTER_NAME = exports.definitionExpressions = exports.renderers = void 0;
    SimpleRenderer_1 = tslib_1.__importDefault(SimpleRenderer_1);
    exports.renderers = {
        surroundings: {
            //--------------------------------------------------------------------------
            //
            //  Surroundings
            //
            //--------------------------------------------------------------------------
            // This is used when displaying the different pages and
            // when there is no other variables defined
            default: {
                renderer: {
                    type: "simple",
                    symbol: {
                        type: "mesh-3d",
                        symbolLayers: [{
                                type: "fill",
                                material: { color: [100, 100, 100, 1], colorMixMode: "replace" },
                                edges: {
                                    type: "solid",
                                    color: [30, 30, 30, 1]
                                }
                            }]
                    }
                },
                // Opacity when displaying the different pages and
                opacity: 1
            },
            "surroundings": {
                renderer: {
                    type: "simple",
                    symbol: {
                        type: "mesh-3d",
                        // castShadows: false,
                        symbolLayers: [{
                                type: "fill",
                                material: { color: [255, 255, 255, 1], colorMixMode: "tint" },
                                edges: {
                                    type: "solid",
                                    color: [30, 30, 30, 1]
                                }
                            }]
                    }
                }
            },
            "floors": {
                opacity: 0
            }
        },
        mainBuilding: {
            //--------------------------------------------------------------------------
            //
            //  Building
            //
            //--------------------------------------------------------------------------
            // This is used when displaying the different pages and
            // when there is no other variables defined
            default: {
                renderer: new SimpleRenderer_1.default({
                    symbol: {
                        type: "mesh-3d",
                        symbolLayers: [{
                                type: "fill",
                                material: { color: [255, 184, 1, 1], colorMixMode: "replace" },
                                edges: {
                                    type: "solid",
                                    color: [0, 0, 0, 1]
                                }
                            }]
                    }
                }),
                // Opacity when displaying the different pages and
                opacity: 1
            },
            // This is used when displaying the different floors:
            "floors": {
                renderer: new SimpleRenderer_1.default({
                    symbol: {
                        type: "mesh-3d",
                        symbolLayers: [{
                                type: "fill",
                                material: { color: [255, 255, 255, 1], colorMixMode: "replace" },
                                edges: {
                                    type: "solid",
                                    color: [30, 30, 30, 1]
                                }
                            }]
                    }
                })
            },
            "surroundings": {
                renderer: null
            }
        }
    };
    // Some useful definitionExpression:
    exports.definitionExpressions = {
        basic: "BldgLevel IS NULL OR BldgLevel IS NOT NULL",
        // this is used to filter FeatureLayer:
        floor: function (floorNumber, extraQuery) {
            if (extraQuery === void 0) { extraQuery = " AND Category <> 'Generic Models'"; }
            return "BldgLevel = " + floorNumber + extraQuery;
        }
    };
    exports.FLOOR_FILTER_NAME = "BuildingFloor";
    function createFilterFor(floorNumber, extraQuery) {
        return {
            filterBlocks: [
                {
                    filterMode: { type: "solid" },
                    filterExpression: exports.definitionExpressions.floor(floorNumber, extraQuery),
                    title: "floor"
                }
            ],
            name: exports.FLOOR_FILTER_NAME
        };
    }
    exports.createFilterFor = createFilterFor;
});
