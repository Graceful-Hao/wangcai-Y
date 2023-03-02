type RootState = {
    recordList: RecordItem[],
    createTagError: Error | null,
    tagList: Tag[],
    currentTag?: Tag,
}
type RecordItem = {
    tags: string[],
    notes: string,
    type: string,
    amount: number,
    timeAt?: string
}

type Tag = {
    id: string
    name: string
}
type TagListModel = {
    data: Tag[]
    fetch: () => Tag[]
    create: (name: string) => 'success' | 'duplicated'
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
    remove: (id: string) => boolean
    save: () => void
}

interface Window {
}