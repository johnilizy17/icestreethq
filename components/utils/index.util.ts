export  function convertToNumber(text: string): number{
    // remove all commas
    if(typeof text === "string"){
        text = text?.replace(/\,/g, "")
    }

    return Math.round(parseInt(text))
}

export function isLessThanOrEqualOne(value: number){
    return value <= 1
}

export const convertToLowerSnakeCase = (text: string) => {
    return text?.replaceAll(' ', '_').toLowerCase()
}

export function getSingularOrPlural(value: number){
    return isLessThanOrEqualOne(value) ? "" : "s"
}
