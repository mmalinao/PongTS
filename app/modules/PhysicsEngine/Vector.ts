/// <reference path="Point.ts" />

module PongTS { export module PhysicsEngine
{
    export class Vector implements IPoint
    {
        public X: number;
        public Y: number;

        constructor(point: IPoint)
        {
            this.X = point.X;
            this.Y = point.Y;
        }

        //#region Unary Operators

        public Add(v2: IPoint): Vector
        {
            return new Vector({
                X: this.X + v2.X,
                Y: this.Y + v2.Y
            });
        }

        public Subtract(v2: IPoint): Vector
        {
            return new Vector({
                X: this.X - v2.X,
                Y: this.Y - v2.Y
            });
        }

        public Multiply(v2: IPoint): Vector
        {
            return new Vector({
                X: this.X * v2.X,
                Y: this.Y * v2.Y
            });
        }

        public Divide(v2: IPoint): Vector
        {
            return new Vector({
                X: this.X / v2.X,
                Y: this.Y / v2.Y
            });
        }

        //#endregion

        //#region Scalar Operators

        public AddScalar(scalar: number): Vector
        {
            return new Vector({
                X: this.X + scalar,
                Y: this.Y + scalar
            });
        }
        
        public SubtractScalar(scalar: number): Vector
        {
            return new Vector({
                X: this.X - scalar,
                Y: this.Y - scalar
            });
        }

        public MultiplyScalar(scalar: number): Vector
        {
            return new Vector({
                X: this.X * scalar,
                Y: this.Y * scalar
            });
        }

        public DivideScalar(scalar: number): Vector
        {
            return new Vector({
                X: this.X / scalar,
                Y: this.Y / scalar
            });
        }

        //#endregion 

        //#region Vector Operators

        public Magnitude(): number
        {
            return Math.sqrt(this.X * this.X + this.Y * this.Y);
        }

        public SquaredMagnitude(): number
        {
            return this.X * this.X + this.Y * this.Y;
        }

        public Unit(): Vector
        {
            return this.DivideScalar(this.Magnitude());
        }

        public Dot(v2: IPoint): number
        {
            return this.X * v2.X + this.Y * v2.Y;
        }

        public ProjectOnto(v2: Vector): Vector
        {
            var dm = this.Dot(v2) / v2.Magnitude();

            return new Vector({
                X: dm * v2.X,
                Y: dm * v2.Y
            });
        }

        public RightHandNormal(): Vector
        {
            return new Vector({
                X: -this.Y,
                Y: this.X
            });
        }

        public LeftHandNormal(): Vector
        {
            return new Vector({
                X: this.Y,
                Y: -this.X
            });
        }
        

        //public Cross(v2: IPoint): IPoint
        //{

        //}

        public RotateRight90(): Vector
        {
            return new Vector({
                X: -this.Y,
                Y: this.X
            });
        }

        public RotateLeft90(): Vector
        {
            return new Vector({
                X: this.Y,
                Y: -this.X
            });
        }

        public Rotate(angle: number): Vector
        {
            return new Vector({
                X: this.X * Math.cos(angle) - this.Y * Math.sin(angle),
                Y: this.X * Math.sin(angle) + this.Y * Math.cos(angle)
            });
        }
        
        public Angle(): number
        {
            return Math.atan2(this.Y, this.X);
        }

        //#endregion

        //#region Special Unit Vectors (Note: Origin located top-left corner of stage)

        public static uNorth = new Vector({ X: 0, Y: -1 });
        public static uSouth = new Vector({ X: 0, Y: 1 });
        public static uEast = new Vector({ X: 1, Y: 0 });
        public static uWest = new Vector({ X: -1, Y: 0 });

        //#endregion

    }

}}