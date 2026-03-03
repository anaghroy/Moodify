/** Music files */
import Ehsaas from "../../assets/musics/Ehsaas.mp3";
import bargad from "../../assets/musics/bargad.mp3";
import SonaKitnaSonaHai from "../../assets/musics/SonaKitnaSonaHai.mp3";
import Jhanjhariya from "../../assets/musics/Jhanjhariya.mp3";
import Hukum from "../../assets/musics/Hukum.mp3";
import TheeThalapathy from "../../assets/musics/TheeThalapathy.mp3";
import Shararat from "../../assets/musics/Shararat.mp3";
import LuttLeGaya from "../../assets/musics/LuttLeGaya.mp3";

/**Music Covers */
import EhsaasCover from "../../assets/musics/musicCover/Ehsaas.jpg";
import bargadCover from "../../assets/musics/musicCover/bargad.jpg";
import SonaKitnaSonaHaiCover from "../../assets/musics/musicCover/SonaKitnaSonaHai.jpg";
import JhanjhariyaCover from "../../assets/musics/musicCover/Jhanjhariya.jpg";
import HukumCover from "../../assets/musics/musicCover/Hukum.jpg";
import TheeThalapathyCover from "../../assets/musics/musicCover/TheeThalapathy.jpg";
import LuttLeGayaCover from "../../assets/musics/musicCover/LuttLeGaya.jpg";
import ShararatCover from "../../assets/musics/musicCover/Shararat.jpg";

export const songsByMood = {
  Sad: [
    {
      id: 1,
      title: "Ehsaas",
      mood: "SAD",
      artist: "Faheem Abdullah Duha Shah",
      src: Ehsaas,
      cover: EhsaasCover,
    },
    {
      id: 2,
      title: "Bargad",
      mood: "SAD",
      artist: "sufr Arpit Bala & toorjo dey",
      src: bargad,
      cover: bargadCover,
    },
  ],

  Happy: [
    {
      id: 3,
      title: "Sona Kitna Sona Hai",
      mood: "HAPPY",
      artist: "Udit Narayan & Poornima",
      src: SonaKitnaSonaHai,
      cover: SonaKitnaSonaHaiCover,
    },
    {
      id: 4,
      title: "Jhanjha riya",
      mood: "HAPPY",
      artist: "Abhijeet Bhattacharya",
      src: Jhanjhariya,
      cover: JhanjhariyaCover,
    },
  ],

  Angry: [
    {
      id: 5,
      title: "Hukum",
      mood: "ANGRY",
      artist: "Anirudh Ravichander",
      src: Hukum,
      cover: HukumCover,
    },
    {
      id: 6,
      title: "Thee Thalapathy",
      mood: "ANGRY",
      artist: "Silambarasan Tr",
      src: TheeThalapathy,
      cover: TheeThalapathyCover,
    },
  ],
  Surprise: [
    {
      id: 7,
      title: "Shararat",
      mood: "SURPRISE",
      artist: "Shashwat Sachdev & Madhubanti Bagchi",
      src: Shararat,
      cover: ShararatCover,
    },
    {
      id: 8,
      title: "Lutt Le Gaya",
      mood: "SURPRISE",
      artist: "Shashwat Sachdev & Simran Choudhar",
      src: LuttLeGaya,
      cover: LuttLeGayaCover,
    },
  ],
};
