export const formatPostOptions=(options)=>{
    console.log(options.publish)
    return {
        status:options.status,
        categories:options.selectedCategories,
        tags:options.selectedTags,
        date:options.publish.date==false?(new Date(Date.now())).toISOString():(new Date(options.publish.date)).toISOString(),
        comment_status:options.allowComments?'open':'close',
        ping_status:options.allowPinbacks?'open':'close',
        format:options.postFormat
    }
}   