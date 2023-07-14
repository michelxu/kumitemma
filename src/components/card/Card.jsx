import { countries } from "../../data/data";
import { fighters } from "../../data/data";

//props o id then search for its data
const Card = ({id}) => {
  //const id = props.id;

  const getFighter = (id) => {
    return fighters.find(fighter => fighter.id === id);
  }
  const getCountryFlag = (id) => {
    const flag = countries.find(country => country.id === id);
    const imageUrl = !flag ? 'https://flagicons.lipis.dev/flags/4x3/xx.svg' : flag.image;

    return imageUrl;
  }

  //variables iniciales
  const fighter = getFighter(id);
  const country_flag = getCountryFlag(fighter.country);
  //name (quita el primer nombre y deja el resto)
  const fighter_name = fighter.name.split(" ");
  const lastName = fighter_name.slice(1).join(" ").toUpperCase();


  /*definir tipo de cartas y manejar el cambio de clases
  como bg color, font weight o font color*/
  const cardTypeClasses = {
    base_contender: {
      bg: 'bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-zinc-900',
      top_panel: 'text-white font-semibold px-0.5',
      name: 'text-white font-semibold px-1',
      stats: 'font-semibold',
      stats_names: 'font-light',
    },
    base_ranked: {
      bg: 'bg-gradient-to-t from-zinc-600 via-zinc-400 to-zinc-800 border-zinc-900',
      top_panel: 'text-white font-semibold px-0.5',
      name: 'text-white font-semibold px-1',
      stats: 'font-semibold',
      stats_names: 'font-light',
    },
    base_top: {
      bg: 'bg-gradient-to-t from-zinc-600 via-zinc-400 to-zinc-800 border-zinc-900',
      top_panel: 'bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-400 bg-clip-text text-transparent font-bold px-0.5',
      name: 'bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent font-bold px-1',
      stats: 'bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-300 bg-clip-text text-transparent font-bold',
      stats_names: 'bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-300 bg-clip-text text-transparent font-medium',
    },
    base_champion: {
      bg: 'bg-gradient-to-t from-zinc-600 via-zinc-400 to-zinc-800 border-zinc-900',
      //bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 border-purple-900
      top_panel: 'bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent font-bold px-0.5',
      name: 'bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent font-bold px-1',
      stats: 'bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 bg-clip-text text-transparent font-bold',
      stats_names: 'bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 bg-clip-text text-transparent font-medium',
    },
    legend: {
      bg: 'bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-orange-900 via-amber-100 to-orange-900 border-amber-600',
      top_panel: 'bg-gradient-to-r from-amber-50 via-amber-200 to-amber-300 bg-clip-text text-transparent font-bold px-0.5',
      name: 'bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 bg-clip-text text-transparent font-bold px-1',
      stats: 'bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 bg-clip-text text-transparent font-bold',
      stats_names: 'bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 bg-clip-text text-transparent font-medium',
    },
    star: {
      bg: 'bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 border-indigo-950',
      top_panel: 'bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-400 bg-clip-text text-transparent font-bold px-0.5',
      name: 'bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-500 bg-clip-text text-transparent font-bold px-1',
      stats: 'bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-400 bg-clip-text text-transparent font-bold',
      stats_names: 'bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-400 bg-clip-text text-transparent font-medium',
    },
  };

  //card dynamic classes • by fighter.card_type
  const cardClass = `flex flex-col w-48 h-64 rounded select-none border-solid border-2 relative
  ${cardTypeClasses[fighter.card_type].bg} `

  const cardName = `text-center text-xl font-poppins italic tracking-tighter max-w-full
  ${cardTypeClasses[fighter.card_type].name}`

  const cardTopPanel = `flex flex-col items-center text-center font-poppins absolute -top-0.5 right-1.5 z-10
  ${cardTypeClasses[fighter.card_type].top_panel}`

  const cardStats = `text-lg
  ${cardTypeClasses[fighter.card_type].stats}`

  const cardStatsNames = `text-xs -mb-2
  ${cardTypeClasses[fighter.card_type].stats_names}`

  return (
    <>
    <div
    className={cardClass}>
      {/* card_top */}
      <div className="flex flex-row relative">
        {/* image */}
        <div className="relative h-48 ms-1 mt-1 overflow-hidden">
            <img src={fighter.full_image} className="h-60 object-cover" alt="" draggable="false"/>
        </div>
        {/* right panel */}
        <div className={cardTopPanel}>
          <h3 className="text-4xl mt-1 tracking-tighter">{fighter.stats.overall}</h3>
          <h3 className="font-medium text-xl -mt-1.5 tracking-tighter">{fighter.division}</h3>
          <h3 className="font-medium text-xl -mt-2.5 tracking-tighter">—</h3>
          <img src={country_flag} className="h-6 -mt-1" alt="" draggable="false"/>
        </div>
      </div>

      {/* card_bottom */}
      <div className="flex flex-col justify-center items-center rounded-t-xl rounded-b -mt-1.5 z-10">
        {/* name */}
        <h1 className={cardName}>
          {lastName}
        </h1>
        {/* stats */}
        <div className="flex flex-row space-x-1.5 px-1 text-center font-poppins italic text-white">
          <div>
            <h3 className={cardStatsNames}>STR</h3>
            <h3 className={cardStats}>{fighter.stats.striking}</h3>
          </div>
          <div>
            <h3 className={cardStatsNames}>DEF</h3>
            <h3 className={cardStats}>{fighter.stats.defense}</h3>
          </div>
          <div>
            <h3 className={cardStatsNames}>WRS</h3>
            <h3 className={cardStats}>{fighter.stats.wrestling}</h3>
          </div>
          <div>
            <h3 className={cardStatsNames}>BJJ</h3>
            <h3 className={cardStats}>{fighter.stats.bjj}</h3>
          </div>
          <div>
            <h3 className={cardStatsNames}>STM</h3>
            <h3 className={cardStats}>{fighter.stats.stamina}</h3>
          </div>
          <div>
            <h3 className={cardStatsNames}>HLT</h3>
            <h3 className={cardStats}>{fighter.stats.health}</h3>
          </div>
        </div>
      </div>
      <div className='fade-overlay'></div>
    </div>
    </>
  )
}

export default Card