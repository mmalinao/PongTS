/// <reference path="Point.ts" />
/// <reference path="../Pong/PongStage.ts" />

module PongTS { export module PhysicsEngine 
{
    export class Random
    {
        public static get RandomX(): number
        {
            return Random.RandomStageX * Random.RandomNegative;
        }

        public static get RandomStageX(): number
        {
            return Math.random() * Pong.PongStage.Width;
        }

        public static get RandomY(): number
        {
            return Random.RandomStageY * Random.RandomNegative;
        }

        public static get RandomStageY(): number
        {
            return Math.random() * Pong.PongStage.Height;
        }        

        public static get RandomPoint(): Point
        {
            return new Point(Random.RandomStageX * Random.RandomNegative, Random.RandomStageY * Random.RandomNegative);
        }

        public static get RandomStagePoint(): Point
        {
            return new Point(Random.RandomStageX, Random.RandomStageY);
        }

        public static get RandomNegative(): number
        {
            return Math.round(Math.random()) * 2 - 1;
        }
        
    }

}}