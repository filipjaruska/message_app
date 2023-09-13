import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Message App',
}

const Card = ({ title, description, imageSrc }: { title: string, description: string, imageSrc: string }) => (
  <div className="max-w-xs mx-auto md:max-w-full">
    <div className="bg-gray-900 p-4 rounded-lg shadow-md">
      <div className="flex">
        <div className="rounded-lg overflow-hidden mr-4 w-64 h-44">
          <img src={imageSrc} alt={title} className="w-24 h-24 md:w-full md:h-auto rounded-lg" />
        </div>
        <div>
          <p className="text-lg font-semibold text-white">{title}</p>
          <p className="text-white">{description}</p>
        </div>
      </div>
    </div>
  </div>
);

export default function Home() {
  const cardData = [
    {
      title: 'Zpravy',
      description: 'Jediná chatovací místnost.',
      imageSrc: 'https://as2.ftcdn.net/v2/jpg/02/52/49/01/1000_F_252490186_ryaT9DfKkYwlxS32CGR2FlwjtjgZWPTD.jpg',
    },
    {
      title: 'Nastavení',
      description: 'Možnost zmenit profilový obrázek.',
      imageSrc: 'https://as2.ftcdn.net/v2/jpg/02/22/69/77/1000_F_222697754_OJIpEkWhLx4vArj05ihcIqiIdXbaCJpR.jpg',
    },
  ];

  return (
    <>
      <section className='mb-20'>
        <div className="bg-neutral-50 py-24 px-6 text-center dark:bg-neutral-800">
          <h1 className="mt-2 mb-16 text-5xl text-white font-bold tracking-tight md:text-6xl xl:text-7xl">
            Chatovací aplikace, <br /><span className="text-primary">zaregistrujte se!</span>
          </h1>
          <Link href="/auth">
            <p className="mb-2 hover:border-indigo-500 hover:bg-indigo-300 inline-block rounded bg-primary px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-300 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:mr-2 md:mb-0"
              data-te-ripple-init data-te-ripple-color="light" role="button">Registrace</p>
          </Link>
        </div>
      </section>

      <section>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
          {cardData.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </section>
    </>
  )
}
