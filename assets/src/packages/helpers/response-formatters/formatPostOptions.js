export const formatPostOptions=(options)=>{
    console.log(options.publish)
    return {
        status:options.status,
        categories:options.selectedCategories,
        tags:options.selectedTags,
        comment_status:options.allowComments?'open':'close',
        ping_status:options.allowPinbacks?'open':'close',
        format:options.postFormat
    }
}   