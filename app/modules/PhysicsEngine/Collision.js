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
//# sourceMappingURL=Collision.js.map
