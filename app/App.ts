/// <reference path="lib/keyboardjs.d.ts" />
/// <reference path="lib/kinetic.d.ts" />

/// <reference path="modules/PhysicsEngine/Point.ts" />
/// <reference path="modules/PhysicsEngine/Shapes.ts" />

/// <reference path="modules/Pong/DynamicObj.ts" />
/// <reference path="modules/Pong/Ball.ts" />
/// <reference path="modules/Pong/Paddle.ts" />
/// <reference path="modules/Pong/Player.ts" />

/// <reference path="modules/Pong/PongStage.ts" />

module PongTS 
{
    export class App 
    {

        public static Stage: Kinetic.Stage;

        public static BallLayer: Kinetic.Layer;
        public static PaddleLayer: Kinetic.Layer;

        public static LogLayer: Kinetic.Layer;

        public static BallAnim: Kinetic.Animation;
        public static PaddleAnim: Kinetic.Animation;
        
        public static DynamicObjs: Array<Pong.DynamicObj>;
        public static Paddles: Array<Pong.Paddle>;
        public static Players: Array<Pong.Player>;

        public static Start(): void
        {
            App.Init();

            console.log("Starting app...");
            App.BallAnim.start();
            App.PaddleAnim.start();
        }

        private static Init(): void 
        {
            // -- Init Kinetic Core -------------
            console.log("Initializing Kinetic core...");

            App.Stage = new Pong.PongStage();

            App.BallLayer = new Kinetic.Layer();
            App.PaddleLayer = new Kinetic.Layer();
            App.LogLayer = new Kinetic.Layer();

            // -- Initial Ball ------------------
            App.DynamicObjs = new Array<Pong.DynamicObj>();
            var initialBall = new Pong.Ball({
                Position: new PhysicsEngine.Vector(PhysicsEngine.Point.CenterStage)
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

            KeyboardJS.on('space', App.NewBall); // test only
        }        

        private static InitBallAnim(): void
        {
            App.BallAnim = new Kinetic.Animation(function (frame)
            {

                var checked: PhysicsEngine.CollisionHash = new Object();
                var objs: Array<Pong.DynamicObj> = App.DynamicObjs;
                var i: number = objs.length - 1;

                do
                {
                    var obj: Pong.DynamicObj = objs[i];
                    var isStatic: boolean = obj.Static;

                    if (!isStatic)
                        PhysicsEngine.Collision.ResolveVsStageOptimized(obj);

                    var j: number = objs.length - 1;
                    do
                    {
                        var otherObj: Pong.DynamicObj = objs[j];

                        var objId: number = obj.Id;
                        var otherObjId: number = otherObj.Id;

                        if (objId == otherObjId)  // skip to next iteration if comparing to same ball
                            continue;

                        var hashA: string = objId + ':' + otherObjId;
                        var hashB: string = otherObjId + ':' + objId;
                        // hashChecks += 2;

                        if (checked[hashA] || checked[hashB])   // skip to next iteration if combination already checked
                            continue;

                        checked[hashA] = checked[hashB] = true;
                        // collisionTests += 1;

                        PhysicsEngine.Collision.ResolveVsBallOptimized(obj, otherObj);

                    } while (j--);

                    if (!isStatic)
                        objs[i].Position = obj.Position.Add(obj.Velocity);

                } while (i--);

            }, App.BallLayer);
        }

        private static InitPaddleAnim(): void
        {
            App.PaddleAnim = new Kinetic.Animation(function (frame)
            {
                var paddles: Array<Pong.Paddle> = App.Paddles;
                var i: number = paddles.length - 1;

                do
                {
                    var paddle: Pong.Paddle = paddles[i];
                    var pV: PhysicsEngine.Vector = paddle.Velocity;

                    if (pV.Magnitude() <= 0.0)
                        paddle.Velocity = pV.MultiplyScalar(0);
                    else
                    {
                        var pP: PhysicsEngine.Vector = paddle.Position;

                        paddle.Velocity = pV.MultiplyScalar(0.9);
                        paddle.Position = pP.Add(pV);
                    }
                    
                } while (i--);

            }, App.PaddleLayer);
        }

        private static InitPlayers(numPlayers: number): void
        {
            console.log("Creating players...");
            App.Players = new Array<Pong.Player>();
            App.Paddles = new Array<Pong.Paddle>();

            // Eventually handle multiple players online (up to five) through WebSockets
            // For now, just two players locally

            for (var i: number = 0; i < numPlayers; i++)
            {
                var player = new Pong.Player();
                App.Players.push(player);

                App.DynamicObjs.push(player.Paddle);
                App.Paddles.push(player.Paddle);
                App.PaddleLayer.add(player.Paddle);
            }

        }

        private static NewBall(keyEvent: Event, keysPressed: string[], keyCombo: string): void
        {
            var newBall = new Pong.Ball({
                Position: new PhysicsEngine.Vector(PhysicsEngine.Point.CenterStage)
            });
            App.DynamicObjs.push(newBall);
            App.BallLayer.add(newBall);
        }

        public static Log(message: string) : void 
        {
            var context = App.LogLayer.getContext();
            App.LogLayer.clear();
            context.font = '12pt Calibri';
            context.fillStyle = 'white';
            context.fillText(message, 10, 25);
        }

    }

}