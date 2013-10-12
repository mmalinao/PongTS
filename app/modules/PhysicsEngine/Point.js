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
//# sourceMappingURL=Point.js.map
