define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "./Section", "esri/widgets/Widget", "../widgets/FloorSelector/FloorSelector", "esri/core/watchUtils", "esri/widgets/Legend", "../widgets/Popup/PopupInfo", "../support/appUtils", "esri/core/Handles"], function (require, exports, tslib_1, decorators_1, widget_1, Section_1, Widget_1, FloorSelector_1, watchUtils, Legend_1, PopupInfo_1, appUtils, Handles_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FloorsSection = exports.Floor = void 0;
    Section_1 = tslib_1.__importDefault(Section_1);
    Widget_1 = tslib_1.__importDefault(Widget_1);
    FloorSelector_1 = tslib_1.__importDefault(FloorSelector_1);
    watchUtils = tslib_1.__importStar(watchUtils);
    Legend_1 = tslib_1.__importDefault(Legend_1);
    PopupInfo_1 = tslib_1.__importDefault(PopupInfo_1);
    appUtils = tslib_1.__importStar(appUtils);
    Handles_1 = tslib_1.__importDefault(Handles_1);
    var LegendWrapper = /** @class */ (function (_super) {
        tslib_1.__extends(LegendWrapper, _super);
        function LegendWrapper(args, container) {
            var _this = _super.call(this, args) || this;
            _this.hide = true;
            return _this;
        }
        LegendWrapper.prototype.postInitialize = function () {
            this.legend = new Legend_1.default({
                view: this.appState.view,
                layerInfos: []
            });
        };
        LegendWrapper.prototype.render = function () {
            return ((0, widget_1.tsx)("div", { class: this.classes({ "hide": this.hide }) }, this.legend.render()));
        };
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], LegendWrapper.prototype, "hide", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)({ constructOnly: true })
        ], LegendWrapper.prototype, "appState", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], LegendWrapper.prototype, "legend", void 0);
        LegendWrapper = tslib_1.__decorate([
            (0, decorators_1.subclass)("legendWrapper")
        ], LegendWrapper);
        return LegendWrapper;
    }(Widget_1.default));
    var PlayButton = /** @class */ (function (_super) {
        tslib_1.__extends(PlayButton, _super);
        function PlayButton() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.playing = false;
            return _this;
        }
        Object.defineProperty(PlayButton.prototype, "audio", {
            get: function () {
                return new Audio(this.audioSrc);
            },
            enumerable: false,
            configurable: true
        });
        PlayButton.prototype.postInitialize = function () {
            var _this = this;
            this.watch("audio", function (audio) {
                audio.addEventListener("ended", function () {
                    audio.currentTime = 0;
                    _this.playing = false;
                });
            });
        };
        PlayButton.prototype.render = function () {
            var dynamicCss = {
                "playing": this.playing
            };
            return ((0, widget_1.tsx)("button", { class: this.classes(dynamicCss, "play_button"), onclick: this.onClick, bind: this, key: this },
                (0, widget_1.tsx)("i", { class: "play_button__icon" },
                    (0, widget_1.tsx)("div", { class: "play_button__mask" }))));
        };
        PlayButton.prototype.onClick = function (event) {
            if (this.playing) {
                this.playing = false;
                this.audio.pause();
            }
            else {
                this.audio.play();
                this.playing = true;
            }
        };
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], PlayButton.prototype, "playing", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], PlayButton.prototype, "audioSrc", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)({ dependsOn: ["audioSrc"], readOnly: true })
        ], PlayButton.prototype, "audio", null);
        PlayButton = tslib_1.__decorate([
            (0, decorators_1.subclass)("playButton")
        ], PlayButton);
        return PlayButton;
    }(Widget_1.default));
    var Floor = /** @class */ (function (_super) {
        tslib_1.__extends(Floor, _super);
        function Floor(args) {
            var _this = _super.call(this, args) || this;
            _this.floor = 1;
            _this.playButton = new PlayButton();
            return _this;
        }
        Floor.prototype.render = function () {
            var audio = this.audio ? ((0, widget_1.tsx)("p", null,
                "Listen to the name of this floor ",
                this.playButton.render())) : null;
            return ((0, widget_1.tsx)("div", null,
                this.content(this),
                audio));
        };
        Floor.prototype.activate = function () {
            // put audio back to 0
            this.playButton.audio.currentTime = 0;
        };
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], Floor.prototype, "title", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], Floor.prototype, "content", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], Floor.prototype, "subtitle", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], Floor.prototype, "floor", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)({ aliasOf: "playButton.audioSrc" })
        ], Floor.prototype, "audio", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], Floor.prototype, "playButton", void 0);
        Floor = tslib_1.__decorate([
            (0, decorators_1.subclass)("Floor")
        ], Floor);
        return Floor;
    }(Widget_1.default));
    exports.Floor = Floor;
    var FloorsSection = /** @class */ (function (_super) {
        tslib_1.__extends(FloorsSection, _super);
        function FloorsSection(args) {
            var _this = _super.call(this, args) || this;
            _this.title = "Floor by floor";
            _this.id = "floors";
            _this.layerNameForInfoPoint = appUtils.FLOOR_POINTS_LAYER_PREFIX;
            _this.layerNameForPicturePoint = appUtils.INTERNAL_INFOPOINTS_LAYER_PREFIX;
            _this.handles = new Handles_1.default();
            return _this;
        }
        FloorsSection.prototype.render = function () {
            var currentLevel = this.floors ? this.floors.getItemAt(this.selectedFloor) : null;
            var selectedFloor = this.selectedFloor === 0 ? "G" : this.selectedFloor;
            var title = currentLevel ? this.selectedFloor === 0 ? ((0, widget_1.tsx)("h1", null, currentLevel.title)) : ((0, widget_1.tsx)("h1", null, currentLevel.title)) : null;
            return currentLevel ? ((0, widget_1.tsx)("div", { id: this.id, bind: this, key: this },
                (0, widget_1.tsx)("div", { class: "level" }, "floor"),
                (0, widget_1.tsx)("h1", { class: "number" }, selectedFloor),
                title,
                (0, widget_1.tsx)("h3", { class: "subtitle" },
                    "[",
                    currentLevel.subtitle,
                    "]"),
                (0, widget_1.tsx)("div", { class: "content" }, currentLevel.render()))) : null;
        };
        FloorsSection.prototype.paneRight = function () {
            var floorSelector = this.floorSelector ? this.floorSelector.render() : null;
            return ((0, widget_1.tsx)("div", null, floorSelector));
        };
        FloorsSection.prototype.postInitialize = function () {
            var _this = this;
            watchUtils.whenOnce(this, "appState", function () {
                _this.legendWrapper = new LegendWrapper({
                    appState: _this.appState
                }, "floorLegend");
                var floorSelectorCtorArgs = _this.minFloor != null && _this.maxFloor != null ? {
                    appState: _this.appState,
                    minFloor: _this.minFloor,
                    maxFloor: _this.maxFloor
                } : {
                    appState: _this.appState
                };
                _this.floorSelector = new FloorSelector_1.default(floorSelectorCtorArgs);
                watchUtils.on(_this, "appState.view.map.layers", "change", _this.getExtraInfoLayers.bind(_this));
                watchUtils.init(_this, "selectedFloor", function (selectedFloor) {
                    if (_this.floors) {
                        _this.floors.getItemAt(selectedFloor).activate();
                    }
                    // filter the picture and infoLayer:
                    if (_this.layer) {
                        _this.layer.definitionExpression = "level_id = " + selectedFloor;
                    }
                    if (_this.picturePointsLayer) {
                        _this.picturePointsLayer.definitionExpression = "level_id = " + selectedFloor;
                    }
                });
            });
        };
        FloorsSection.prototype.onEnter = function () {
            var _this = this;
            this.selectedFloor = 1;
            if (this.floors) {
                this.floors.getItemAt(this.selectedFloor).activate();
            }
            this.appState.view.environment.lighting.directShadowsEnabled = false;
            this.appState.view.environment.lighting.ambientOcclusionEnabled = false;
            // this.oldDate = this.appState.view.environment.lighting.date;
            console.log(this.appState.view.environment.lighting);
            // this.appState.view.environment.lighting.date = new Date("Thu Aug 01 2019 03:00:00 GMT+0200 (Central European Summer Time)");
            this.handles.add(this.appState.view.on("click", function (event) {
                // the hitTest() checks to see if any graphics in the view
                // intersect the given screen x, y coordinates
                _this.appState.view.hitTest(event)
                    .then(function (response) {
                    var filtered = response.results.filter(function (result) {
                        console.log(result);
                        //   return result.graphic.layer === this.picturePointsLayer;
                    })[0];
                    if (filtered) {
                        console.log(filtered);
                        _this.appState.popupInfo = new PopupInfo_1.default({
                        // image: filtered.graphic.attributes.url,
                        // credit: filtered.graphic.attributes.title
                        });
                    }
                });
            }), "click");
            this.legendWrapper.hide = !this.layer;
            if (this.layer) {
                this.layer.visible = true;
            }
            if (this.picturePointsLayer) {
                this.picturePointsLayer.visible = true;
            }
        };
        //   onLeave() {
        //     this.handles.remove("click");
        //     this.appState.view.environment.lighting.directShadowsEnabled = true;
        //     this.appState.view.environment.lighting.ambientOcclusionEnabled = true;
        //     this.appState.view.environment.lighting.date = this.oldDate;
        //     this.legendWrapper.hide = true;
        //     if (this.layer) {
        //       this.layer.visible = false;
        //     }
        //     if (this.picturePointsLayer) {
        //       this.picturePointsLayer.visible = false;
        //     }
        //   }
        FloorsSection.prototype.getExtraInfoLayers = function () {
            if (this.appState && this.appState.view.map.layers.length > 0) {
                // Get the info points on the floors:
                if (!this.layer) {
                    this.layer = appUtils.findLayer(this.appState.view.map.layers, this.layerNameForInfoPoint);
                    if (this.layer) {
                        this.layer.visible = false;
                        this.legendWrapper.legend.layerInfos = [
                            {
                                layer: this.layer,
                                title: "Legend",
                                // hideLayers: []
                            }
                        ];
                    }
                }
                // Get extra pictures:
                if (!this.picturePointsLayer) {
                    this.picturePointsLayer = appUtils.findLayer(this.appState.view.map.layers, this.layerNameForPicturePoint);
                    if (this.picturePointsLayer) {
                        this.picturePointsLayer.visible = false;
                        this.picturePointsLayer.outFields = ["*"];
                    }
                }
            }
        };
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], FloorsSection.prototype, "title", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], FloorsSection.prototype, "id", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)({ aliasOf: "appState.floorNumber" })
        ], FloorsSection.prototype, "selectedFloor", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], FloorsSection.prototype, "previousSelectedFloor", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], FloorsSection.prototype, "floorSelector", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], FloorsSection.prototype, "legendWrapper", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], FloorsSection.prototype, "layer", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)({ constructOnly: true })
        ], FloorsSection.prototype, "layerNameForInfoPoint", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)({ constructOnly: true })
        ], FloorsSection.prototype, "layerNameForPicturePoint", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], FloorsSection.prototype, "picturePointsLayer", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], FloorsSection.prototype, "minFloor", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], FloorsSection.prototype, "maxFloor", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)({ constructOnly: true })
        ], FloorsSection.prototype, "floors", void 0);
        FloorsSection = tslib_1.__decorate([
            (0, decorators_1.subclass)("sections/FloorsSection")
        ], FloorsSection);
        return FloorsSection;
    }(Section_1.default));
    exports.FloorsSection = FloorsSection;
});
