/// <reference path="../../lib/kinetic.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PongTS;
(function (PongTS) {
    (function (Pong) {
        var PongStage = (function (_super) {
            __extends(PongStage, _super);
            function PongStage() {
                _super.call(this, {
                    container: PongStage.Container,
                    width: PongStage.Width,
                    height: PongStage.Height
                });
            }
            PongStage.Container = 'stage';
            PongStage.Width = 800;
            PongStage.Height = 400;
            return PongStage;
        })(Kinetic.Stage);
        Pong.PongStage = PongStage;
    })(PongTS.Pong || (PongTS.Pong = {}));
    var Pong = PongTS.Pong;
})(PongTS || (PongTS = {}));
/// <reference path="../Pong/PongStage.ts" />
var PongTS;
(function (PongTS) {
    (function (PhysicsEngine) {
        var Point = (function () {
            function Point(x, y) {
                this.X = x;
                this.Y = y;
            }
            Point.Origin = new Point(0, 0);

            Point.BottomLeftStage = new Point(0, PongTS.Pong.PongStage.Height);
            Point.BottomRightStage = new Point(PongTS.Pong.PongStage.Width, PongTS.Pong.PongStage.Height);
            Point.TopRightStage = new Point(PongTS.Pong.PongStage.Width, 0);

            Point.CenterStage = new Point(PongTS.Pong.PongStage.Width / 2, PongTS.Pong.PongStage.Height / 2);
            Point.LeftStage = new Point(30, PongTS.Pong.PongStage.Height / 2);
            Point.RightStage = new Point(PongTS.Pong.PongStage.Width - 30, PongTS.Pong.PongStage.Height / 2);
            return Point;
        })();
        PhysicsEngine.Point = Point;
    })(PongTS.PhysicsEngine || (PongTS.PhysicsEngine = {}));
    var PhysicsEngine = PongTS.PhysicsEngine;
})(PongTS || (PongTS = {}));
/// <reference path="../../lib/kinetic.d.ts" />
/// <reference path="Point.ts" />
var PongTS;
(function (PongTS) {
    (function (PhysicsEngine) {
        var Vector = (function () {
            function Vector(point) {
                this.X = point.X;
                this.Y = point.Y;
            }
            //#region Unary Operators
            Vector.prototype.Add = function (v2) {
                return new Vector({
                    X: this.X + v2.X,
                    Y: this.Y + v2.Y
                });
            };

            Vector.prototype.Subtract = function (v2) {
                return new Vector({
                    X: this.X - v2.X,
                    Y: this.Y - v2.Y
                });
            };

            Vector.prototype.Multiply = function (v2) {
                return new Vector({
                    X: this.X * v2.X,
                    Y: this.Y * v2.Y
                });
            };

            Vector.prototype.Divide = function (v2) {
                return new Vector({
                    X: this.X / v2.X,
                    Y: this.Y / v2.Y
                });
            };

            //#endregion
            //#region Scalar Operators
            Vector.prototype.AddScalar = function (scalar) {
                return new Vector({
                    X: this.X + scalar,
                    Y: this.Y + scalar
                });
            };

            Vector.prototype.SubtractScalar = function (scalar) {
                return new Vector({
                    X: this.X - scalar,
                    Y: this.Y - scalar
                });
            };

            Vector.prototype.MultiplyScalar = function (scalar) {
                return new Vector({
                    X: this.X * scalar,
                    Y: this.Y * scalar
                });
            };

            Vector.prototype.DivideScalar = function (scalar) {
                return new Vector({
                    X: this.X / scalar,
                    Y: this.Y / scalar
                });
            };

            //#endregion
            //#region Vector Operators
            Vector.prototype.Magnitude = function () {
                return Math.sqrt(this.X * this.X + this.Y * this.Y);
            };

            Vector.prototype.SquaredMagnitude = function () {
                return this.X * this.X + this.Y * this.Y;
            };

            Vector.prototype.Unit = function () {
                return this.DivideScalar(this.Magnitude());
            };

            Vector.prototype.Dot = function (v2) {
                return this.X * v2.X + this.Y * v2.Y;
            };

            Vector.prototype.ProjectOnto = function (v2) {
                var dm = this.Dot(v2) / v2.Magnitude();

                return new Vector({
                    X: dm * v2.X,
                    Y: dm * v2.Y
                });
            };

            Vector.prototype.RightHandNormal = function () {
                return new Vector({
                    X: -this.Y,
                    Y: this.X
                });
            };

            Vector.prototype.LeftHandNormal = function () {
                return new Vector({
                    X: this.Y,
                    Y: -this.X
                });
            };

            //public Cross(v2: IPoint): IPoint
            //{
            //}
            Vector.prototype.RotateRight90 = function () {
                return new Vector({
                    X: -this.Y,
                    Y: this.X
                });
            };

            Vector.prototype.RotateLeft90 = function () {
                return new Vector({
                    X: this.Y,
                    Y: -this.X
                });
            };

            Vector.prototype.Rotate = function (angle) {
                return new Vector({
                    X: this.X * Math.cos(angle) - this.Y * Math.sin(angle),
                    Y: this.X * Math.sin(angle) + this.Y * Math.cos(angle)
                });
            };

            Vector.prototype.Angle = function () {
                return Math.atan2(this.Y, this.X);
            };

            Vector.uNorth = new Vector({ X: 0, Y: -1 });
            Vector.uSouth = new Vector({ X: 0, Y: 1 });
            Vector.uEast = new Vector({ X: 1, Y: 0 });
            Vector.uWest = new Vector({ X: -1, Y: 0 });
            return Vector;
        })();
        PhysicsEngine.Vector = Vector;
    })(PongTS.PhysicsEngine || (PongTS.PhysicsEngine = {}));
    var PhysicsEngine = PongTS.PhysicsEngine;
})(PongTS || (PongTS = {}));
/// <reference path="../../lib/kinetic.d.ts" />
/// <reference path="../PhysicsEngine/Shapes.ts" />
/// <reference path="../PhysicsEngine/Vector.ts" />
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
/// <reference path="Point.ts" />
/// <reference path="../Pong/PongStage.ts" />
var PongTS;
(function (PongTS) {
    (function (PhysicsEngine) {
        var Random = (function () {
            function Random() {
            }
            Object.defineProperty(Random, "RandomX", {
                get: function () {
                    return Random.RandomStageX * Random.RandomNegative;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Random, "RandomStageX", {
                get: function () {
                    return Math.random() * PongTS.Pong.PongStage.Width;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Random, "RandomY", {
                get: function () {
                    return Random.RandomStageY * Random.RandomNegative;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Random, "RandomStageY", {
                get: function () {
                    return Math.random() * PongTS.Pong.PongStage.Height;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Random, "RandomPoint", {
                get: function () {
                    return new PhysicsEngine.Point(Random.RandomStageX * Random.RandomNegative, Random.RandomStageY * Random.RandomNegative);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Random, "RandomStagePoint", {
                get: function () {
                    return new PhysicsEngine.Point(Random.RandomStageX, Random.RandomStageY);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Random, "RandomNegative", {
                get: function () {
                    return Math.round(Math.random()) * 2 - 1;
                },
                enumerable: true,
                configurable: true
            });
            return Random;
        })();
        PhysicsEngine.Random = Random;
    })(PongTS.PhysicsEngine || (PongTS.PhysicsEngine = {}));
    var PhysicsEngine = PongTS.PhysicsEngine;
})(PongTS || (PongTS = {}));
/// <reference path="../../lib/kinetic.d.ts" />
/// <reference path="../PhysicsEngine/Vector.ts" />
/// <reference path="../PhysicsEngine/Random.ts" />
/// <reference path="DynamicObj.ts" />
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
/// <reference path="../../lib/kinetic.d.ts" />
/// <reference path="../PhysicsEngine/Vector.ts" />
/// <reference path="DynamicObj.ts" />
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
var PongTS;
(function (PongTS) {
    (function (PhysicsEngine) {
        (function (VoronoiOffsetX) {
            VoronoiOffsetX[VoronoiOffsetX["CurrentCell"] = 0] = "CurrentCell";
            VoronoiOffsetX[VoronoiOffsetX["LeftSide"] = -1] = "LeftSide";
            VoronoiOffsetX[VoronoiOffsetX["RightSide"] = 1] = "RightSide";
        })(PhysicsEngine.VoronoiOffsetX || (PhysicsEngine.VoronoiOffsetX = {}));
        var VoronoiOffsetX = PhysicsEngine.VoronoiOffsetX;

        (function (VoronoiOffsetY) {
            VoronoiOffsetY[VoronoiOffsetY["CurrentCell"] = 0] = "CurrentCell";
            VoronoiOffsetY[VoronoiOffsetY["TopSide"] = -1] = "TopSide";
            VoronoiOffsetY[VoronoiOffsetY["BottomSide"] = 1] = "BottomSide";
        })(PhysicsEngine.VoronoiOffsetY || (PhysicsEngine.VoronoiOffsetY = {}));
        var VoronoiOffsetY = PhysicsEngine.VoronoiOffsetY;

        var VoronoiOffset = (function () {
            function VoronoiOffset() {
                this.OffsetX = VoronoiOffsetX.CurrentCell;
                this.OffsetY = VoronoiOffsetY.CurrentCell;
            }
            return VoronoiOffset;
        })();
        PhysicsEngine.VoronoiOffset = VoronoiOffset;
    })(PongTS.PhysicsEngine || (PongTS.PhysicsEngine = {}));
    var PhysicsEngine = PongTS.PhysicsEngine;
})(PongTS || (PongTS = {}));
/// <reference path="../Pong/PongStage.ts" />
/// <reference path="Voronoi.ts" />
/// <reference path="Point.ts" />
var PongTS;
(function (PongTS) {
    (function (PhysicsEngine) {
        (function (CollisionType) {
            CollisionType[CollisionType["None"] = 0] = "None";
            CollisionType[CollisionType["Axis"] = 1] = "Axis";
            CollisionType[CollisionType["Other"] = 2] = "Other";
        })(PhysicsEngine.CollisionType || (PhysicsEngine.CollisionType = {}));
        var CollisionType = PhysicsEngine.CollisionType;

        var Collision = (function () {
            function Collision() {
            }
            Collision.ResolveVsStageOptimized = function (ball) {
                var x = ball.Position.X;
                var y = ball.Position.Y;
                var r = ball.Radius;

                // Detect collision vs x-bounds
                var px = Collision.XMIN - (x - r);
                if (px > 0)
                    Collision.ResolveOptimized(ball, PhysicsEngine.Vector.uEast);
else {
                    px = (x + r) - Collision.XMAX;
                    if (px > 0)
                        Collision.ResolveOptimized(ball, PhysicsEngine.Vector.uWest);
                }

                // Detect collision vs y-bounds
                var py = Collision.YMIN - (y - r);
                if (py > 0)
                    Collision.ResolveOptimized(ball, PhysicsEngine.Vector.uSouth);
else {
                    py = (y + r) - Collision.YMAX;
                    if (py > 0)
                        Collision.ResolveOptimized(ball, PhysicsEngine.Vector.uNorth);
                }
            };

            Collision.ResolveVsBallOptimized = function (a, b) {
                // Calculate translational vector, which is normal
                var normal = b.Position.Subtract(a.Position);

                // Saving as local variable (optimization)
                var aR = a.Radius;
                var aP = a.Position;

                var distance_squared = normal.SquaredMagnitude();
                var radius = aR + b.Radius;
                radius *= radius;

                if (distance_squared >= radius)
                    return;

                var distance = Math.sqrt(distance_squared);

                var penetration;
                var contact;

                if (distance == 0.0) {
                    penetration = aR;
                    normal = PhysicsEngine.Vector.uEast;
                    contact = aP;
                } else {
                    penetration = radius - distance;
                    normal = normal.DivideScalar(distance);
                    contact = normal.MultiplyScalar(aR).Add(aP);
                }

                var aV = a.Velocity;
                var bV = b.Velocity;

                var relative = bV.Subtract(aV);
                var velAlongNormal = relative.Dot(normal);

                if (velAlongNormal > 0)
                    return;

                var aL = aV.Dot(normal);
                var bL = bV.Dot(normal);

                var aM = a.Mass;
                var bM = b.Mass;

                var impulse = (2 * (aL - bL)) / (aM + bM);

                var aS = a.Static;
                var bS = b.Static;

                if (!aS && !bS) {
                    a.Velocity = aV.Subtract(normal.MultiplyScalar(impulse * aM));
                    b.Velocity = bV.Add(normal.MultiplyScalar(impulse * bM));
                } else if (aS && !bS) {
                    Collision.ResolveOptimized(b, normal);
                } else if (!aS && bS) {
                    Collision.ResolveOptimized(a, normal.MultiplyScalar(-1));
                }
                //if (!a.Static)
                //    a.Velocity = aV.Subtract(normal.MultiplyScalar(impulse * aM));
                //if (!b.Static)
                //    b.Velocity = bV.Add(normal.MultiplyScalar(impulse * bM));
            };

            Collision.ResolveOptimized = function (circle, normal) {
                var c = circle;
                var cV = c.Velocity;

                // Project velocity onto collision normal
                var velocityN = cV.ProjectOnto(normal);
                var velocityT = cV.Subtract(velocityN);

                // Set referenced object's velocity
                circle.Velocity = velocityT.Subtract(velocityN);
            };
            Collision.XMIN = 0;
            Collision.XMAX = PongTS.Pong.PongStage.Width;
            Collision.YMIN = 0;
            Collision.YMAX = PongTS.Pong.PongStage.Height;
            return Collision;
        })();
        PhysicsEngine.Collision = Collision;
    })(PongTS.PhysicsEngine || (PongTS.PhysicsEngine = {}));
    var PhysicsEngine = PongTS.PhysicsEngine;
})(PongTS || (PongTS = {}));
