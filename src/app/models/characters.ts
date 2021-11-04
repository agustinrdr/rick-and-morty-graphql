export interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: Origin
  location: Location
  image: string
  episode: string
  created: string
}

export interface CharacterResponse {
  characters: {
    results: Character[]
  }
}

interface Location {
  name: string
}

interface Origin {
  name: string
}
