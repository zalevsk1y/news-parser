 
export const PostCardImage = ({ link, image, className, alt }) => {
    return (
        <div className="post-image-wrapper">
            <a className="img-post-link" href={link}>
            <img className={className||'image-news-parser'} src={image} alt={alt||'image'} /> 
            </a>
        </div>
    )
}