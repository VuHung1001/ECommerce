import { useEffect, useRef, useState } from "react";

const playlist = [
  'https://firebasestorage.googleapis.com/v0/b/figures-shop-f6bdb.appspot.com/o/ArrivalToEarthOSTTransformers-Stev_bmn2.mp3?alt=media&token=25341daa-7e6e-445c-bfd8-8261b7c3e4be',
  'https://firebasestorage.googleapis.com/v0/b/figures-shop-f6bdb.appspot.com/o/The%20Flash%20Theme%20At%20The%20Speed%20Of%20Force_%20-.mp3?alt=media&token=2a1d26ac-109b-44e7-b22d-d9352803718a',
  'https://firebasestorage.googleapis.com/v0/b/figures-shop-f6bdb.appspot.com/o/TheAvengers-AlanSilvestri_3zzk.mp3?alt=media&token=0614e088-84a9-4c07-94ed-9df9a8544ab2',
  'https://firebasestorage.googleapis.com/v0/b/figures-shop-f6bdb.appspot.com/o/Sixteen%20Hundred%20Men%20_%201917%20OST-192k.mp3?alt=media&token=68c7348c-e112-48c9-a751-928ddc115568',
  'https://firebasestorage.googleapis.com/v0/b/figures-shop-f6bdb.appspot.com/o/johan_soderqvist-Under_No_Flag_Gratomic.com_2.mp3?alt=media&token=14ddfed2-bd4a-43bc-9af1-375a486e2aed',
  'https://firebasestorage.googleapis.com/v0/b/figures-shop-f6bdb.appspot.com/o/The%20Dark%20Knight%20-%20Ending.mp3?alt=media&token=b3eb52b8-3e9e-4619-92f5-6e0b3d6cbf90',
  'https://firebasestorage.googleapis.com/v0/b/figures-shop-f6bdb.appspot.com/o/IronMan3-BrianTyler-2508732.mp3?alt=media&token=c7409679-d031-46e3-954e-203209403025',
  'https://firebasestorage.googleapis.com/v0/b/figures-shop-f6bdb.appspot.com/o/Inception%20Soundtrack%20HD%20-%20%2312%20Time%20(Hans%20Zimmer).mp3?alt=media&token=b9e2acde-ab73-455b-8039-2ecfad1ee769',
]
const Music = ({category}) => {
  const [track, setTrack] = useState(category);
  const [isTrackChanged, setIsTrackChanged] = useState(false);
  const currentPage = window.location.href.split('/')[3];
  const categoryAtUrl = window.location.href.split('/')[4];
  const audioTag = useRef();

  const playNextTrack = ()=>{
    let index = playlist.indexOf(track)

    if(index >= 0 && index <= playlist.length - 2){
      setTrack(playlist[index+1])
      setIsTrackChanged(true)
    }
    if(index === playlist.length - 1){
      setTrack(playlist[0])
      setIsTrackChanged(true)
    }
  }
  
  useEffect(()=>{
    if(!categoryAtUrl && !isTrackChanged)
    switch (category) {
      case 'Transformers':
        setTrack(playlist[0]);
        break;
      case 'DC-Comics':
        setTrack(playlist[1]);
        break;
      case 'Marvel':
        setTrack(playlist[2]);
        break;
      default:
        setTrack(!currentPage.includes('product') 
          ? playlist[Math.floor(Math.random() * (8 - 3) + 3)] 
          : null);
        break;
    }
    if(categoryAtUrl && !isTrackChanged)
    switch (categoryAtUrl) {
      case 'Transformers':
        setTrack(playlist[0]);
        break;
      case 'DC-Comics':
        setTrack(playlist[1]);
        break;
      case 'Marvel':
        setTrack(playlist[2]);
        break;
      default:
        setTrack(!currentPage.includes('product') 
          ? playlist[Math.floor(Math.random() * (8 - 3) + 3)] 
          : null);
        break;
    }
    
    let timeout = setTimeout(()=>{
      if(audioTag?.current?.volume) {
        audioTag.current.volume = 0.02; 
        window.clearInterval(timeout)
      }
    }, 100)

    if(isTrackChanged && track){
      const source = document.getElementById('music-source')
      source.src = track;
      audioTag.current.load()
      audioTag.current.play()
    }
  }, [category, currentPage, audioTag, categoryAtUrl, isTrackChanged, track])

  const handleMouseOver = ()=>{
    document.querySelector('#music-player').style.transform = 'translate(0%, 0%)'
  }

  const handleMouseOut = ()=>{
    document.querySelector('#music-player').style.transform = 'translateX(calc(100% - 45px))'
  }

  return (
    <div>
    {track && (
      <audio
        ref={audioTag}
        id='music-player'
        autoPlay={true}
        controls
        volume= '0.02'
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onEnded={playNextTrack}
        style={{
          width: '25vw',
          position: 'fixed',
          top: '70px',
          right: '0',
          zIndex: '999',
          transform: 'translateX(calc(100% - 45px))',
          transition: 'all 0.5s ease',
        }}
      >
        <source
          id='music-source'
          src= {track}
          type="audio/mpeg"
        />
      </audio>
    )}
    </div>
  );
};

export default Music;
