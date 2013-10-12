/// <reference path="../../lib/kinetic.d.ts" />
/// <reference path="../PhysicsEngine/Vector.ts" />
/// <reference path="DynamicObj.ts" />

module PongTS { export module Pong  // PongTS.Pong namespace
{

    export interface IPaddleConfig
    {
        Position: PhysicsEngine.Vector;
    }

    export class Paddle extends DynamicObj
    {
        constructor(config: IPaddleConfig)
        {
            super({
                Position: config.Position,
                Radius: 150,
                Static: true
            });

            this.Velocity = new PhysicsEngine.Vector({ X: 0, Y: 0 });
        }
    }

}}