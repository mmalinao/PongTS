module PongTS { export module PhysicsEngine
{

    export enum VoronoiOffsetX
    {
        CurrentCell = 0,
        LeftSide = -1,
        RightSide = 1
    }

    export enum VoronoiOffsetY
    {
        CurrentCell = 0,
        TopSide = -1,
        BottomSide = 1
    }

    export interface IVoronoiOffset
    {
        OffsetX: VoronoiOffsetX;
        OffsetY: VoronoiOffsetY;
    }

    export class VoronoiOffset implements IVoronoiOffset
    {
        public OffsetX: VoronoiOffsetX;
        public OffsetY: VoronoiOffsetY;

        constructor()
        {
            this.OffsetX = VoronoiOffsetX.CurrentCell;
            this.OffsetY = VoronoiOffsetY.CurrentCell;
        }
    }

}}