export interface ProjectTask {
    id: number,
    start_date: string,
    end_date: string,
    text: string,
    progress: number,
    duration: number,
    parent: number,
    $index: number,
}