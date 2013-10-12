/// <reference path="../../lib/kinetic.d.ts" />
/// <reference path="../PhysicsEngine/Vector.ts" />
/// <reference path="../PhysicsEngine/Random.ts" />
/// <reference path="DynamicObj.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PongTS;
(function (PongTS) {
    (function (Pong) {
        var Ball = (function (_super) {
            __extends(Ball, _super);
            function Ball(config) {
                _super.call(this, {
                    Position: config.Position,
                    Radius: 10,
                    Static: false
                });

                if (config.Velocity != undefined)
                    this.Velocity = config.Velocity;
else {
                    var v = new PongTS.PhysicsEngine.Vector(PongTS.PhysicsEngine.Random.RandomPoint);
                    this.Velocity = v.Unit().MultiplyScalar(3);
                }
            }
            return Ball;
        })(Pong.DynamicObj);
        Pong.Ball = Ball;
    })(PongTS.Pong || (PongTS.Pong = {}));
    var Pong = PongTS.Pong;
})(PongTS || (PongTS = {}));
//# sourceMappingURL=Ball.js.map
