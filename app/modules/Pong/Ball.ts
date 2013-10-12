/// <reference path="../../lib/kinetic.d.ts" />
/// <reference path="../PhysicsEngine/Vector.ts" />
/// <reference path="../PhysicsEngine/Random.ts" />
/// <reference path="DynamicObj.ts" />

module PongTS { export module Pong
{
    export interface IBallConfig
    {
        Position: PhysicsEngine.Vector;
        Velocity?: PhysicsEngine.Vector;
    }

    export class Ball extends DynamicObj
    {

        constructor(config: IBallConfig)
        {
            super({
                Position: config.Position,
                Radius: 10,
                Static: false
            });

            if (config.Velocity != undefined)
                this.Velocity = config.Velocity;
            else
            {
                var v = new PhysicsEngine.Vector(PhysicsEngine.Random.RandomPoint); // random initial velocity
                this.Velocity = v.Unit().MultiplyScalar(3);
            }
        }



    }

}}