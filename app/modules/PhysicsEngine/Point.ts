/// <reference path="../Pong/PongStage.ts" />

module PongTS { export module PhysicsEngine
{
    export interface IPoint
    {
        X: number;
        Y: number;                
    }

    export class Point implements IPoint
    {
        public X: number;
        public Y: number;

        constructor(x: number, y: number)
        {
            this.X = x;
            this.Y = y;
        }

        //#region Special Points

        public static Origin = new Point(0, 0);

        public static BottomLeftStage = new Point(0, Pong.PongStage.Height);
        public static BottomRightStage = new Point(Pong.PongStage.Width, Pong.PongStage.Height);
        public static TopRightStage = new Point(Pong.PongStage.Width, 0);        

        public static CenterStage = new Point(Pong.PongStage.Width / 2, Pong.PongStage.Height / 2);
        public static LeftStage = new Point(30, Pong.PongStage.Height / 2);
        public static RightStage = new Point(Pong.PongStage.Width - 30, Pong.PongStage.Height / 2);

        //#endregion
        
    }

}}