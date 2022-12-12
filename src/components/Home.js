import { useState, useEffect } from "react";
import Cards from "./Cards";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [error, setError] = useState(null);

  const species = [
    {
      name: "Show All",
    },
    {
      name: "Human",
    },
    {
      name: "Alien",
    },
    {
      name: "Animal",
    },
  ];

  useEffect(() => {
    document.title = `Rick and Morty`;
  }, []);

  useEffect(() => {
    console.log(characters)
  }, [characters]);

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const res = await fetch("https://rickandmortyapi.com/api/character");
		if(!res.ok){
			throw Error('Could not fetch the data for that resource')
		}
		const data = await res.json();
        setCharacters(data.results);
		setIsPending(false);
		setError(null);
      } catch (error) {
		setIsPending(false);
        setError(error.message)
      }
    };

    getCharacters();
  }, []);

  async function filterBySpecies(kind) {
	setCharacters([]);
	for (let index = 0; index < activePage; index++) {
		let url;
		if(kind === "Show All"){
			url = `https://rickandmortyapi.com/api/character/?page=${index+1}`;
		}
		else{
			url = `https://rickandmortyapi.com/api/character/?species=${kind}&page=${index+1}`;
		}

		try {
		const res = await fetch(
			url
		);
		if(!res.ok){
			throw Error('An error occurred while fetching card data.')
		}
		const data = await res.json();
		if(characters.length){
			setCharacters(data.results);
			setIsPending(false);
			setError(null);
		}
		else{
			setCharacters([...characters,...data.results]);
		}
		} catch (error) {
			setIsPending(false);
			setError(error.message)
		}
		
	}
  }

  const showMore=async()=>{
	const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${activePage+1}`);
    const data = await res.json();
    setCharacters([...characters,...data.results]);
	setActivePage(activePage+1);
  }

  return (
    <>
		<nav class="flex items-center justify-center flex-wrap bg-[#23233F]" width="1921" height="100">
			<div class="flex items-center flex-shrink-0 text-white mr-6">
				<LazyLoadImage src={"https://1000logos.net/wp-content/uploads/2022/03/Rick-and-Morty.png"}
					width={229.16} height={70}
					alt="Image Alt"
					//<img src="https://1000logos.net/wp-content/uploads/2022/03/Rick-and-Morty.png" width="229.16" height="70" class="" alt="logo" />
				/>
			</div>
		</nav>

		{ error && <div className="text-[30px] text-center text-[#B2B4D7] bg-[#2c2c58]"><br></br>{ error }<br></br><br></br></div> }
		{ isPending && <div>Loading...</div>}

      {!characters ? (
        <h1 className="text-gray-900 font-bold uppercase tracking-wide flex items-center justify-center text-center h-screen text-4xl dark:text-white">
          Loading...
        </h1>
      ) : (
		
        <div className="bg-[#141227]">
			<section className="container mx-auto p-8">
			<br></br>
			<div className="font-bold flex items-center justify-center space-x-5">
				{species.map((kind) => (
					<button onClick={()=>filterBySpecies(kind.name)} class="border border-slate-700 h-16 bg-[#23233F] hover:bg-[#B2B4D7] text-[#B2B4D7] py-2 px-3 rounded-lg">{kind.name}</button>
				))}
			</div>			

			<br></br><br></br>

			<div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
			{characters.map((character) => (
				<Cards key={character.id} {...character} />
			  ))}
			</div>
			<div className="py-16 font-bold flex justify-center">
				<button onClick={()=>showMore()} class="bg-[#23233F] hover:bg-[#B2B4D7] text-[#B2B4D7] font-bold py-2 px-4 rounded inline-flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
					</svg>
					Show More
				</button>
			</div>
		  </section>
		  
		</div>
      )}
    </>
  );
}
