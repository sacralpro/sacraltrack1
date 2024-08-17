export default function TermsOfUseCard() {
    return (
      <div className="bg-[#272B43] rounded-2xl p-4  hidden md:flex md:max-w-[408px]">
        <div className=" items-center justify-between">

          <p>
          The track price is automatically set to $2. The artist's royalty amount is %50 of the track price.
          </p>
          <br />
          <span className="text-[#5492FA] text-sm">Royalties withdrawal is available after $10</span>
          <br />
          <br />

          <a href="/terms" className="text-[#838383] t hover:text-white">
            Terms of Use
          </a>
        </div>
      </div>
    );
  }
  