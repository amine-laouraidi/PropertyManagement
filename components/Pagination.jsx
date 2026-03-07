import Link from "next/link";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function Pagination({ page, pageSize, totalItems }) {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <section className="flex justify-center items-center gap-4 my-10">
      {page > 1 ? (
        <Link
          href={`/properties?page=${page - 1}`}
          className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-medium text-sm"
        >
          <MdKeyboardArrowLeft size={20} /> Prev
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-400 rounded-full text-sm cursor-not-allowed">
          <MdKeyboardArrowLeft size={20} /> Prev
        </span>
      )}

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Link
            key={p}
            href={`/properties?page=${p}`}
            className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold transition
              ${p === page
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 text-gray-600 hover:bg-blue-100"
              }`}
          >
            {p}
          </Link>
        ))}
      </div>

      {page < totalPages ? (
        <Link
          href={`/properties?page=${page + 1}`}
          className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-medium text-sm"
        >
          Next <MdKeyboardArrowRight size={20} />
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-400 rounded-full text-sm cursor-not-allowed">
          Next <MdKeyboardArrowRight size={20} />
        </span>
      )}
    </section>
  );
}