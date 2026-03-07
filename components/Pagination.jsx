import Link from "next/link";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function Pagination({ page, pageSize, totalItems }) {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <section className="flex justify-center items-center gap-3 my-10">
      {page > 1 ? (
        <Link
          href={`/properties?page=${page - 1}`}
          className="flex items-center gap-1 px-4 py-2 bg-amber-700 text-white rounded-xl hover:bg-amber-800 transition-colors font-medium text-sm"
        >
          <MdKeyboardArrowLeft size={20} /> Prev
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-4 py-2 bg-stone-100 text-stone-400 rounded-xl text-sm cursor-not-allowed">
          <MdKeyboardArrowLeft size={20} /> Prev
        </span>
      )}

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Link
            key={p}
            href={`/properties?page=${p}`}
            className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-semibold transition-colors
              ${p === page
                ? "bg-amber-700 text-white shadow-sm"
                : "bg-stone-100 text-stone-600 hover:bg-amber-100 hover:text-amber-800"
              }`}
          >
            {p}
          </Link>
        ))}
      </div>

      {page < totalPages ? (
        <Link
          href={`/properties?page=${page + 1}`}
          className="flex items-center gap-1 px-4 py-2 bg-amber-700 text-white rounded-xl hover:bg-amber-800 transition-colors font-medium text-sm"
        >
          Next <MdKeyboardArrowRight size={20} />
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-4 py-2 bg-stone-100 text-stone-400 rounded-xl text-sm cursor-not-allowed">
          Next <MdKeyboardArrowRight size={20} />
        </span>
      )}
    </section>
  );
}
