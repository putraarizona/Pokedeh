import { useEffect, useState } from 'react';
import { Flex, Spacer, Card, HStack, CardHeader, CardBody, Heading, Box, Badge, Button } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
let currentPage = 1; // TODO: replace this

const Pagination = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const moveTo = (direction) => {
		if (direction === 'prev') {
			currentPage = currentPage - 1;
			setSearchParams(`page=${currentPage}`);
		}
		if (direction === 'next') {
			// TODO: answer here
			currentPage = currentPage + 1;
			setSearchParams(`page=${currentPage}`);
		}
	};

	return (
		<HStack>
			{/* TODO: render Prev and Next button */}
			{/* TODO: answer here */}
			<Button onClick={() => moveTo('prev')} isDisabled={searchParams.get('page') < 2}>
				{'<'}Prev
			</Button>

			<Button onClick={() => moveTo('next')}>Next{'>'}</Button>
		</HStack>
	);
};

const PokemonList = ({ pokemons }) => {
	return (
		pokemons &&
		pokemons.length > 0 && (
			<Box role='pokemon-list'>
				{pokemons.map((pokemon) => (
					<Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
						<Card>
							<CardHeader>
								<Heading as='h3' size='md'>
									{pokemon.name}
								</Heading>
							</CardHeader>
							{/* TODO: render pokemon images & type here */}
							<CardBody>
								<Flex>
									<Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt='Front Default' />
									<Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon.id}.png`} alt='Back Default' />
									<Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png`} alt='Front Shiny' />
									<Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${pokemon.id}.png`} alt='Back Shiny' />
								</Flex>
								{pokemon.types.length == 1 ? (
									<Badge>{pokemon.types[0].type.name}</Badge>
								) : (
									<>
										<Badge>{pokemon.types[0].type.name}</Badge>
										<Spacer />
										<Badge>{pokemon.types[1].type.name}</Badge>
									</>
								)}
							</CardBody>
							{/* TODO: answer here */}
						</Card>
					</Link>
				))}
			</Box>
		)
	);
};
const Home = () => {
	//get list
	const fetchPokemons = async (page) => {
		//get pokemon list with image
		const displayPerPage = 20;
		const offset = (page - 1) * 20;
		const url = `https://pokeapi.co/api/v2/pokemon?limit=${displayPerPage}&offset=${offset}`;

		const response = await fetch(url);
		const data = await response.json();
		const pokemonList = data.results.map(async (pokemon) => {
			const pokemonResponse = await fetch(pokemon.url);
			const pokemonData = await pokemonResponse.json();
			return pokemonData;
		});

		//set pokemonList to state
		setPokemons(await Promise.all(pokemonList));
	};

	const [pokemons, setPokemons] = useState([]);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const page = parseInt(searchParams.get('page') || 1);
		fetchPokemons(page);
	}, [searchParams]);

	return (
		<>
			<Heading as='h2' size='lg'>
				Pokemon List
			</Heading>
			<Pagination />
			<PokemonList pokemons={pokemons} />
		</>
	);
};

export default Home;
