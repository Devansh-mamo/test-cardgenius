import Link from "next/link";

const MadeWith = () => {
    return (
        <>
            <div className="w-60 h-7 bg-fuchsia-100 text-center rounded-t-lg ">
                <span className="py-auto">made with&nbsp;
                    <Link href={'/'} className="no-underline">
                        <span className="font-sans text-transparent font-semibold bg-clip-text bg-gradient-to-r from-cyan-600 to-yellow-600">
                            card genius
                        </span>
                    </Link>
                </span>

            </div>
        </>
    );
}

export default MadeWith;