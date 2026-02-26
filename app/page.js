import Image from "next/image";

export default function Home() {
  return (
    <>
    <div className="flex justify-center text-white   items-center h-[44vh] flex-col gap-3">
      <div className="text-5xl font-bold flex gap-2 justify-center items-center">Buy Me a Drink <span><img src="https://media.tenor.com/qM9DuBuJh_oAAAAi/cat-drinking-soda.gif" width={60} /></span> </div>
      <p>
        A platform to fund your projects with the help of Drink. Join us and turn your ideas into reality!
      </p>
      <div className="flex gap-5">
        <button type="button" className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-2xl ">Start Now</button>
        <button type="button" className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-2xl">Read More</button>
      </div>

    </div>
      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white flex justify-center font-bold text-3xl my-7">Your Fans can buy you a Drink!!</div>
      <div className="flex gap-5 justify-around container mx-auto my-16">
        <div className="item text-white font-bold flex flex-col justify-center items-center" >
          <img src="man.gif" alt="" width={95} className="rounded-[100%]"/>
          <p className="font-bold">Fans want to help</p>
          <p className="">Your fans are available for you to help you</p>
        </div>
        <div className="item text-white font-bold flex flex-col justify-center items-center" >
          <img src="coin.gif" alt="" width={95} className="rounded-[100%]"/>
          <p className="font-bold">Fans want to help</p>
          <p className="">Your fans are available for you to help you</p>
        </div>
        <div className="item text-white font-bold flex flex-col justify-center items-center" >
          <img src="group.gif" alt="" width={95} className="rounded-[100%]"/>
          <p className="font-bold">Fans want to help</p>
          <p className="">Your fans are available for you to help you</p>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>



      <div className="text-white flex justify-center font-bold text-3xl my-7">Learn More</div>
      <div className="flex items-center justify-center">
        <iframe className="mb-8" width="560" height="315" src="https://www.youtube.com/embed/2b-H6HWRtBo?si=VzXDlL554CT8Pdn-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </>
  );
}
