export interface Pageable<type> {
    current_page: number;
    data: type;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Links[];
    next_page_url:string;
    per_page: number;
    prev_page_url: number;
    to: number
    total: number;
}

export interface Links {
    url: string;
    label: string;
    active: boolean;
}