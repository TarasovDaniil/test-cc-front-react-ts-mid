export enum FilterOperator{
    AND = 'and',
    OR = 'or'
}

export interface SearchRule {
    key: string,
    search: any,
    rule: (dataVal: any, searchVal: any, object : Map<string, any>) => boolean
}
