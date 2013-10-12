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
//# sourceMappingURL=Vector.js.map
