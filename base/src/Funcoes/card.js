
export default function card({track}) {
  const { name, album, artists } = track;
  return <div className='card'>
      <img className='card__img' src={album.images[0].url} alt=''></img>
      <p>{name}</p>
      <p className = 'card__artist'>{artists.map((x, i)=> i!==artists.length-1 ? `${x.name} - ` : `${x.name}`)}</p>
  </div>;
}
