define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/widgets/Widget"], function (require, exports, tslib_1, decorators_1, widget_1, Widget_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Timetable = exports.DayTimetable = void 0;
    Widget_1 = tslib_1.__importDefault(Widget_1);
    var daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var DayTimetable = /** @class */ (function (_super) {
        tslib_1.__extends(DayTimetable, _super);
        function DayTimetable(args) {
            var _this = _super.call(this, args) || this;
            _this.index = 0;
            return _this;
        }
        Object.defineProperty(DayTimetable.prototype, "openDate", {
            get: function () {
                if (!this.opens) {
                    return new Date();
                }
                var time = this.opens.split(":").map(function (aTime) { return parseInt(aTime); });
                return new Date(2019, 2, 18 + this.index, time[0], time[1]);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DayTimetable.prototype, "closeDate", {
            get: function () {
                if (!this.closes) {
                    return new Date();
                }
                var time = this.closes.split(":").map(function (aTime) { return parseInt(aTime); });
                return new Date(2019, 2, 18 + this.index, time[0], time[1]);
            },
            enumerable: false,
            configurable: true
        });
        DayTimetable.prototype.render = function () {
            var today = new Date();
            if (today.getDay() === this.openDate.getDay()) {
                return ((0, widget_1.tsx)("div", { class: "daytime today" },
                    (0, widget_1.tsx)("h3", null, "Today"),
                    (0, widget_1.tsx)("div", { class: "schedule" },
                        this.openDate.getHours(),
                        ":00 - ",
                        this.closeDate.getHours(),
                        ":00")));
            }
            else {
                return ((0, widget_1.tsx)("div", { class: "daytime" },
                    (0, widget_1.tsx)("h3", null, daysName[this.openDate.getDay()]),
                    (0, widget_1.tsx)("div", { class: "schedule" },
                        this.openDate.getHours(),
                        ":00 - ",
                        this.closeDate.getHours(),
                        ":00")));
            }
        };
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], DayTimetable.prototype, "opens", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], DayTimetable.prototype, "closes", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], DayTimetable.prototype, "index", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)({ dependsOn: ["opens", "index"] })
        ], DayTimetable.prototype, "openDate", null);
        tslib_1.__decorate([
            (0, decorators_1.property)({ dependsOn: ["closes", "index"] })
        ], DayTimetable.prototype, "closeDate", null);
        DayTimetable = tslib_1.__decorate([
            (0, decorators_1.subclass)("widgets/Timetable")
        ], DayTimetable);
        return DayTimetable;
    }(Widget_1.default));
    exports.DayTimetable = DayTimetable;
    var Timetable = /** @class */ (function (_super) {
        tslib_1.__extends(Timetable, _super);
        function Timetable(args) {
            var _this = _super.call(this, args) || this;
            _this.today = new Date();
            args.dates.forEach(function (date, i) { return date.index = i; });
            return _this;
        }
        Timetable.prototype.render = function () {
            var dates = this.dates.map(function (d) { return d.render(); }).toArray();
            return ((0, widget_1.tsx)("div", { bind: this, key: this, class: "timetable" }, dates));
        };
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], Timetable.prototype, "today", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], Timetable.prototype, "dates", void 0);
        Timetable = tslib_1.__decorate([
            (0, decorators_1.subclass)("widgets/Timetable")
        ], Timetable);
        return Timetable;
    }(Widget_1.default));
    exports.Timetable = Timetable;
});
