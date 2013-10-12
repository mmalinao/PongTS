/// <reference path="../PhysicsEngine/Point.ts" />
/// <reference path="../PhysicsEngine/Vector.ts" />
/// <reference path="Paddle.ts" />
/// <reference path="PongStage.ts" />
/// <reference path="../../lib/keyboardjs.d.ts" />
var PongTS;
(function (PongTS) {
    (function (Pong) {
        var Player = (function () {
            function Player() {
                this._id = Player.__id++;

                this._paddle = new Pong.Paddle({
                    Position: new PongTS.PhysicsEngine.Vector(Player.Positions[this._id])
                });

                var self = this;
                KeyboardJS.on(Player.Commands[this._id].Up, function () {
                    var v = self._paddle.Velocity;
                    self._paddle.Velocity = v.Add({ X: 0, Y: -5 });
                });
                KeyboardJS.on(Player.Commands[this._id].Down, function () {
                    var v = self._paddle.Velocity;
                    self._paddle.Velocity = v.Add({ X: 0, Y: 5 });
                });

                this.Score = 10;
            }
            Object.defineProperty(Player.prototype, "Id", {
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Player.prototype, "Paddle", {
                get: function () {
                    return this._paddle;
                },
                enumerable: true,
                configurable: true
            });

            Player.prototype.MoveUp = function (keyEvent, keysPressed, keyCombo) {
                var v = this._paddle.Velocity;
                this._paddle.Velocity = v.Add({ X: 0, Y: -5 });
            };

            Player.prototype.MoveDown = function (keyEvent, keysPressed, keyCombo) {
                var v = this._paddle.Velocity;
                this._paddle.Velocity = v.Add({ X: 0, Y: 5 });
            };
            Player.Positions = [
                { X: -140, Y: Pong.PongStage.Height / 2 },
                { X: Pong.PongStage.Width + 140, Y: Pong.PongStage.Height / 2 }
            ];

            Player.Commands = [
                { Up: 'q', Down: 'w' },
                { Up: ']', Down: '[' }
            ];

            Player.__id = 0;
            return Player;
        })();
        Pong.Player = Player;
    })(PongTS.Pong || (PongTS.Pong = {}));
    var Pong = PongTS.Pong;
})(PongTS || (PongTS = {}));
//# sourceMappingURL=Player.js.map
