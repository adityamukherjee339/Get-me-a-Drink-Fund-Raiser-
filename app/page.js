import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="flex justify-center text-white items-center min-h-[44vh] flex-col gap-4 px-4 text-center">
        <div className="text-3xl sm:text-5xl font-bold flex flex-wrap gap-2 justify-center items-center">
          Buy Me a Drink
          <span><img src="https://media.tenor.com/qM9DuBuJh_oAAAAi/cat-drinking-soda.gif" width={55} /></span>
        </div>
        <p className="text-sm sm:text-base max-w-lg text-slate-300">
          A platform to fund your projects with the help of Drink. Join us and turn your ideas into reality!
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/login">
            <button type="button" className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:opacity-90 font-medium rounded-2xl text-sm px-5 py-2.5">
              Start Now
            </button>
          </Link>
          <Link href="#learn-more">
            <button type="button" className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:opacity-90 font-medium rounded-2xl text-sm px-5 py-2.5">
              Read More
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-px opacity-10 mx-4"></div>

      {/* Features Section */}
      <div className="text-white flex justify-center font-bold text-2xl sm:text-3xl my-7 px-4 text-center">
        Your Fans can buy you a Drink!!
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 container mx-auto my-10 px-6">
        <div className="item text-white font-bold flex flex-col justify-center items-center gap-2 text-center">
          <img src="man.gif" alt="" width={90} className="rounded-full" />
          <p className="font-bold">Fans want to help</p>
          <p className="font-normal text-slate-300 text-sm">Your fans are available for you to help you</p>
        </div>
        <div className="item text-white font-bold flex flex-col justify-center items-center gap-2 text-center">
          <img src="coin.gif" alt="" width={90} className="rounded-full" />
          <p className="font-bold">Fans want to help</p>
          <p className="font-normal text-slate-300 text-sm">Your fans are available for you to help you</p>
        </div>
        <div className="item text-white font-bold flex flex-col justify-center items-center gap-2 text-center">
          <img src="group.gif" alt="" width={90} className="rounded-full" />
          <p className="font-bold">Fans want to help</p>
          <p className="font-normal text-slate-300 text-sm">Your fans are available for you to help you</p>
        </div>
      </div>

      <div className="bg-white h-px opacity-10 mx-4"></div>

      {/* Learn More / Video */}
      <div id="learn-more" className="text-white flex justify-center font-bold text-2xl sm:text-3xl my-7 px-4">
        Learn More
      </div>
      <div className="flex items-center justify-center px-4 mb-10">
        <div className="w-full max-w-2xl aspect-video">
          <iframe
            className="w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/2b-H6HWRtBo?si=VzXDlL554CT8Pdn-"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </>
  );
}
