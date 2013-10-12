/// <reference path="../../lib/kinetic.d.ts" />
/// <reference path="../PhysicsEngine/Shapes.ts" />
/// <reference path="../PhysicsEngine/Vector.ts" />

module PongTS { export module Pong
{

    export interface IDynamicObjConfig
    {
        Position: PhysicsEngine.Vector;
        Radius: number;
        Static: boolean;
    }

    export class DynamicObj extends Kinetic.Circle implements PhysicsEngine.ICircle
    {
        private static __id: number = 0;

        private _id: number;
        private _static: boolean;

        constructor(config: IDynamicObjConfig)
        {
            super({
                x: config.Position.X,
                y: config.Position.Y,
                radius: config.Radius,
                stroke: 'white',
                strokeWidth: 3
            });

            this._id = DynamicObj.__id++;
            this._static = config.Static;

            this.Position = config.Position;
        }

        public get Id(): number
        {
            return this._id;
        }

        public get Mass(): number
        {
            return 2; // temporary all Dynamic Objs have same mass
        }

        public get Static(): boolean
        {
            return this._static;
        }

        public get Radius(): number
        {
            return this.getRadius();
        }

        public get Position(): PhysicsEngine.Vector
        {
            return new PhysicsEngine.Vector({
                X: this.getX(),
                Y: this.getY()
            });
        }

        public set Position(value: PhysicsEngine.Vector)
        {
            this.setX(value.X);
            this.setY(value.Y);
        }

        public Velocity: PhysicsEngine.Vector;
    }

}}