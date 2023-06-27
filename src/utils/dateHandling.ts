export const formatDateShort = (input: Date) => {
    if (!input) {
        return ''
    }

    console.log(input)

    const options = { hour12: false }
    const date = new Date(input)
    const dateString = `${date.toLocaleDateString(undefined, options)}`
    return dateString
}
