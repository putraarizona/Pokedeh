import { useEffect, useState } from 'react';
import { Badge, Tr, Td, HStack, VStack, Heading, Box } from '@chakra-ui/react';

import { Image } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Table } from '@chakra-ui/react';
import { Tbody } from '@chakra-ui/react';

const Detail = ({ pokemon }) => {
	return (
		<Box>
			{pokemon && (
				<Box role='pokemon-detail'>
					{/* TODO: display pokemon name here */}
					{/* TODO: answer here */}
					<Heading>{pokemon.name}</Heading>

					{/* TODO: display pokemon type here */}
					{/* TODO: answer here */}
					{pokemon.types.length == 1 ? (
						<Badge>{pokemon.types[0].type.name}</Badge>
					) : (
						<>
							<Badge>{pokemon.types[0].type.name}</Badge>
							<Badge>{pokemon.types[1].type.name}</Badge>
						</>
					)}

					<HStack>
						<Image src={pokemon.sprites.front_default} />
						<Image src={pokemon.sprites.back_default} />
						<Image src={pokemon.sprites.front_shiny} />
						<Image src={pokemon.sprites.back_shiny} />
					</HStack>
					{/* TODO: render pokemon height, weight, base_experience, abilities, and stats here */}
					{/* TODO: answer here */}
					<Table>
						<Tbody>
							<Tr>
								<Td>Height</Td>
								<Td>{pokemon.height}</Td>
							</Tr>
							<Tr>
								<Td>Weight</Td>
								<Td>{pokemon.weight}</Td>
							</Tr>
							<Tr>
								<Td>Base Experience</Td>
								<Td>{pokemon.base_experience}</Td>
							</Tr>
							<Tr>
								<Td>Abilities</Td>
								<VStack>
									<Td>
										{pokemon.abilities[0].ability.name}
										<VStack />
										{pokemon.abilities[1].ability.name}
									</Td>
								</VStack>
							</Tr>
							<Tr>
								<Td>Stats</Td>
								<VStack>
									<Td>
										hp: {pokemon.stats[0].base_stat}
										<VStack />
										attack: {pokemon.stats[1].base_stat}
										<VStack />
										defense: {pokemon.stats[2].base_stat}
										<VStack />
										special-attack: {pokemon.stats[3].base_stat}
										<VStack />
										special-defense: tes
										<VStack />
										speed: tes
									</Td>
								</VStack>
							</Tr>
						</Tbody>
					</Table>
				</Box>
			)}
		</Box>
	);
};
const Page = () => {
	//TODO: read pokemonId from parameter
	// const { pokemonId } = { pokemonId: 1 }; // TODO: replace this
	const { id } = useParams();
	const [pokemon, setPokemon] = useState(null);

	const fetchPokemon = async (id) => {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
		const data = await response.json();
		setPokemon(data);
	};

	useEffect(() => {
		// TODO: answer here
		fetchPokemon(id);
	}, [id]);

	return <Detail pokemon={pokemon} />;
};

export default Page;
