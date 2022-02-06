import { useLayoutEffect, useState } from "react";

const playlist = [
  'https://firebasestorage.googleapis.com/v0/b/figures-shop-f6bdb.appspot.com/o/ArrivalToEarthOSTTransformers-Stev_bmn2.mp3?alt=media&token=25341daa-7e6e-445c-bfd8-8261b7c3e4be',
  'https://firebasestorage.googleapis.com/v0/b/figures-shop-f6bdb.appspot.com/o/The%20Flash%20Theme%20At%20The%20Speed%20Of%20Force_%20-.mp3?alt=media&token=2a1d26ac-109b-44e7-b22d-d9352803718a',
  'https://firebasestorage.googleapis.com/v0/b/figures-shop-f6bdb.appspot.com/o/TheAvengers-AlanSilvestri_3zzk.mp3?alt=media&token=0614e088-84a9-4c07-94ed-9df9a8544ab2',
  'https://firebasestorage.googleapis.com/v0/b/figures-shop-f6bdb.appspot.com/o/Sixteen%20Hundred%20Men%20_%201917%20OST-192k.mp3?alt=media&token=68c7348c-e112-48c9-a751-928ddc115568',
  'https://firebasestorage.googleapis.com/v0/b/figures-shop-f6bdb.appspot.com/o/johan_soderqvist-Under_No_Flag_Gratomic.com_2.mp3?alt=media&token=14ddfed2-bd4a-43bc-9af1-375a486e2aed',
  'https://firebasestorage.googleapis.com/v0/b/figures-shop-f6bdb.appspot.com/o/RiseTheDarkKnightRisesOst-HansZi_443ms.mp3?alt=media&token=b6fab5be-6d1d-40a9-8339-f26f8b250e02',
  'https://firebasestorage.googleapis.com/v0/b/figures-shop-f6bdb.appspot.com/o/IronMan3-BrianTyler-2508732.mp3?alt=media&token=c7409679-d031-46e3-954e-203209403025',
]
const Music = ({category}) => {
  const [track, setTrack] = useState(category);
  const currentPage = window.location.href.split('/')[3];
  
  useLayoutEffect(()=>{
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
          ? playlist[Math.floor(Math.random() * (7 - 3) + 3)] 
          : null);
        break;
    }
    
    let audioTag = document.querySelector('#music-player');
    if(audioTag?.volume) audioTag.volume = 0.1;
  }, [category, currentPage])

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
        id='music-player'
        autoPlay
        controls
        loop
        volume= '0.1'
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{
          width: '25vw',
          position: 'fixed',
          top: '60px',
          right: '0',
          zIndex: '999',
          transform: 'translateX(calc(100% - 45px))',
          transition: 'all 0.5s ease',
          '@media only screen and (maxWidth: 700px)':{
            width: '50vw'
          }
        }}
      >
        <source
          src= {track}
          type="audio/mpeg"
        />
      </audio>
    )}
    </div>
  );
};

export default Music;
