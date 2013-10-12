/// <reference path="../Pong/PongStage.ts" />
/// <reference path="Voronoi.ts" />
/// <reference path="Point.ts" />

module PongTS { export module PhysicsEngine
{
    
    export interface CollisionHash
    {
        [hash: string]: boolean;    // ex. { 'A:B': true, 'B:C': false }
    }

    export enum CollisionType
    {
        None = 0,
        Axis = 1,
        Other = 2
    }    

    export class Collision
    {
        constructor()
        {
        }

        private static XMIN = 0;
        private static XMAX = Pong.PongStage.Width;
        private static YMIN = 0;
        private static YMAX = Pong.PongStage.Height;
        
        public static ResolveVsStageOptimized(ball: ICircle): void
        {
            var x: number = ball.Position.X;
            var y: number = ball.Position.Y;
            var r: number = ball.Radius;

            // Detect collision vs x-bounds
            var px = Collision.XMIN - (x - r);
            if (px > 0)         // colliding with left border
                Collision.ResolveOptimized(ball, Vector.uEast);
            else
            {
                px = (x + r) - Collision.XMAX;
                if (px > 0)     // colliding with right border
                    Collision.ResolveOptimized(ball, Vector.uWest);
            }
            // Detect collision vs y-bounds
            var py = Collision.YMIN - (y - r);
            if (py > 0)         // colliding with top border
                Collision.ResolveOptimized(ball, Vector.uSouth);
            else
            {
                py = (y + r) - Collision.YMAX;
                if (py > 0)     // colliding with bottom border
                    Collision.ResolveOptimized(ball, Vector.uNorth);
            }
        }

        public static ResolveVsBallOptimized(a: ICircle, b: ICircle): void
        {
            // Calculate translational vector, which is normal
            var normal: Vector = b.Position.Subtract(a.Position);

            // Saving as local variable (optimization)
            var aR: number = a.Radius;
            var aP: Vector = a.Position;

            var distance_squared: number = normal.SquaredMagnitude();
            var radius: number = aR + b.Radius; radius *= radius;

            // No collision has occured, early out
            if (distance_squared >= radius)
                return;

            var distance = Math.sqrt(distance_squared);

            var penetration: number;
            var contact: Vector;

            if (distance == 0.0)    // Circles are on same position, avoid divide by zero
            {
                penetration = aR;
                normal = Vector.uEast;
                contact = aP;
            }
            else
            {
                penetration = radius - distance;
                normal = normal.DivideScalar(distance);
                contact = normal.MultiplyScalar(aR).Add(aP);
            }

            var aV: Vector = a.Velocity;
            var bV: Vector = b.Velocity;

            var relative: Vector = bV.Subtract(aV);
            var velAlongNormal: number = relative.Dot(normal);

            // Only resolve if balls heading toward each other, early out
            if (velAlongNormal > 0)
                return;

            var aL: number = aV.Dot(normal);
            var bL: number = bV.Dot(normal);

            var aM: number = a.Mass;
            var bM: number = b.Mass;

            var impulse: number = (2 * (aL - bL)) / (aM + bM);

            var aS = a.Static;
            var bS = b.Static;

            if (!aS && !bS)         // both dynamic
            {
                a.Velocity = aV.Subtract(normal.MultiplyScalar(impulse * aM));
                b.Velocity = bV.Add(normal.MultiplyScalar(impulse * bM));
            }
            else if (aS && !bS)     // 'a' is static and 'b' is dynamic; update 'b'
            {
                Collision.ResolveOptimized(b, normal);
            }
            else if (!aS && bS)     // 'a' is dynamic and 'b' is static; update 'a'
            {
                Collision.ResolveOptimized(a, normal.MultiplyScalar(-1));
            }
            
            //if (!a.Static)
            //    a.Velocity = aV.Subtract(normal.MultiplyScalar(impulse * aM));
            //if (!b.Static)
            //    b.Velocity = bV.Add(normal.MultiplyScalar(impulse * bM));
        }

        private static ResolveOptimized(circle: ICircle, normal: Vector): void
        {
            var c: ICircle = circle;
            var cV: Vector = c.Velocity;

            // Project velocity onto collision normal
            var velocityN = cV.ProjectOnto(normal);
            var velocityT = cV.Subtract(velocityN);
            // Set referenced object's velocity
            circle.Velocity = velocityT.Subtract(velocityN);
        }
    }

}}