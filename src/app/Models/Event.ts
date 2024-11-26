import Multimedia from "./Multimedia";

export default interface Event {
    id?: number;
    title: string;
    description: string;
    institution_id: number;
    multimedia?: Multimedia
}