define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/core/Collection", "./Section"], function (require, exports, tslib_1, decorators_1, widget_1, Collection_1, Section_1) {
    Collection_1 = tslib_1.__importDefault(Collection_1);
    Section_1 = tslib_1.__importDefault(Section_1);
    var Sections = /** @class */ (function (_super) {
        tslib_1.__extends(Sections, _super);
        //--------------------------------------------------------------------------
        //
        //  Life circle
        //
        //--------------------------------------------------------------------------
        function Sections(sections, appState) {
            var _this = _super.call(this, sections.map(function (section) {
                section.appState = appState;
                return section;
            })) || this;
            //--------------------------------------------------------------------------
            //
            //  Variables
            //
            //--------------------------------------------------------------------------
            _this.previousActiveSection = null;
            _this.activeSectionNode = null;
            _this.previousActiveSectionNode = null;
            _this.appState = appState;
            _this.watch("appState.pageLocation", _this.activateSection);
            return _this;
        }
        Object.defineProperty(Sections.prototype, "activeSection", {
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            set: function (sectionToActivate) {
                if (sectionToActivate !== this._get("activeSection")) {
                    this.previousActiveSection = this.activeSection;
                    if (this.previousActiveSection) {
                        this.previousActiveSection.onLeave();
                    }
                    this.forEach(function (section) {
                        if (section !== sectionToActivate) {
                            section.active = false;
                        }
                        else {
                            section.active = true;
                        }
                    });
                    this.appState.pageLocation = sectionToActivate ? sectionToActivate.id : null;
                    this._set("activeSection", sectionToActivate);
                    if (this.activeSection) {
                        this.activeSection.onEnter();
                    }
                }
                if (this.activeSection.camera) {
                    this.emit("go-to", this.activeSection.camera);
                }
            },
            enumerable: false,
            configurable: true
        });
        //--------------------------------------------------------------------------
        //
        //  Public methods
        //
        //--------------------------------------------------------------------------
        Sections.prototype.activateSection = function (section) {
            if (section instanceof Section_1.default) {
                this.activeSection = section;
            }
            if (typeof section === "string") {
                this.activeSection = this.find(function (s) { return s.id === section; });
            }
            if (typeof section === "number") {
                this.activeSection = this.getItemAt(section);
            }
        };
        Sections.prototype.paneLeft = function (firstRendering) {
            if (firstRendering === void 0) { firstRendering = true; }
            var panes = this.swapPanes("render", firstRendering);
            return ((0, widget_1.tsx)("div", { id: "pane-left" }, panes));
        };
        Sections.prototype.paneRight = function (firstRendering) {
            if (firstRendering === void 0) { firstRendering = true; }
            var panes = this.swapPanes("paneRight", firstRendering);
            return ((0, widget_1.tsx)("div", { id: "pane-right" }, panes));
        };
        Sections.prototype.menu = function () {
            var _this = this;
            var items = this.map(function (section, i) {
                var slash = i !== 0 ? ((0, widget_1.tsx)("span", { class: "slash" }, "/ ")) : null;
                return [slash, _this.renderOneSectionMenu(section, i)];
            });
            return ((0, widget_1.tsx)("div", { id: "menu" }, items.toArray()));
        };
        Sections.prototype.renderOneSectionMenu = function (section, i) {
            var _this = this;
            var classes = section.active ? "active" : "";
            return ((0, widget_1.tsx)("a", { class: classes, href: "javascript: void(0)", onclick: function () { _this.activateSection(section.id); } }, section.title));
        };
        Sections.prototype.swapPanes = function (renderViewToCall, firstRendering) {
            if (firstRendering === void 0) { firstRendering = true; }
            var activeSectionClasses = firstRendering ? "pane" : "active pane";
            var previousActiveSectionClasses = firstRendering ? "active pane" : "pane";
            var currentPane = this.activeSection ? ((0, widget_1.tsx)("div", { class: activeSectionClasses, key: this.activeSection }, this.activeSection[renderViewToCall]())) : null;
            var previousUsedPane = this.previousActiveSection ? ((0, widget_1.tsx)("div", { class: previousActiveSectionClasses, key: this.previousActiveSection }, this.previousActiveSection[renderViewToCall]())) : null;
            return ((0, widget_1.tsx)("div", null,
                previousUsedPane,
                currentPane));
        };
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], Sections.prototype, "activeSection", null);
        tslib_1.__decorate([
            (0, decorators_1.property)({ constructOnly: true })
        ], Sections.prototype, "appState", void 0);
        Sections = tslib_1.__decorate([
            (0, decorators_1.subclass)("sections/Section")
        ], Sections);
        return Sections;
    }(Collection_1.default));
    return Sections;
});
