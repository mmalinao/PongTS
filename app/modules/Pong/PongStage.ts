/// <reference path="../../lib/kinetic.d.ts" />

module PongTS { export module Pong
{
    export class PongStage extends Kinetic.Stage
    {
        public static Container: string = 'stage';
        public static Width: number = 800;
        public static Height: number = 400;

        constructor()
        {
            super({
                container: PongStage.Container,
                width: PongStage.Width,
                height: PongStage.Height
            });
        }
    }
}}