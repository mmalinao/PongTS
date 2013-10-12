/// <reference path="../../lib/kinetic.d.ts" />
/// <reference path="../PhysicsEngine/Vector.ts" />
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
        var Paddle = (function (_super) {
            __extends(Paddle, _super);
            function Paddle(config) {
                _super.call(this, {
                    Position: config.Position,
                    Radius: 150,
                    Static: true
                });

                this.Velocity = new PongTS.PhysicsEngine.Vector({ X: 0, Y: 0 });
            }
            return Paddle;
        })(Pong.DynamicObj);
        Pong.Paddle = Paddle;
    })(PongTS.Pong || (PongTS.Pong = {}));
    var Pong = PongTS.Pong;
})(PongTS || (PongTS = {}));
//# sourceMappingURL=Paddle.js.map
