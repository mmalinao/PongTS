/// <reference path="lib/keyboardjs.d.ts" />
/// <reference path="lib/kinetic.d.ts" />
/// <reference path="modules/PhysicsEngine/Point.ts" />
/// <reference path="modules/PhysicsEngine/Shapes.ts" />
/// <reference path="modules/Pong/DynamicObj.ts" />
/// <reference path="modules/Pong/Ball.ts" />
/// <reference path="modules/Pong/Paddle.ts" />
/// <reference path="modules/Pong/Player.ts" />
/// <reference path="modules/Pong/PongStage.ts" />
var PongTS;
(function (PongTS) {
    var App = (function () {
        function App() {
        }
        App.Start = function () {
            App.Init();

            console.log("Starting app...");
            App.BallAnim.start();
            App.PaddleAnim.start();
        };

        App.Init = function () {
            // -- Init Kinetic Core -------------
            console.log("Initializing Kinetic core...");

            App.Stage = new PongTS.Pong.PongStage();

            App.BallLayer = new Kinetic.Layer();
            App.PaddleLayer = new Kinetic.Layer();
            App.LogLayer = new Kinetic.Layer();

            // -- Initial Ball ------------------
            App.DynamicObjs = new Array();
            var initialBall = new PongTS.Pong.Ball({
                Position: new PongTS.PhysicsEngine.Vector(PongTS.PhysicsEngine.Point.CenterStage)
            });
            App.DynamicObjs.push(initialBall);
            App.BallLayer.add(initialBall);

            // -- Init Players ------------------
            App.InitPlayers(2);

            // -- Add layers to Stage
            App.Stage.add(App.BallLayer);
            App.Stage.add(App.PaddleLayer);
            App.Stage.add(App.LogLayer);

            // -- Init Animation Loops
            App.InitBallAnim();
            App.InitPaddleAnim();

            KeyboardJS.on('space', App.NewBall);
        };

        App.InitBallAnim = function () {
            App.BallAnim = new Kinetic.Animation(function (frame) {
                var checked = new Object();
                var objs = App.DynamicObjs;
                var i = objs.length - 1;

                do {
                    var obj = objs[i];
                    var isStatic = obj.Static;

                    if (!isStatic)
                        PongTS.PhysicsEngine.Collision.ResolveVsStageOptimized(obj);

                    var j = objs.length - 1;
                    do {
                        var otherObj = objs[j];

                        var objId = obj.Id;
                        var otherObjId = otherObj.Id;

                        if (objId == otherObjId)
                            continue;

                        var hashA = objId + ':' + otherObjId;
                        var hashB = otherObjId + ':' + objId;

                        if (checked[hashA] || checked[hashB])
                            continue;

                        checked[hashA] = checked[hashB] = true;

                        // collisionTests += 1;
                        PongTS.PhysicsEngine.Collision.ResolveVsBallOptimized(obj, otherObj);
                    } while(j--);

                    if (!isStatic)
                        objs[i].Position = obj.Position.Add(obj.Velocity);
                } while(i--);
            }, App.BallLayer);
        };

        App.InitPaddleAnim = function () {
            App.PaddleAnim = new Kinetic.Animation(function (frame) {
                var paddles = App.Paddles;
                var i = paddles.length - 1;

                do {
                    var paddle = paddles[i];
                    var pV = paddle.Velocity;

                    if (pV.Magnitude() <= 0.0)
                        paddle.Velocity = pV.MultiplyScalar(0);
else {
                        var pP = paddle.Position;

                        paddle.Velocity = pV.MultiplyScalar(0.9);
                        paddle.Position = pP.Add(pV);
                    }
                } while(i--);
            }, App.PaddleLayer);
        };

        App.InitPlayers = function (numPlayers) {
            console.log("Creating players...");
            App.Players = new Array();
            App.Paddles = new Array();

            for (var i = 0; i < numPlayers; i++) {
                var player = new PongTS.Pong.Player();
                App.Players.push(player);

                App.DynamicObjs.push(player.Paddle);
                App.Paddles.push(player.Paddle);
                App.PaddleLayer.add(player.Paddle);
            }
        };

        App.NewBall = function (keyEvent, keysPressed, keyCombo) {
            var newBall = new PongTS.Pong.Ball({
                Position: new PongTS.PhysicsEngine.Vector(PongTS.PhysicsEngine.Point.CenterStage)
            });
            App.DynamicObjs.push(newBall);
            App.BallLayer.add(newBall);
        };

        App.Log = function (message) {
            var context = App.LogLayer.getContext();
            App.LogLayer.clear();
            context.font = '12pt Calibri';
            context.fillStyle = 'white';
            context.fillText(message, 10, 25);
        };
        return App;
    })();
    PongTS.App = App;
})(PongTS || (PongTS = {}));
//# sourceMappingURL=App.js.map
