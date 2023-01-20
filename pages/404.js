import Link from "next/link";
import Layout from "../components/layouts/main-layout";

const Custom404 = () => {
    return (
        <Layout>
            <main className="max-w-[1150px] px-4 sm:px-[25px] pb-4 sm:pb-[25px] pt-24 md:pt-28 mx-auto items-center">
                <section className="flex items-center h-full p-16">
                    <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                        <div className="max-w-md text-center">
                            <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
                                <span className="sr-only">Error</span>404
                            </h2>
                            <p className="text-2xl font-semibold md:text-3xl">
                                ไม่พบหน้าที่กำลังตามหา
                            </p>
                            <p className="mt-4 mb-8 dark:text-gray-400">
                                ไม่ต้องกังวล ลองกลับไปที่หน้าแรก แล้วหาใหม่ดูสิ!
                            </p>
                            <Link
                                rel="noopener noreferrer"
                                href="/"
                                className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
                            >
                                กลับหน้าแรก
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
};

export default Custom404;
