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
//# sourceMappingURL=Voronoi.js.map
