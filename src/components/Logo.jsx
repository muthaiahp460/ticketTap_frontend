const Logo = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-9 h-9 text-amber-400"
        fill="currentColor"
      >
        <path d="M3 7a2 2 0 012-2h2a1 1 0 010 2H5v10h2a1 1 0 010 2H5a2 2 0 01-2-2V7zM19 7a2 2 0 00-2-2h-2a1 1 0 000 2h2v10h-2a1 1 0 000 2h2a2 2 0 002-2V7z" />
        <rect x="7" y="7" width="10" height="10" rx="2" />
        <polygon points="11,10 15,12 11,14" className="fill-black" />
      </svg>

      <span className="font-semibold text-lg">
        TicketTap
      </span>
    </div>
  );
};

export default Logo;