define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "./Section", "esri/core/Collection", "esri/widgets/Widget", "../widgets/Toggle/Toggle", "esri/core/watchUtils", "../support/appUtils"], function (require, exports, tslib_1, decorators_1, widget_1, Section_1, Collection_1, Widget_1, Toggle_1, watchUtils, appUtils) {
    Section_1 = tslib_1.__importDefault(Section_1);
    Collection_1 = tslib_1.__importDefault(Collection_1);
    Widget_1 = tslib_1.__importDefault(Widget_1);
    Toggle_1 = tslib_1.__importDefault(Toggle_1);
    watchUtils = tslib_1.__importStar(watchUtils);
    appUtils = tslib_1.__importStar(appUtils);
    var SurroundingsElement = /** @class */ (function (_super) {
        tslib_1.__extends(SurroundingsElement, _super);
        function SurroundingsElement(args) {
            var _this = _super.call(this, args) || this;
            _this.toggle = new Toggle_1.default();
            if (args.content) {
                _this.content = args.content.bind(_this);
            }
            _this.watch("active", function (isActive) {
                if (isActive) {
                    _this.activate();
                }
                else {
                    _this.deactivate();
                }
            });
            return _this;
        }
        Object.defineProperty(SurroundingsElement.prototype, "active", {
            get: function () {
                return this.toggle.active;
            },
            set: function (isActive) {
                this.toggle.active = isActive;
            },
            enumerable: false,
            configurable: true
        });
        SurroundingsElement.prototype.activate = function () {
            this.appState.view.goTo(this.camera);
            if (this.layer) {
                this.layer.visible = true;
            }
        };
        SurroundingsElement.prototype.deactivate = function () {
            if (this.layer) {
                this.layer.visible = false;
            }
        };
        SurroundingsElement.prototype.content = function () {
            return ((0, widget_1.tsx)("div", { clas: "content" }));
        };
        SurroundingsElement.prototype.render = function () {
            var _this = this;
            return ((0, widget_1.tsx)("div", { key: this, class: this.classes("element", { "active": this.active }) },
                (0, widget_1.tsx)("h2", { class: "slash-title width-toggle", onclick: function () { return _this.active = !_this.active; } },
                    this.toggle.render(),
                    (0, widget_1.tsx)("a", { href: "javascript:return;" }, this.title)),
                (0, widget_1.tsx)("div", { clas: "content" }, this.content())));
        };
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], SurroundingsElement.prototype, "toggle", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)({ aliasOf: "toggle.active" })
        ], SurroundingsElement.prototype, "active", null);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], SurroundingsElement.prototype, "title", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], SurroundingsElement.prototype, "layer", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], SurroundingsElement.prototype, "appState", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], SurroundingsElement.prototype, "camera", void 0);
        SurroundingsElement = tslib_1.__decorate([
            (0, decorators_1.subclass)("SurroundingsElement")
        ], SurroundingsElement);
        return SurroundingsElement;
    }(Widget_1.default));
    var PoIElement = /** @class */ (function (_super) {
        tslib_1.__extends(PoIElement, _super);
        function PoIElement(args) {
            return _super.call(this, args) || this;
        }
        PoIElement.prototype.render = function () {
            return ((0, widget_1.tsx)("div", null,
                (0, widget_1.tsx)("span", { class: "magnifier-icon" },
                    (0, widget_1.tsx)("svg", { "aria-hidden": "true", focusable: "false", "data-prefix": "fas", "data-icon": "search", class: "svg-inline--fa fa-search fa-w-16", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
                        (0, widget_1.tsx)("path", { fill: "currentColor", d: "M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" }))),
                (0, widget_1.tsx)("a", { href: "javascript: void(0)", onclick: this.onClick, bind: this, key: this }, this.name)));
        };
        PoIElement.prototype.onClick = function (event) {
            this.appState.view.goTo(this.camera);
        };
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], PoIElement.prototype, "camera", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], PoIElement.prototype, "name", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], PoIElement.prototype, "appState", void 0);
        PoIElement = tslib_1.__decorate([
            (0, decorators_1.subclass)("PoIElement")
        ], PoIElement);
        return PoIElement;
    }(Widget_1.default));
    var SurroundingsSection = /** @class */ (function (_super) {
        tslib_1.__extends(SurroundingsSection, _super);
        function SurroundingsSection(args) {
            var _this = _super.call(this, args) || this;
            _this.title = "Surroundings";
            _this.id = "surroundings";
            _this.own(watchUtils.whenOnce(_this, "appState", function () {
                _this.appState.view.map.when(function () {
                    // Get the point of interests:
                    _this.poiElements = _this.appState.view.map.presentation.slides
                        .filter(function (slide) { return slide.title.text.indexOf("Points of Interest:") > -1; })
                        .map(function (slide) {
                        _this.appState.view.map.presentation.slides.remove(slide);
                        return new PoIElement({
                            name: slide.title.text.replace("Points of Interest: ", ""),
                            camera: slide.viewpoint.camera,
                            appState: _this.appState
                        });
                    });
                    watchUtils.on(_this.appState, "view.map.layers", "change", function () { return _this.notifyChange("elements"); });
                    watchUtils.on(_this, "poiElements", "change", function () { return _this.notifyChange("elements"); });
                });
            }));
            return _this;
        }
        Object.defineProperty(SurroundingsSection.prototype, "elements", {
            get: function () {
                var _this = this;
                if (this.appState && this.appState.view.map.layers.length > 0) {
                    var elements = this.appState.view.map.layers
                        .filter(function (layer) { return layer.title.indexOf(appUtils.SURROUNDINGS_LAYER_PREFIX) > -1; })
                        .map(function (layer) {
                        layer.visible = false;
                        return new SurroundingsElement({
                            title: layer.title.replace("Surroundings: ", ""),
                            layer: layer,
                            appState: _this.appState,
                            camera: _this.camera
                        });
                    });
                    if (this.poiElements.length > 0) {
                        elements.push(new SurroundingsElement({
                            title: "Points of Interest",
                            appState: this.appState,
                            camera: this.camera,
                            content: function () {
                                var poiElementsItems = _this.poiElements.map(function (el) { return el.render(); });
                                return ((0, widget_1.tsx)("div", { class: "content" }, poiElementsItems.toArray()));
                            }
                        }));
                    }
                    return elements;
                }
                else {
                    return new Collection_1.default();
                }
            },
            enumerable: false,
            configurable: true
        });
        SurroundingsSection.prototype.render = function () {
            return ((0, widget_1.tsx)("div", { id: this.id, key: this },
                (0, widget_1.tsx)("h1", null, "Surroundings"),
                this.elements.map(function (l) { return l.render(); }).toArray()));
        };
        SurroundingsSection.prototype.paneRight = function () {
            return ((0, widget_1.tsx)("div", null));
        };
        SurroundingsSection.prototype.onEnter = function () {
            this.elements.forEach(function (el) { return el.active = el.title === "Points of Interest"; });
        };
        SurroundingsSection.prototype.onLeave = function () {
            this.elements.forEach(function (e) { return e.active = false; });
        };
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], SurroundingsSection.prototype, "title", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], SurroundingsSection.prototype, "appState", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], SurroundingsSection.prototype, "id", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], SurroundingsSection.prototype, "poiElements", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)({ dependsOn: ["appState.view.map.layers", "poiElements"], readOnly: true })
        ], SurroundingsSection.prototype, "elements", null);
        SurroundingsSection = tslib_1.__decorate([
            (0, decorators_1.subclass)("sections/SurroundingsSection")
        ], SurroundingsSection);
        return SurroundingsSection;
    }(Section_1.default));
    return SurroundingsSection;
});
