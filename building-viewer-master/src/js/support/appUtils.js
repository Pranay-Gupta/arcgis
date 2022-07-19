define(["require", "exports", "tslib", "esri/WebScene", "esri/views/SceneView", "esri/portal/PortalItem", "esri/portal/Portal"], function (require, exports, tslib_1, WebScene_1, SceneView_1, PortalItem_1, Portal_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SURROUNDINGS_LAYER_PREFIX = exports.EXTERNAL_INFOPOINT_LAYER_PREFIX = exports.INTERNAL_INFOPOINTS_LAYER_PREFIX = exports.FLOOR_POINTS_LAYER_PREFIX = exports.MAIN_LAYER_PREFIX = exports.CITY_LAYER_PREFIX = exports.findLayer = exports.createViewFromWebScene = void 0;
    WebScene_1 = tslib_1.__importDefault(WebScene_1);
    SceneView_1 = tslib_1.__importDefault(SceneView_1);
    PortalItem_1 = tslib_1.__importDefault(PortalItem_1);
    Portal_1 = tslib_1.__importDefault(Portal_1);
    function createViewFromWebScene(args) {
        var portalItem = new PortalItem_1.default({
            id: args.websceneId
        });
        // Let user add portal parameter
        if (args.portalUrl) {
            portalItem.portal = new Portal_1.default({
                url: args.portalUrl
            });
        }
        // Load webscene and display it in a SceneView
        var webscene = new WebScene_1.default({
            portalItem: portalItem
        });
        var view = new SceneView_1.default({
            container: args.mapContainer,
            map: webscene
        });
        view.when(function () {
            view.padding = { left: 300 };
            view.popup.autoOpenEnabled = false;
        });
        // Remove default ui:
        view.ui.empty("top-left");
        view.ui.empty("bottom-left");
        return view;
    }
    exports.createViewFromWebScene = createViewFromWebScene;
    function findLayer(layers, title) {
        return layers.find(function (l) { return l.title === title; });
    }
    exports.findLayer = findLayer;
    exports.CITY_LAYER_PREFIX = "City model";
    exports.MAIN_LAYER_PREFIX = "Building";
    exports.FLOOR_POINTS_LAYER_PREFIX = "Floor points";
    exports.INTERNAL_INFOPOINTS_LAYER_PREFIX = "Floor pictures";
    exports.EXTERNAL_INFOPOINT_LAYER_PREFIX = "External pictures";
    exports.SURROUNDINGS_LAYER_PREFIX = "Surroundings:";
});
