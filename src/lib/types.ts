import { Vex } from "vexflow";

const VF = Vex.Flow;
const { Note } = VF;

export type NoteType = InstanceType<typeof Note>;


export type Chord = {
    keys: string[];
    duration: string;
    staveNotes?: NoteType | null;
    userClickY?: number;
    sharpIndexArray?: number[];
    flatIndexArray?: number[] | [];
};