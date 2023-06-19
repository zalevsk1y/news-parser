export const formatPostOptions=(options)=>{
    console.log(options.publish)
    return {
        status:options.status,
        post_category:options.selectedCategories,
        tags_input:options.selectedTags,
        comment_status:options.allowComments?'open':'close',
        ping_status:options.allowPinbacks?'open':'close',
        format:options.postFormat
    }
}   