export interface Mood {
    id: number | string;
    type : string;
    details: string | null | undefined;
    petId: number | string;
    userId: string;
}