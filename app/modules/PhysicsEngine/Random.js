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
//# sourceMappingURL=Random.js.map
