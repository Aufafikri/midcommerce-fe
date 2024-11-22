export const trunCateText = (text: string, maxLength: number): string | undefined => {
    if(text.length <= maxLength) {
        return text
    }
    return text.substring(0, maxLength) + "...";
}