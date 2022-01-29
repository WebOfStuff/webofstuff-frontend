
 export function Thumbnail(thumbnail) {
   // Keine Responsive Thumbnails 
    if (!thumbnail) {
      return (
        <>
          <div className='vjs-playlist-thumbnail vjs-playlist-thumbnail-placeholder'>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className='vjs-playlist-thumbnail vjs-playlist-thumbnail-placeholder'>
            <picture className='vjs-playlist-thumbnail'>
               <img src={thumbnail} alt='' />
            </picture>
          </div>
        </>
      )

    }
  }