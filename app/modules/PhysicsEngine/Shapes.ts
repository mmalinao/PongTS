/// <reference path="../../lib/kinetic.d.ts" />

module PongTS { export module PhysicsEngine 
{

    export interface IShape
    {
        Id: number;
        Position: Vector;
        Velocity: Vector;
        Mass: number;
        Static: boolean;    // If Velocity can be affected by other objects
    }

    export interface IAABB extends IShape
    {
        Min: Vector;
        Max: Vector;
    }

    export interface ICircle extends IShape
    {
        Radius: number;
    }

}}