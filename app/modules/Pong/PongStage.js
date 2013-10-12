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
//# sourceMappingURL=PongStage.js.map
