import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';


export default function Article({
	name,
	image,
	status,
	species,
	gender,
	origin, // I couldn't find the first seen part in the json file
	location //
}) {
  return (
        <article className="border font-['Segoe_UI'] border-slate-700 bg-[#23233F] text-[#B2B4D7] hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 rounded-lg shadow overflow-hidden">
          
		  <section class="">
		  <LazyLoadImage src={image}
					alt="Image Card"
					className="md:h-44 w-screen object-cover"
					effect="blur"
			/>
		  </section>

			<h2 className="p-6 px-8 font-bold divide-y text-[28px] text-lg dark:text-white mb-2">{name}</h2>
			
			<div className="p-6 grid grid-cols-2 gap-3 content-start">
					{status === 'Alive' ? (<button class="flex border font-bold border-slate-700 bg-[#141227] hover:bg-[#B2B4D7] text-[#B2B4D7] hover:text-[#141227] py-2 px-8 rounded-lg"><p className="text-[#B3FF38] pr-3">●</p>{status}</button>)
						: null

					}
					{status === 'Dead' ? (<button class="flex border font-bold border-slate-700 bg-[#141227] hover:bg-[#B2B4D7] text-[#B2B4D7] hover:text-[#141227] py-2 px-8 rounded-lg"><p className="text-[#BF0050] pr-3">●</p>{status}</button>)
						: null

					}
					{status === 'Unknown' ? (<button class="flex border font-bold border-slate-700 bg-[#141227] hover:bg-[#B2B4D7] text-[#B2B4D7] hover:text-[#141227] py-2 px-8 rounded-lg"><p className="text-[#B2B4D7] pr-3">●</p>{status}</button>)
						: null

					}

					<button class="text-center flex border font-bold border-slate-700 bg-[#141227] hover:bg-[#B2B4D7] text-[#B2B4D7] hover:text-[#141227] py-2 px-8 rounded-lg">{species}</button>
					<button class="text-center flex border font-bold border-slate-700 bg-[#141227] hover:bg-[#B2B4D7] text-[#B2B4D7] hover:text-[#141227] py-2 px-8 rounded-lg">{gender}</button>
			</div>

			<hr className="border-[#34344E]"></hr>

          <div className="p-8 py-4 px-7">
            <ul className="flex flex-col items-start justify-start gap-2 dark:text-gray-400">
			  <li className="text-[16px]">Last known location: </li>
			  <li className="text-[18px] font-bold">{location.name}</li>
			  <li className="text-[16x]">First seen in: </li>
			  <li className="text-[18px] font-bold">{location.name}</li>
            </ul>
          </div>
        </article>
  );
}
