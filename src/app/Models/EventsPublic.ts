import Institutions from "./Institutions";
import Multimedia from "./Multimedia";

export default interface EventsPublic{
    id:number;
    title: string;
    description: string;
    institution: Institutions;
    multimedia?: Multimedia[]
}