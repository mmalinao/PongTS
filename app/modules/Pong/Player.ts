/// <reference path="../PhysicsEngine/Point.ts" />
/// <reference path="../PhysicsEngine/Vector.ts" />
/// <reference path="Paddle.ts" />
/// <reference path="PongStage.ts" />
/// <reference path="../../lib/keyboardjs.d.ts" />

module PongTS { export module Pong
{
    
    export interface KeyCommands
    {
        Up: string;
        Down: string;
    }

    export class Player
    {


        private static Positions: Array<PhysicsEngine.IPoint> = [
            { X: -140, Y: PongStage.Height / 2 },
            { X: PongStage.Width + 140, Y: PongStage.Height / 2}
        ];

        private static Commands: Array<KeyCommands> = [
            { Up: 'q', Down: 'w' },
            { Up: ']', Down: '[' }
        ];

        private static __id: number = 0;

        constructor()
        {
            this._id = Player.__id++;
            
            this._paddle = new Paddle({
                Position: new PhysicsEngine.Vector(Player.Positions[this._id])
            });

            var self = this;
            KeyboardJS.on(Player.Commands[this._id].Up, function ()
            {
                var v: PhysicsEngine.Vector = self._paddle.Velocity;
                self._paddle.Velocity = v.Add({ X: 0, Y: -5 });
            });
            KeyboardJS.on(Player.Commands[this._id].Down, function ()
            {
                var v: PhysicsEngine.Vector = self._paddle.Velocity;
                self._paddle.Velocity = v.Add({ X: 0, Y: 5 });
            });

            this.Score = 10;
        }

        private _id: number;
        private _paddle: Paddle;

        public get Id(): number
        {
            return this._id;
        }

        public get Paddle(): Paddle
        {
            return this._paddle;
        }

        public Score: number;

        public MoveUp(keyEvent: Event, keysPressed: string[], keyCombo: string): void
        {
            var v: PhysicsEngine.Vector = this._paddle.Velocity;
            this._paddle.Velocity = v.Add({ X: 0, Y: -5 });
        }

        public MoveDown(keyEvent: Event, keysPressed: string[], keyCombo: string): void
        {
            var v: PhysicsEngine.Vector = this._paddle.Velocity;
            this._paddle.Velocity = v.Add({ X: 0, Y: 5 });
        }
    }

}}