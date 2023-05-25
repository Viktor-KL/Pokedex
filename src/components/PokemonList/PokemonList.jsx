import PokemonCard from './../PokemonCard/PokemonCard'
import styles from './PokemonList.module.scss'

export default function PokemonList({pokemonList}) {
  return (
    <div className={styles.list}>
        {pokemonList.map((item, key) => (
        <PokemonCard key={key} url={item.url} />
      ))}
    </div>
  )
}
