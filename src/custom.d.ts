
type RecordItem={
    tags:string[]
    notes:string
    type:string
    amount:number
    createdAt?:string
    id:string
}
type Tag={
    id:string
    name:string
}

declare global{
    interface Window{  
    }
}


export default RecordItem 


