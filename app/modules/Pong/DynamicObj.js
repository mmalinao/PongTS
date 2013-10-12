/// <reference path="../../lib/kinetic.d.ts" />
/// <reference path="../PhysicsEngine/Shapes.ts" />
/// <reference path="../PhysicsEngine/Vector.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PongTS;
(function (PongTS) {
    (function (Pong) {
        var DynamicObj = (function (_super) {
            __extends(DynamicObj, _super);
            function DynamicObj(config) {
                _super.call(this, {
                    x: config.Position.X,
                    y: config.Position.Y,
                    radius: config.Radius,
                    stroke: 'white',
                    strokeWidth: 3
                });

                this._id = DynamicObj.__id++;
                this._static = config.Static;

                this.Position = config.Position;
            }
            Object.defineProperty(DynamicObj.prototype, "Id", {
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(DynamicObj.prototype, "Mass", {
                get: function () {
                    return 2;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(DynamicObj.prototype, "Static", {
                get: function () {
                    return this._static;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(DynamicObj.prototype, "Radius", {
                get: function () {
                    return this.getRadius();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(DynamicObj.prototype, "Position", {
                get: function () {
                    return new PongTS.PhysicsEngine.Vector({
                        X: this.getX(),
                        Y: this.getY()
                    });
                },
                set: function (value) {
                    this.setX(value.X);
                    this.setY(value.Y);
                },
                enumerable: true,
                configurable: true
            });

            DynamicObj.__id = 0;
            return DynamicObj;
        })(Kinetic.Circle);
        Pong.DynamicObj = DynamicObj;
    })(PongTS.Pong || (PongTS.Pong = {}));
    var Pong = PongTS.Pong;
})(PongTS || (PongTS = {}));
//# sourceMappingURL=DynamicObj.js.map
